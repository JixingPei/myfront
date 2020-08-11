<template>
  <div class="photo-container">
    <div class="form-div">
      <el-form ref="photoform" :model="photoform" label-width="80px">
        <el-form-item label="照片类别">
          <el-radio-group v-model="photoform.type">
            <el-radio-button v-for="value in typeList" :key="value" :label="value" />
          </el-radio-group>
          <el-button @click="dialogVisible=true">+</el-button>
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
            :action="uploadUrl"
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
      <el-dialog :visible.sync="dialogVisible" style="text-align: center;">
        <el-form>
          <el-form-item>
            <h1>请输入想要添加的类别</h1>
          </el-form-item>
          <el-form-item>
            <el-input v-model="addType" label="类别" />
          </el-form-item>
          <el-form-item>
            <el-button @click="addPhotoType">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addPhotoType, getPhotoType } from '@/api/photo'

export default {
  name: 'UploadPhoto',
  data() {
    return {
      uploadUrl: 'http://localhost:9999' + '/uploadPhoto',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      typeList: [],
      dialogVisible: false,
      photoform: {
        type: '',
        date: '',
        fileList: []
      },
      addType: null
    }
  },
  created() {
    const that = this
    that.typeList = []
    getPhotoType().then(function(res) {
      console.log(res.data)
      const photoTypeList = res.data
      for (let index = 0; index < photoTypeList.length; index++) {
        const type = photoTypeList[index].type
        that.typeList.push(type)
      }
    })
    console.log(that.typeList)
  },
  methods: {
    submitUpload() {
      console.log(this.uploadUrl)
      const that = this
      that.$refs.upload.submit()
      that.uploadSuccessd()
    },
    addPhotoType() {
      console.log('addPhotoType')
      const that = this
      addPhotoType(this.addType).then((res) => {
        console.log(res.data[0].type)
        that.typeList.push(res.data[0].type)
        that.dialogVisible = false
        that.addType = ''
      })
    },
    uploadSuccessd() {
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
.form-div {
  justify-content: center; /*水平居中*/
  align-items: Center; /*垂直居中*/
  border: 2px solid #ddd;
  min-width: 500px;
  padding: 20px;
  width: auto
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
