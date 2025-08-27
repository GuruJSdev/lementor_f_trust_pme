<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div class="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold text-blue-darker mb-6">
        {{ pme.id ? 'Modifier' : 'Créer' }} une PME
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Informations de base -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom de l'entreprise*</label>
            <input v-model="form.nomEntreprise" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Année de création*</label>
            <input v-model.number="form.anneeCreation" type="number" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Statut légal*</label>
            <select v-model="form.statutLegal" required class="w-full p-2 border rounded">
              <option value="SARL">SARL</option>
              <option value="SA">SA</option>
              <option value="Auto-entrepreneur">Auto-entrepreneur</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Secteur d'activité*</label>
            <select v-model="form.secteurActivite" required class="w-full p-2 border rounded">
              <option value="Technologie">Technologie</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre d'employés*</label>
            <input v-model.number="form.nombreEmployes" type="number" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Localisation*</label>
            <input v-model="form.localisation" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Téléphone*</label>
            <input v-model="form.telephone" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email*</label>
            <input v-model="form.email" type="email" required class="w-full p-2 border rounded" />
          </div>
        </div>

        <!-- Données financières -->
        <div class="border-t pt-4 mt-4">
          <h3 class="font-semibold text-blue-darker mb-2">Données financières</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Chiffre d'affaires*</label>
              <input v-model.number="form.chiffreAffaires" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Bénéfice net*</label>
              <input v-model.number="form.beneficeNet" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Ratio dettes*</label>
              <input v-model.number="form.ratioDettes" type="number" step="0.01" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Trésorerie disponible*</label>
              <input v-model.number="form.tresorerieDisponible" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Délai paiement clients (jours)*</label>
              <input v-model.number="form.delaiPaiementClients" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Délai paiement fournisseurs (jours)*</label>
              <input v-model.number="form.delaiPaiementFournisseurs" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Budget R&D*</label>
              <input v-model.number="form.budgetRD" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">CA client principal*</label>
              <input v-model.number="form.caClientPrincipal" type="number" required class="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        <!-- Gouvernance et direction -->
        <div class="border-t pt-4 mt-4">
          <h3 class="font-semibold text-blue-darker mb-2">Gouvernance et direction</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom du dirigeant*</label>
              <input v-model="form.dirigeantNom" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Expérience du dirigeant (années)*</label>
              <input v-model.number="form.experienceDirigeant" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div class="flex items-center">
              <input v-model="form.formationDirigeant" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Formation du dirigeant</label>
            </div>
            <div class="flex items-center">
              <input v-model="form.equipeDirection" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Équipe de direction</label>
            </div>
            <div class="flex items-center">
              <input v-model="form.gouvernance" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Gouvernance formalisée</label>
            </div>
          </div>
        </div>

        <!-- RSE et environnement -->
        <div class="border-t pt-4 mt-4">
          <h3 class="font-semibold text-blue-darker mb-2">RSE et environnement</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <input v-model="form.actionsSociales" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Actions sociales</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Détails actions sociales</label>
              <textarea v-model="form.detailsActionsSociales" class="w-full p-2 border rounded"></textarea>
            </div>
            <div class="flex items-center">
              <input v-model="form.respectEnvironnement" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Respect de l'environnement</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Actions écologiques</label>
              <textarea v-model="form.actionsEcologiques" class="w-full p-2 border rounded"></textarea>
            </div>
            <div class="flex items-center">
              <input v-model="form.certification" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Certification</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">ODD impactés</label>
              <input v-model="form.oddImpactes" class="w-full p-2 border rounded" placeholder="Ex: ODD 8, ODD 12" />
            </div>
          </div>
        </div>

        <!-- Autres informations -->
        <div class="border-t pt-4 mt-4">
          <h3 class="font-semibold text-blue-darker mb-2">Autres informations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre d'emplois créés*</label>
              <input v-model.number="form.nbEmploisCrees" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">% de femmes*</label>
              <input v-model.number="form.pourcentageFemmes" type="number" required class="w-full p-2 border rounded" />
            </div>
            <div class="flex items-center">
              <input v-model="form.programmeBienEtre" type="checkbox" class="h-4 w-4" />
              <label class="ml-2 block text-sm text-gray-700">Programme bien-être</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Détails bien-être</label>
              <textarea v-model="form.detailsBienEtre" class="w-full p-2 border rounded"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Défi actuel principal*</label>
              <input v-model="form.defisActuels" required class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Objectifs 12 mois*</label>
              <input v-model="form.objectifs12Mois" required class="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        <!-- Checkboxes -->
        <div class="border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <input v-model="form.enregistrePertes" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Enregistre des pertes</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.accesCredit" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Accès au crédit</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.garantiesFinancieres" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Garanties financières</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.rapportFinancier" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Rapport financier disponible</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.businessPlan" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Business plan disponible</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.crmOuErp" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Utilise un CRM/ERP</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.diversification" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Diversification</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.dependanceMarchesPublics" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Dépendance aux marchés publics</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.investissementDigital" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Investissement digital</label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Détails digitaux</label>
            <textarea v-model="form.detailsDigitaux" class="w-full p-2 border rounded"></textarea>
          </div>
          <div class="flex items-center">
            <input v-model="form.manuelProcedures" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Manuel de procédures</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.planSuccession" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Plan de succession</label>
          </div>
          <div class="flex items-center">
            <input v-model="form.formationContinue" type="checkbox" class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">Formation continue</label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Taux de rotation du personnel (%)*</label>
            <input v-model.number="form.tauxRotationPersonnel" type="number" required class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Cartographie des compétences</label>
            <input v-model="form.cartographieCompetences" class="w-full p-2 border rounded" placeholder="Ex: Leadership, Finance" />
          </div>
        </div>

        <!-- Autorisation -->
        <div class="border-t pt-4 mt-4">
          <div class="flex items-center">
            <input v-model="form.autorisationDonnees" type="checkbox" required class="h-4 w-4" />
            <label class="ml-2 block text-sm text-gray-700">J'autorise le traitement de ces données*</label>
          </div>
          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700">Nom du signataire*</label>
            <input v-model="form.nomSignataire" required class="w-full p-2 border rounded" />
          </div>
          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700">Date de signature*</label>
            <input v-model="form.dateSignature" type="date" required class="w-full p-2 border rounded" />
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3 mt-6">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-darker">
            {{ pme.id ? 'Mettre à jour' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  pme: { type: Object, default: () => ({}) },
//   userId: { type: String, required: true },
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
  nomEntreprise: "TechCorp",
  anneeCreation: 2020,
  statutLegal: "SARL",
  secteurActivite: "Technologie",
  nombreEmployes: 50,
  localisation: "Brazzaville",
  telephone: "+242065000000",
  email: "contact@techcorp.com",
  chiffreAffaires: 1000000,
  beneficeNet: 250000,
  ratioDettes: 0.3,
  tresorerieDisponible: 150000,
  delaiPaiementClients: 30,
  delaiPaiementFournisseurs: 45,
  budgetRD: 50000,
  nbProduitsLances: 3,
  enregistrePertes: false,
  accesCredit: true,
  garantiesFinancieres: true,
  rapportFinancier: true,
  businessPlan: true,
  caClientPrincipal: 400000,
  crmOuErp: true,
  diversification: true,
  dependanceMarchesPublics: false,
  investissementDigital: true,
  manuelProcedures: true,
  nbEmploisCrees: 10,
  pourcentageFemmes: 40,
  actionsSociales: true,
  respectEnvironnement: true,
  certification: true,
  oddImpactes: "ODD 9, ODD 12",
  actionsEcologiques: "Recyclage, Réduction des déchets",
  dirigeantNom: "Jean Mabiala",
  experienceDirigeant: 10,
  formationDirigeant: true,
  equipeDirection: true,
  gouvernance: true,
  cartographieCompetences: "Leadership, Finance",
  planSuccession: true,
  formationContinue: true,
  tauxRotationPersonnel: 5,
  programmeBienEtre: true,
  defisActuels: "Accès au financement",
  objectifs12Mois: "Lancer deux nouveaux produits",
  autorisationDonnees: true,
  nomSignataire: "Jean Mabiala",
  dateSignature: "2025-08-05"
});


watch(
  () => props.pme,
  (newVal) => {
    if (newVal) form.value = { ...newVal };
  },
  { immediate: true }
);

async function createPME(pmeData, token) {
  try {
    const response = await axios.post('http://localhost:3000/api/pme', pmeData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      maxBodyLength: Infinity
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Erreur API: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      throw new Error(`Erreur: ${error.message}`);
    }
  }
}

const handleSubmit = async () => {
  console.log("form.value", form.value);
      const token = localStorage.getItem("token")
      const result = await createPME(form.value, token);
    console.log('PME créée avec succès:', result);
  // emit('submit', form.value);
};

onMounted(async ()=>{
  await handleSubmit()
})
</script>
