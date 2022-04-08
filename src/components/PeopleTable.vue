<script setup lang="ts">
import {RouterLink} from 'vue-router'
import type Person from "@/models/Person";

defineProps<{
  list: Person[]
}>()

</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Details</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="item in list" :key="item.id">
      <td>{{ item.name }}</td>
      <td>
        <RouterLink :to="{ name: 'peopleFile', params: { id: item.id }}">View in detail</RouterLink>
      </td>
    </tr>

    </tbody>

  </table>
</template>

