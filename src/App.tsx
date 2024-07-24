import { observer } from "mobx-react-lite"
import store from "./store/store"
import { useEffect, useState } from "react"
import UserTable from "./components/UserTable"
import { createGlobalStyle } from "styled-components"
import UserInfoPopUp from "./components/UserInfoPopUp"
import { IUser } from "./models/IUser"
import UserTableControlPanel from "./components/UserTableControlPanel"
import UserSortPopUp from "./components/UserSortPopUp"
import { ISorts } from "./models/ISorts"
import UserFindPopUp from "./components/UserFindPopUp"
import Loading from "./components/Loading"
import Error from "./components/Error"

//для стилизации использована библиотека styled-components
//В отличие от css/scss, styled-components позволяют проще
//описывать стилизацию, которая динамически изменяется
const GlobalStyle = createGlobalStyle`
  body {
    color: #333;
    background-color: #f5f5f5; 
    font-family: Arial, sans-serif; 
    line-height: 1.6; 
    padding: 0px;
    text-align: center;
  }
`

function App() {
   const [userToShow, setUserToShow] = useState<IUser | null>(null)
   const [showSortPopUp, setShowSortPopUp] = useState<boolean>(false)
   const [showFindPopUp, setShowFindPopUp] = useState<boolean>(false)
   const [sorts, setSorts] = useState<ISorts>({ fullname: null, address: null, age: null, gender: null })
   useEffect(() => {
      store.fillUserList(true)
   }, [])

   return (
      <>
         <UserTable
            users={store.users}
            sorts={sorts}
            onEndOfUsers={
               store.fillUserList.bind(store) /*
            функция, передаваемая в onEndOfUsers вызывается
            в UserTable с помощью Intersection observer API,
            который теряет ее this, если не задать его
            */
            }
            onUserClick={(user) => setUserToShow(user)}
         />
         {!!userToShow && <UserInfoPopUp onShadowAreaClick={() => setUserToShow(null)} user={userToShow} />}
         {!!store.isLoading && <Loading />}
         {!!store.isError && <Error />}
         {!!showSortPopUp && (
            <UserSortPopUp
               sorts={sorts}
               onShadowAreaClick={() => setShowSortPopUp(false)}
               onFinish={(sorts) => {
                  setSorts(sorts)
                  setShowSortPopUp(false)
               }}
            />
         )}
         {!!showFindPopUp && (
            <UserFindPopUp
               onShadowAreaClick={() => setShowFindPopUp(false)}
               onFinish={(filter) => {
                  setShowFindPopUp(false)
                  store.setFilter(filter)
               }}
            />
         )}
         <UserTableControlPanel
            filter={store.filter}
            onSortButtonClick={() => setShowSortPopUp(true)}
            onFindButtonClick={() => setShowFindPopUp(true)}
            onResetFilterButtonClick={() => store.setFilter(null)}
         />
         <GlobalStyle />
      </>
   )
}

export default observer(App)
