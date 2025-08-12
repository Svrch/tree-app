<script setup lang="ts">
import { ref } from 'vue'
import type { TreeItem } from '../types'
import { TreeStore } from '../stores/TreeStore.ts'

// Исходные данные
const rawItems: TreeItem[] = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064lcee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '91064lcee', label: 'Айтем 4' },
  { id: 5, parent: '91064lcee', label: 'Айтем 5' },
  { id: 6, parent: '91064lcee', label: 'Айтем 6' },
  { id: 7, parent: 3, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' },
]

// Экземпляр класса
const treeStore = new TreeStore(rawItems)

// Настройка вложенности
const autoGroupColumnDef = ref({
  headerName: 'Категория',
  minWidth: 300,
  cellRendererParams: {
    suppressCount: true,
    innerRenderer: (params: any) => {
      const isGroup = treeStore.getAllChildren(params.data.id).length
      return `${isGroup ? 'Группа' : 'Элемент'}`
    },
  },
})

// Колонки
const columnDefs = ref([
  {
    headerName: '№ п/п',
    valueGetter: (params) => params.node.rowIndex + 1,
  },
  { field: 'label', headerName: 'Название' },
])

// Определение пути до родителя
const getDataPath = (data: TreeItem) => {
  return treeStore.getAllParents(data.id).map((item) => item.id).reverse()
}

</script>

<template>
  <AgGridVue
    style="width: 100%; height: 500px;"
    :rowData="treeStore.getAll()"
    :columnDefs="columnDefs"
    :treeData="true"
    :autoGroupColumnDef="autoGroupColumnDef"
    :getDataPath="getDataPath"
    :groupDefaultExpanded="-1"
  />
</template>

<style scoped>

</style>
