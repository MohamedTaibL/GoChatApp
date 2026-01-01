<template>
  <div class="user-search-list" ref="scrollContainer" @scroll="handleScroll">
    <div class="user-list">
      <div 
        v-for="user in users" 
        :key="user.ID" 
        class="user-item"
        @click="$emit('selectUser', user)"
      >
        <div class="avatar-small">{{ user.Username?.charAt(0).toUpperCase() }}</div>
        <div class="user-info">
          <div class="username">{{ user.Username }}</div>
          <div class="joined-at">Joined {{ formatDate(user.CreatedAt) }}</div>
        </div>
        <span v-if="selectedUserIds.includes(user.ID)" class="checkmark">✓</span>
      </div>
      <div v-if="loading" class="loading">Loading more users...</div>
      <div v-if="!hasMore && users.length > 0" class="no-more">No more users</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '../services/api'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedUserIds: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['selectUser'])

const users = ref([])
const scrollContainer = ref(null)
const loading = ref(false)
const hasMore = ref(true)
const scrollCount = ref(0)

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'Today';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const loadUsers = async (reset = false) => {
  if (loading.value || (!hasMore.value && !reset)) return
  
  loading.value = true
  
  try {
    if (reset) {
      scrollCount.value = 0
      users.value = []
      hasMore.value = true
    }
    
    const response = await api.get('/users/search', {
      params: {
        username: props.searchQuery,
        group: scrollCount.value
      }
    })
    
    if (reset) {
      users.value = response.data.users
    } else {
      users.value = [...users.value, ...response.data.users]
    }
    
    scrollCount.value++
    
    // If we got less than 5 users, there's no more
    if (response.data.users.length < 5) {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Error loading users:', error)
  } finally {
    loading.value = false
  }
}

const handleScroll = () => {
  const container = scrollContainer.value
  if (!container) return
  
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight
  
  // Check if scrolled to bottom (with 10px threshold)
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadUsers()
  }
}

// Watch search query and reload users
watch(() => props.searchQuery, () => {
  loadUsers(true)
})

// Load initial users
loadUsers(true)
</script>

<style scoped>
.user-search-list {
  max-height: 300px;
  overflow-y: auto;
}

.user-list {
  padding: 5px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.user-item:hover {
  background: #f5f5f5;
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

.user-info {
  flex: 1;
  min-width: 0;
}

.username {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.joined-at {
  font-size: 12px;
  color: #888;
}

.checkmark {
  color: #667eea;
  font-weight: bold;
  font-size: 20px;
  flex-shrink: 0;
}

.loading, .no-more {
  text-align: center;
  padding: 10px;
  color: #666;
  font-size: 12px;
}
</style>
