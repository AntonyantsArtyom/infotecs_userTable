//часть полей от сервера проигнорированны - ни в таблице, ни в модальном окне нет
//мест отображения цвета волос, ip-адреса, места работы и так далее... поэтому
//в интерфейсе они не указаны. С указанием всех неиспользуемых полей интерфейс
//занимает более 70 строк, большая часть которых не используется ни в одном
//месте проекта

export interface IUser {
   id: number
   firstName: string
   lastName: string
   maidenName: string
   age: number
   gender: string
   email: string
   phone: string
   height: number
   weight: number
   address: {
      address: string
      city: string
      state: string
      country: string
   }
}
