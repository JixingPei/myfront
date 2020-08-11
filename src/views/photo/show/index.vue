<template>
  <div class="showAera">
    <div class="content-container">
      <div class="portfolio-content">
        <el-dialog :visible.sync="dialogVisible" style="text-align: center;">
          <h2>Lovo you</h2>
          <el-row>
            <el-image :src="dialogImg" />
          </el-row>
          <el-row>
            <el-button type="primary" @click="dialogVisible = false">Love you too</el-button>
            <el-button @click="clikCancel">No</el-button>
          </el-row>
          <el-dialog :visible.sync="cancelDialogVisible" append-to-body style="text-align: center;">
            <h1>Are you sure?????</h1>
            <el-button @click="cancelDialogVisible = false">我错了</el-button>
          </el-dialog>
        </el-dialog>
        <div v-for="(image,index) in imagesLists" :key="index" class="portfolio-page">
          <div class="portfolio-group" @click="dialogVisible = true;dialogImg=image.imagesList">
            <img :src="image.imagesList">
            <div class="detail">
              <h3>悄悄说爱你</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPhotoWall } from '@/api/photo'

export default {
  name: 'PhotoShow',
  data() {
    return {
      dialogVisible: false,
      cancelDialogVisible: false,
      dialogImg: null,
      dateList: [],
      imagesLists: []
    }
  },
  created() {
    const that = this
    getPhotoWall().then(function(res) {
      const filePathNameList = res.filePathNameList
      for (let index = 0; index < filePathNameList.length; index++) {
        that.imagesLists.push({ imagesList: filePathNameList[index] })
      }
    })
  },
  methods: {
    clikCancel() {
      this.cancelDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scop>
.content-container {
  box-sizing: border-box;
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
}
.portfolio-content {
  margin: 0 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.portfolio-group {
  display: inline-block;
  width: 250px;
  height: 180px;
  // width: 250px;
  // height: 180px;
  position: relative;
  margin: 15px 10px;
  /*父元素里面包含需要变换的内容，所以设置为3D变换*/
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: 1s;
  /*设置在1s内完成变换*/
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    box-shadow: 5px 10px 10px -5px rgba(0, 0, 0, 0.5);
  }
}

.portfolio-group:hover {
  transform: rotateY(180deg);
}
.portfolio-group .detail {
  -webkit-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
  background: #8b4373;
  border: 2px solid #ddd;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 5px 10px 10px -5px rgba(0, 0, 0, 0.5);
}
.portfolio-group .detail h3 {
  padding: 15px 10px 0 10px;
}
.portfolio-group .detail p {
  text-align: justify;
  padding: 10px;
  line-height: 1.8em;
}
.portfolio-group img,
.portfolio-group .detail {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.showAera {
  max-width: 80%;
  margin: 1% auto;
  height: 800px;
  background: white;
  box-shadow: 0 0 5px rgba(107, 110, 112, 0.4);
}
</style>
