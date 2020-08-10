<template>
  <div id="app">
    <div class="header" v-if="showHeader">
      <div class="center">
        <img src="static/images/logo.png" alt=""><span>华南富汇智慧供应链平台</span>
        <span class='right login'><router-link :to="{path:'/login'}" v-show="$route.path!='/login'">登录</router-link></span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  computed:{
    showHeader(){
      return this.$route.path == '/homePage' || this.$route.path == '/login'
    }
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
  height:80px;
  line-height: 80px;
  display: flex;
  align-items: center;
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
</style>
