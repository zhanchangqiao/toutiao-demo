<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="width: 100%">
          <el-form style="width: 60%;float:left" :model="msg" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号:">
              {{msg.id}}
            </el-form-item>
            <el-form-item label="手机:">
              {{msg.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="msg.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="msg.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱: ">
              <el-input v-model="msg.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存设置</el-button>
            </el-form-item>
          </el-form>
          <div class="right">
            <label for="file">
              <el-avatar shape="square" :size="100" fit="cover" :src="msg.photo"></el-avatar>
              <p>点击更换头像</p>
            </label>
            <input type="file" id="file" ref="upfile" hidden @change="crop()">
          </div>
        </div>
    </el-card>
    <el-dialog title="裁剪图像" :visible.sync="dialogFormVisible" @opened="open()"
      @closed="close()">
      <div>
        <img
          class="cropimage"
          :src="cropimage"
          ref="cropimage"
        >
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdate()" :loading="croploading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUser, editUser, updatephoto } from '@/api/user.js'
import EventBus from '@/utils/Event-bus.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'Setting',
  data () {
    return {
      msg: {},
      dialogFormVisible: false,
      cropimage: '',
      cropper: null,
      croploading: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editUser({
            name: this.msg.name,
            intro: this.msg.intro,
            email: this.msg.email
          }).then((res) => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            EventBus.$emit('upuser', this.msg)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    get () {
      getUser().then((res) => {
        this.msg = res.data.data
      }).catch(() => {
      })
    },
    crop () {
      const file = this.$refs.upfile
      const a = window.URL.createObjectURL(file.files[0])
      this.cropimage = a
      this.dialogFormVisible = true
    },
    open () {
      const image = this.$refs.cropimage
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        guides: false, // xianshixuxian
        background: false,
        center: false,
        viewMode: 1,
        cropBoxResizable: false,
        dragMode: 'none'
      })
    },
    close () {

    },
    onUpdate () {
      this.croploading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        var data = new FormData()
        data.append('photo', file)
        updatephoto(data).then((res) => {
          this.msg.photo = window.URL.createObjectURL(file)
          this.croploading = false
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          EventBus.$emit('upuser', this.msg)
        })
      })
    }
  },
  created () {
    this.get()
  }
}
</script>
<style scoped>
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
}
.el-card__body {
  background-color: red;
}
.right {
  width: 40%;
  float: right;
  display: flex;
  justify-content: center;
  padding-top:20px;
}
.cropimage {
  display: block;
  max-width: 100%;
  width: 200px;
}
</style>
