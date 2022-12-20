// 日期处理
// 装换为 yyyy--mm --dd ;
export const getNewDay = (day:string)=>{
        if(day){
          return `${day.substring(0,4)}-${day.substring(4,6)}-${day.substring(6,8)}`
        }
}
