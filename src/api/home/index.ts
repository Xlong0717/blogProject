import request from "@/request/request";

// 查询文章列表
export const  getListArticle =  ((data:any)=>{
  return request.post('/api/articleList',data);
})