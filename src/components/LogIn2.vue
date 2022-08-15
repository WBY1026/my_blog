<template>
    <span class="most-big-box">
        <span class="main-box">
            <span class="title">
                登录你的账号
            </span>
            <br>
            <span class="input">
                <span class="text">用户名:</span>
                <el-input id="email" type="text" v-model="user.miniAccount" placeholder="请输入用户名"></el-input><br>
                <span class="text">密码:</span>
                <el-input id="password" type="password" v-model="user.miniPassword" placeholder="请输入密码"></el-input><br>
            </span>
            <span class=" button RegisterButton">
                <el-button type="primary" round @click="LogIn">登录    <i class="el-icon-connection"></i></el-button>
            </span>



        </span>
        
        
    </span>
    
    
</template>

<script>
    const AV = require('leancloud-storage');
    // eslint-disable-next-line no-unused-vars
    const { Query, User } = AV;

    AV.init({
    appId: "ryUCG5kRqTaMhC6uxuNhQW5h-gzGzoHsz",
    appKey: "rTSf5Rdibbmh7imw5kgXO87n",
    serverURL: "https://ryucg5kr.lc-cn-n1-shared.com"
    });

	export default {
		name:'LogIn2',
        data() {
			return {
                labelPosition: "top",
                user:{
                    miniAccount:"",
                    miniEmail:"",
                    miniPassword:"",
                    miniPhoneNumber:"",
                }
			}
		},
		methods: {
			LogIn(){
				// eslint-disable-next-line no-unused-vars
				AV.User.logIn(this.user.miniAccount, this.user.miniPassword).then((user) => {
                    console.log('登录成功')
                    this.$store.commit('LogIn',this.user)
                    localStorage.setItem('token',AV.User.current().getSessionToken())
                    this.$router.push('mainpage') 
                    location.reload();

                // eslint-disable-next-line no-unused-vars
                }, (error) => {
                    console.log('登录失败');
                    alert('请检查数据是否正确,多次失败可能导致账号被锁15分钟')
                });
			},
		},
	}
</script>

<style>
    .title {
        font-size: 30px;
        line-height: 70px;
    }
    .input {
        font-size: 20px;
    }
    .text {
        font-family: 'Courier New', Courier, monospace;
        font-size: 40px;
    }.RegLogInisterButton{
        margin-top: 20px;
    }

    .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 20px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
</style>