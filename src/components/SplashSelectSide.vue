<script setup lang="ts">
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'

const store = useGeneralPreferencesStore();
</script>

<template>
  <div class="intro">
    <h1>Welcome warrior</h1>
    <h2>We need to know which side is stronger on you. please tell us</h2>
  </div>

  <div class="actions">
    <button class="btn btn-light" @click="store.setSide('light')">Light side</button>
    <button class="btn btn-dark" @click="store.setSide('dark')">Dark side</button>
  </div>

  {{ store.side }}
</template>

<style scoped>
.intro {
  margin-bottom: 50px;
}

h1 {
  font-weight: bold;
  text-align: center;
}

h2 {
  text-align: center;
}

.actions {
  margin: 0 auto;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100px;
}

@media (min-width: 1280px) {
  .actions {
    flex-direction: row;
    min-height: auto;
    max-width: 320px;
  }
}

.actions .btn {
  padding: 10px 40px;
  border-radius: 0;
  border-style: solid;
  white-space: nowrap;
}

.actions .btn.btn-light {
  background: #ebebeb;
}

.actions .btn.btn-dark {
  background: #000;
  color: white;
}
</style>