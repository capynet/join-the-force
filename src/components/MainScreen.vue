<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'

const store = useGeneralPreferencesStore();
</script>

<template>

  <main :class="{'light-side' : store.side === 'light', 'dark-side' : store.side === 'dark', }">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/people">People</RouterLink>
          <!--        <SearchPrefetchedPersons />-->
          <!--        <SearchPersonsFromAPI />-->
        </nav>
      </div>
    </header>

    <RouterView/>
  </main>
</template>

<style scoped>
main.light-side {
  background: #fff;
  color: #000;
}

main.light-side a {
  color: #000;
}

main.dark-side {
  background: #000;
  color: #fff;
}

main.dark-side a {
  color: #fff;
}
</style>