<template>
  <q-page>
    <div class="row q-pa-lg">
      <div class="column q-pa-lg fitxa col-12 col-md-6">
        <div class="text-overline">Nom científic actual</div>
        <div class="text-h4 text-italic">{{planta.nom}}</div>
        <div class="text-subtitle-1"><span class="text-italic">{{planta.nomFQ}}</span> a l'herbari de Font i Quer</div>
        <div class="text-overline q-pt-md">Família</div>
        <div class="text-h5">{{planta.fam}}</div>
        <div class="text-subtitle-1">{{planta.famFQ}} a l'herbari de Font i Quer</div>
        <div class="text-overline q-pt-md">Nom vulgar</div>
        <div class="text-h5">{{planta.nomVulgar}}</div>

        <div v-if="planta.comentari" class="text-subtitle-1 q-pt-md">{{planta.comentari}}</div>
        <div class="row justify-end q-pt-lg q-gutter-md">
          <q-btn v-if="planta.linkMNB" outline tag="a" target="_blank" :href="planta.linkMNB" label="Entrada al Medi Natural de Bages"/>
          <q-btn outline tag="a" target="_blank" :href="planta.img" label="Visualitza imatge"/>
        </div>
      </div>
    </div>
    <img :src="planta.img1200" class="imgfons"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router'
import {getPlanta, Planta} from 'src/components/plantes'
import {QBtn} from 'quasar'

export default defineComponent({
  name: 'Planta',
  components: { 
    QBtn
  },
  props: {
    code: {
      type: String,
      required: true
    },
  },
  setup: (props) => {
    const planta = ref({} as Planta)
    onMounted(async () => {
      planta.value = await getPlanta(props.code)
    })
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.code !== from.params.code) {
        planta.value = await getPlanta(to.params.code as string)
      }
    })
    return { planta }
  }
});
</script>
