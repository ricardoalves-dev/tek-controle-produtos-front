<script setup lang="ts">
import Crud from '@/components/Crud.vue';
import Produto from '@/models/Produto';
import Categoria from '@/models/Categoria';
import type { Ref } from 'vue';
import { onMounted, ref, computed, onErrorCaptured } from 'vue';
import CategoriaController from '@/controllers/CategoriaController';
import ProdutoController from '@/controllers/ProdutoController';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'showMessage', mensagem: string, tipo: string): void
}>();

let id: number = -1;
const produtoBackup: Produto = new Produto();
const registroAlterado = computed(() => {
  return JSON.stringify(produto.value) !== JSON.stringify(produtoBackup);
});
const categorias: Ref<Categoria[]> = ref([]);
const categoriaController = new CategoriaController();

const produto: Ref<Produto> = ref(new Produto());
const produtoController = new ProdutoController;

const router = useRouter();

onMounted(() => {
  getCategorias();
  getProduto();
})

async function getProduto() {
  const url = new URL(window.location.href);
  id = parseInt(url.pathname.split('/').pop() || '');

  if (id > 0) {
    produto.value = await produtoController.findById(id);
    Object.assign(produtoBackup, produto.value);
  }
}

async function getCategorias() {
  categorias.value = await categoriaController.find();
}

function cancelarCadastro() {
  Object.assign(produto.value, produtoBackup);
}

function sairCadastro() {
  router.push('/produtos');
}

async function salvarProduto(): Promise<void> {
  if (id > 0) {
    produto.value = await produtoController.update(produto.value);
  } else {
    produto.value = await produtoController.create(produto.value);
  }
  
  emit('showMessage', 'Produto salvo com sucesso', 'sucesso');
  router.push('/produtos');
}

onErrorCaptured(error => {
  emit('showMessage', error instanceof Error ? error.message : String(error), 'erro');
})

</script>

<template>
  <Crud @salvar-cadastro="salvarProduto" @cancelar-cadastro="cancelarCadastro" @sair-cadastro="sairCadastro"
    :registro-alterado="registroAlterado" nome-cadastro="Cadastro de Produtos">
    <template #crud>
      <v-text-field density="compact" counter="30" v-model="produto.nome" :rules="[Produto.nomeRule]"
        label="Nome"></v-text-field>

      <div class="container-flex d-flex">
        <v-text-field max-width="150" density="compact" type="number" v-model="produto.preco"
          :rules="[Produto.precoRule]" label="Preco"></v-text-field>

        <v-combobox density="compact" label="Categoria" :items="categorias" item-value="id" item-title="descricao"
          v-model="produto.categoria"></v-combobox>
      </div>

      <v-textarea density="compact" counter="100" v-model="produto.descricao" :rules="[Produto.descricaoRule]"
        label="Descrição"></v-textarea>

      <div class="d-flex align-center flex-column">
        <v-text-field width="100%" density="compact" counter="100" v-model="produto.imagem"
          :rules="[Produto.imagemRule]" label="URL Imagem"></v-text-field>
        <v-img width="150" height="150" :src="`${produto.imagem || 'https://demofree.sirv.com/nope-not-here.jpg'}`"
          alt="`imagem do produto ${produto.nome}`">
        </v-img>
      </div>

    </template>
  </Crud>
</template>

<style scoped>
.container-flex {
  gap: .5rem;
}
</style>