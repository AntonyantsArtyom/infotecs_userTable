import TFind from "../models/TFilter"

const translateKey = (key: string): keyof TFind => {
   const translationMap: Record<string, keyof TFind> = {
      имя: "firstName",
      фамилия: "lastName",
      отчество: "maidenName",
      возраст: "age",
      пол: "gender",
      номер: "phone",
      email: "email",
      телефон: "phone",
      рост: "height",
      вес: "weight",
      адрес: "address.address",
      город: "address.city",
      улица: "address.address",
      штат: "address.state",
      страна: "address.country",
   }

   return translationMap[key]
}

export default translateKey
