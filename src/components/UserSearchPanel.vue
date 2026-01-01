<template>
  <div class="user-search-panel">
    <div class="panel-header">
      <h3>Find Users</h3>
    </div>
    
    <div class="search-section">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search for users..." 
        class="search-input"
      />
    </div>
    
    <UserSearchList 
      :searchQuery="searchQuery"
      :selectedUserIds
      @selectUser="handleSelectUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserSearchList from './UserSearchList.vue';

const searchQuery = ref('');
const selectedUserIds = ref([]);

const handleSelectUser = (user) => {
  console.log('Selected user:', user);
  // You can emit this up or handle starting a chat with this user
};
</script>

<style scoped>
.user-search-panel {
  width: 350px;
  background: white;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.panel-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.search-section {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #667eea;
}
</style>
