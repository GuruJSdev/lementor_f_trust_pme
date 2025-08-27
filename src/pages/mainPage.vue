<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <!-- En-tête modernisé -->
    <div class="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-indigo-900/5"></div>
      <div class="relative px-6 py-8">
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div class="space-y-2">
            <h1 class="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
              TrustPME
            </h1>
            <p class="text-gray-600 font-medium">Gérez et évaluez vos petites et moyennes entreprises</p>
          </div>
          <button
            @click="openPmeForm()"
            class="group relative px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center font-semibold"
          >
            <div class="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 relative z-10" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="relative z-10">Ajouter une PME</span>
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 py-8">
      <!-- Dashboard Cards avec animations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-bl-2xl rounded-tr-2xl"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-3">
              <p class="text-gray-500 text-sm font-medium">Total PME</p>
              <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
            <p class="text-3xl font-black text-blue-900 mb-1">{{ pmeStore.pmes.length }}</p>
            <div class="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
        </div>

        <div class="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-bl-2xl rounded-tr-2xl"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-3">
              <p class="text-gray-500 text-sm font-medium">Évaluations ce mois</p>
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <p class="text-3xl font-black text-indigo-900 mb-1">{{ evaluationsThisMonth }}</p>
            <div class="h-1 w-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
          </div>
        </div>

        <div class="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-bl-2xl rounded-tr-2xl"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-3">
              <p class="text-gray-500 text-sm font-medium">Moyenne des notes</p>
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
            <p class="text-3xl font-black text-emerald-700 mb-1">{{ averageScore.toFixed(1) }}/100</p>
            <div class="h-1 w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
          </div>
        </div>

        <div class="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-violet-200/50 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/10 to-violet-600/10 rounded-bl-2xl rounded-tr-2xl"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-3">
              <p class="text-gray-500 text-sm font-medium">CA total</p>
              <div class="w-10 h-10 bg-gradient-to-br from-violet-100 to-violet-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
            <p class="text-3xl font-black text-violet-700 mb-1">{{ formatCurrency(totalCA) }}</p>
            <div class="h-1 w-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Contenu principal avec layout amélioré -->
      <div class="flex flex-col xl:flex-row gap-8">
        <!-- Panel de filtres modernisé -->
        <div class="xl:w-80">
          <div class="sticky top-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-900/5 to-indigo-900/5 px-6 py-4 border-b border-gray-200/50">
              <h3 class="text-lg font-bold text-blue-900 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
                Filtres
              </h3>
            </div>
            <div class="p-6 space-y-6">
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700">Secteur d'activité</label>
                <div class="relative">
                  <select
                    v-model="pmeStore.filters.secteurActivite"
                    @change="pmeStore.fetchPmes(userId)"
                    class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none font-medium"
                  >
                    <option value="">Tous les secteurs</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700">Localisation</label>
                <div class="relative">
                  <input
                    v-model="pmeStore.filters.localisation"
                    @input="pmeStore.fetchPmes(userId)"
                    class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                    placeholder="Ville ou région..."
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700">Année de création</label>
                <div class="relative">
                  <input
                    v-model="pmeStore.filters.anneeCreation"
                    @input="pmeStore.fetchPmes(userId)"
                    type="number"
                    class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                    placeholder="Ex: 2020"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                @click="resetFilters"
                class="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-200 rounded-xl transition-all duration-200 text-gray-700 font-semibold hover:shadow-md"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>

        <!-- Liste des PME avec design amélioré -->
        <div class="flex-1 min-w-0">
          <div v-if="pmeStore.loading" class="flex flex-col items-center justify-center py-16">
            <div class="relative">
              <div class="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
              <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-400"></div>
            </div>
            <p class="mt-4 text-gray-600 font-medium">Chargement de vos PME...</p>
          </div>

          <div v-else>
            <div v-if="pmeStore.pmes.length === 0" class="flex flex-col items-center justify-center py-16">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-700 mb-2">Aucune PME trouvée</h3>
              <p class="text-gray-500 text-center max-w-sm">Commencez par ajouter votre première PME ou modifiez vos critères de recherche.</p>
            </div>

            <div v-else>
              <div class="mb-6 flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-800">
                  {{ pmeStore.pmes.length }} PME{{ pmeStore.pmes.length > 1 ? 's' : '' }} trouvée{{ pmeStore.pmes.length > 1 ? 's' : '' }}
                </h2>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                <PmeCard
                  v-for="pme in pmeStore.pmes"
                  :key="pme.id"
                  :pme="pme"
                  @edit="openPmeForm(pme)"
                  @evaluate="openEvaluationModal(pme)"
                  @delete="confirmDelete(pme.id)"
                  class="transform hover:-translate-y-1 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales inchangées -->
    <PmeForm
      v-if="showPmeForm"
      :pme="editingPme"
      :userId="userId"
      @close="showPmeForm = false"
      @submit="handlePmeSubmit"
    />

    <EvaluationModal
      v-if="showEvaluationModal"
      :pme="selectedPme"
      @close="showEvaluationModal = false"
      @confirm="requestEvaluation"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { usePmeStore } from '../stores/pme';
