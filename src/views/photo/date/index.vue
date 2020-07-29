<template>
  <div class="photo-container">
    <div class="components-container">
      <pan-thumb :image="image">惊喜</pan-thumb>
      <pan-thumb v-for="url in urls" :key="url" :image="url">suprise</pan-thumb>
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
    </div>-->

    <div class="photoarea">
      <!-- <span v-for="(index,type) in (index,typeList)" :key="index">{{ index + type }}</span> -->
      <el-collapse
        v-for="(type,index) in typeList"
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

export default {
  name: 'DatePhoto',
  components: { PanThumb },
  data() {
    return {
      typeList: ['20200729', '20200728'],
      imagesLists: [
        {
          imagesList: [
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
          ]
        },
        {
          imagesList: [
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
          ]
        }
      ],
      test: 99 * 2,
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
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
