<script setup lang="ts">
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'

const store = useGeneralPreferencesStore();
</script>

<template>
  <h1>Welcome warrior</h1>
  <h2>We need to know which side is stronger on you. please tell us</h2>

  <button @click="store.setSide('light')">Light side</button>
  <button @click="store.setSide('dark')">Dark side</button>

  {{ store.side }}
</template>

