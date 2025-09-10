<template>
  <div class="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-10">
    <!-- En-tête avec fond dégradé et ombre portée -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg mb-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold mb-2 text-center uppercase">
          {{ rapport.rapport_trust_pme.identite_entreprise }}
        </h1>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between text-sm md:text-base">
          <p class="opacity-90">
            <span class="font-semibold">Date d'évaluation :</span> {{ rapport.rapport_trust_pme.date_evaluation }}
          </p>
          <p class="opacity-90 mt-2 md:mt-0">
            <span class="font-semibold">Contexte sectoriel :</span> {{ rapport.rapport_trust_pme.contexte_sectoriel }}
          </p>
        </div>
      </div>
    </header>

    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto space-y-8">

      <!-- Synthèse Executive -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Synthèse Executive
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-500">
            <p class="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Score Global</p>
            <div class="flex items-end">
              <p class="text-3xl md:text-4xl font-extrabold text-indigo-700">
                {{ rapport.rapport_trust_pme.synthese_executive.score_global.pourcentage }}%
              </p>
              <span class="ml-2 text-sm font-medium text-gray-600">/100</span>
            </div>
            <p class="text-lg font-semibold text-gray-700 mt-1">
              Note : <span class="text-indigo-600">{{ rapport.rapport_trust_pme.synthese_executive.score_global.note }}</span>
            </p>
          </div>
          <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500">
            <p class="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Notation Composite</p>
            <p class="text-xl md:text-2xl font-bold text-gray-800">
              {{ rapport.rapport_trust_pme.synthese_executive.notation_composite }}
            </p>
             <p>Note Composite : 
              {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.note }}
              {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.note }}
              {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.note }}
              {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.note }}
            </p>
          </div>
          <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-500 col-span-1 md:col-span-2">
            <p class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Interprétation du Profil</p>
            <p class="font-medium text-gray-700">
              {{ rapport.rapport_trust_pme.synthese_executive.interpretation_profil }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
          <p class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Conclusion Synthétique</p>
          <p class="text-gray-700 leading-relaxed">
            {{ rapport.rapport_trust_pme.synthese_executive.conclusion_synthetique }}
          </p>
         
        </div>
      </section>

      <!-- Analyse Détaillée -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Analyse Détaillée
        </h2>
        <div class="space-y-8">

          <!-- Dimension Financière -->
          <div class="p-6 rounded-lg bg-indigo-50 border border-indigo-100">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-indigo-800">
                Dimension Financière <span class="text-sm font-normal text-gray-600">({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.ponderation }})</span>
              </h3>
              <span class="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full">
                {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.note }} ({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.score }}%)
              </span>
            </div>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Indicateurs clés :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.indicateurs_cles }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="font-semibold text-green-700 mb-2">✅ Forces Financières</p>
                <ul class="space-y-2">
                  <li v-for="(force, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.forces_financieres" :key="index"
                      class="flex items-start text-sm text-gray-700">
                    <span class="mr-2 text-green-500">•</span> {{ force }}
                  </li>
                </ul>
              </div>
              <div>
                <p class="font-semibold text-red-700 mb-2">⚠️ Faiblesses & Risques</p>
                <ul class="space-y-2">
                  <li v-for="(faiblesse, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.faiblesses_risques" :key="index"
                      class="flex items-start text-sm text-gray-700">
                    <span class="mr-2 text-red-500">•</span> {{ faiblesse }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-5">
              <p class="font-semibold text-gray-700 mb-2">🔹 Recommandations Prioritaires</p>
              <ul class="space-y-2">
                <li v-for="(reco, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_financiere.recommandations_prioritaires" :key="index"
                    class="flex items-start text-sm text-gray-700 pl-4">
                  <span class="mr-2 text-blue-500">→</span> {{ reco }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Dimension Opérationnelle -->
          <div class="p-6 rounded-lg bg-amber-50 border border-amber-100">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-amber-800">
                Dimension Opérationnelle & Stratégique <span class="text-sm font-normal text-gray-600">({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.ponderation }})</span>
              </h3>
              <span class="px-3 py-1 text-xs font-bold text-white bg-amber-600 rounded-full">
                {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.note }} ({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.score }}%)
              </span>
            </div>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Évaluation du Modèle d'Affaires :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.evaluation_modele_affaires }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Capacités Opérationnelles :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.capacites_operationnelles }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Positionnement Concurrentiel :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.positionnement_concurrentiel }}
            </p>
            <div class="mt-5">
              <p class="font-semibold text-gray-700 mb-2">🔹 Axes de Développement</p>
              <ul class="space-y-2">
                <li v-for="(axe, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_operationnelle_strategique.axes_developpement" :key="index"
                    class="flex items-start text-sm text-gray-700 pl-4">
                  <span class="mr-2 text-blue-500">→</span> {{ axe }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Dimension Humaine -->
          <div class="p-6 rounded-lg bg-green-50 border border-green-100">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-green-800">
                Dimension Humaine & Gouvernance <span class="text-sm font-normal text-gray-600">({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.ponderation }})</span>
              </h3>
              <span class="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full">
                {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.note }} ({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.score }}%)
              </span>
            </div>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Qualité du Leadership :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.qualite_leadership }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Organisation de l'Équipe :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.organisation_equipe }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Maturité Managériale :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.maturite_manageriale }}
            </p>
            <div class="mt-5">
              <p class="font-semibold text-gray-700 mb-2">🔹 Besoins de Structuration RH</p>
              <ul class="space-y-2">
                <li v-for="(besoin, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_humaine_gouvernance.besoins_structuration_rh" :key="index"
                    class="flex items-start text-sm text-gray-700 pl-4">
                  <span class="mr-2 text-blue-500">→</span> {{ besoin }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Dimension Impact -->
          <div class="p-6 rounded-lg bg-purple-50 border border-purple-100">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-purple-800">
                Dimension Impact Social & Environnemental <span class="text-sm font-normal text-gray-600">({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.ponderation }})</span>
              </h3>
              <span class="px-3 py-1 text-xs font-bold text-white bg-purple-600 rounded-full">
                {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.note }} ({{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.score }}%)
              </span>
            </div>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Engagement Sociétal :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.engagement_societal }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Pratiques Durables :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.pratiques_durables }}
            </p>
            <p class="text-sm font-medium text-gray-700 mb-4">
              <span class="font-semibold">Conformité Réglementaire :</span> {{ rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.conformite_reglementaire }}
            </p>
            <div class="mt-5">
              <p class="font-semibold text-gray-700 mb-2">🔹 Potentiel d'Amélioration</p>
              <ul class="space-y-2">
                <li v-for="(potentiel, index) in rapport.rapport_trust_pme.analyse_detaillee.dimension_impact_social_environnemental.potentiel_amelioration_impact" :key="index"
                    class="flex items-start text-sm text-gray-700 pl-4">
                  <span class="mr-2 text-blue-500">→</span> {{ potentiel }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Diagnostic Transversal -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Diagnostic Transversal
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-indigo-50 p-5 rounded-lg">
            <p class="font-semibold text-indigo-700 mb-2">📊 Pattern de Performance</p>
            <p class="text-gray-700">
              {{ rapport.rapport_trust_pme.diagnostic_transversal.pattern_performance }}
            </p>
          </div>
          <div class="bg-amber-50 p-5 rounded-lg">
            <p class="font-semibold text-amber-700 mb-2">⚠️ Évaluation du Risque Global</p>
            <p class="text-gray-700">
              {{ rapport.rapport_trust_pme.diagnostic_transversal.evaluation_risque_global }}
            </p>
          </div>
        </div>
        <div class="mb-6">
          <p class="font-semibold text-green-700 mb-3">✅ Forces Majeures</p>
          <ul class="space-y-2">
            <li v-for="(force, index) in rapport.rapport_trust_pme.diagnostic_transversal.forces_majeures" :key="index"
                class="flex items-start text-sm text-gray-700 pl-4">
              <span class="mr-2 text-green-500">•</span> {{ force }}
            </li>
          </ul>
        </div>
        <div>
          <p class="font-semibold text-red-700 mb-3">🚨 Défis Critiques</p>
          <div class="overflow-x-auto bg-gray-50 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(defi, index) in rapport.rapport_trust_pme.diagnostic_transversal.defis_critiques" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                          :class="defi.priorite === 'URGENTE' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ defi.priorite }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700">{{ defi.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Plan d'Action -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Plan d'Action Recommandé
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(plan, key) in rapport.rapport_trust_pme.plan_action_recommande" :key="key"
               class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200">
            <h3 class="font-bold text-indigo-800 mb-3">
              {{ formatPlanName(key) }} <span class="text-sm font-normal text-gray-600">({{ plan.periode }})</span>
            </h3>
            <ul class="space-y-2.5">
              <li v-for="(item, index) in (plan.actions || plan || plan.opportunites_financement || [])" :key="index"
                  class="flex items-start text-sm text-gray-700 pl-4">
                <span class="mr-2 text-indigo-500">✦</span> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Analyse Visuelle (Graphiques) -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Analyse Visuelle
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-indigo-50 p-5 rounded-lg">
            <h3 class="font-semibold text-indigo-700 mb-4">📉 Score Global</h3>
            <div class="h-64">
              <canvas id="scoreGlobalChart"></canvas>
            </div>
          </div>
          <div class="bg-green-50 p-5 rounded-lg">
            <h3 class="font-semibold text-green-700 mb-4">📊 Scores par Dimension</h3>
            <div class="h-64">
              <canvas id="scoresDimensionChart"></canvas>
            </div>
          </div>
          <div class="bg-amber-50 p-5 rounded-lg">
            <h3 class="font-semibold text-amber-700 mb-4">⚖️ Forces vs Faiblesses Financières</h3>
            <div class="h-64">
              <canvas id="financeForcesFaiblessesChart"></canvas>
            </div>
          </div>
          <div class="bg-red-50 p-5 rounded-lg">
            <h3 class="font-semibold text-red-700 mb-4">🚨 Répartition des Défis Critiques</h3>
            <div class="h-64">
              <canvas id="defisCritiquesChart"></canvas>
            </div>
          </div>
        </div>
        <div class="bg-purple-50 p-5 rounded-lg mt-8">
          <h3 class="font-semibold text-purple-700 mb-4">📈 Répartition des Pondérations</h3>
          <div class="h-64">
            <canvas id="ponderationsChart"></canvas>
          </div>
        </div>
      </section>

      <!-- Annexes -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
          Annexes
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-indigo-50 p-5 rounded-lg">
            <p class="font-semibold text-indigo-700 mb-2">📖 Méthodologie Trust PME</p>
            <p class="text-gray-700 text-sm">
              {{ rapport.rapport_trust_pme.annexes.methodologie_trust_pme }}
            </p>
          </div>
          <div class="bg-green-50 p-5 rounded-lg">
            <p class="font-semibold text-green-700 mb-2">⚖️ Pondérations Sectorielles</p>
            <p class="text-gray-700 text-sm">
              {{ rapport.rapport_trust_pme.annexes.ponderations_sectorielles }}
            </p>
          </div>
        </div>
        <div class="mb-6">
          <p class="font-semibold text-gray-700 mb-2">📚 Références Manuel</p>
          <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
            <li v-for="(ref, index) in rapport.rapport_trust_pme.annexes.references_manuel" :key="index">{{ ref }}</li>
          </ul>
        </div>
        <div class="bg-blue-50 p-5 rounded-lg">
          <p class="font-semibold text-blue-700 mb-2">📧 Contact</p>
          <p class="text-gray-700 text-sm">
            {{ rapport.rapport_trust_pme.annexes.contact_approfondissement }}
          </p>
        </div>
      </section>

      <!-- Observations Finales -->
      <section class="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-100 pb-2">
          Observations Finales
        </h2>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-500">
          <p class="text-gray-700 leading-relaxed">
            {{ rapport.rapport_trust_pme.observations_finales }}
          </p>
        </div>
      </section>
    </div>


    <!-- Boutons d'action en bas de page -->
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end space-x-4 shadow-md no-print">
  <button
    @click="goToHome"
    class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
  >
    Retour à l'accueil
  </button>
  <button
    @click="printReport"
    class=" cursor-pointer px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
  >
    Imprimer le rapport
  </button>
</div>

  </div>
</template>



<!--  -->
<script setup>
import { ref,onMounted } from 'vue';
import Chart from 'chart.js/auto';

const rapport = ref({
  rapport_trust_pme: {
    identite_entreprise: "Entreprise non spécifiée - Analyse Trust PME",
    date_evaluation: "2024-12-19",
    contexte_sectoriel: "Secteur d'activité non précisé - Entreprise avec forte rentabilité mais besoin de diversification",
    synthese_executive: {
      identite_entreprise: "Entreprise performante financièrement avec des fondamentaux solides",
      score_global: {
        pourcentage: 73.63,
        note: "B"
      },
      notation_composite: "FOHI - Financier fort, Opérationnel faible, Humain fort, Impact moyen",
      interpretation_profil: "Profil contrasté avec excellence financière et humaine mais vulnérabilité opérationnelle nécessitant une attention urgente",
      conclusion_synthetique: "Entreprise structurellement saine présentant une rentabilité exceptionnelle (25%) et une gouvernance mature, mais confrontée à des défis opérationnels critiques liés à la diversification des revenus et au modèle économique. La dépendance clientèle excessive (40% du CA) représente un risque stratégique majeur nécessitant un plan d'action immédiat."
    },
    analyse_detaillee: {
      dimension_financiere: {
        ponderation: "40%",
        note: "B+",
        score: 87.5,
        indicateurs_cles: "Rentabilité nette: 25%, Trésorerie abondante, Faible endettement, Délais clients favorables",
        forces_financieres: [
          "Excellente rentabilité nette de 25% supérieure aux standards sectoriels",
          "Trésorerie abondante permettant une capacité d'investissement immédiate",
          "Structure financière saine avec endettement maîtrisé",
          "Comptabilité professionnelle et documents financiers disponibles et fiables"
        ],
        faiblesses_risques: [
          "Dépendance clientèle excessive (40% du CA avec client principal)",
          "Prévisionnels de trésorerie à moyen terme insuffisamment développés",
          "Cycle de trésorerie perfectible malgré la situation globalement favorable"
        ],
        recommandations_prioritaires: [
          "Maintenir la discipline financière et les standards de reporting actuels",
          "Développer une stratégie proactive de diversification clientèle sur 6-12 mois",
          "Optimiser le cycle de trésorerie par une gestion dynamique des encaissements",
          "Capitaliser sur la solidité financière pour explorer de nouveaux marchés porteurs"
        ]
      },
      dimension_operationnelle_strategique: {
        ponderation: "30%",
        note: "C",
        score: 43.5,
        evaluation_modele_affaires: "Modèle économique non clairement défini avec absence de vision stratégique formalisée. Capacité de production optimisée mais croissance commerciale stagnante.",
        capacites_operationnelles: "Capacité de production à 100% avec processus formalisés et infrastructure numérique de base (CRM/ERP opérationnel)",
        positionnement_concurrentiel: "Positionnement non spécifié nécessitant une clarification stratégique. Avantages opérationnels existants mais non capitalisés commercialement.",
        axes_developpement: [
          "Définition urgente d'un modèle économique structuré (SaaS ou récurrent)",
          "Diversification des sources de revenus avec services complémentaires",
          "Relance de la croissance commerciale par stratégie marketing digitale",
          "Développement de stratégies d'upselling et de fidélisation client"
        ]
      },
      dimension_humaine_gouvernance: {
        ponderation: "20%",
        note: "B+",
        score: 88.5,
        qualite_leadership: "Leadership expérimenté et visionnaire avec capacité d'innovation et prise de décision éclairée",
        organisation_equipe: "Équipe stable, compétente et engagée avec système RH complet et formalisé",
        maturite_manageriale: "Gouvernance structurée avec plan de succession formalisé et processus décisionnels matures",
        besoins_structuration_rh: [
          "Surveillance du taux de rotation (5%) avec plan de rétention des talents",
          "Développement de programmes de mentoring pour transmission des compétences",
          "Renforcement de la diversité des profils et compétences techniques",
          "Mise en place d'indicateurs de performance individuels et collectifs"
        ]
      },
      dimension_impact_social_environnemental: {
        ponderation: "10%",
        note: "B",
        score: 75,
        engagement_societal: "Politique d'inclusion active (40% de femmes, 50% d'emploi local) mais contribution sociétale globale limitée",
        pratiques_durables: "Certification ISO 14001 démontrant un engagement écologique structuré avec pratiques concrètes (recyclage, réduction déchets)",
        conformite_reglementaire: "Conformité aux standards environnementaux avec certification attestée, absence de certifications sociales complémentaires",
        potentiel_amelioration_impact: [
          "Développement de partenariats locaux pour ancrage territorial renforcé",
          "Extension des certifications (RSE, diversité) pour valorisation marché",
          "Structuration programme impact sociétal aligné ODD Nations Unies",
          "Intégration métriques d'impact dans le reporting de performance"
        ]
      }
    },
    diagnostic_transversal: {
      pattern_performance: "Profil contrasté avec excellence financière/humaine mais vulnérabilité opérationnelle critique",
      forces_majeures: [
        "Rentabilité exceptionnelle de 25% avec trésorerie abondante",
        "Gouvernance structurée et leadership expérimenté",
        "Certification environnementale ISO 14001 et pratiques durables",
        "Équipe stable et compétente avec système RH mature"
      ],
      defis_critiques: [
        {
          priorite: "URGENTE",
          description: "Dépendance clientèle excessive (40% du CA) représentant un risque stratégique majeur"
        },
        {
          priorite: "URGENTE",
          description: "Absence de modèle économique clair et défini avec stagnation commerciale"
        },
        {
          priorite: "MOYENNE",
          description: "Diversification insuffisante des sources de revenus et services"
        }
      ],
      evaluation_risque_global: "MOYEN - Risque financier faible compensé par risque opérationnel élevé nécessitant action corrective immédiate"
    },
    plan_action_recommande: {
      priorites_immediates: {
        periode: "0-6 mois",
        actions: [
          "Lancer un audit stratégique pour définir un modèle économique SaaS/récurrent",
          "Développer un plan de diversification clientèle avec objectif <20% du CA par client",
          "Mettre en place un tableau de bord opérationnel avec indicateurs de performance clés",
          "Initier des partenariats locaux pour renforcer l'ancrage territorial et l'impact"
        ]
      },
      objectifs_moyen_terme: {
        periode: "6-18 mois",
        actions: [
          "Atteindre 30% de revenus récurrents ou diversifiés",
          "Développer 2-3 nouvelles offres de services complémentaires",
          "Obtenir une certification RSE ou équivalente pour valorisation marché",
          "Implémenter un programme complet de développement des talents et mentoring"
        ]
      },
      recommandations_accompagnement: [
        "Accompagnement stratégique pour définition du modèle économique",
        "Consulting en diversification commerciale et développement marché",
        "Formation management et leadership pour capitaliser sur la gouvernance existante",
        "Expertise RSE pour structuration programme impact et certifications"
      ],
      opportunites_financement: [
        "Prêts investissement pour diversification activités",
        "Subventions innovation et transformation digitale",
        "Financements RSE et développement durable",
        "Dispositifs accompagnement PME croissance"
      ]
    },
    annexes: {
      methodologie_trust_pme: "Évaluation selon le référentiel Trust PME v2024 - Pondérations: Financier 40%, Opérationnel 30%, Humain 20%, Impact 10% - Notation de A+ (95-100%) à D (0-40%)",
      ponderations_sectorielles: "Pondérations standards appliquées - Adaptation possible selon spécificités sectorières après analyse complémentaire",
      references_manuel: [
        "Trust PME Manuel de Référence 2024 - Édition Banque de France",
        "Grille d'évaluation financière PME v2024",
        "Référentiel RSE PME français",
        "Normes gouvernance AFEP-MEDEF"
      ],
      contact_approfondissement: "Conseiller Enterprise Trust PME - Banque de France - trustpme@banque-france.fr"
    },
    observations_finales: "Entreprise présentant un potentiel exceptionnel avec des fondamentaux financiers et humains solides. La situation requiert une intervention stratégique urgente sur le volet opérationnel pour transformer la performance actuelle en croissance durable. La fenêtre d'opportunité est favorable compte tenu de la trésorerie disponible et de la maturité managériale.",
    metadata: {
      version_rapport: "Trust PME v2024.1",
      date_generation: "2024-12-19",
      type_evaluation: "Diagnostic complet entreprise"
    }
  }
});

const formatPlanName = (key) => {
  const names = {
    priorites_immediates: "Priorités Immédiates",
    objectifs_moyen_terme: "Objectifs Moyen Terme",
    recommandations_accompagnement: "Recommandations d'Accompagnement",
    opportunites_financement: "Opportunités de Financement"
  };
  return names[key] || key;
};


const goToHome = () => {
  
  window.location.href = '/';
};

const printReport = () => {
  window.print();
};


onMounted(() => {
  // Initialisation des graphiques (identique à votre code précédent)
  const scoreGlobalCtx = document.getElementById('scoreGlobalChart');
  new Chart(scoreGlobalCtx, {
    type: 'doughnut',
    data: {
      labels: ['Score Global', 'Restant'],
      datasets: [{
        data: [73.63, 26.37],
        backgroundColor: ['#3b82f6', '#e5e7eb'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
      },
    },
  });

  const scoresDimensionCtx = document.getElementById('scoresDimensionChart');
  new Chart(scoresDimensionCtx, {
    type: 'bar',
    data: {
      labels: ['Financière', 'Opérationnelle', 'Humaine', 'Impact'],
      datasets: [{
        label: 'Score (%)',
        data: [87.5, 43.5, 88.5, 75],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { legend: { display: false } },
    },
  });

  const financeForcesFaiblessesCtx = document.getElementById('financeForcesFaiblessesChart');
  new Chart(financeForcesFaiblessesCtx, {
    type: 'pie',
    data: {
      labels: ['Forces', 'Faiblesses'],
      datasets: [{
        data: [4, 3],
        backgroundColor: ['#10b981', '#ef4444'],
      }],
    },
    options: { responsive: true },
  });

  const defisCritiquesCtx = document.getElementById('defisCritiquesChart');
  new Chart(defisCritiquesCtx, {
    type: 'polarArea',
    data: {
      labels: ['Défis Urgents', 'Défis Moyens'],
      datasets: [{
        data: [2, 1],
        backgroundColor: ['#ef4444', '#f59e0b'],
      }],
    },
    options: { responsive: true },
  });

  const ponderationsCtx = document.getElementById('ponderationsChart');
  new Chart(ponderationsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Financière', 'Opérationnelle', 'Humaine', 'Impact'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right' },
        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
      },
    },
  });
});

</script>


<style>
@media print { .no-print { display: none; } body { font-size: 10pt; } }
</style>