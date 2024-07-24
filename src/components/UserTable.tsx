import React, { useRef, useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { IUser } from "../models/IUser"
import useIntersectionObserver from "../hooks/useIntersectionObserver"
import { ISorts } from "../models/ISorts"
import sortUsers from "../utils/sortUsers"

//таблица занимает фиксированную высоту, но при этом имеет
//возможность скролла строк пользователей. Для этого таблица
//разделяется на несколько: таблицу заголовков и таблицу
//пользователей. Таблица пользователей находится в div'е
//с overflow: scroll
const StyledHeadTableContainer = styled.div`
   width: 100%;
   max-width: 1200px;
   margin: auto;
   box-sizing: border-box;
   padding-right: 5px;
`

const StyledHeadTable = styled.table`
   width: 100%;
   table-layout: fixed;
   border-collapse: collapse;
   border: 2px solid #004d40;
`

const StyledBodyTableContainer = styled.div`
   width: 100%;
   max-width: 1200px;
   margin: auto;
   height: 400px;
   overflow-y: scroll;
   position: relative;

   &::-webkit-scrollbar {
      width: 5px;
   }

   &::-webkit-scrollbar-track {
      background: transparent;
   }

   &::-webkit-scrollbar-thumb {
      background-color: #004d40;
      border: 3px solid #004d40;
   }
`

const StyledBodyTable = styled.table`
   width: 100%;
   table-layout: fixed;
   border-collapse: collapse;
   border: 2px solid #004d40;
   position: absolute;
   top: -1px;
   left: 0px;
`

const StyledTh = styled.th`
   border-left: 2px solid #004d40;
   position: relative;
   padding-left: 5px;
   text-align: left;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   min-width: 50px;
`

const StyledTd = styled.td`
   padding-left: 5px;
   text-align: left;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   cursor: pointer;
   max-height: 50px;
`

const StyledTr = styled.tr<{ $active: boolean }>`
   border: 2px solid #004d40;
   height: 50px;
   &:hover {
      ${(props) => (props.$active ? "background: #addfad" : "")};
   }
`

const StyledTbody = styled.tbody`
   height: 300px;
   overflow-x: auto;
`

const StyledResizerDiv = styled.div`
   width: 10px;
   height: 100%;
   position: absolute;
   background: #addfad;
   top: 0;
   right: -5px;
   cursor: col-resize;
   z-index: 1;
`

type TProps = {
   users: IUser[]
   onEndOfUsers: Function
   onUserClick: (user: IUser) => void
   sorts: ISorts
}

const UserTable: React.FC<TProps> = ({ users, onEndOfUsers, onUserClick, sorts }) => {
   //так как мы работаем с 2 таблицами: заголовков и контейнера
   //для связи их размеров используются состояния
   const [columnWidths, setColumnWidths] = useState<number[]>([])
   const tableContainerRef = useRef<HTMLDivElement>(null)
   const lastBlock = useRef<HTMLTableRowElement>(null)

   useIntersectionObserver(lastBlock, onEndOfUsers, [users])

   const resetColumnWidths = useCallback(() => {
      if (tableContainerRef.current) {
         const tableWidth = tableContainerRef.current.clientWidth - 100
         const initialWidths = Array(5).fill(tableWidth / 5)
         setColumnWidths(initialWidths)
      }
   }, [])

   useEffect(() => {
      resetColumnWidths()
      const handleResize = () => resetColumnWidths()
      //при изменении ширины окна меняется и ширина таблицы
      //из-за этого значения ширины клеток, которые подходили
      //для максимальной ширины, при ее уменьшении вылезают
      //за границы самой таблицы. Поэтому изменение ширины
      //окна происходит перерасчету ширины ячеек до
      //подходящих - то есть до 1/5 ширины таблицы
      window.addEventListener("resize", handleResize)
      return () => {
         window.removeEventListener("resize", handleResize)
      }
   }, [resetColumnWidths])

   const handleMouseDown = (index: number, e: React.MouseEvent) => {
      const startX = e.clientX
      const startWidth = columnWidths[index]
      const tableWidth = tableContainerRef.current?.clientWidth! - 100 || 0

      const handleMouseMove = (e: MouseEvent) => {
         const newWidth = startWidth + (e.clientX - startX)
         setColumnWidths((prevWidths) => {
            const newWidths = [...prevWidths]
            newWidths[index] = Math.max(newWidth, 50)

            //при увеличении размера одной из ячеек, сумма ширины всех
            //ячеек становится больше ширины самой таблицы - это
            //компенсируется уменьшение последней или же первой
            //из ячеек
            const totalWidth = newWidths.reduce((total, width) => total + width, 0)
            if (totalWidth > tableWidth) {
               const indexForDecrease = newWidths.length - 1 != index ? newWidths.length - 1 : index
               newWidths[indexForDecrease] -= totalWidth - tableWidth
               if (newWidths[indexForDecrease] < 50) {
                  newWidths[index] -= 50 - newWidths[indexForDecrease]
                  newWidths[indexForDecrease] = 50
               }
            }
            return newWidths
         })
      }

      const handleMouseUp = () => {
         document.removeEventListener("mousemove", handleMouseMove)
         document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
   }

   return (
      <>
         <StyledHeadTableContainer ref={tableContainerRef}>
            <StyledHeadTable>
               <thead>
                  <StyledTr $active={false}>
                     {["ФИО", "возраст", "пол", "номер", "адрес"].map((name, index) => (
                        <StyledTh key={name} style={{ width: columnWidths[index] }}>
                           {name}
                           <StyledResizerDiv onMouseDown={(e) => handleMouseDown(index, e)} />
                        </StyledTh>
                     ))}
                  </StyledTr>
               </thead>
            </StyledHeadTable>
         </StyledHeadTableContainer>
         <StyledBodyTableContainer>
            <StyledBodyTable>
               <StyledTbody>
                  {sortUsers(users, sorts).map((user, index) => (
                     <StyledTr
                        key={user.id}
                        ref={index === users.length - 1 ? lastBlock : undefined}
                        $active={true}
                        onClick={() => onUserClick(user)}
                     >
                        <StyledTd style={{ width: columnWidths[0] }}>
                           {user.firstName} {user.maidenName} {user.lastName}
                        </StyledTd>
                        <StyledTd style={{ width: columnWidths[1] }}>{user.age}</StyledTd>
                        <StyledTd style={{ width: columnWidths[2] }}>{user.gender}</StyledTd>
                        <StyledTd style={{ width: columnWidths[3] }}>{user.phone}</StyledTd>
                        <StyledTd style={{ width: columnWidths[4] }}>
                           {user.address.city}, {user.address.address}
                        </StyledTd>
                     </StyledTr>
                  ))}
                  {users.length <= 8 &&
                     Array(8 - users.length)
                        .fill(null)
                        .map((_, index) => (
                           <StyledTr key={index} $active={false}>
                              <StyledTd />
                           </StyledTr>
                        ))}
               </StyledTbody>
            </StyledBodyTable>
         </StyledBodyTableContainer>
      </>
   )
}

export default observer(UserTable)
