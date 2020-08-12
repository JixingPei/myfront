<template>
  <div class="photo-container">
    <div>
      <el-button @click="getPhotoType">类型控制</el-button>
    </div>
    <div class="photoarea">
      <el-collapse v-for="(imagesLists,title,index) in typePhotoListMap" :key="index">
        <el-collapse-item :title="title">
          <el-image
            v-for="(photo,index1) in imagesLists"
            :key="index1"
            style="width: 10%"
            :src="photo.path"
            :preview-src-list="[photo.path]"
          >/></el-image>
        </el-collapse-item>
      </el-collapse>
      <el-dialog :visible.sync="dialogVisible" style="text-align: center;">
        <el-table :data="photoType">
          <el-table-column label="No" prop="index">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="type" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="openUpdateDialog(scope.row)">修改</el-button>
              <el-button type="danger" @click="openMessageBox(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column v-if="false" label="id" prop="uniqueId" />
        </el-table>
        <el-button style="margin-top:10px" @click="dialogVisible=false">取消</el-button>
        <el-dialog :visible.sync="updateDialogVisible" append-to-body>
          <el-form ref="updatePhotoTypeForm" :model="updatePhotoTypeForm">
            <el-form-item label="修改后的值">
              <el-input v-model="updatePhotoTypeForm.type" style="max-width: 780px" />
            </el-form-item>
            <el-form-item>
              <el-button @click="updatePhotoType">修改</el-button>
              <el-button @click="updateDialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getPhotoType,
  updatePhotoType,
  deletePhotoType,
  getTypePhotos,
  notifyMessage
} from '@/api/photo'

export default {
  name: 'TypePhoto',
  data() {
    return {
      updateDialogVisible: false,
      dialogVisible: false,
      typeList: [],
      photoType: [],
      typePhotoListMap: [],
      updatePhotoTypeForm: {
        oldType: null,
        uniqueId: null,
        type: null
      }
    }
  },
  created() {
    const that = this
    that.typePhotoListMap = []
    getTypePhotos().then((res) => {
      // imagesLists = res.data;
      that.typePhotoListMap = res.map
    })
    console.log(that.typeList)
  },
  methods: {
    openMessageBox(row) {
      this.$confirm(
        '是否删除照片类型 [' + row.type + '] ,并且删除对应照片?',
        '提示',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          console.log(row.uniqueId)
          const data = {
            uniqueId: row.uniqueId,
            type: row.type
          }
          const that = this
          that.typePhotoListMap = []
          deletePhotoType(data).then((res) => {
            getTypePhotos().then((res) => {
              that.typePhotoListMap = res.map
              console.log(that.typeList)
              notifyMessage(this, '删除成功')
              that.dialogVisible = false
            })
          })
        })
        .catch(() => {
          notifyMessage(this, '已取消删除')
          this.dialogVisible = false
        })
    },
    getPhotoType() {
      this.dialogVisible = true
      getPhotoType().then((res) => {
        console.log(res.data)
        this.photoType = res.data
      })
    },
    openUpdateDialog(row) {
      console.log(row)
      this.updatePhotoTypeForm.uniqueId = row.uniqueId
      this.updatePhotoTypeForm.oldType = row.type
      this.updateDialogVisible = true
    },
    updatePhotoType() {
      const that = this
      that.typePhotoListMap = []
      updatePhotoType(this.updatePhotoTypeForm).then((res) => {
        getTypePhotos().then((res) => {
          // imagesLists = res.data;
          that.typePhotoListMap = res.map
          that.updateDialogVisible = false
          that.dialogVisible = false
        })
      })
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
  height: auto;
  background-color: rgb(255, 255, 255);
  margin: 30px;
  padding: 30px;
}
</style>
