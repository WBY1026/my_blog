<template>
    <div>

        <el-form label-width="80px" style="height: 800px;">
            <el-form-item label="标题">
                <el-input type="textarea" v-model="WriteBlog.title"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <el-input type="textarea" v-model="WriteBlog.text" :rows="10"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="NewBlog">立即创建</el-button>
                <el-button @click="Clear">清空</el-button>
            </el-form-item>
        </el-form>
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
		name:'NewBlog',
        data() {
			return {
                WriteBlog:{
                    title:"",
                    text:""
                }
			}
		},
		methods: {
			NewBlog(){
                // 声明 class
                const Todo = AV.Object.extend('Todo');

                // 构建对象
                const todo = new Todo();

                // 为属性赋值
                todo.set('title', this.WriteBlog.title);
                todo.set('text', this.WriteBlog.text);
                todo.set('userName', AV.User.current().get('username'));
                

                // 将对象保存到云端
                todo.save().then((todo) => {
                    // 成功保存之后，执行其他逻辑
                    console.log(`保存成功。objectId:${todo.id}`);
                    location.reload();
                // eslint-disable-next-line no-unused-vars
                }, (error) => {
                    // 异常处理
                    console.log("异常处理");
                });
            },
            Clear(){
                this.WriteBlog.title = ""
                this.WriteBlog.text = ""
            }
		},
	}
</script>