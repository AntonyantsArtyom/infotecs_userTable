const API_URL = "https://dummyjson.com/"

const $api = {
   //$api.fetch - подставляет базовый URL к запросам обычного fetch
   //пример: $api.fetch("users") вместо fetch("https://dummyjson.com/")
   //так быстрее менять базовый URL при необходимости - достаточно изменить API_URL
   fetch: async (url: string, options: RequestInit | undefined = undefined) => {
      try {
         const res = await fetch(`${API_URL}${url}`, options)
         if (!res.ok) {
            throw new Error(res.statusText)
         }
         return res
      } catch (error) {
         throw new Error("ошибка соединения или неправильный url")
      }
   },
}

export default $api
