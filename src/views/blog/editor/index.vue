<template>
  <div>
    <el-input ref="titleInput" v-model="title" style="width: calc(100% - 40px);margin: 20px" placeholder="请输入标题" />
    <div id="markdown-editor" />
    <el-button size="mini" type="primary" style="margin: 10px; float: right" @click="submit">确认提交</el-button>
  </div>
</template>
<script>
import Editor from '@toast-ui/editor';

import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

import { commitArticleApi } from "@/api/blog";
import { Message } from "element-ui";

export default {
  data() {
    return {
      title: "",
      editor: ''
    }
  },
  mounted() {
    this.initEditor();
    this.$refs.titleInput.focus()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.querySelector('#markdown-editor'),
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        hideModeSwitch: true,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike'
        ]
      });

      this.editor.getHtml();
    },
    async submit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'transparent'
      });

      if (this.title === "") {
        loading.close()
        Message.error("请输入标题")
        return
      }

      const doc = this.editor.getMarkdown()
      if (doc === "") {
        loading.close()
        Message.error("文本不能为空")
        return
      }

      try {
        await commitArticleApi(
          this.title,
          doc
        )
        Message.success("提交成功")
        this.$router.push('/article/index')
      } finally {
        loading.close()
      }
    }
  }
}
</script>
