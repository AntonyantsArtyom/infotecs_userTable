//кастомный хук для испльзования Intersection observer API
//принимает ref элемента для наблюдения, функцию-callback
//и deps для useEffect'а, который используется в хуке

import { RefObject, useEffect } from "react"

const useIntersectionObserver = (ref: RefObject<HTMLElement>, callback: Function, deps: [any]) => {
   let options = {
      rootMargin: "0px",
      threshold: 1.0,
   }

   //Intersection observer API вызывает callback и при появлении
   //элемента в зоне видимости, и при исчезновении из зоны видимости.
   //useIntersectionObserver вызывает функцию-callback только при
   //появлении элемента
   const intersectionCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting /*равно true если  элемент появился, false - если исчез*/) {
         callback()
      }
   }

   useEffect(() => {
      if (ref.current == null) return
      new IntersectionObserver(intersectionCallback, options).observe(ref.current)
   }, deps)
}

export default useIntersectionObserver