import PmeCard from '../components/PmeCard.vue';
import PmeForm from '../components/PmeForm.vue';
import EvaluationModal from '../components/EvaluationModal.vue';
import { formatCurrency } from '../utils/formatter';

const authStore = useAuthStore();
const pmeStore = usePmeStore();

const showPmeForm = ref(false);
const showEvaluationModal = ref(false);
const editingPme = ref({});
const selectedPme = ref({});
const booting = ref(true); // indique si le dashboard charge

onMounted(async () => {
  try {
    // 1) Charger l'utilisateur connecté
    await authStore.getAccount();

    // 2) Maintenant qu'on a user.id, charger les PME
    if (authStore.user?.id) {
      await pmeStore.fetchPmes(authStore.user.id);
    }
  } catch (e) {
    console.error("Erreur lors du chargement du dashboard:", e);
    window.location.href = "/login"; // si token invalide
  } finally {
    booting.value = false;
  }
});

const evaluationsThisMonth = computed(() =>
  pmeStore.evaluations.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length
);

const averageScore = computed(() => {
  if (pmeStore.evaluations.length === 0) return 0;
  const sum = pmeStore.evaluations.reduce((acc, e) => acc + e.score, 0);
  return sum / pmeStore.evaluations.length;
});

const totalCA = computed(() =>
  pmeStore.pmes.reduce((acc, pme) => acc + pme.chiffreAffaires, 0)
);

const openPmeForm = (pme = {}) => {
  editingPme.value = { ...pme };
  showPmeForm.value = true;
};

const openEvaluationModal = (pme) => {
  selectedPme.value = pme;
  showEvaluationModal.value = true;
};

const handlePmeSubmit = async (pmeData) => {
  try {
    if (pmeData.id) {
      await pmeStore.updatePme(pmeData.id, pmeData);
    } else {
      await pmeStore.createPme(pmeData);
    }
    showPmeForm.value = false;
  } catch (error) {
    alert(error);
  }
};

const requestEvaluation = async () => {
  try {
    await pmeStore.requestEvaluation(selectedPme.value.id);
    showEvaluationModal.value = false;
    alert("Évaluation demandée avec succès ! Le rapport sera généré sous peu.");

    // Recharge les PME après évaluation
    if (authStore.user?.id) {
      await pmeStore.fetchPmes(authStore.user.id);
    }
  } catch (error) {
    alert(error);
  }
};

const confirmDelete = (id) => {
  if (confirm("Voulez-vous vraiment supprimer cette PME ?")) {
    pmeStore.deletePme(id);
  }
};

const resetFilters = () => {
  pmeStore.filters = { secteurActivite: '', localisation: '', anneeCreation: '' };
  if (authStore.user?.id) {
    pmeStore.fetchPmes(authStore.user.id);
  }
};
</script>
