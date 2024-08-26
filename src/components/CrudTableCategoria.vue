<script setup lang="ts">
import CrudTable from './CrudTable.vue';
import CategoriaController from '@/controllers/CategoriaController';
import Categoria from '@/models/Categoria';
import type { Ref } from 'vue';
import { onMounted, ref, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';
import type { VDataTable } from 'vuetify/components';

const emit = defineEmits<{
  (e: 'showMessage', mensagem: string, tipo: string): void
}>();

type TableHeaders = VDataTable["$props"]["headers"];

const colunas: TableHeaders = [{
  key: 'id',
  align: 'end',
  title: 'Código',
},
{
  key: 'descricao',
  align: 'start',
  title: 'Descrição',
},
{
  key: 'actions',
  align: 'start',
  title: 'Ações',
},
];
const controller: CategoriaController = new CategoriaController();
const categorias: Ref<Categoria[]> = ref([]);
const router = useRouter();

onMounted(async () => {
  await getCategorias();
});

async function getCategorias(): Promise<void> {
  categorias.value = await controller.find();
}


function abrirCadastro(id: number) {
  router.push(`categoria/${id > 0 ? id : ''}`);
}

async function excluirCadastro(id: number) {
  await controller.delete(id);
  categorias.value = categorias.value.filter((categoria) => categoria.id !== id);
}

onErrorCaptured(error => {
  emit('showMessage', error instanceof Error ? error.message : String(error), 'erro');
})

</script>

<template>
  <CrudTable nome-entidade="Categorias" :dados="categorias" :colunas="colunas" @abrir-cadastro="abrirCadastro"
    @excluir-cadastro="excluirCadastro" />
</template>