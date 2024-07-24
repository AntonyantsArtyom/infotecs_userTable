import styled from "styled-components"
import sortIcon from "../assets/sort.png"
import findIcon from "../assets/find.png"
import TFilter from "../models/TFilter"

const StyledContainer = styled.div`
   width: 100%;
   max-width: 1200px;
   margin: auto;
   display: flex;
   justify-content: start;
   gap: 5px;
`

const StyledButon = styled.button`
   width: 35px;
   height: 35px;
   border: 2px solid #004d40;
   position: relative;
   top: -1px;
   background: transparent;
   display: grid;
   place-content: center;
   cursor: pointer;
   &:hover {
      background: #addfad;
   }
`

const StyledLongButon = styled.button`
   width: 72px;
   height: 35px;
   border: 2px solid #004d40;
   position: relative;
   top: -1px;
   background: transparent;
   display: grid;
   place-content: center;
   text-align: left;
   cursor: pointer;
   &:hover {
      background: #addfad;
   }
`

type TProps = {
   onSortButtonClick: Function
   onFindButtonClick: Function
   onResetFilterButtonClick: Function
   filter: TFilter | null
}

const UserTableControlPanel: React.FC<TProps> = ({ onSortButtonClick, onFindButtonClick, filter, onResetFilterButtonClick }) => {
   return (
      <StyledContainer>
         <StyledButon onClick={() => onSortButtonClick()}>
            <img style={{ width: "30px", height: "30px" }} src={sortIcon} />
         </StyledButon>
         {filter == null ? (
            <StyledButon onClick={() => onFindButtonClick()}>
               <img style={{ width: "21px", height: "21px" }} src={findIcon} />
            </StyledButon>
         ) : (
            <StyledLongButon onClick={() => onResetFilterButtonClick()}>сбросить фильтр</StyledLongButon>
         )}
      </StyledContainer>
   )
}

export default UserTableControlPanel
