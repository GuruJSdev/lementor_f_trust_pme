<template>
  <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-bold text-blue-darker">{{ pme.nomEntreprise }}</h3>
        <p class="text-gray-600">{{ pme.secteurActivite }} • {{ pme.localisation }}</p>
        <p class="mt-1 text-sm">CA: {{ formatCurrency(pme.chiffreAffaires) }} • {{ pme.nombreEmployes }} employés</p>
        <p class="mt-1 text-sm">Dirigé par: {{ pme.dirigeantNom }}</p>
      </div>
      <div class="flex space-x-1">
        <span v-if="pme.rapportFinancier" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Rapport OK</span>
        <span v-if="pme.certification" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Certifié</span>
      </div>
    </div>
    <div class="mt-3 flex space-x-2">
      <button @click="$emit('edit')" class="px-3 py-1 bg-blue-100 text-blue-900 rounded hover:bg-blue-200 text-sm">
        Modifier
      </button>
      <button @click="$emit('evaluate')" class="px-3 py-1 bg-green-100 text-green-900 rounded hover:bg-green-200 text-sm">
        Évaluer
      </button>
      <button @click="$emit('delete')" class="px-3 py-1 bg-red-100 text-red-900 rounded hover:bg-red-200 text-sm">
        Supprimer
      </button>
    </div>
    <div v-if="pme.lastEvaluation" class="mt-3 text-sm">
      <p>Dernière évaluation:
        <span class="font-medium">{{ formatDate(pme.lastEvaluation.date) }}</span>
        <span class="ml-2 text-blue-600">Note: {{ pme.lastEvaluation.score }}/100</span>
      </p>
      <a :href="pme.lastEvaluation.fileUrl" target="_blank" class="text-blue-600 hover:underline text-sm">
        Voir le rapport
      </a>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from '../utils/formatter';

defineProps({
  pme: Object,
});

defineEmits(['edit', 'evaluate', 'delete']);
</script>
