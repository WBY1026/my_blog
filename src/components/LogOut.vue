<template>
    <div>
        <el-menu-item index="4" @click="LogOut">
            <i class="el-icon-error"></i>
            <span slot="title">登出</span>
        </el-menu-item>
    </div>
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
		name:'LogOut',
		data() {
			return {
                
			}
		},
		methods: {
			LogOut(){
                AV.User.logOut();
                const currentUser = AV.User.current();
                if (currentUser) {
                    // 保存token
                    localStorage.setItem('token',AV.User.current().getSessionToken())
                } else {
                    // 删除token
                    localStorage.removeItem('token')
                    console.log('已登出');
                    this.$router.push('login') 
                    location.reload();
                    
                }
			},
		},
	}
</script>