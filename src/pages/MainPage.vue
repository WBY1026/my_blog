<template>
	<div class="col-xs-offset-2 col-xs-8">
		
		<el-container>
			<el-header>
                <div class="top">
                    <span class="tab">欢迎使用个人博客页面</span>
                   <span class="welcome">欢迎回来:{{userName}}</span> 
                </div>
   
            </el-header>
			<el-container>
				<el-aside width="200px" class="x">
                    <!--  -->
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="NewBlog">
                            <i class="el-icon-edit"></i>
                            <span slot="title">发帖子</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="AllBlog">
                            <i class="el-icon-document"></i>
                            <span slot="title">浏览全部帖子</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="MyBlog">
                            <i class="el-icon-user"></i>
                            <span slot="title">浏览我的帖子</span>
                        </el-menu-item>
                        <LogOut></LogOut>
                        <el-menu-item style="height: 675px;" disabled>
                        </el-menu-item>
                    </el-menu>
                    <!--  -->
                </el-aside>
				<el-container>
                    <el-main>
                        <MyBlog v-if="myblog"></MyBlog>
                        <AllBlog v-if="allblog"></AllBlog>
                        <NewBlog v-if="newblog"></NewBlog>
                    </el-main>
                    <el-footer>
                        <div class="bottom">由温博洋制作</div>
                    </el-footer>
				</el-container>   
			</el-container>
		</el-container>
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

import LogOut from '@/components/LogOut.vue'
import MyBlog from './MyBlog.vue';
import AllBlog from './AllBlog.vue';
import NewBlog from './NewBlog.vue';
	export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "MainPage",
    data() {
		return { 
			newblog: false ,
			allblog: true ,
            myblog: false,
            userName: ""
		}
	},
    methods: {
        NewBlog() {
            // this.$router.push({
            //     name: "NewBlog",
            // });
            this.newblog = true
            this.allblog = false
            this.myblog = false
        },
        AllBlog() {
            // this.$router.push({
            //     name: "AllBlog",
            // });
            this.newblog = false
            this.allblog = true
            this.myblog = false
            
        },
        MyBlog() {
            // this.$router.push({
            //     name: "MyBlog",
            // });
            this.newblog = false
            this.allblog = false
            this.myblog = true
        },
    },
    components: { LogOut, MyBlog, AllBlog, NewBlog },
    mounted(){
        this.userName = AV.User.current().get('username')
    }
}
</script>

<style>
    .button {
        float: left;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
    .top {
        color: aliceblue;
    }
    .welcome {
        float: right;
        margin-right: 100px;
    }
    .tab {
        float: left;
        margin-right: 100px;
    }
    .bottom {
        float: right;
        margin-right: 100px;
    }
    * {
        margin: 0;
        padding: 0;
    }
</style>