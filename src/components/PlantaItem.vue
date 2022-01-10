<template>
  <q-item clickable dense @click="click">
    <q-item-section>
      <q-item-label class="text-secondary">{{ planta.nomFQ }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {Planta} from 'src/components/plantes'

export default defineComponent({
  name: 'PlantaItem',
  props: {
    planta: {
      type: Object as PropType<Planta>,
      required: true
    },
  },
  methods: {
    click() {
      return this.$router.push(this.planta.code);
    }
  }
})
</script>
