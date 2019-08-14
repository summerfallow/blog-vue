import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import List from '@/components/List'
import Detail from '@/components/Detail'
import Tags from '@/components/Tags'
import TagsList from '@/components/TagsList'
import Archives from '@/components/Archives'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/admin',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/tags/:name',
      name: 'TagsList',
      component: TagsList
    },
    {
      path: '/archives',
      name: 'Archives',
      component: Archives
    }
  ]
})
