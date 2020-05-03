<template>
  <div class=''>
    <div class="action-head">
        <el-radio-group
          v-model="collect"
          size="mini"
          @change="onCollectChange"
        >
          <el-radio-button
            :label="false"
          >全部</el-radio-button>
          <el-radio-button
            :label="true"
          >收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
          v-if="isShowAdd"
        >上传素材</el-button>
      </div>
      <el-row :gutter="10">
        <!-- 间隔10px xs显示2张 sm md显示4张 lg显示6张 -->
        <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="img.id"
          style="position: relative"
          @click.native="fz(index)"
        >
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
          <i :class="{'el-icon-success': true, 'select': true }" v-if="isShowSelected && selectid === index"></i>
          <!-- <i v-if="selectid && isShowSelected === img.id" :class="{'el-icon-success': true, 'select': true }"></i> -->
          <div v-if="isShowAction" class="image-action">
            <!-- <el-button
              type="warning"
              :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              size="small"
              @click="onCollect(img)"
              :loading="img.loading"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete-solid"
              circle
              :loading="img.loading"
              @click="onDelete(img)"
            ></el-button> -->
          <!-- 收藏图标 -->
            <i
            :class="{
              'el-icon-star-on': img.is_collected,
              'el-icon-star-off': !img.is_collected,
              'five':true
            }"
            @click="onCollect(img.id, img.is_collected, index)"
            ></i>
          <!-- 删除图标 -->
            <i class="el-icon-delete" style="color:#CD853F" @click="del(img.id)"></i>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        @current-change="loadImages"
        :current-page.sync="page"
        :page-size="per_page"
        >
      </el-pagination>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { getImages, delImages, collectImages } from '@/api/user.js'
export default {
  name: 'ImageList',
  components: {},
  props: {
    // 是否显示添加素材
    isShowAdd: {
      type: Boolean, // 布尔值
      default: true // 默认值
    },

    // 是否显示图片下方的操作（收藏和删除）
    isShowAction: {
      type: Boolean,
      default: true
    },

    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const token = window.localStorage.getItem('token')
    return {
      collect: false, // 默认查询全部素材列表
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      },
      total_count: 0,
      page: 1,
      per_page: 20,
      selectid: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {},
  methods: {
    fz (index) {
      if (this.selectid === index) {
        this.selectid = null
      } else {
        this.selectid = index
      }
    },
    loadImages () {
      getImages({
        collect: this.collect,
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    onCollectChange (value) {
      this.page = 1
      this.loadImages()
    },
    onCollect (id, collected, index) {
      collectImages(id, {
        collect: !collected
      }).then((res) => {
        if (!collected) {
          this.$message({
            type: 'success',
            message: '收藏成功！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '取消收藏成功！'
          })
        }
        this.images[index].is_collected = !collected
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '收藏失败！'
        })
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false

      // 更新素材列表
      this.loadImages(this.collect)
    },
    del (id) {
      this.$confirm('是否删除该素材?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImages(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.loadImages(false)
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '删除失败！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-action {
  font-size: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 30px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
  i:hover {
    cursor: pointer;
  }
}
.five {
  color:red
}
.select {
  display: block;
  position: absolute;
  top:10px;
  right:10px;
  font-size: 20px;
  color: green;
}
</style>
