<template>
  <div>
	<Log v-if="show1"></Log>
	<MainPage v-if="show2"></MainPage>

  </div>
</template>

<script>

	import Log from './pages/Log.vue'
	import MainPage from './pages/MainPage.vue'
	

	export default {
		name:'App',
		components:{ Log, MainPage },
		data() {
			return { 
				show1: true ,
				show2: false
			}
		},
		methods: {
			
		},
		mounted(){
			if(localStorage.getItem('token')){
				this.show1 = false
				this.show2 = true
			}else{
				this.show1 = true
				this.show2 = false
			}
		}
	}
</script>




<style>
  .el-header {
    background-color: #434A50;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: #DCDFE6;
  }
  
  .el-aside {
    background-color: #c0d5ec;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>
