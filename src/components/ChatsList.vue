<template>
  <div class="chats-list">
    <div 
      v-for="chat in chats" 
      :key="chat.id" 
      class="chat-item"
      @click="$emit('selectChat', chat)"
      :class="{ active: selectedChatId === chat.id }"
    >
      <div class="avatar-small">{{ chat.name.charAt(0).toUpperCase() }}</div>
      <div class="chat-info">
        <h4>{{ chat.name }}</h4>
        <p class="last-message">{{ chat.lastMessage || 'No messages yet' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chats: {
    type: Array,
    required: true
  },
  selectedChatId: {
    type: [String, Number],
    default: null
  }
})

defineEmits(['selectChat'])
</script>

<style scoped>
.chats-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.chat-item:hover {
  background: #f5f5f5;
}

.chat-item.active {
  background: #e8eaf6;
}

.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

.chat-info {
  flex: 1;
  overflow: hidden;
}

.chat-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.last-message {
  margin: 0;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
