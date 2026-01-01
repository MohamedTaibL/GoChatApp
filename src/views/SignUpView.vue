<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            required
          />
        </div>


        <button type="submit" class="submit-btn">Sign Up</button>
      </form>

      <p class="switch-text">
        Already have an account? 
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const formData = ref({
  email: '',
  username: '',
  password: '',

})

const handleSignUp = async () => {
  try {
    const { email, username, password } = formData.value
    const response = await api.post('/signup', { email, username, password })
    alert("Signed Up successfuly ! ")
    
  } catch (error) {
    console.error('SignUp error:', error.response?.data || error.message)
    
  }
}
  
  

</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.switch-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.switch-text a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.switch-text a:hover {
  text-decoration: underline;
}
</style>
