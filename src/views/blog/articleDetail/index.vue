<template>
  <div style="margin: 20px;">
    <p style="text-align: center; font-size: 24px; line-height: 16px">{{ title }}</p>
    <p style="text-align: center; font-size: 12px; color: gray; line-height: 0">{{ creation }}</p>
    <div id="markdown-view" class="markdown-body" />
  </div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'github-markdown-css'

import { queryArticleDetail } from "@/api/blog";
import { datetimeFormatter } from "@/common/js";

export default {
  name: "ArticleDetail",
  data() {
    return {
      viewer: '',
      title: '',
      creation: '',
      author: '',
      authorName: ''
    }
  },
  mounted() {
    this.initArticleViewer()
  },
  methods: {
    async initArticleViewer() {
      const pk = this.$route.params && this.$route.params.pk;

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'transparent'
      });
      let data = '';
      try {
        const response = await queryArticleDetail(pk)
        data = response.data.data.document
        this.title = response.data.data.title
        this.creation = datetimeFormatter(response.data.data.creation)
        this.author = datetimeFormatter(response.data.data.author)
      } finally {
        loading.close()
      }

      this.viewer = new Viewer({
        el: document.querySelector('#markdown-view'),
        viewer: true,
        initialValue: data
      });

      this.viewer.getHtml();
    }
  }
}
</script>

<style scoped>

</style>
