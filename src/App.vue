<script setup lang="ts">
import SplashSelectSide from '@/components/SplashSelectSide.vue'
import MainScreen from '@/components/MainScreen.vue'
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'

const store = useGeneralPreferencesStore();
</script>

<template>
  <SplashSelectSide v-if="!store.side"/>
  <MainScreen v-if="store.side"/>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
