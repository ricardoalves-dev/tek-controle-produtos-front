<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';
import { ref } from 'vue';

type TableHeaders = VDataTable["$props"]["headers"];
type TableItems = Record<string, any>[];

defineProps<{
  nomeEntidade: string;
  colunas: TableHeaders,
  dados: TableItems,
}>();

const emit = defineEmits<{
  (e: 'abrirCadastro', id: number): void
  (e: 'excluirCadastro', id: number): void
}>();

function confirmarExclusaoCadastro(id: number) {
  if (confirm(`Deseja realmento excluir o registro de código ${id} ?`)) {
    emit('excluirCadastro', id);
  }
}

const sortBy = ref([{ key: 'id', order: 'desc' }]);
const pesquisa = ref('');

</script>

<template>
  <v-container height="100%">
    <v-text-field class="py-5" v-model="pesquisa" label="Pesquisar" prepend-inner-icon="mdi-magnify" variant="outlined"
      hide-details single-line></v-text-field>
    <v-data-table :search="pesquisa" v-model:[`sort-by`]="sortBy" style="height: 100%"
      no-data-text="Nenhum registro encontrado" :headers="colunas" :items="dados">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ nomeEntidade }}</v-toolbar-title>
          <v-btn @click="$emit('abrirCadastro', -1)">INCLUIR</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="$emit('abrirCadastro', item.id)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="confirmarExclusaoCadastro(item.id)">
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </v-container>
</template>