<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
function save() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <main style="padding: 32px; display: flex; gap: 12px; font-family: system-ui">
    <VdButton :loading="loading" @click="save">Save</VdButton>
    <VdButton variant="outline">Outline</VdButton>
    <VdButton variant="ghost">Ghost</VdButton>
    <VdButton variant="danger" size="sm">Delete</VdButton>
  </main>
</template>
