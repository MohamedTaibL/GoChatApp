<template>
  <div class="user-header">
    <div class="user-info">
      <div class="avatar">{{ username.charAt(0).toUpperCase() }}</div>
      <h3>{{ username }}</h3>
    </div>
    <button class="create-group-btn" @click="$emit('toggleCreateGroup')">
      + New Group
    </button>
  </div>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    required: true
  }
})

defineEmits(['toggleCreateGroup'])
</script>

<style scoped>
.user-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
}

.create-group-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.create-group-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
