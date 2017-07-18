<template>
  <div class="login-page">
    <mt-header fixed title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/register" slot="right">
        <mt-button>去注册</mt-button>
      </router-link>
    </mt-header>
    <div class="login">
      <div class="form-group">
        <label for="username"></label>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="手机号">
      </div>
      <div class="form-group">
        <label for="password"></label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="密码">
      </div>
      <button type="button" class="btn btn-pink btn-block" @click="checkLogin">登 录</button>
    </div>
  </div>
</template>
<script>
import { Toast,Header } from 'mint-ui';
export default {
  name: 'about',
  data () {
    return {
      show: true,
      username:'',
      password:'',
    }
  },
  components:{
  },
  methods:{
    checkLogin(){
      if(!this.username){
        Toast({
          message: '手机号不为空',
          position: 'bottom',
          duration: 5000
        });
      }else if(!this.password){
        Toast({
          message: '密码不为空',
          position: 'bottom',
          duration: 5000
        });
      }else{
        if(!(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/.test(this.username))){
          Toast({
            message: '输入的手机号有误',
            position: 'bottom',
            duration: 5000
          });
        }else {
          // function setCookie(cname,cvalue,exdays){
          //   var d = new Date();
          //   d.setTime(d.getTime()+(exdays*24*60*60*1000));
          //   var expires = "expires="+d.toGMTString();
          //   document.cookie = cname + "=" + cvalue + "; " + expires;
          // }
          // setCookie(username,this.username,2);
          if (window.localStorage) {
              localStorage.setItem("username", this.username);
          } else {
              Cookie.write("username",this.username);
          }
          Toast({
            message: '发请求',
            position: 'bottom',
            duration: 5000
          });
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_24ds2a3yf7ds4i.css';
.mint-header{
  background-color:#1a1f29;
}
.login-page{
  width:100%;
  height: 100vh;
  background-color: #1a1f29;
}
.iconfont{
  color:white;
}
header{
  height:1.3333333333333333rem;
  line-height:1.3333333333333333rem;
  text-align:center;
  font-size:16px;
  color:white;
}
.left{
  float:left;
  a{
    margin-left: .2rem;
  }
}
.right{
  float:right;
  margin-right:0.26666666666666666rem;
}
.login{
  width:8rem;
  height:10rem;
  position: absolute;
  top:50%;
  left:50%;
  margin-top: -5rem;
  margin-left: -4rem;
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
}
.form-control {
    display: block;
    width: 100%;
    height: 1.2rem;
    padding: .2rem .5rem;
    font-size: 14px;
    line-height: 1.42857143;
    color: #f9f9f9;
    background-color: transparent;
    background-image: none;
    border: 1px solid #dac6c6;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(200,200,200,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.form-control:focus {
    border-color: #fa85a2;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(242,121,142,.075), 0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(242,121,142,.6);
}
.btn{
  width: 100%;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-top:1rem;
}
.btn-pink{
  color: #a5a5a5;
  background-color: #333;
  border-color: #333;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 3px;
  outline:none;
}
}
</style>
