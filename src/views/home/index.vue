<template>
  <div>
    <el-container class="cont">
      <el-aside width="auto" height="100%" :isCollapse='isCollapse'>Aside</el-aside>
      <el-container>
        <el-header>
          <div class='elheader'>
            <div><i :class="{'el-icon-d-arrow-left': !isCollapse, 'el-icon-d-arrow-right': isCollapse}" @click="isCollapse=!isCollapse"></i><span style="margin-left:10px">江苏传智播客科技教育有限公司</span></div>
              <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="vertical-align: middle; margin-right: 10px"></el-avatar>
                <span>{{user.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item @click.native="goout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import ElAside from '@/views/layout/aside'
import { getUser } from '@/api/user.js'
export default {
  components: { ElAside },
  data () {
    return {
      isCollapse: false,
      user: ''
    }
  },
  computed: {},
  methods: {
    getuser () {
      const token = window.localStorage.getItem('token')
      console.log(`Bearer ${token}`, typeof (token))
      getUser().then(res => {
        // console.log(res)
        this.user = res.data.data
        // console.log(this.user)
      }).catch(() => {
        console.log('获取信息失败')
      })
    },
    goout () {
      this.$confirm('是否退出?', '询问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.getuser()
  },
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang='scss'>
*{
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.cont{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.elheader{
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.el-header{
  background-color: #fff;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 480px;
}
</style>
