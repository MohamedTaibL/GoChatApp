<template>
  <div class="home-container">
    <div class="sidebar">
      <UserHeader 
        :username="username"
        @toggleCreateGroup="showCreateGroup = !showCreateGroup"
      />
      
      <SearchBar v-model="searchQuery" />
      
      <CreateGroupChat 
        :show="showCreateGroup"
        :searchQuery="searchQuery"
        @createGroup="handleCreateGroup"
      />
      
      <ChatsList 
        :chats="filteredChats"
        :selectedChatId="selectedChat?.id"
        @selectChat="selectChat"
      />
    </div>

    <ChatArea 
      :selectedChat="selectedChat"
      @sendMessage="handleSendMessage"
    />
    
    <UserSearchPanel />
  </div>
</template>

<script setup>
import api from '../services/api';
import { ref, onMounted, computed } from 'vue';
import UserHeader from '../components/UserHeader.vue';
import SearchBar from '../components/SearchBar.vue';
import CreateGroupChat from '../components/CreateGroupChat.vue';
import ChatsList from '../components/ChatsList.vue';
import ChatArea from '../components/ChatArea.vue';
import UserSearchPanel from '../components/UserSearchPanel.vue';

const username = ref('');
const searchQuery = ref('');
const chats = ref([]);
const selectedChat = ref(null);
const showCreateGroup = ref(false);

const filteredChats = computed(() => {
  if (!searchQuery.value) {
    return chats.value;
  }
  return chats.value.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectChat = (chat) => {
  selectedChat.value = chat;
};

const handleCreateGroup = async (groupData) => {
  try {
    const response = await api.post('/groups/create', groupData);
    console.log('Group created:', response.data);
    showCreateGroup.value = false;
    // Refresh chats list
    // await loadChats();
  } catch (error) {
    console.error('Error creating group:', error);
  }
};

const handleSendMessage = async (messageData) => {
  try {
    const response = await api.post('/messages/send', messageData);
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(async () => {
  try {
    // Get user data from server
    const response = await api.get('/user/me');
    username.value = response.data.username;
    
    // Get chats
    // const chatsResponse = await api.get('/chats');
    // chats.value = chatsResponse.data;
  } catch (error) {
    console.error('Error loading data:', error);
  }
});
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

.sidebar {
  width: 350px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}
</style>