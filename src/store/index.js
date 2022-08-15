//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
	
// 初始化LeanCloud
	const AV = require('leancloud-storage');
    // eslint-disable-next-line no-unused-vars
    const { Query, User } = AV;

    AV.init({
    appId: "ryUCG5kRqTaMhC6uxuNhQW5h-gzGzoHsz",
    appKey: "rTSf5Rdibbmh7imw5kgXO87n",
    serverURL: "https://ryucg5kr.lc-cn-n1-shared.com"
    });

// 检测登录
	const currentUser = AV.User.current();
	if (currentUser) {
		// 保存token
		localStorage.setItem('token',AV.User.current().getSessionToken())
	} else {
		// 
	}

//准备actions——用于响应组件中的动作
const actions = {
	// 注册
	Register(context,value){
		context.commit('Register',value)
	},
	// 登录
	LogIn(context,value){
		context.commit('LogIn',value)
	},
}
//准备mutations——用于操作数据（state）
const mutations = {
	// 注册
	Register(context,value){
		// 保存数据
		state.account = value.miniAccount
		state.email = value.miniEmail
		state.password = value.miniPassword
		state.phoneNumber = value.miniPhoneNumber

		// // 创建实例
		// const user = new AV.User();

		// // 等同于 user.set('username', 'Tom')
		// user.setUsername(state.account);
		// user.setPassword(state.password);

		// // 可选
		// user.setEmail(state.email);
		// user.setMobilePhoneNumber('+86'+state.phoneNumber);
		// // user.setMobilePhoneNumber('+8618200008888');

		// // 设置其他属性的方法跟 AV.Object 一样
		// user.set('gender', 'secret');

		// user.signUp().then((user) => {
		// 	// 注册成功
		// 	console.log(`注册成功 objectId:${user.id}`);
		// // eslint-disable-next-line no-unused-vars
		// }, (error) => {
		// 	// 注册失败（通常是因为用户名已被使用）
		// 	console.log('注册失败');
		// });
	},
	// 登录
	LogIn(context,value){
		state.nowAccount = value.miniAccount
		state.nowEmail = value.miniEmail
		state.nowPassword = value.miniPassword
		state.nowPhoneNumber = value.miniPhoneNumber

		// // eslint-disable-next-line no-unused-vars
		// AV.User.loginWithEmail(state.nowEmail, state.nowPassword).then((user) => {
		// 	// 登录成功
		// 	console.log('登录成功'); 
		// 	localStorage.setItem('token',AV.User.current().getSessionToken())
		// 	// 跳转到主页
		// 	// 
		// 	// 
		// 	this.$router.push('/homepage')
		// // eslint-disable-next-line no-unused-vars
		// }, (error) => {
		// 	// 登录失败（可能是密码错误）
		// 	console.log('登录失败');
		// 	localStorage.removeItem('token')
		// });
	},
}
//准备state——用于存储数据
const state = {
	
	account:"", 	//用户注册账号
	password:"", 	//用户注册密码
	email:"" ,		//用户注册邮箱
	phoneNumber:"" ,//用户注册电话

	nowAccount:"", 	//用户登录账号
	nowPassword:"",	//用户登录密码
	nowEmail:"",	//用户登录邮箱
	nowPhoneNumber:"",//用户登录电话

	
	
}
//准备getters——用于将state中的数据进行加工
const getters = {
	
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})