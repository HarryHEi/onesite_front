<template>
  <div>
    <el-card>
      <el-form label-position="top">
        <el-form-item label="头像">
          <el-upload
            ref="uploader"
            class="avatar-uploader"
            action="/api/v1/user/avatar"
            :headers="headers"
            :show-file-list="false"
            :on-success="onSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="avatar" :src="`/api/v1/export/avatar/${uid}`" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapGetters } from "vuex";

export default {
  name: "UserIndex",
  data() {
    return {
      headers: {
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'uid'
    ])
  },
  methods: {
    onSuccess() {
      Message({
        message: '上传成功',
        type: 'success',
        duration: 5 * 1000
      });
      location.reload();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPng) && isLt2M;
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped>

</style>
