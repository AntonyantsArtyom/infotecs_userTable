import { IUser } from "../models/IUser"
import { makeAutoObservable, runInAction } from "mobx"
import UserService from "../services/UserService"
import TFilter from "../models/TFilter"

//в качестве state-менеджера выбран MobX, работа с
//ним гораздо удобнее, чем c React Context API и в
//задании нет запрета на использование подобных библиотек.
//Выбор пал на него, так как опыта работы с ним больше, чем
//с другими библиотеками хранения состояния

class Store {
   limit = 15
   skip = 0
   wasEnd = false
   users = [] as IUser[]
   filter: TFilter | null = null
   isLoading: boolean = false
   isError: boolean = false
   constructor() {
      makeAutoObservable(this)
   }
   //store.fillUserList добавляет в массив пользователей
   //новых пользователей полученных от сервера
   async fillUserList(isInitialFill: boolean | undefined = false) {
      //индикатор загрузки показывается только при
      //начальной загрузке списка пользователей
      //если показывать его при каждой загрузке
      //новой части пользователей - на экране
      //он будет появляться слишком часто при
      //указанном лимите в 15 пользователей
      if (isInitialFill == true) {
         runInAction(() => (this.isLoading = true))
      }

      //в случае, если это не первое заполнение массива значение skip
      //увеличивается на limit - так в список будут загружаться новые
      //пользователи без повторений
      if (isInitialFill == false) {
         this.skip += this.limit
      }

      //если на сервере не осталось пользователей
      //больше запрашивать их не нужно
      if (this.wasEnd) return
      let newPart: IUser[] = []
      try {
         newPart = await UserService.getUsers(this.skip, this.limit, this.filter)
      } catch (error) {
         runInAction(() => {
            this.isError = true
            this.isLoading = false
         })
      }

      if (newPart.length == 0) this.wasEnd = true

      runInAction(() => (this.users = [...this.users, ...newPart]))
      runInAction(() => (this.isLoading = false))
   }
   //при вводе фильтра список пользователей и skip сбрасываются
   //на начальные значения и заполнение списка начинается вновь
   async setFilter(filter: TFilter | null) {
      this.users = []
      this.skip = 0
      this.filter = filter
      this.fillUserList(true)
   }
}

export default new Store()
