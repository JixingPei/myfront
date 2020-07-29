<template>
  <div class="photo-container">

    <el-button plain @click="upload_successd">可自动关闭</el-button>

  </div>
</template>
<script>
export default {
  name: 'UploadPhoto',
  methods: {
    upload_successd() {
      const h = this.$createElement
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '添加成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  margin: 30px;
}
</style>
