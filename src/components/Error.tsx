import styled from "styled-components"
import errorIcon from "../assets/error.png"

const StyledShadow = styled.div`
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   z-index: 2;
`
const StyledImage = styled.img`
   position: absolute;
   width: 100px;
   height: 100px;
   left: 50%;
   top: 150px;
   transform: translateX(-50%);
`

const StyledText = styled.p`
   display: block;
   color: #fff;
   position: absolute;
   width: 250px;
   left: 50%;
   top: 250px;
   transform: translateX(-50%);
`

const Error: React.FC = () => {
   return (
      <StyledShadow>
         <StyledImage src={errorIcon} />
         <StyledText>что-то пошло не так: проверьте подключение к интернету и перезагрузите страницу</StyledText>
      </StyledShadow>
   )
}

export default Error
