import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '@/views/category'
import CategoryList from '@/views/categorylist'
import product from '@/views/product'
import buycart from '@/views/buycart'
import brandlist from '@/views/brandlist'
import mymessage from '@/views/mymessage'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/categoryList/:id',
        name: 'categoryList',
        component: CategoryList,
        props: true
    },
    {
        path: '/product/:id',
        name: 'product',
        component: product,
        props: true
    },
    {
        path: '/buycart',
        name: 'buycart',
        component: buycart,
    },
    {
        path: '/brandlist',
        name: 'brandlist',
        component: brandlist,
    },
    {
        path: '/mymessage',
        name: 'mymessage',
        component: mymessage,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router