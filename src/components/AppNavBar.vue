<script setup lang="ts"></script>

<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/lego/5.jpg" subtitle="Bem Vindo"
        title="Usuário X"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item to="categorias" prepend-icon="mdi-tag-text-outline" title="Categorias" value="myfiles"></v-list-item>
      <v-list-item to="produtos" prepend-icon="mdi-package-variant-closed" title="Produtos" value="shared"></v-list-item>      
    </v-list>
  </v-navigation-drawer>
</template>