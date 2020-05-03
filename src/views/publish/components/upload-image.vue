<template>
  <div class="upload-image">
    <div class="preview" @click="onUploadShow">
      <img :src="value" class="avatar" v-if="value">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!--
      visible 控制对话框的显示和隐藏
     -->
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <!-- 标签导航 -->
      <!--
        el-tabs 组件
          v-model 双向绑定
            数据驱动视图：当绑定数据发生改变，激活的标签页受影响
            视图影响数据：当标签改变的时候，标签的 name 会同步到数据中
          label 标签的标题
          name 相当于标签的 id
       -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <!-- 标签内容写到里面来 -->
          <!--
            radio 有个 change 事件
            当选择的 radio 改变的时候会触发
           -->
          <!-- <el-radio-group v-model="activeImage">
            <el-radio label="all">全部</el-radio>
            <el-radio label="collect">收藏</el-radio>
          </el-radio-group> -->
          <!-- 是否显示添加素材  默认true-->
          <!-- 是否显示收藏和删除 默认true-->
          <!-- 是否显示选择图片层 默认false-->
          <image-list
            :is-show-add="false"
            :is-show-action="false"
            :is-show-selected="true"
            :foo="666"
            ref="child"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <div class="preview">
            <label for="file" style="couser:pointer">
              <img :src="laburl" class="avatar" v-if="laburl">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </label>
            <input type="file" id="file" ref="file" hidden @change="laburlm()">
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- /标签导航 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm()" :loading="btnVisible"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { uploadImage } from '@/api/user.js'
import ImageList from '@/views/image/components/ImageList.vue'
export default {
  name: 'UploadImage',
  components: {
    ImageList
  },
  imageUrl: '',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false, // 对话框的显示状态
      activeName: 'first', // 激活的标签页
      activeImage: 'all', // 激活的图片筛选类型
      images: [],
      activeIndex: null,
      previewImage: '',
      url: '',
      laburl: '',
      btnVisible: false,
      f: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  methods: {
    onUploadShow () {
      // 请求加载数据
      // this.loadImages()
      // 显示弹窗
      this.centerDialogVisible = true
    },
    imageUrl () {

    },
    laburlm () {
      const file = this.$refs.file.files[0]
      this.f = file
      const url = window.URL.createObjectURL(file)
      this.laburl = url
    },
    onConfirm () {
      this.btnVisible = true // 开始loading
      if (this.activeName === 'first') {
        const childthis = this.$refs.child
        const index = childthis.selectid
        if (!index) {
          this.$message({
            type: 'warning',
            $message: '未选择图片'
          })
          this.btnVisible = false // loading隐藏
          this.centerDialogVisible = false // 对话框隐藏
          return
        }
        this.$emit('input', childthis.images[index].url)
        this.btnVisible = false // loading隐藏
        this.centerDialogVisible = false // 对话框隐藏
      } else if (this.activeName === 'second') {
        // const preview = this.previewImage
        // if (preview) {
        //   this.$emit('input', 'previewImage')
        // }
        const fd = new FormData()
        fd.append('image', this.f)
        uploadImage(fd).then(res => {
          this.url = this.laburl // 赋值给显示的img
          this.$emit('input', res.data.data.url) // 传值父组件
          this.btnVisible = false // loading隐藏
          this.centerDialogVisible = false // 对话框隐藏
        }).catch(() => {
          this.btnVisible = false // loading隐藏
          this.centerDialogVisible = false // 对话框隐藏
        })
      }
    }
  }
}
</script>

<style scoped>
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  margin-right: 20px;
}
.upload-image .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.preview {
 width: 178px;
 height: 178px;
 border: 1px dashed #ccc;
}
label:hover{
  cursor: pointer;
}
</style>
