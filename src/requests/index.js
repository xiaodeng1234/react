import axios from 'axios'
const isdev=process.env.NODE_ENV==='development'
const ajax = axios.create({
    baseURL:isdev? 'http://rap2api.taobao.org/app/mock/124759':''
})
export const postArticleList =()=>{
    return ajax.post('/api/article/list');
}
export const postArticleTrDelete=(id)=>{
    return ajax.post(`/api/article/list/delete/${id}`)
}