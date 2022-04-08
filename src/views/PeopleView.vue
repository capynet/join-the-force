<script setup lang="ts">
import {useDataSourceStore} from '@/stores/dataSource'
import PeopleTable from '@/components/PeopleTable.vue'

const store = useDataSourceStore();
store.getPeople(store.currentPage)
</script>

<template>
  <h1>People</h1>
  <h2>Showing page {{ store.currentPage }}</h2>
  <h3>Total entries: {{ store.people.count }}</h3>

  <PeopleTable :list="store.people.results"/>

  <div class="actions">
    <button v-if="store.people.prevId" @click="store.getPeople(store.people.prevId)">Prev</button>
    <button v-if="store.people.nextId" @click="store.getPeople(store.people.nextId)">Next</button>
  </div>

</template>

<style scoped>
.actions {
  display: flex;
}
</style>

