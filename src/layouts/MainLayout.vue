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

        <PlantaItem
          v-for="planta in filteredPlantes"
          :key="planta.code"
          :planta="planta"
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
import {Planta, getPlantes} from 'src/components/plantes'



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
      if (query == '') {
        filtered = plantes.value
      } else {
        filtered = plantes.value.filter(
          planta => planta.search.includes(query.toLowerCase())
        )
      }
      filtered.sort((a,b) => a.nomFQ.localeCompare(b.nomFQ))
      console.log(filtered.length)
      return filtered
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer,

      plantes,

      searchText,
      filteredPlantes      
    }
  }
})
</script>
