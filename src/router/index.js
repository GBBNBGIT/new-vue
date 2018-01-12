import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import view1 from '@/components/view1'
import view2 from '@/components/view2'

Vue.use(Router)

export default new Router({
  routes: [
    {name:'root',path:'/',redirect:''},
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/view1',
      name: 'view1',
      component: view1
    },
    {
      path: '/view2',
      name: 'view2',
      component: view2
    }
  ]
})
