<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="$emit('close')"
  >
    <!-- Conteneur du modal -->
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-blue-darker">
          Demander une évaluation pour <span class="text-blue-900">{{ pme.nomEntreprise }}</span>
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Contenu -->
      <div class="mb-6">
        <p class="text-gray-700">
          Vous allez demander une évaluation complète de
          <strong>{{ pme.nomEntreprise }}</strong> ({{ pme.secteurActivite }}, {{ pme.localisation }}).
        </p>
        <div class="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-900">
          <p class="text-sm text-blue-darker">
            <strong>Note:</strong> Un rapport PDF sera généré avec une notation détaillée (financière, gouvernance, RSE, etc.).
            Vous recevrez une notification une fois le rapport prêt (généralement sous 24h).
          </p>
        </div>

        <!-- Options d'évaluation (si besoin) -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Type d'évaluation
          </label>
          <select
            v-model="evaluationType"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="complete">Évaluation complète (recommandé)</option>
            <option value="financiere">Financière seulement</option>
            <option value="gouvernance">Gouvernance et RSE</option>
          </select>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            @click="handleConfirm"
            class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-darker transition flex items-center"
            :disabled="loading"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'En cours...' : 'Confirmer' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  pme: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.nomEntreprise && value.id;
    }
  },
});

const emit = defineEmits(['close', 'confirm']);

const evaluationType = ref('complete');
const loading = ref(false);

const handleConfirm = async () => {
  loading.value = true;
  try {
    emit('confirm', {
      pmeId: props.pme.id,
      type: evaluationType.value,
    });
  } catch (error) {
    console.error("Erreur lors de la demande d'évaluation:", error);
  } finally {
    loading.value = false;
  }
};
</script>
