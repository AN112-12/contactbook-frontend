<template>
  <div class="chatbox-wrapper">
    <button class="chatbox-toggle btn btn-primary" @click="toggleOpen">
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-comment-dots'"></i>
    </button>

    <div class="chatbox-panel" v-if="isOpen">
      <div class="chatbox-header">
        <span>Hỗ trợ trực tuyến</span>
        <i class="fas fa-times close-btn" @click="toggleOpen"></i>
      </div>

      <div class="chatbox-body" ref="chatBody">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="chatbox-message"
          :class="msg.sender === 'me' ? 'me' : 'them'"
        >
          <span>{{ msg.text }}</span>
        </div>
        <p v-if="messages.length === 0" class="text-muted text-center mt-3">
          Chưa có tin nhắn nào.
        </p>
      </div>

      <div class="chatbox-footer">
        <input
          type="text"
          class="form-control"
          placeholder="Nhập tin nhắn..."
          v-model="newMessage"
          @keyup.enter="send"
        />
        <button class="btn btn-primary btn-sm" @click="send">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ChatService from "@/services/chat.service";

export default {
  name: "ChatBox",
  data() {
    return {
      isOpen: false,
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) this.loadMessages();
    },
    async loadMessages() {
      try {
        this.messages = await ChatService.getMessages();
        this.scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    },
    async send() {
      const text = this.newMessage.trim();
      if (!text) return;

      const localMsg = { id: Date.now(), text, sender: "me" };
      this.messages.push(localMsg);
      this.newMessage = "";
      this.scrollToBottom();

      try {
        await ChatService.sendMessage({ text });
      } catch (error) {
        console.log(error);
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const body = this.$refs.chatBody;
        if (body) body.scrollTop = body.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.chatbox-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.chatbox-toggle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.3em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
.chatbox-panel {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 320px;
  height: 420px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chatbox-header {
  background: #343a40;
  color: #fff;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-btn {
  cursor: pointer;
}
.chatbox-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f8f9fa;
}
.chatbox-message {
  margin-bottom: 8px;
  display: flex;
}
.chatbox-message span {
  padding: 6px 10px;
  border-radius: 12px;
  max-width: 75%;
  word-wrap: break-word;
}
.chatbox-message.me {
  justify-content: flex-end;
}
.chatbox-message.me span {
  background: #007bff;
  color: #fff;
}
.chatbox-message.them span {
  background: #e9ecef;
  color: #000;
}
.chatbox-footer {
  display: flex;
  padding: 8px;
  border-top: 1px solid #dee2e6;
  gap: 6px;
}
</style>