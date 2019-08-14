<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-row class="tac">
        <el-col :span="24">
          <div class="logo">LOGO</div>
          <el-menu
            default-active="1"
            @select="handleClick"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">博文管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div></div>
        <el-dropdown @command="loginout">
          <div>
            <img src="../../assets/user_img.jpeg" />
            <span>{{data.fullname}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import User from '../../store/user'
import Connect from '../../../utils/connect'

export default {
  data () {
    return {
      data: {
        fullname: ''
      }
    }
  },
  mounted: function () {
    const info = User.getInfo()
    this.data.fullname = info.nick
  },
  methods: {
    // 退出登录
    loginout (e) {
      switch (e) {
        case 'loginout':
          Connect(10002, {}, data => {
            if (data.success) {
              this.$router.push({ path: '/login' })
              User.clearInfo()
            } else {
              console.log(data.message)
            }
          })
          break
        default:
          break
      }
    },
    handleClick (key) {
      switch (key) {
        case 'admin':
          this.$router.push({ path: '/admin' })
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
}
.header{
  background-image: url('../../assets/header_bg.jpg');
  background-size: cover;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.header div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.header img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
}
.header img:hover{
  box-shadow: 0 0 15px 0 #fff;
}
.header span{
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.aside{
  width: 300px;
  background: rgb(84, 92, 100);
}
.logo{
  height: 60px;
  width: 100%;
  background: rgb(84, 92, 100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
