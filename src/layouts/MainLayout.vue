<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          color="secondary"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-secondary cursor-pointer" @click="$router.push('/')">
          Flora del Bages - Herbari de Pius Font i Quer
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      show-if-above
      bordered
    >
      <q-list>
        <q-input bottom-slots v-model="searchText" :dark="true" label="Cerca" class="q-px-md text-secondary">
          <template v-slot:append>
            <q-icon v-if="searchText !== ''" name="close" @click="searchText = ''" class="cursor-pointer" color="secondary"/>
            <q-icon name="search" color="secondary"/>
          </template>
        </q-input>
        <div class="text-overline q-px-md text-secondary">Ordena per:</div>
        <q-select v-model="indexTab" :options="tabOptions" :dark="true" color="secondary" class="q-mx-md q-mb-md selectIndex"/>
        <PlantaItem
          v-for="planta in filteredPlantes"
          :key="planta.code"
          :planta="planta"
          :label-key="indexTab.value"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import PlantaItem from 'src/components/PlantaItem.vue'
import { defineComponent, ref, onMounted, computed } from 'vue'
import {Planta, getPlantes, normalizeQuery} from 'src/components/plantes'

export default defineComponent({
  name: 'MainLayout',

  components: {
    PlantaItem
  },

  setup () {
    // Drawer
    const leftDrawerOpen = ref(false)
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    const tabOptions=[
      {
        label:'NOM CIENTÍFIC FONT I QUER',
        value:'nomFQ'
      }, 
      {
        label:'NOM CIENTÍFIC ACTUAL',
        value:'nom'
      },
      {
        label: 'NOM VULGAR',
        value: 'nomVulgar'
      }
    ]
    const indexTab = ref(tabOptions[0])
    
    // Plantes
    const plantes = ref([] as Planta[])
    onMounted(async () => {
      try {
        plantes.value = await getPlantes()
      } catch (e) {
        console.error(e)
      }
    })

    // Search
    const searchText = ref('')
    const filteredPlantes = computed(() => {
      const query = searchText.value.trim()
      let filtered : Planta[]
      // Search
      if (query == '') {
        filtered = plantes.value
      } else {
        filtered = plantes.value.filter(
          planta => planta.search.includes(normalizeQuery(query))
        )
      }
      // Sort
      const sortKey = indexTab.value.value;
      if (sortKey == 'nom') {
        filtered.sort((a,b) => a.nom.localeCompare(b.nom))
      }
      else if (sortKey == 'nomFQ') {
        filtered.sort((a,b) => a.nomFQ.localeCompare(b.nomFQ))
      }
      else if (sortKey == 'nomVulgar') {
        filtered.sort((a,b) => a.nomVulgar.localeCompare(b.nomVulgar))
      }
      return filtered
    })


    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      indexTab,
      tabOptions,

      plantes,

      searchText,
      filteredPlantes      
    }
  }
})
</script>
<style lang="scss">

.text-wrap {
  white-space: normal;
}
.selectIndex span{
  color: $secondary !important;
}
</style>