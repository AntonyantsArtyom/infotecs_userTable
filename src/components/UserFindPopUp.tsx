import styled from "styled-components"
import { useState } from "react"
import TFilter from "../models/TFilter"
import translateKey from "../utils/translateKey"

const StyledShadow = styled.div`
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   z-index: 2;
`

const StyledContainer = styled.div`
   width: 100%;
   max-width: 1200px;
   margin: auto;
`

const StyledPopUp = styled.div`
   background: #f5f5f5;
   border: 2px solid #004d40;
   width: 196px;
   height: 94px;
   margin-right: auto;
   margin-top: 358px;
   padding-top: 5px;
   @media (max-width: 1200px) {
      margin-left: 8px;
   }
`

const StyledFlexDiv = styled.div`
   width: 186px;
   margin: auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
`

const StyledInput = styled.input`
   margin-bottom: 5px;
   width: 180px;
   height: 30px;
   background: transparent;
   border: 2px solid #004d40;
   font-size: 16px;
`

const StyledSelect = styled.select`
   margin: 0px;
   width: 100px;
   height: 30px;
   box-sizing: border-box;
   background: transparent;
   border: 2px solid #004d40;
   font-size: 14px;
`

const StyledFinishButton = styled.button`
   border: 2px solid #004d40;
   background: transparent;
   margin: 0px;
   width: 82px;
   height: 30px;
   font-size: 14px;
   &:hover {
      background: #addfad;
   }
`

type TProps = {
   onShadowAreaClick: Function
   onFinish: (find: TFilter) => void
}

const UserFindPopUp: React.FC<TProps> = ({ onShadowAreaClick, onFinish }) => {
   const [findingKey, seTFilteringKey] = useState("имя")
   const [findingValue, seTFilteringValue] = useState("")
   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedKey = translateKey(e.target.value)
      seTFilteringKey(selectedKey)
   }

   return (
      <StyledShadow onClick={() => onShadowAreaClick()}>
         <StyledContainer>
            <StyledPopUp
               onClick={
                  (e) => e.stopPropagation() /*
                отмена всплытия событий - без отмены, клики по модальному окну
               вызывают функцию  onShadowAreaClick, которая должна вызыться
               только по клику на затемненную область
               */
               }
            >
               <StyledInput placeholder={`укажите значение...`} value={findingValue} onChange={(e) => seTFilteringValue(e.target.value)} />
               <StyledFlexDiv>
                  <StyledFinishButton
                     onClick={() => {
                        const find: TFilter = {}
                        find[findingKey as keyof TFilter] = findingValue
                        onFinish(find)
                     }}
                  >
                     найти
                  </StyledFinishButton>
                  <StyledSelect defaultValue="имя" onChange={handleSelectChange}>
                     {["имя", "фамилия", "отчество", "возраст", "номер", "город", "улица", "пол"].map((name) => (
                        <option key={name} value={name}>
                           {name}
                        </option>
                     ))}
                  </StyledSelect>
               </StyledFlexDiv>
            </StyledPopUp>
         </StyledContainer>
      </StyledShadow>
   )
}

export default UserFindPopUp
