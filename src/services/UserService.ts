import { IUser } from "../models/IUser"
import $api from "../http"
import TFilter from "../models/TFilter"

export default class UserService {
   static async getUsers(skip: number, limit: number, filter: TFilter | null): Promise<IUser[]> {
      return $api
         .fetch(
            filter == null
               ? `users?limit=${limit}&skip=${skip}`
               : `user/filter?key=${Object.keys(filter)[0]}&value=${Object.values(filter)[0]}&limit=${limit}&skip=${skip}`
         )
         .then((res) => res.json())
         .then((res) => res.users)
   }
}
