import styled, { keyframes } from "styled-components"

const StyledShadow = styled.div`
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   z-index: 2;
`

const rotation = keyframes`
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
`

const StypedScroll = styled.span`
   width: 48px;
   height: 48px;
   border: 5px solid #fff;
   border-bottom-color: transparent;
   border-radius: 50%;
   display: inline-block;
   box-sizing: border-box;
   animation: ${rotation} 1s linear infinite;
   position: absolute;
   left: 50%;
   top: 200px;
   transform: translateX(-50%);
`

const Loading: React.FC = () => {
   return (
      <StyledShadow>
         <StypedScroll />
      </StyledShadow>
   )
}

export default Loading
