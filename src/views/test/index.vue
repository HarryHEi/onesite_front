<template>
  <div>
    <el-card>
      <div slot="header">
        {{ name }}
      </div>
      <div class="message-box">
        {{messages}}
      </div>
      <div style="margin-top: 20px">
        <el-input type="textarea"
                  v-model="inputMessage"
                  class="edit-input-block"
                  @keydown.enter.native="changeLine"
                  @keyup.enter.native="sendMessage" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { chatHistoryApi } from "@/api/chat";

export default {
  name: "ChatIndex",
  data() {
    return {
      conn: null,
      messages: "",
      inputMessage: "",
    };
  },
  computed: {
    ...mapGetters(["username", "name", "token"]),
  },
  destroyed() {
    if (this.conn) {
      this.conn.close();
    }
  },
  mounted() {
    this.doInit()
  },
  methods: {
    async doInit() {
      await this.loadHistory();
      await this.initConnection();
    },
    initConnection() {
      // let host = location.host
      // if (host.search('localhost') >= 0) {
      //   host = '127.0.0.1:8000'
      // }
      // let protocol = 'wss'
      // if (location.protocol === 'http:') {
      //   protocol = 'ws'
      // }
      // this.conn = new WebSocket(`${protocol}://${host}/ws/v1/chat?token=${this.token}`);
      this.conn = new WebSocket(
        `wss://pipages.byherui.com/ws/v1/chat?token=${this.token}`
      );
      this.conn.onOpen = this.onConnectionOpen;
      this.conn.onmessage = this.onConnectionMessage;
      this.conn.onClose = this.onConnectionClose;
    },
    onConnectionOpen() {
      console.log("Connected");
    },
    onConnectionMessage(event) {
      const data = JSON.parse(event.data);

      let src = "";
      if (data.code === 0) {
        src = "系统";
      } else {
        src = data.src;
      }

      this.messages = `${this.messages}${src}: ${data.data}\n`;
    },
    onConnectionClose() {
      this.initConnection();
    },
    async loadHistory() {
      const response = await chatHistoryApi()
      const data = response.data.data || []
      for (const d of data.reverse()) {
        this.messages = `${this.messages}${d.src}: ${d.data}\n`;
      }
      if (data.length > 0) {
        this.messages = `${this.messages}\n-------  以上是历史消息-------\n\n`;
      }
    },
    changeLine(event) {
      if (event.shiftKey) {
        // do default
        return;
      }
      // prevent default
      event.returnValue = false;
    },
    sendMessage(event) {
      if (event.ctrlKey || event.shiftKey) {
        return;
      }
      if (this.conn && this.inputMessage) {
        this.messages = `${this.messages}${this.name}(${this.username}): ${this.inputMessage}\n`;
        try {
          this.conn.send(this.inputMessage);
        } catch (_) {
          this.initConnection();
        }
        this.inputMessage = "";
      }
    },
  },
};
</script>

<style>
.readonly-input-block .el-textarea__inner {
  font-size: 14px;
  font-weight: bolder;
  height: 60vh;
  white-space: pre-line;
}
.message-box {
  padding: 1vh 2vh;
  border: 1px rgba(143, 143, 143, 0.5) solid;
  font-size: 14px;
  font-weight: bolder;
  height: 60vh;
  white-space: pre-line;
  line-height: 1.5;
  color: rgb(80, 80, 80);
}
.edit-input-bloc .el-textarea__inner {
  font-size: 14px;
  font-weight: bolder;
  height: 60vh;
}
</style>

<style scoped>
</style>
