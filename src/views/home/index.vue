<template>
  <div style="padding: 20px">
    <el-button icon="el-icon-edit" type="primary" @click="goUrl('/article/edit')">
      发表博文
    </el-button>
    <el-button icon="el-icon-view" type="primary" @click="goUrl('/article/index')">
      浏览博文
    </el-button>
    <el-divider />
    <el-button icon="el-icon-cloudy" type="primary" @click="goUrl('/fs/index')">
      在线存储
    </el-button>
    <el-divider />
    <el-button icon="el-icon-chat-dot-round" type="primary" @click="goUrl('/chat/index')">
      沟通留言
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    goUrl(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
