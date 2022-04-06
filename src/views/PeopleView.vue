<script setup lang="ts">
import {useDataSourceStore} from '@/stores/dataSource'
import PeopleTable from '@/components/PeopleTable.vue'

const store = useDataSourceStore();
store.getPeople()
</script>

<template>
  <div class="about">
    <h1>People</h1>
    <h2>There are {{ store.people.count }} registered.</h2>
    <PeopleTable :list="store.people.results"/>
  </div>
</template>

