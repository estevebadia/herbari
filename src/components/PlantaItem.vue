<template>
  <q-item clickable dense @click="click">
    <q-item-section>
      <q-item-label class="text-secondary text-italic">{{ label }}</q-item-label>
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
    labelKey: {
      type: String,
      required: true
    }
  },
  computed: {
    label(): string {
      if (this.labelKey == 'nom') {
        return this.planta.nom
      }
      else if (this.labelKey == 'nomFQ') {
        return this.planta.nomFQ
      }
      else {
        return this.planta.nomVulgar
      }
    }
  },
  methods: {
    click() {
      return this.$router.push(this.planta.code);
    }
  }
})
</script>
