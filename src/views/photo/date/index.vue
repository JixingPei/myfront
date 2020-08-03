<template>
  <div class="photo-container">
    <div class="components-container">
      <pan-thumb :image="image">惊喜</pan-thumb>
    </div>

    <div class="photoarea">
      <!-- <span v-for="(index,type) in (index,typeList)" :key="index">{{ index + type }}</span> -->
      <el-collapse
        v-for="(type,index) in dateList"
        :key="type"
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item :title="type">
          <el-image v-for="url in imagesLists[index]['imagesList']" :key="url" style="width: 10%" :src="url" :preview-src-list="imagesLists[index]['imagesList']">/>
          </el-image></el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import PanThumb from '@/components/PanThumb'
import { getPhoto } from '@/api/photo'

export default {
  name: 'DatePhoto',
  components: { PanThumb },
  data() {
    return {
      dateList: [],
      imagesLists: [],
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  created() {
    const that = this
    getPhoto().then(function(res) {
      that.dateList = res.dateList
      const filePathNameList = res.filePathNameList
      for (let index = 0; index < filePathNameList.length; index++) {
        that.imagesLists.push({ imagesList: filePathNameList[index] })
        console.log(filePathNameList[index])
      }
    })
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
<style lang="scss" scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.photo_upload {
  width: 300px;
  background-color: aqua;
}
.pan-info-roles-container {
  padding: 20px;
  text-align: center;
}
.photo-container {
  margin: 30px;
}
</style>
