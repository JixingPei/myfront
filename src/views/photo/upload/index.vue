<template>
  <div class="photo-container">
    <el-button plain @click="upload_successd">可自动关闭</el-button>

    <div class="form-div">
      <el-form ref="photoform" :model="photoform" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="photoform.name" />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UploadPhoto',
  data() {
    return {
      photoform: {
        name: null,
        date: null
      }
    }
  },
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
.form-div{
  background-color: aqua;
  width: 500px;
  padding: 20px;
}
</style>
