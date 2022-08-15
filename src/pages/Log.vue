<template>
  <div>
    <div class="home">
        <div class="main-box" id="area">
            <span class="left-box">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="LogIn">
                            <i class="el-icon-message"></i>
                            <span slot="title">邮箱登录</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="LogIn2">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">用户名登录</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="LogIn3">
                            <i class="el-icon-phone"></i>
                            <span slot="title">手机号登录</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="Registration">
                            <i class="el-icon-s-promotion"></i>
                            <span slot="title">注册</span>
                        </el-menu-item>
                </el-menu>
            </span>
            <span class="right-box">
                <!-- 指定组件的呈现位置 -->
                <router-view class="view"></router-view>
            </span>
        </div>
    </div>
    
  </div>
</template>

<script>


	export default {
		// eslint-disable-next-line vue/multi-word-component-names
		name:'Log',
		methods: {
            LogIn(){
				this.$router.push({
					name:'LogIn',
				})
			},
            LogIn2(){
				this.$router.push({
					name:'LogIn2',
				})
			},
            LogIn3(){
				this.$router.push({
					name:'LogIn3',
				})
			},
			Registration(){
				this.$router.push({
					name:'Registration',
				})
			},
		},
        mounted(){
            this.$router.push('mainpage')
        }
	}
</script>

<style>
    .main-box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        height: 500px;
        margin-left: -25%;
        margin-top: -250px;
        
    }
    .left-box {
        position: absolute;
        width: 20%;
        height: 500px;
        left: 0px;
        background-color: #E4E7ED
;
    }
    .right-box {
        position: absolute;
        width: 80%;
        height: 500px;
        right: 0px;
        background-color: #E4E7ED
;
    }
    .button {
        float: left;
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
    }
    * {
        margin: 0;
        padding: 0;
    }
</style>