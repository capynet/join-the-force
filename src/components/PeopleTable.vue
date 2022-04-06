<script setup lang="ts">
defineProps<{
  list?: []
}>()
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Home world</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="item in list">
      <td>{{ item.name }}</td>
      <td>Earth</td>
    </tr>

    </tbody>

  </table>
</template>

