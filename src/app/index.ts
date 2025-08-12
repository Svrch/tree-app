import { createApp } from 'vue'
import App from './App.vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { TreeDataModule } from 'ag-grid-enterprise'

ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule])

export const app = createApp(App)
  .component('AgGridVue', AgGridVue)

