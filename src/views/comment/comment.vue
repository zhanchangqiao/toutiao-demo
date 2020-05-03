<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-table
          :data="result"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="280">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数">
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数">
          </el-table-column>
          <el-table-column
            prop="comment_status"
            label="状态">
            <template slot-scope="scope">{{scope.row.comment_status ? '是':'否'}}</template>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.comment_status" type="success" @click="close(scope.row.id, !scope.row.comment_status)">{{scope.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
                <el-button v-if="!scope.row.comment_status" type="warning" @click="close(scope.row.id, !scope.row.comment_status)">{{scope.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total_count"
          style="float:right; margin:20px 0px"
          :current-page.sync="page"
          :page-size="pageSize"
          @current-change="getts()"
          >
        </el-pagination>
    </el-card>
</template>
<script>
import { getArticle, updateCommentStatus } from '@/api/user.js'
export default {
  name: 'Comment',
  components: {
  },
  data () {
    return {
      result: [],
      total_count: 0,
      pageSize: 20,
      page: 1
    }
  },
  computed: {
  },
  methods: {
    getts () {
      getArticle({
        page: this.page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        this.result = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    close (id, statu) {
      const mes = statu ? '打开' : '关闭'
      const m = `${mes}成功!`
      this.$confirm(`确认${mes}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateCommentStatus(id.toString(), statu).then((res) => {
          this.$message({
            type: 'success',
            message: m
          })
          this.getts()
        }).catch(() => {
          this.$message('修改失败')
        })
      }).catch(() => {

      })
    }
  },
  created () {
    this.getts()
  },
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {} // 生命周期 - 销毁完成
}
</script>
<style lang='less' scoped>
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
  width: 100%;
  margin-bottom: 20px;
}
.el-form {
  text-align: left;
}
</style>
