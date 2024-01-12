import { createRouter, createWebHistory } from 'vue-router'
//createrouter用于创建路由器实例
export default createRouter({
    //路由的模式是history 
    history: createWebHistory(),
    //管理路由 
    routes: [
        {
            path: '/home',
            component: () => import('@/view/home/home.vue'),
        },
        {
            path: '/hostpital',
            component: () => import('@/view/hostpital/hostpital.vue'),
            children:[
                {
                    path:'register',
                    component:()=>import('@/view/hostpital/register.vue')
                },
                {
                    path:'register',
                    component:()=>import('@/view/hostpital/register.vue')
                },
                {
                    path:'register',
                    component:()=>import('@/view/hostpital/register.vue')
                },
                {
                    path:'register',
                    component:()=>import('@/view/hostpital/register.vue')
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    //设置滚动行为控制滚动条的位置
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
    }
})