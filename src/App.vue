<template>
  <v-app @show-message="mostrarMensagem">    
    <AppBar app-name="Gerenciamento de Produtos" />    
    <v-main>
      <router-view @show-message="mostrarMensagem"/>
    </v-main>
    <AppFooter />
    <AppNavBar />
    <v-snackbar id="appSnackbar" v-model="mostrarSnackbar" timeout="2000" :color="corSnackbar">
    {{ mensagemSnackbar }}
  </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './components/AppBar.vue';
import AppFooter from './components/AppFooter.vue';
import AppNavBar from './components/AppNavBar.vue';
import { ref, computed} from 'vue';

const mostrarSnackbar = ref(false);
const mensagemSnackbar = ref('');
const tipoMensagemSnackbar = ref('sucesso');
const corSnackbar = computed(() => {
  return tipoMensagemSnackbar.value === 'sucesso' ? 'green-darken-2' : 'red-darken-2';
});

function mostrarMensagem(mensagem: string, tipo: string) {
  mensagemSnackbar.value = mensagem;
  tipoMensagemSnackbar.value = tipo;
  mostrarSnackbar.value = true;
}
</script>

<style>
#appSnackbar > div {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
