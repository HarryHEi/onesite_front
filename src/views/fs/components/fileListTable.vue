<template>
  <div>
    <el-table
      ref="fileListTable"
      v-loading="tableLoading"
      :data="tableData"
    >
      <el-table-column label="名称">
        <template slot-scope="d">
          <p>{{ d.row['name'] }}</p>
        </template>
      </el-table-column>
      <el-table-column label="大小">
        <template slot-scope="d">
          <p>{{ binaryLabelFormatter(d.row['size']) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="d">
          <el-button type="text" @click="downloadFile(d.row)">下载</el-button>
          <el-button v-if="!d.row.exported" type="text" @click="setExportFile(d.row, true)">开启外链</el-button>
          <el-button v-if="d.row.exported" type="text" @click="setExportFile(d.row, false)">关闭外链</el-button>
          <el-button v-if="d.row.exported" type="text" @click="copyExportUrlToClipboard(d.row)">复制外链地址</el-button>
          <el-button type="text" style="color: red" @click="deleteFile(d.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :current-page.sync="page"
      :page-size="pageSize"
      :total="tableDataTotal"
      style="margin-top: 20px"
      @current-change="pageChanged()"
      @size-change="pageSizeChanged"
    />
  </div>
</template>

<script>
import { deleteFileApi, setExportFileApi } from "@/api/fs";
import axios from 'axios'
import { Message } from "element-ui";

export default {
  name: "FileListTable",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableDataTotal: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    binaryLabelFormatter(v) {
      if (v > 1024 * 1024 * 1024) {
        return (parseInt(v) / 1024 / 1024 / 1024).toFixed(2) + 'G'
      } else if (v > 1024 * 1024) {
        return (parseInt(v) / 1024 / 1024).toFixed(2) + 'M'
      } else if (v > 1024) {
        return (parseInt(v) / 1024).toFixed(2) + 'K'
      } else {
        return v
      }
    },
    showLoading() {
      this.tableLoading = true
    },
    hideLoading() {
      this.tableLoading = false
    },
    resetPage() {
      this.page = 1;
    },
    minusPage() {
      if ((this.page - 1) * this.pageSize >= (this.tableDataTotal - 1) && this.page > 1) {
        this.page -= 1;
      }
    },
    pageSizeChanged(pageSize) {
      this.pageSize = pageSize
      this.pageChanged()
    },
    pageChanged() {
      this.$emit("pageChanged", this.page)
    },
    setData(total, data) {
      this.tableDataTotal = total;
      this.tableData = data;
    },
    downloadFile({ id, name }) {
      axios({
        url: `/api/v1/fs/download/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        responseType: 'blob'
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    async deleteFile({ id }) {
      this.showLoading();
      await deleteFileApi(id)
      this.minusPage();
      this.hideLoading();
      this.pageChanged();
    },
    async setExportFile({ id }, exported) {
      this.showLoading();
      await setExportFileApi(id, exported);
      this.hideLoading();
      this.pageChanged();
    },
    copyExportUrlToClipboard({ id }) {
      this.$copyText(`${location.protocol}//${location.host}/api/v1/export/fs/${id}`, this.$refs.container)
      Message({
        message: '复制成功',
        type: 'success',
        duration: 5 * 1000
      });
    }
  }
}
</script>

<style scoped>

</style>
