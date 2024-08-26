<script setup lang="ts">

const props = defineProps<{
  nomeCadastro: string;
  registroAlterado: boolean
}>();

const emit = defineEmits<{
  (e: 'salvarCadastro'): void
  (e: 'cancelarCadastro'): void
  (e: 'sairCadastro'): void  
}>();

function confirmarCancelarCadastro() {
  if ((props.registroAlterado) && (confirm('Deseja realmente cancelar as edições realizadas?'))) {
    emit('cancelarCadastro');
  }
}

function confirmarSaidaCadastro() {
  if ((props.registroAlterado) && (!confirm('Deseja realmente sair do cadastro?'))) {
    return;
  }

  emit('sairCadastro');
}

</script>

<template>
  <v-container max-width="600">
    <v-card>
      <v-toolbar color="primary" density="compact" :title="nomeCadastro">
        <v-spacer></v-spacer>
        <v-btn icon @click="confirmarSaidaCadastro">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form @submit.prevent>
        <v-card-text>
          <slot name="crud"></slot>
        </v-card-text>

        <v-card-actions class="d-flex justify-end px-5">
          <v-btn :disabled="!registroAlterado" variant="text" color="red-darken-1" @click="confirmarCancelarCadastro">
            CANCELAR
          </v-btn>
          <v-btn :disabled="!registroAlterado" type="submit" variant="elevated" color="green-darken-1"
            @click="$emit('salvarCadastro')">
            SALVAR
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card-actions .v-btn {
  width: 7rem;
}
</style>