import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import=require('./_import_'+process.env.NODE_ENV);
// import Home from '../views/home.vue'
// import about from '../views/about.vue'
//const Home=require('../views/home.vue').default
export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:_import('home')
            //component:Home
            //component:() => import(/* webpackChunkName: "home" */'@/views/home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: _import('about')
            //component: about
            //component: () => import(/* webpackChunkName: "about" */'@/views/about.vue')
        }
    ]
})
