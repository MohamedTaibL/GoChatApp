<template>
  <div class="chat-area">
    <div v-if="selectedChat" class="chat-content">
      <div class="chat-header">
        <h2>{{ selectedChat.name }}</h2>
      </div>
      <div class="messages">
        <!-- Messages will go here -->
      </div>
      <div class="message-input-area">
        <input 
          type="text" 
          v-model="messageText"
          @keyup.enter="sendMessage"
          placeholder="Type a message..." 
          class="message-input"
        />
        <button @click="sendMessage" class="send-btn">Send</button>
      </div>
    </div>
    <div v-else class="no-chat-selected">
      <p>Select a chat to start messaging</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  selectedChat: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['sendMessage'])

const messageText = ref('')

const sendMessage = () => {
  if (!messageText.value.trim()) return
  
  emit('sendMessage', {
    chatId: props.selectedChat.id,
    message: messageText.value
  })
  
  messageText.value = ''
}
</script>

<style scoped>
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #e5ddd5;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 15px 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message-input-area {
  padding: 15px;
  background: white;
  display: flex;
  gap: 10px;
}

.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.message-input:focus {
  border-color: #667eea;
}

.send-btn {
  padding: 10px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.send-btn:hover {
  background: #5568d3;
}

.no-chat-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 18px;
}
</style>
