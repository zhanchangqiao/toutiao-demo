<template>
    <div class="cont">
        <el-form class="el-from" :rules="rules" :model="user" ref="user">
          <img src="./logo_index.png" alt="">
          <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="agree" style="margin-left:15px">
            <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-button type="primary" @click="onLogin('user')" :loading="btn">登录</el-button>
        </el-form>
    </div>
</template>
<script>
import { loginuser } from '@/api/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      agree: 'true',
      btn: false,
      rules: {
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.btn = true
      loginuser(this.user).then(res => {
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
        window.localStorage.setItem('token', res.data.data.token)
        this.btn = false
        this.$router.push({ name: 'home' })
        // 登录成功
      })
    }
  }
}
</script>
<style scoped  lang="less">
.cont{
  position:fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
    .el-from{
      box-sizing: border-box;
      width: 400px;
      height: 400px;
      padding: 15px 15px 15px 15px;
      background-color: rgb(45, 175, 147);
    // opacity: 0.7;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-radius: 10px;
    }
}
.el-form-item__label{
  padding:0px;
}
.el-input__inner{
  width: 90%;
}
input{
  width: 90%;
}
</style>
