<template>
  <div class="photo-container">
    <div class="form-div">
      <el-form ref="photoform" :model="photoform" label-width="80px">
        <el-form-item label="照片类别">
          <el-radio-group v-model="photoform.phototype">
            <el-radio-button v-for="value in typeList" :key="value" :label="value" />
          </el-radio-group>
          <el-button @click="addPhotoType">+</el-button>
        </el-form-item>
        <el-form-item label="照片日期">
          <el-date-picker
            v-model="photoform.date"
            align="right"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>

        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://10.143.3.122:8888/uploadPhoto"
            :file-list="photoform.fileList"
            :auto-upload="false"
            list-type="picture"
            multiple
            :data="photoform"
            accept="png"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitUpload">上传到服务器</el-button>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      typeList: null,
      photoform: {
        phototype: '',
        date: '',
        fileList: null
      }
    }
  },
  created() {
    this.typeList = ['旅游', '游学', '工作']
  },
  methods: {
    submitUpload() {
      const that = this
      that.$refs.upload.submit().then(function(res) {
        that.upload_successd()
      })
    },
    addPhotoType() {
      console.log('addPhotoType')
    },
    upload_successd() {
      const h = this.$createElement
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '添加成功')
      })
    },
    onSubmit() {
      const that = this
      console.log(this.photoform.phototype)
      // that.submitUpload()
      that.upload_successd()
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  margin: 30px;
}
.form-div {
  justify-content: center; /*水平居中*/
  align-items: Center; /*垂直居中*/
  border: 2px solid #ddd;
  width: 500px;
  padding: 20px;
}
.photo-container {
  justify-content: center; /*水平居中*/
  align-items: Center; /*垂直居中*/
  height: auto;
  width: auto;
  background-color: rgb(255, 255, 255);
  margin: 30px;
  padding: 30px;
}
</style>
