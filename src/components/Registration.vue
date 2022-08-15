<template>
    <span class="most-big-box">
        <span class="main-box">
            <span class="title">
                注册你的账号
            </span>
            <br>
            <span class="input">
                <span class="text">用户昵称:</span>
                <el-input type="text" v-model="user.miniAccount" placeholder="请输入昵称"></el-input><br>
                <span class="text">邮箱:</span>
                <el-input type="text" v-model="user.miniEmail" placeholder="请输入邮箱"></el-input><br>
                <span class="text">密码:</span>
                <el-input type="text" v-model="user.miniPassword" placeholder="请输入密码"></el-input><br>
                <span class="text">电话:</span>
                <el-input type="text" v-model="user.miniPhoneNumber" placeholder="请输入电话"></el-input><br>
            </span>
            <span class=" button RegisterButton">
                <el-button type="primary" round @click="Register">注册    <i class="el-icon-connection"></i></el-button>
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
		// eslint-disable-next-line vue/multi-word-component-names
		name:'Registration',
		data() {
			return {
                user:{
                    miniAccount:"",
                    miniEmail:"",
                    miniPassword:"",
                    miniPhoneNumber:"",
                }
			}
		},
		methods: {
			Register(){
                // 创建实例
                const user = new AV.User();

                // 等同于 user.set('username', 'Tom')
                user.setUsername(this.user.miniAccount);
                user.setPassword(this.user.miniPassword);

                // 可选
                user.setEmail(this.user.miniEmail);
                user.setMobilePhoneNumber('+86'+this.user.miniPhoneNumber);
                // user.setMobilePhoneNumber('+8618200008888');

                // 设置其他属性的方法跟 AV.Object 一样
                user.set('gender', 'secret');

                user.signUp().then((user) => {
                    this.$store.commit('Register',this.user)
                    console.log(`注册成功。objectId:${user.id}`);
                    alert('注册成功,自动登录')
                    this.$router.push('login') 
                    location.reload();
                // eslint-disable-next-line no-unused-vars
                }, (error) => {
                    console.log('注册失败');
                    alert('注册失败,您的相关数据已经使用过,或格式不正确,请检查格式')
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
        font-size: 20px;
    }
    .RegisterButton {
        margin-top: 20px;
    }
</style>