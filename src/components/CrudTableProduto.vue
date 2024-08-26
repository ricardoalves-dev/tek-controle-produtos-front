<script setup lang="ts">
import CrudTable from './CrudTable.vue';
import Produto from '@/models/Produto';
import ProdutoController from '@/controllers/ProdutoController';
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
  key: 'nome',
  align: 'start',
  title: 'Produto',
},
{
  key: 'preco',
  align: 'end',
  title: 'Preço',
},
{
  key: 'categoria.descricao',
  align: 'start',
  title: 'Categoria',
},
{
  key: 'actions',
  align: 'start',
  title: 'Ações',
},
];
const controller: ProdutoController = new ProdutoController();
const produtos: Ref<Produto[]> = ref([]);
const router = useRouter();

onMounted(async () => {
  await getProdutos();
});

async function getProdutos(): Promise<void> {
  produtos.value = await controller.find();
}

function abrirCadastro(id: number) {
  router.push(`produto/${id > 0 ? id : '' }`);
}

async function excluirCadastro(id: number) {
  await controller.delete(id);
  produtos.value = produtos.value.filter((produto) => produto.id !== id);
}

onErrorCaptured(error => {
  emit('showMessage', error instanceof Error ? error.message : String(error), 'erro');
})

</script>

<template>
  <CrudTable nome-entidade="Produtos" :dados="produtos" :colunas="colunas" @abrir-cadastro="abrirCadastro"
    @excluir-cadastro="excluirCadastro" />
</template>