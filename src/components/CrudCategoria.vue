<script setup lang="ts">
import CategoriaController from '@/controllers/CategoriaController';
import Crud from './Crud.vue';
import Categoria from '@/models/Categoria';
import { onMounted, ref, computed, onErrorCaptured } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

let id: number = -1;
const categoria: Ref<Categoria> = ref(new Categoria());
const controller: CategoriaController = new CategoriaController();
const router = useRouter();
const categoriaBackup: Categoria = new Categoria();
const registroAlterado = computed(() => {
  return JSON.stringify(categoria.value) !== JSON.stringify(categoriaBackup);
});

const emit = defineEmits<{
  (e: 'showMessage', mensagem: string, tipo: string): void
}>();

onMounted(() => {
  const url = new URL(window.location.href);
  id = parseInt(url.pathname.split('/').pop() || '');

  if (id > 0) {
    getCategoria(id);
  }
});

async function salvarCategoria(): Promise<void> {
  if (id > 0) {
    categoria.value = await controller.update(categoria.value);
  } else {
    categoria.value = await controller.create(categoria.value);
  }

  emit('showMessage', 'Categoria salva com sucesso', 'sucesso');
  router.push('/categorias');
}

async function getCategoria(id: number): Promise<void> {
  categoria.value = await controller.findById(id);
  Object.assign(categoriaBackup, categoria.value);
}

function cancelarCadastro() {
  Object.assign(categoria.value, categoriaBackup);
}

function sairCadastro() {
  router.push('/categorias');
}

onErrorCaptured(error => {
  emit('showMessage', error instanceof Error ? error.message : String(error), 'erro');
})

</script>

<template>
  <Crud :registro-alterado="registroAlterado" nome-cadastro="Cadastro de Categorias" @sair-cadastro="sairCadastro"
    @salvar-cadastro="salvarCategoria" @cancelar-cadastro="cancelarCadastro">
    <template #crud>
      <v-text-field density="compact" counter="30" v-model="categoria.descricao" :rules="[Categoria.descricaoRule]"
        label="Descrição"></v-text-field>
    </template>
  </Crud>
</template>