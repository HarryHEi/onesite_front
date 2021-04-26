<template>
  <el-card>
    <el-upload
      ref="uploader"
      action="/api/v1/fs/upload"
      :multiple="true"
      :headers="headers"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">注: 大小不能超过10M。</div>
    </el-upload>
    <fileListTable ref="fileListTable" @pageChanged="loadFileList" />
  </el-card>
</template>

<script>
import fileListTable from "@/views/fs/components/fileListTable";
import { listFilesApi } from "@/api/fs";
import { Message } from 'element-ui'

export default {
  name: "FsIndex",
  components: { fileListTable },
  data() {
    return {
      loading: null,
      headers: {
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    }
  },
  mounted() {
    this.loadFileList();
  },
  methods: {
    async loadFileList() {
      this.$refs['fileListTable'].showLoading();
      const response = await listFilesApi(
        this.$refs['fileListTable'].page,
        this.$refs['fileListTable'].pageSize,
      )
      this.$refs['fileListTable'].setData(response.data.data.count, response.data.data.data);
      this.$refs['fileListTable'].hideLoading();
    },
    beforeUpload(file) {
      if (file.size >= 1024 * 1024 * 10) {
        Message({
          message: '文件大小不能超过10M',
          type: 'error',
          duration: 5 * 1000
        });
        return false
      }
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'transparent'
      });
      return true
    },
    onSuccess() {
      Message({
        message: '上传成功',
        type: 'success',
        duration: 5 * 1000
      });
      this.loadFileList();
      this.loading.close()
    },
    onRemove() {
      // ...
    },
    onError(e) {
      Message({
        message: `上传失败，${e.toString()}`,
        type: 'error',
        duration: 5 * 1000
      });
      this.loading.close()
    }
  }
}
</script>

<style scoped>

</style>
