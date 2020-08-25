<template>
  <div id="app">
    <div class="header" v-if="showHeader">
      <div class="center">
        <div @click="goHomePage"><img src="static/images/logo.png" alt=""><span>华南富汇智慧供应链平台</span></div>
        <span class='right login'>
          <span class="enter pointer" @click="goHomePage" v-show="token">进入平台</span>
          <router-link :to="{path:'/login'}" v-show="$route.path!='/login' && !token">登录</router-link>
          <el-dropdown trigger="click"  v-show="$route.path!='/login' && token"  @command="handleCommand" style="margin-top:7px;cursor:pointer;position:absolute;right:0;top:0;">
              <span class="el-dropdown-link">
                  <img class="userIcon" src="static/images/toux.png" />
                  <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="'logout'">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token:sessionStorage.getItem('token')
    }
  },
  name: 'App',
  components: {
    
  },
  computed:{
    showHeader(){
      return (this.$route.path.indexOf('/homePage') !== -1) || this.$route.path == '/login'
    },
  },
  watch:{
    token(val){
      return val ? true : false;
    },
    $route(to,from){
      if(from.path=='/login'){
        this.token = false;
      }
      if(from.path=='/Home'){
        this.token = true;
      }
    }
  },
  methods:{
    goHomePage(){
      if(this.$route.path == '/login'){
          this.$router.push({path:'/homePage'});
      }
      if(this.$route.path.indexOf('/homePage') !== -1){
          this.$router.push({path:'/Home'});
      }
    },
    handleCommand (command) {
        if (command === 'logout') {
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push({path:'/login'});
            this.token = null;
        }
    },
  }
}
</script>

<style scoped>
#app{
  height: 100%;
}
.center{
  position: relative;
  width:1200px;
  margin:0 auto;
}
.center div{
  display: flex;
  align-items: center;
  height:80px;
  line-height: 80px;
  cursor: pointer;
}
.center img{
  margin-right:15px;
}
.center span{
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #2A211E;
  letter-spacing: 0;
  line-height: 24px;
}
.right{
  float:right;
}
span.login a{
  position: absolute;
  right:0;
  font-size:16px;
  color: #302F4D;
  top:30px;
}
.center span.enter{
  padding:5px 22px;
  display: inline-block;
  color:#FF6E00;
  border:1px solid #FAB700;
  border-radius: 17px;
  font-size:12px;
  position: absolute;
  right:115px;
  top:27px;
}
</style>
