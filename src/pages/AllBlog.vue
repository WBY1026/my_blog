<template>
    <div>
        <div v-if="show1" >
            
            <el-table
            @row-click="Detail"
            :data="blogs.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100% ; height: 720px;"
            >
                <el-table-column
                    prop="attributes.title"
                    label="标题"
                    width="300"
                    class="allblog"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="attributes.text"
                    label="正文"
                    width="500"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="attributes.userName"
                    label="发布者"
                    width="300"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="block" style="margin-top:15px;">
                <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="currentPage" 
                :page-sizes="[1,5,10]" 
                :page-size="pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="blogs.length">
                </el-pagination>
            </div>
        </div>

        <!--  -->
        <div v-if="show2">
        <el-card class="box-card">
            <div class="title">
                {{this.title}}
            </div>
        </el-card>
        <el-card class="box-card">
            <div class="uesrName">
                作者:{{this.userName}}
            </div>
        </el-card>
        <el-card class="box-card">
            <div class="text">
                {{this.text}}
            </div>
        </el-card>
            <el-button type="info" round @click="Back" class="return">返回</el-button>
        </div>
        
        
        
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
		name:'AllBlog',
        data() {
			return {
                show1: true,
                show2: false,
                blogs:[],
                title:"",
                text:"",
                userName:"",
                currentPage: 1, // 当前页码
                total: 100, // 总条数
                pageSize: 10 // 每页的数据条数
			}
		},
		methods: {
            Detail(row, column, event){
                console.log(row.id);
                console.log(column);
                console.log(event);
                localStorage.setItem("BlogId", row.id);
                console.log(row);
                console.log(row.id);
                const query = new AV.Query('Todo');
                query.get(localStorage.getItem('BlogId')).then((todo) => {
                this.title = todo.get('title');
                this.text = todo.get('text');
                this.userName = todo.get('userName');
                });
                this.show1 = false
                this.show2 = true
            },
            Back(){
                this.show1 = true
                this.show2 = false
			}, 
            //每页条数改变时触发 选择一页显示多少行
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            }
		},
        mounted() {
            const query = new AV.Query('Todo');
            query.notEqualTo('title', '');
            query.descending('createdAt'); // 时间降序
            query.find().then((todo) => {
                // todo 是包含满足条件的 Tudo 对象的数组
                // console.log(todo);
                this.blogs = todo
            });
        },
	}
</script>

<style>
    .allblog {
        margin-left: 50px;
    }
    .title {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 25px;
    }
    .userName {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 20px;
    }
    .text {
        font-family: Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 100%;
        margin-top: 10px;
    }
    .return {
        margin-top: 20px;
    }
</style>