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
        accordion
        @change="handleChange"
      >
        <el-collapse-item :title="type">
          <!-- <el-image
            v-for="url in imagesLists[index]['imagesList']"
            :key="url"
            style="width: 33%"
            :src="url"
            :preview-src-list="imagesLists[index]['imagesList']"
          >/></el-image>-->
          <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="url in imagesLists[index]['imagesList']" :key="url">
              <el-image :src="url" />
            </el-carousel-item>
          </el-carousel>
        </el-collapse-item>
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
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.pan-info-roles-container {
  padding: 20px;
  text-align: center;
}
.photo-container {
  height: auto;
  background-color: rgb(255, 255, 255);
  margin: 30px;
  padding: 30px;
}
</style>
