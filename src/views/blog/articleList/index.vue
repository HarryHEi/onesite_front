<template>
  <div style="overflow:auto;height:100vh">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      style="padding: 0; margin: 0;"
    >
      <articleView
        v-for="(article, index) in articles"
        :key="index"
        :pk="article['_id']"
        :title="article['title']"
        :time="article['creation']"
      />
    </ul>
    <p v-if="loading" style="text-align: center; font-size: 16px; color: #068073">加载中...</p>
    <p v-if="finished" style="text-align: center; font-size: 16px; color: gray">没有更多了</p>
  </div>
</template>

<script>
import { listArticleApi } from "@/api/blog";
import { datetimeFormatter } from "@/common/js";
import articleView from "@/views/blog/articleList/components/articleView";

export default {
  components: { articleView },
  data() {
    return {
      articles: [],
      finished: false,
      loading: false
    }
  },
  computed: {
    disabled() {
      return this.loading || this.finished
    }
  },
  methods: {
    async load() {
      this.loading = true
      try {
        const response = await listArticleApi(
          Math.ceil(this.articles.length / 4) + 1,
          4
        )
        if (response.data.data.count === this.articles.length || response.data.data.data.len === 0) {
          this.finished = true
        } else {
          for (const article of response.data.data.data) {
            this.articles.push({
              _id: article._id,
              creation: datetimeFormatter(article.creation),
              title: article.title
            });
          }
        }
      } catch (_) {
        this.finished = true
      }
      this.loading = false
    }
  }
}
</script>
