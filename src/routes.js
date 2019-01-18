import {
  Dashboard,
  ArticleList,
  ArticleEdit
} from './pages'

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isMenu: true,
    exact: false
  },
  {
    path: '/article/list',
    component: ArticleList,
    title: '二手书列表',
    isMenu: true,
    exact: false
  },
  {
    path: '/article/edit/:id',
    component: ArticleEdit,
    title: '文章列表',
    isMenu: false,
    exact: false
  }
]

export default routes