<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channel" placeholder="请选择">
            <el-option
              label="全部"
              :value="null"
            ></el-option>
            <el-option
              v-for="(item) in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            type="daterange"
            v-model="pubdate"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadarticle">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          根据筛选条件共查询到<span>{{total_count}}</span>条结果：
      </div>
        <el-table
          :data="tableDate"
          style="width: 100%">
          <el-table-column
            prop=""
            label="封面"
            width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 70px; height: 70px"
                :src="scope.row.cover.images[0]"
                fit="cover"
                lazy
              >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">..fefe.</span>
              </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
              <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
              <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  circle
                  icon="el-icon-edit"
                  type="primary"
                  @click="edit(scope.row.id)"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="del(scope.row.id)"
                ></el-button>
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
          @current-change="pageonload"
          >
        </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getArticle, getChannel, delArticle } from '@/api/user.js'
export default {
  name: 'Article',
  components: {
  },
  data () {
    return {
      form: {
        ab: 's'
      },
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      channel: null,
      channelList: [],
      pubdate: null,
      status: null,
      total_count: 0,
      tableDate: [],
      pageSize: 10,
      page: 1
    }
  },
  computed: {
  },
  created () {
    this.loadarticle()
    this.loadchannel()
  },
  methods: {
    // 加载文章
    loadarticle (val, page = 1) {
      console.log(val)
      const a = {
        status: this.status,
        channel_id: this.channel,
        begin_pubdate: this.pubdate ? this.pubdate[0] : null,
        end_pubdata: this.pubdate ? this.pubdate[1] : null,
        page: page,
        per_page: this.pageSize
      }
      console.log(a)
      getArticle({
        status: this.status,
        channel_id: this.channel,
        begin_pubdate: this.pubdate ? this.pubdate[0] : null,
        end_pubdata: this.pubdate ? this.pubdate[1] : null,
        page: page,
        per_page: this.pageSize
      }).then((res) => {
        console.log(res.data)
        this.tableDate = res.data.data.results
        this.total_count = res.data.data.total_count
      }).catch((err) => {
        console.log(err)
      })
    },
    // 加载频道
    loadchannel () {
      getChannel().then((res) => {
        // console.log(res)
        this.channelList = res.data.data.channels
      })
    },
    // 页面加载
    pageonload (page) {
      this.loadarticle(page)
    },
    // 删除
    del (id) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // console.log(id)
        delArticle(id.toString()).then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadarticle(this.page)
        }).catch(() => {
          console.log('删除错误')
        })
      }).catch(() => {
        console.log('取消删除')
      })
    },
    edit (id) {
      this.$router.push('/publish?id=' + id)
    }
  },
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
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
