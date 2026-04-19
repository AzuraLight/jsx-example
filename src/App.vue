<script setup lang="ts">
import QuizBoard from './components/QuizBoard.vue';
</script>

<template>
  <div class="app-container">
    <h1>Vue 3 + JSXGraph 실습</h1>
    <!-- <GraphBoard /> -->
    <!-- <InputBoard /> -->
    <QuizBoard />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

h1 {
  color: #333;
  margin: 0;
}
</style>
