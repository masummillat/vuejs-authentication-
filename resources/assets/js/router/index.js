import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Account from '../components/Account.vue';
import Login from '../components/Login.vue';
import  store from '../store/index.js';

const ifNotAuthenticated = (to, from , next)=>{
    if(!store.getters.isAuthenticated){
        next();
        return
    }
    next('/');
}

const ifAuthenticated = (to, from, next)=>{
    if(store.getters.isAuthenticated){
        next();
        return
    }
    next('/login');
}


let routes =[
    {
        path:'/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/account',
        name:'Account',
        component: Account,
        beforeEnter: ifAuthenticated
    },
    {
        path:'/login',
        name:'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },

]

export default new VueRouter({
    routes,
    mode:'history'
})