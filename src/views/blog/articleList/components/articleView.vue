<template>
  <el-button style="display: block; width: calc(100% - 40px); margin: 20px" @click="goDetail(pk)">
    <p style="font-size: 16px;line-height: 0;text-align: left">{{ title }}</p>
    <p style="font-size: 12px;color: gray;float: right;line-height: 0">{{ time }}</p>
  </el-button>
</template>

<script>
export default {
  name: "ArticleView",
  props: {
    pk: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goDetail(v) {
      this.$router.push(`/article/detail/${v}`)
    }
  }
}
</script>

<style scoped>

</style>
