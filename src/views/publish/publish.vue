<template>
   <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="msg" ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="msg.title" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
           <el-tiptap
              v-model="msg.content"
              :extensions="extensions"
              height="200px"
              placeholder="请输入文章内容"
            />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="msg.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="msg.cover.type > 0">
            <div class="box">
              <upload-image v-model="msg.cover.images[index-1]" v-for="index in msg.cover.type" :key="index">
              </upload-image>
            </div>
            <!-- <el-row :gutter="20" -->
              <!-- 间隔10px xs显示2张 sm md显示4张 lg显示6张 -->
            <!-- </el-row> -->
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="msg.channel_id" placeholder="请选择">
            <el-option
              v-for="(item) in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publ()">发表</el-button>
          <el-button @click="publ(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
   </el-card>
</template>
<script>
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TextColor,
  Image
} from 'element-tiptap'
import { getChannel, pubArtile, appointArtile, updateArtile, uploadImage } from '@/api/user.js'
import UploadImage from './components/upload-image'
export default {
  name: 'Publish',
  components: {
    UploadImage
  },
  data () {
    return {
      ruleForm: {
      },
      cover: 3,
      msg: {
        cove1r: 4,
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: -1,
          images: [],
          cover: 5
        }
      },
      way: false,
      id: '',
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      },
      channelList: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TextColor(),
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          }
        })
      ]
    }
  },
  created () {
    this.loadchannel()
    if (this.$route.query.id) {
      this.loadone()
      this.id = this.$route.query.id
    }
  },
  computed: {
  },
  methods: {
    loadchannel () {
      getChannel().then((res) => {
        this.channelList = res.data.data.channels
      })
    },
    loadone () {
      appointArtile(this.$route.query.id).then((res) => {
        this.msg = res.data.data
      }).catch(() => {
      })
    },
    publ (darft = false) {
      // 当是修改界面那么就是true
      if (this.$route.query.id) {
        this.update(this.$route.query.id, this.msg, darft)
      } else {
        pubArtile(this.msg, darft).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
          this.resetForm('ruleForm')
        }).catch(() => {
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    update (id, data, darft) {
      updateArtile(id, data, darft).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ name: 'article' })
      }).catch(() => {
      })
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
.box{
  display: flex;
  justify-content: flex-start;
}
</style>
