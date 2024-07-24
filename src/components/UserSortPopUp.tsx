import styled from "styled-components"
import arrowIcon from "../assets/arrow.png"
import crossIcon from "../assets/cross.png"
import { useState } from "react"
import { ISorts } from "../models/ISorts"
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
   height: 299px;
   margin-right: auto;
   margin-top: 158px;
   @media (max-width: 1200px) {
      margin-left: 8px;
   }
`

const StyledArrowImage = styled.img<{ direction: "up" | "down" }>`
   width: 20px;
   height: 20px;
   background: transparent;
   transform: rotate(${(props) => (props.direction == "up" ? "0deg" : "90deg")});
`

const StyledCrossImage = styled.img`
   width: 10px;
   height: 10px;
   background: transparent;
`

const StyledText = styled.p`
   font-size: 16px;
   width: 80px;
   text-align: start;
`

const StyledButton = styled.button<{ selected: true | false }>`
   border: 2px solid #004d40;
   background: ${(props) => (props.selected ? "#addfad" : "transparent")};
   display: grid;
   place-content: center;
   height: 30px;
   width: 30px;
   &:hover {
      background: #addfad;
   }
`
const StyledFinishButton = styled.button`
   border: 2px solid #004d40;
   background: transparent;
   margin-top: 20px;
   width: 130px;
   height: 30px;
   &:hover {
      background: #addfad;
   }
`

const StyledFlexDiv = styled.div`
   padding-left: 5px;
   display: flex;
   justify-content: start;
   align-items: center;
   gap: 5px;
`

type TProps = {
   onShadowAreaClick: Function
   onFinish: (sorts: ISorts) => void
   sorts: ISorts
}

const UserSortPopUp: React.FC<TProps> = ({ onShadowAreaClick, onFinish, sorts }) => {
   const [fullnameSort, setFullnameSort] = useState<">" | "<" | null>(sorts.fullname)
   const [ageSort, setAgeSort] = useState<">" | "<" | null>(sorts.age)
   const [addressSort, setAddressSort] = useState<">" | "<" | null>(sorts.address)
   const [genderSort, setGenderSort] = useState<"male" | "female" | null>(sorts.gender)

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
               {[
                  { name: "ФИО", sort: fullnameSort, setSort: setFullnameSort },
                  { name: "возраст", sort: ageSort, setSort: setAgeSort },
                  { name: "адрес", sort: addressSort, setSort: setAddressSort },
               ].map(({ name, sort, setSort }) => (
                  <StyledFlexDiv key={name}>
                     <StyledText>{name}</StyledText>
                     <StyledButton selected={sort == ">"} onClick={() => setSort(">")}>
                        <StyledArrowImage direction="up" src={arrowIcon} />
                     </StyledButton>
                     <StyledButton selected={sort == "<"} onClick={() => setSort("<")}>
                        <StyledArrowImage direction="down" src={arrowIcon} />
                     </StyledButton>
                     <StyledButton selected={sort == null} onClick={() => setSort(null)}>
                        <StyledCrossImage src={crossIcon} />
                     </StyledButton>
                  </StyledFlexDiv>
               ))}
               <StyledFlexDiv>
                  <StyledText>пол</StyledText>
                  <StyledButton selected={genderSort == "male"} onClick={() => setGenderSort("male")}>
                     МЖ
                  </StyledButton>
                  <StyledButton selected={genderSort == "female"} onClick={() => setGenderSort("female")}>
                     ЖМ
                  </StyledButton>
                  <StyledButton selected={genderSort == null} onClick={() => setGenderSort(null)}>
                     <StyledCrossImage src={crossIcon} />
                  </StyledButton>
               </StyledFlexDiv>
               <StyledFinishButton onClick={() => onFinish({ fullname: fullnameSort, age: ageSort, address: addressSort, gender: genderSort })}>
                  сортировать
               </StyledFinishButton>
            </StyledPopUp>
         </StyledContainer>
      </StyledShadow>
   )
}

export default UserSortPopUp
