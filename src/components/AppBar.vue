<script setup lang="ts">

defineProps<{
  appName: string,
}>();

</script>

<template>
  <v-app-bar color="primary" :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ appName}}</v-app-bar-title>
  </v-app-bar>
</template>