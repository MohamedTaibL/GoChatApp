<template>
  <div v-if="show" class="create-group-section">
    <h4>Create Group Chat</h4>
    <input 
      type="text" 
      v-model="groupName" 
      placeholder="Group name" 
      class="group-input"
    />
    <UserSearchList 
      :searchQuery="searchQuery"
      :selectedUserIds="selectedUserIds"
      @selectUser="toggleUserSelection"
    />
    <button @click="handleCreateGroup" class="submit-group-btn">Create Group</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserSearchList from './UserSearchList.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['createGroup'])

const groupName = ref('')
const selectedUserIds = ref([])

const toggleUserSelection = (user) => {
  const index = selectedUserIds.value.indexOf(user.id)
  if (index > -1) {
    selectedUserIds.value.splice(index, 1)
  } else {
    selectedUserIds.value.push(user.id)
  }
}

const handleCreateGroup = () => {
  if (!groupName.value.trim()) {
    alert('Please enter a group name')
    return
  }
  
  if (selectedUserIds.value.length === 0) {
    alert('Please select at least one user')
    return
  }
  
  emit('createGroup', {
    name: groupName.value,
    userIds: selectedUserIds.value
  })
  
  // Reset
  groupName.value = ''
  selectedUserIds.value = []
}
</script>

<style scoped>
.create-group-section {
  padding: 15px;
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
}

.create-group-section h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.group-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

.submit-group-btn {
  width: 100%;
  padding: 8px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
}

.submit-group-btn:hover {
  background: #5568d3;
}
</style>
