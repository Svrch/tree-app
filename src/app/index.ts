import { createApp } from 'vue'
import App from './App.vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

export const app = createApp(App)
  .component('AgGridVue', AgGridVue)

