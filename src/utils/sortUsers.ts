import { ISorts } from "../models/ISorts"
import { IUser } from "../models/IUser"

//функция для сортировки пользователей: передаваемый объект
//sorts имеет вид {fullname: ">", age: ">",...}. В зависимости
//от знака (или строки МЖ ЖМ для пола) сортировка происходит
//от большего к меньшему или наоборот. В случае совпадения
//первого критерия, происходит сортировка по второму.

//приоритет критериев: ФИО, возраст, адрес, пол
//то есть в случае всех заполненных полей sorts,
//сортировка по ФИО происходит в первую очередь,
//а сортировка по полу - в последнюю, и только
//при условии, что пользователи полностью
//совпали по имени, возрасту и адресу

//в случае, если часть полей объекта sorts
//равна null, сортировка по таким полям не
//проводится. Например, если age равен null
//сортировка проводится по такому приоритету:
//fullname address gender
function sortUsers(users: IUser[], sorts: ISorts): IUser[] {
   return users.slice().sort((a, b) => {
      for (let key of Object.keys(sorts) as (keyof ISorts)[]) {
         const sortOrder = sorts[key]
         if (sortOrder !== null) {
            let comparison = 0

            if (key === "fullname") {
               const fullnameA = `${a.firstName} ${a.maidenName} ${a.lastName}`
               const fullnameB = `${b.firstName} ${b.maidenName} ${b.lastName}`
               comparison = fullnameA.localeCompare(fullnameB)
            } else if (key === "age") {
               comparison = a.age - b.age
            } else if (key === "address") {
               const addressA = `${a.address.city} ${a.address.address}`
               const addressB = `${b.address.city} ${b.address.address}`
               comparison = addressA.localeCompare(addressB)
            } else if (key === "gender") {
               if (sortOrder === "male") {
                  comparison = a.gender === "male" ? -1 : 1
                  if (b.gender === "male") {
                     comparison = a.gender === "male" ? 0 : -1
                  } else if (a.gender === "male") {
                     comparison = 1
                  }
               } else if (sortOrder === "female") {
                  comparison = a.gender === "female" ? -1 : 1
                  if (b.gender === "female") {
                     comparison = a.gender === "female" ? 0 : -1
                  } else if (a.gender === "female") {
                     comparison = 1
                  }
               }
            }

            if (comparison !== 0) {
               return sortOrder === ">" ? comparison : -comparison
            }
         }
      }
      return 0
   })
}

export default sortUsers
