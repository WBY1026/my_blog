<template>
    <div>
        <div v-if="show1">
            <el-alert
                title="频繁的操作可能导致数据刷新不及时,手动刷新即可"
                type="warning">
            </el-alert>
            <el-table
            :data="blogs.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100% ; height: 600px;"
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
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="Revise(scope.row.id)">编辑</el-button>
                    </template>
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
        <div v-if="show2">
            
            <el-form label-width="80px" style="height: 800px;">
                <el-form-item label="标题">
                    <el-input type="textarea" v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                    <el-input type="textarea" v-model="text" :rows="10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="SureRevise">修改</el-button>
                    <el-button type="info" plain @click="UnRevise">取消修改</el-button>
                    <el-button type="danger" @click="Delete">删除</el-button>
                </el-form-item>
            </el-form>
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
    name: "AllBlog",
    data() {
        return {
            show1: true,
            show2: false,
            blogs: [],
            title:"",
            text:"",
            currentPage: 1, // 当前页码
            total: 100, // 总条数
            pageSize: 10 // 每页的数据条数
        };
    },
    methods: {
        Revise(id) {
            // 获取Id
            localStorage.setItem("BlogId", id);
            console.log(id);
            // 根据id获取信息
            const query = new AV.Query('Todo');
            query.get(localStorage.getItem('BlogId')).then((todo) => {
            this.title = todo.get('title');
            this.text = todo.get('text');
            });
            this.show1 = false
            this.show2 = true
        },
        SureRevise(){
            // 上传修改信息
            const todo = AV.Object.createWithoutData('Todo', localStorage.getItem('BlogId'));
            todo.set('title', this.title);
            todo.set('text', this.text);
            todo.save();
            // 刷新数据
            const query = new AV.Query("Todo");
            query.equalTo("userName", AV.User.current().get("username"));
            query.descending("createdAt"); // 时间降序
            query.find().then((todo) => {
                // todo 是包含满足条件的 Tudo 对象的数组
                console.log(todo);
                this.blogs = todo;
            });

            this.show1 = true
            this.show2 = false
            
        },
        Delete(){
            const todo = AV.Object.createWithoutData('Todo', localStorage.getItem('BlogId'));
            todo.destroy();
            // 刷新数据
            const query = new AV.Query("Todo");
            query.equalTo("userName", AV.User.current().get("username"));
            query.descending("createdAt"); // 时间降序
            query.find().then((todo) => {
                // todo 是包含满足条件的 Tudo 对象的数组
                console.log(todo);
                this.blogs = todo;
            });

            this.show1 = true
            this.show2 = false
            
		},
		UnRevise(){
            this.show1 = true
            this.show2 = false
            const query = new AV.Query("Todo");
            query.equalTo("userName", AV.User.current().get("username"));
            query.descending("createdAt"); // 时间降序
            query.find().then((todo) => {
                // todo 是包含满足条件的 Tudo 对象的数组
                console.log(todo);
                this.blogs = todo;
            });
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
        const query = new AV.Query("Todo");
        query.equalTo("userName", AV.User.current().get("username"));
        query.descending("createdAt"); // 时间降序
        query.find().then((todo) => {
            // todo 是包含满足条件的 Tudo 对象的数组
            console.log(todo);
            this.blogs = todo;
        });
    },
    
}
</script>