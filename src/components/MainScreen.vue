<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'

const store = useGeneralPreferencesStore();
</script>

<template>

  <main :class="{'light-side' : store.side === 'light', 'dark-side' : store.side === 'dark', }">
    <div class="inner-content">
      <header>
        <div class="wrapper">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/people">People</RouterLink>
          </nav>
        </div>
      </header>

      <RouterView/>
    </div>
  </main>
</template>

<style scoped>

</style>