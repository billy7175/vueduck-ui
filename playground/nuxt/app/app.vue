<template>
  <main style="padding: 32px; display: flex; gap: 12px; font-family: system-ui">
    <!-- No imports: auto-registered by vueduck-ui/nuxt -->
    <VdButton>Nuxt Solid</VdButton>
    <VdButton variant="outline">Outline</VdButton>
    <VdButton :as="NuxtLink" to="/" variant="ghost">NuxtLink</VdButton>
  </main>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
</script>
