<template>
  <div>
    <div class="components-container">
      <pan-thumb :image="image" />
    </div>
    <!-- <div class="photo_upload">
      <el-upload
        class="photo_upload_button" 
        action="上传的地址"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">上传照片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div> -->
  </div>
</template>
<script>
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Photo',
  components: { PanThumb },
  data() {
    return {
      test: 99 * 2,
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.photo_upload {
  width: 300px;
  background-color: aqua;
}
</style>
