import styled from "styled-components"
import { IUser } from "../models/IUser"

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
   width: 350px;
   height: 198px;
   margin-left: auto;
   margin-top: 8px;
   @media (max-width: 1200px) {
      margin-right: 8px;
   }
`
const StyledHeadText = styled.h2`
   text-align: left;
   margin: 5px;
   margin-left: 10px;
   font-size: 24px;
`

const StyledText = styled.p`
   text-align: left;
   margin: 5px;
   margin-left: 10px;
   font-size: 16px;
`

const StyledFlexDiv = styled.div`
   display: flex;
`

type TProps = {
   user: IUser
   onShadowAreaClick: Function
}

const UserInfoPopUp: React.FC<TProps> = ({ user, onShadowAreaClick }) => {
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
               <StyledHeadText>{`${user.firstName} ${user.maidenName} ${user.lastName}`}</StyledHeadText>
               <StyledText>{`${user.address.city} ${user.address.address}`}</StyledText>
               <StyledFlexDiv>
                  <StyledText>возраст: {user.age}</StyledText>
                  <StyledText>рост: {user.height}</StyledText>
                  <StyledText>вес: {user.weight}</StyledText>
               </StyledFlexDiv>
               <StyledText>{user.phone}</StyledText>
               <StyledText>{user.email}</StyledText>
            </StyledPopUp>
         </StyledContainer>
      </StyledShadow>
   )
}

export default UserInfoPopUp
