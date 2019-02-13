<template>
  <div class="login">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="你的名字" class="login-input" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" class="login-input" placeholder="你的心锁" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Connect from '../../utils/connect'
import Utils from '../../utils/utils'
import User from '../store/user'
import md5 from 'md5'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            username: that.ruleForm.username,
            password: md5(that.ruleForm.password)
          }
          Connect.getApi(10001, params, null, data => {
            User.login(data.data)
            Utils.setCookie('userInfo', data.data)
            this.$message.success(data.message)
            this.$router.push({ path: '/admin' })
          }, error => {
            this.$message.error(error.message)
          })
        } else {
          console.log(valid)
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-top: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  background-image:  url('../assets/login_bg.jpg');
  background-size: cover;
}
.login-input .el-input__inner {
  background: none;
  border: 0 none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  width: 200px;
  display: block;
  height: 30px;
  padding-left: 0;
}
.el-form-item__content {
  line-height: 30px;
}
.el-form-item {
  margin-bottom: 13px;
}
.el-button {
  background: none;
  border: 0 none;
  color: #ddd;
  font-size: 12px;
  padding: 0;
}
.el-button:hover {
  background: none;
  color: #fff;
}
</style>
