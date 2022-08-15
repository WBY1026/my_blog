// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件

// 登录部分

import Log from '../pages/Log'
import LogIn from '../components/LogIn'
import LogIn2 from '../components/LogIn2'
import LogIn3 from '../components/LogIn3'
import Registration from '../components/Registration'

import MainPage from '../pages/MainPage'

import NewBlog from '../pages/NewBlog'
import AllBlog from '../pages/AllBlog'
import MyBlog from '../pages/MyBlog'

// 解决重复点击相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



//创建并暴露一个路由器
const router = new VueRouter({
	routes:[
		{
			name:'Log',
			path:'/log',
			component:Log
		},
		{
			name:'LogIn2',
			path:'/login2',
			component:LogIn2
		},
		{
			name:'LogIn3',
			path:'/login3',
			component:LogIn3
		},
		{
			name:'LogIn',
			path:'/login',
			component:LogIn
		},
		{
			name:'Registration',
			path:'/registration',
			component:Registration
		},
		{
			name:'MainPage',
			path:'/mainpage',
			component:MainPage
		},
		{
			name:'NewBlog',
			path:'/newblog',
			component:NewBlog
		},
		{
			name:'AllBlog',
			path:'/allblog',
			component:AllBlog
		},
		{
			name:'MyBlog',
			path:'/myblog',
			component:MyBlog
		},
	]
})

// 全局前置路由守卫
router.beforeEach((to,from,next)=>{
	console.log('守卫中');
	if(to.path === '/login' || to.path === '/login2' || to.path === '/login3' || to.path === '/registration' || to.path === '/'){
		next()
	}else{
		if(localStorage.getItem('token')){
			next()
		}else{
			// alert('请先登录')
		}
	}
	
})

export default router
