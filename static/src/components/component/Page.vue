<template>
  <el-container class="container">
    <el-container>
      <el-aside class="aside">
        <div>
          <img src="../../assets/user_img.jpeg" />
          <span>{{data.fullname}}</span>
        </div>
        <div class="menu">
          <a @click="handleClick('/')">首页</a>
          <a @click="handleClick('/archives')">归档</a>
          <a @click="handleClick('/tags')">标签</a>
          <a @click="handleClick('/about')">关于</a>
        </div>
      </el-aside>
      <el-main class="main">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import User from '../../store/user'
// import Connect from '../../../utils/connect'

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
    handleClick: function (url) {
      this.$router.push({ path: url })
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
}
.aside{
  background-image: url('../../assets/header_bg.jpg');
  background-size: cover;
  width: 100%;
  height: 100% !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
}
.aside div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.aside img{
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  margin-bottom: 5px;
}
.aside img:hover{
  box-shadow: 0 0 15px 0 #fff;
}
.aside span{
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.menu {
  margin-top: 20px;
}
.menu a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 10px;
}
.menu a:hover {
  color: #2479CC;
}
</style>
