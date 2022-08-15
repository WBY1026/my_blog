<template>
	<div class="col-xs-offset-2 col-xs-8">
		<div class="page-header"><h2>Vue Router Demo</h2></div>
		<button @click="NewBlog">新建博文</button>
		<button @click="AllBlog">浏览全部博文</button>
		<button @click="MyBlog">浏览我的博文</button>
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-container>
				<el-main>Main</el-main>
				<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
	
</template>

<script>
	export default {
		// eslint-disable-next-line vue/multi-word-component-names
		name:'Background',
		methods: {
			NewBlog(){
				this.$router.push({
					name:'NewBlog',
				})
			},
			AllBlog(){
				this.$router.push({
					name:'AllBlog',
				})
			},
			MyBlog(){
				this.$router.push({
					name:'MyBlog',
				})
			},
		}
	}
</script>