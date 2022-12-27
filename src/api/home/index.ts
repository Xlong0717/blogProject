import request from "@/request/request";
import { AxiosPromise } from 'axios';


// 查询文章列表
export const  getListArticle =  ((data:any)=>{
  return request.post('/api/articleList',data);
})
// 查看文章详情
export const  articleDetail = ((data:any)=>{
  return  request.post('/api/articleDetail',data);
})

// 查询个人详情
export const  personDetail = ((data:any)=>{
  return  request.post('/api/personDetail',data);
})


// 查询文章分类
export const artilsTypes =((data:object)=>{
  return request.post('/api/articleType',data)
})

// 查询分类下的文章

export const artList  =(type:number)=>{
  return request.post('/api/artTypes',{type})
}