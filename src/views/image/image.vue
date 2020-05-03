<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <image-list></image-list>
    </el-card>
  </div>
</template>

<script>
import ImageList from './components/ImageList.vue'
export default {
  name: 'ImageHead',
  components: {
    ImageList
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
