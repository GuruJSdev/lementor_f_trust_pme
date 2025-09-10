<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6  lg:mx-50">
    <div class="max-w-8xl mx-auto space-y-8">

      <!-- Header Professionnel -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div class="flex justify-between items-center">
          <div>

            <h1 @click="goToHome()" class="flex items-center gap-3 text-3xl font-bold mb-6 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-blue-600">
                <path d="M3 19V5" />
                <path d="m13 6-6 6 6 6" />
                <path d="M7 12h14" />
              </svg>
              <span class="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
                Retour
              </span>
            </h1>

                        <h6 @click="generate()" class="flex items-center gap-3 text-sm font-bold mb-6 cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-chart-pie-icon lucide-file-chart-pie"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5"/><path d="M4.017 11.512a6 6 0 1 0 8.466 8.475"/><path d="M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"/></svg>
              <span class="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
                Telecharger le rapport
              </span>
            </h6>



            <p class="text-slate-600 text-lg">Évaluation Complète - Entreprise Technologique</p>
            <div class="flex items-center mt-4 space-x-4">
              <span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                Score Global: {{ globalScore }}% (Note {{ globalGrade }})
              </span>
              <span class="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm">
                Dernière MAJ: {{ formatDate(new Date()) }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-slate-800 mb-2">FOHI</div>
            <div class="text-sm text-slate-600 space-y-1">
              <div v-for="dimension in fohiGrades" :key="dimension.name">
                {{ dimension.name }}:
                <span :class="`font-semibold ${dimension.color}`">{{ dimension.grade }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(metric, index) in keyMetrics" :key="index"
          :class="`${metric.bgColor} rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover-lift`">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">{{ metric.label }}</p>
              <p :class="`text-3xl font-bold ${metric.color}`">{{ metric.value }}</p>
              <div class="flex items-center mt-2">
                <i
                  :class="`fas ${metric.trend === 'up' ? 'fa-arrow-up text-green-500' : 'fa-arrow-down text-red-500'} mr-1`"></i>
                <span :class="`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`">
                  {{ metric.change }}
                </span>
              </div>
            </div>
            <div :class="`p-3 rounded-xl ${metric.iconBg}`">
              <i :class="`${metric.icon} w-6 h-6 ${metric.color}`"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance par Dimension -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-slate-800">Performance par Dimension</h2>
          <div class="flex space-x-2">
            <!-- <button
              v-for="period in timeframes"
              :key="period"
              @click="selectedTimeframe = period"
              :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`"
            >
              {{ period }}
            </button> -->
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <canvas ref="dimensionChart" class="w-full h-80"></canvas>
          </div>

          <div class="space-y-4">
            <div v-for="(dim, index) in dimensionData" :key="index"
              class="border border-slate-200 rounded-lg p-4 hover-lift">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold text-slate-700">{{ dim.dimension }}</span>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 rounded text-sm font-bold text-white" :style="{ backgroundColor: dim.color }">
                    {{ dim.note }}
                  </span>
                  <span class="text-lg font-bold text-slate-800">{{ dim.score }}%</span>
                </div>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="h-2 rounded-full progress-bar"
                  :style="{ backgroundColor: dim.color, width: dim.score + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Évolution Temporelle & Benchmark -->
      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-4">Évolution des Performances</h3>
          <canvas ref="evolutionChart" class="w-full h-80"></canvas>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-4">Benchmark Sectoriel</h3>
          <canvas ref="benchmarkChart" class="w-full h-80"></canvas>
        </div>
      </div> -->

      <!-- ESG Radar & Matrice des Risques -->
      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-4">Analyse ESG</h3>
          <canvas ref="esgChart" class="w-full h-80"></canvas>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-4">Matrice des Risques</h3>
          <div class="space-y-3 max-h-80 overflow-y-auto">
            <div 
              v-for="(risk, index) in risksMatrix" 
              :key="index" 
              :class="`p-4 rounded-lg border-l-4 ${getRiskColor(risk.niveau)}`"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold">{{ risk.risque }}</h4>
                <span class="text-sm font-bold">{{ risk.score }}%</span>
              </div>
              <div class="flex justify-between text-sm mb-2">
                <span>Probabilité: {{ risk.probabilite }}</span>
                <span>Impact: {{ risk.impact }}</span>
              </div>
              <p class="text-xs italic">{{ risk.mitigation }}</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Alertes Intelligentes -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-6">
          <i class="fas fa-bell text-yellow-500 mr-2"></i>
          Alertes & Recommandations Intelligentes
        </h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div v-for="(alert, index) in alerts" :key="index"
            :class="`p-6 rounded-xl border-l-4 ${alert.color} hover-lift`">
            <div class="flex items-start space-x-3">
              <i :class="`${alert.icon} w-5 h-5 mt-1 flex-shrink-0`"></i>
              <div class="flex-1">
                <h4 class="font-bold mb-2">{{ alert.title }}</h4>
                <p class="text-sm mb-3 opacity-90">{{ alert.message }}</p>
                <div class="text-xs font-semibold uppercase tracking-wide">
                  Action: {{ alert.action }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Analytics -->
      <div class="bg-slate-900 rounded-2xl shadow-xl p-6 text-white">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-2xl font-bold text-blue-400">93%</div>
            <div class="text-sm text-slate-300">Fiabilité des Données</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-400">127</div>
            <div class="text-sm text-slate-300">Indicateurs Analysés</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-purple-400">24/7</div>
            <div class="text-sm text-slate-300">Monitoring Continu</div>
          </div>
        </div>
        <div class="text-center mt-6 text-slate-400 text-sm">
          <span class="pulse-dot inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Rapport généré par Trust PME Analytics • Conforme aux standards sectoriels 2024
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// import data from "./out.json"
import { getRapport } from '@/services/n8n';
import jsPDF from 'jspdf';
// import {TrustPMEParser} from "@/utils/rapport"

export default {
  name: 'TrustPMEDashboard',
  data() {
    return {
      globalScore: 74.9,
      globalGrade: 'B',
      selectedTimeframe: '12M',
      timeframes: ['6M', '12M', '24M'],

      fohiGrades: [
        { name: 'Financier', grade: 'B+', color: 'text-green-600' },
        { name: 'Opérationnel', grade: 'C', color: 'text-orange-500' },
        { name: 'Humain', grade: 'A', color: 'text-blue-600' },
        { name: 'Impact', grade: 'B', color: 'text-purple-600' }
      ],

      keyMetrics: [
        {
          label: 'Score Global',
          value: '74.9%',
          change: '+2.3%',
          trend: 'up',
          icon: 'fas fa-target',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          iconBg: 'bg-blue-100'
        },
        {
          label: 'Rentabilité Nette',
          value: '25.0%',
          change: '+3.2%',
          trend: 'up',
          icon: 'fas fa-chart-line',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          iconBg: 'bg-green-100'
        },
        {
          label: 'Ratio Endettement',
          value: '0.30',
          change: '-0.05',
          trend: 'up',
          icon: 'fas fa-shield-alt',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          iconBg: 'bg-green-100'
        },
        {
          label: 'Taux Rotation RH',
          value: '5%',
          change: '-2%',
          trend: 'up',
          icon: 'fas fa-users',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          iconBg: 'bg-blue-100'
        }
      ],

      dimensionData: [
        { dimension: 'Financière', score: 87.5, note: 'B+', color: '#10b981', target: 85 },
        { dimension: 'Opérationnelle', score: 46.5, note: 'C', color: '#f59e0b', target: 70 },
        { dimension: 'Humaine', score: 95.0, note: 'A', color: '#3b82f6', target: 80 },
        { dimension: 'Impact ESG', score: 70.0, note: 'B', color: '#8b5cf6', target: 75 }
      ],

      evolutionData: [
        { mois: 'Jan', rentabilite: 22, endettement: 35, tresorerie: 4.2, scoreGlobal: 71 },
        { mois: 'Fév', rentabilite: 23, endettement: 33, tresorerie: 4.5, scoreGlobal: 72 },
        { mois: 'Mar', rentabilite: 21, endettement: 32, tresorerie: 4.8, scoreGlobal: 70 },
        { mois: 'Avr', rentabilite: 24, endettement: 31, tresorerie: 5.1, scoreGlobal: 73 },
        { mois: 'Mai', rentabilite: 25, endettement: 30, tresorerie: 5.3, scoreGlobal: 74 },
        { mois: 'Juin', rentabilite: 26, endettement: 29, tresorerie: 5.5, scoreGlobal: 75 }
      ],

      benchmarkData: [
        { indicateur: 'Rentabilité', entreprise: 25, secteur: 18, excellence: 30 },
        { indicateur: 'Endettement', entreprise: 30, secteur: 45, excellence: 25 },
        { indicateur: 'Innovation R&D', entreprise: 8, secteur: 5, excellence: 10 },
        { indicateur: 'Rétention RH', entreprise: 95, secteur: 82, excellence: 90 },
        { indicateur: 'Impact ESG', entreprise: 70, secteur: 55, excellence: 85 }
      ],

      esgData: [
        { critere: 'Environnemental', score: 75, target: 80 },
        { critere: 'Social', score: 68, target: 75 },
        { critere: 'Gouvernance', score: 85, target: 85 },
        { critere: 'Innovation', score: 78, target: 80 },
        { critere: 'Éthique', score: 72, target: 75 },
        { critere: 'Conformité', score: 88, target: 85 }
      ],

      risksMatrix: [
        {
          risque: 'Dépendance Clientèle',
          probabilite: 'Élevée',
          impact: 'Critique',
          score: 85,
          niveau: 'danger',
          mitigation: 'Plan diversification urgent'
        },
        {
          risque: 'Stagnation CA',
          probabilite: 'Moyenne',
          impact: 'Élevé',
          score: 65,
          niveau: 'warning',
          mitigation: 'Stratégie commerciale offensive'
        },
        {
          risque: 'Concurrence Tech',
          probabilite: 'Moyenne',
          impact: 'Moyen',
          score: 45,
          niveau: 'info',
          mitigation: 'Innovation continue'
        },
        {
          risque: 'Réglementaire',
          probabilite: 'Faible',
          impact: 'Moyen',
          score: 25,
          niveau: 'success',
          mitigation: 'Veille réglementaire'
        }
      ],

      alerts: [
        {
          type: 'critical',
          title: 'Dépendance Clientèle Critique',
          message: 'Client principal représente 40% du CA - Seuil de risque dépassé',
          action: 'Plan de diversification immédiat requis',
          icon: 'fas fa-exclamation-triangle',
          color: 'border-red-500 bg-red-50 text-red-800'
        },
        {
          type: 'warning',
          title: 'Modèle Économique Non Formalisé',
          message: 'Absence de formalisation des canaux de revenus multiples',
          action: 'Consultant stratégie recommandé sous 30 jours',
          icon: 'fas fa-arrow-down',
          color: 'border-orange-500 bg-orange-50 text-orange-800'
        },
        {
          type: 'success',
          title: 'Excellence Capital Humain',
          message: 'Score A (95%) - Équipe stable avec leadership visionnaire',
          action: 'Capitaliser sur cet atout pour transformation',
          icon: 'fas fa-check-circle',
          color: 'border-green-500 bg-green-50 text-green-800'
        }
      ]
    };
  },

  async mounted() {
    // this.$nextTick(() => {
    //   this.createCharts();
    // });

    this.createCharts();

    await getRapport()
  },

  methods: {
    generate(){
        const rapportString = `{"output":"Basé sur l'analyse fournie et en m'appuyant sur le manuel Trust PME 2024, je génère le rapport complet pour l'entreprise évaluée.\n\n=== RAPPORT TRUST PME - ÉVALUATION ENTREPRISE ===\n\n🏢 **IDENTITÉ ENTREPRISE :** Société de services en phase de démarrage\n📅 **Date d'évaluation :** Décembre 2023\n🔍 **Contexte sectoriel :** Services aux entreprises - Structure émergente\n\n1. 📋 SYNTHÈSE EXÉCUTIVE\n\n• Identité entreprise : Structure de services en création, sans activité génératrice de revenus\n• Score global : 11.4% - Note : D \n• Notation composite : FOHI [D-D-C--D]\n• Interprétation du profil : Entreprise en phase pré-opérationnelle avec des fondamentaux à construire dans toutes les dimensions\n• Conclusion synthétique : Structure naissante nécessitant une mise en place urgente des bases opérationnelles, financières et humaines. Risque global élevé nécessitant un accompagnement structuré avant tout développement.\n\n2. 📊 ANALYSE DÉTAILLÉE PAR DIMENSION\n\nA) 💰 DIMENSION FINANCIÈRE (40%) - Note : D (8.5%)\n• Indicateurs clés : Aucun revenu - Trésorerie inexistante - Absence de relation bancaire\n• Forces financières identifiées : Tenue comptable manuelle présente - Structure juridique existante\n• Faiblesses et risques : Absence totale d'activité génératrice de revenus - Pas de trésorerie - Aucun budget prévisionnel - Documents financiers absents\n• Recommandations prioritaires : \n  ▶️ Démarrer une activité pilote générant un CA minimal\n  ▶️ Ouvrir un compte bancaire professionnel\n  ▶️ Mettre en place un suivi comptable simplifié avec outils numériques\n  ▶️ Développer un prévisionnel sur 6 mois avec hypothèses réalistes\n  ▶️ Consulter un expert-comptable pour structuration financière\n\nB) ⚙️ DIMENSION OPÉRATIONNELLE & STRATÉGIQUE (30%) - Note : D (16%)\n• Évaluation du modèle d'affaires : Absence totale de modèle économique défini\n• Capacités opérationnelles : Capacité de production optimale à 100% - Structure opérationnelle existante pour prestation de service\n• Positionnement concurrentiel : Positionnement standard acceptable dans le secteur services\n• Axes de développement :\n  ▶️ Définir urgemment un modèle économique viable\n  ▶️ Investir dans un CRM simple et outils de gestion numérique\n  ▶️ Développer une stratégie de diversification commerciale\n  ▶️ Mettre en place un plan de croissance et d'innovation produit\n\nC) 👥 DIMENSION HUMAINE & GOUVERNANCE (20%) - Note : C- (21%)\n• Qualité du leadership : Leadership non structuré - Vision floue\n• Organisation et équipe : Absence totale d'équipe opérationnelle\n• Maturité managériale : Gouvernance informelle sans processus décisionnel\n• Besoins en structuration RH :\n  ▶️ Recruter au moins un premier collaborateur pour équipe de base\n  ▶️ Définir une vision stratégique claire et formalisée\n  ▶️ Mettre en place des processus décisionnels structurés\n  ▶️ Établir contrats de travail et descriptions de poste formels\n\nD) 🌱 DIMENSION IMPACT SOCIAL & ENVIRONNEMENTAL (10%) - Note : D (0%)\n• Engagement sociétal : Aucun impact positif identifié\n• Pratiques durables : Absence totale de pratiques durables\n• Conformité réglementaire : Risque réputationnel important\n• Potentiel d'amélioration impact :\n  ▶️ Développer une politique RSE structurée adaptée au secteur\n  ▶️ Mettre en place programmes d'inclusion et emploi local\n  ▶️ Adopter pratiques écologiques simples (réduction déchets, énergie)\n  ▶️ Établir partenariats avec communauté locale\n  ▶️ Alignement sur Objectifs de Développement Durable pertinents\n\n3. 🎯 DIAGNOSTIC TRANSVERSAL\n\n• Pattern de performance : DÉSÉQUILIBRÉ - Toutes les dimensions en retrait significatif\n• 3 forces majeures de l'entreprise :\n  1. Structure juridique existante et identifiée\n  2. Capacité opérationnelle théorique optimale\n  3. Stabilité technique de base (bien que sans équipe)\n\n• 3 défis critiques à adresser :\n  1. 🚨 Absence totale de revenus et modèle économique\n  2. 🚨 Dépendance complète au fondateur sans équipe\n  3. 🚨 Risque réputationnel dû à l'absence d'impact sociétal\n\n• Évaluation du risque global : ÉLEVÉ - Nécessite une transformation structurelle complète\n\n4. 🚀 PLAN D'ACTION RECOMMANDÉ\n\nPRIORITÉS IMMÉDIATES (0-6 mois) :\n1. 🎯 Démarrer une première activité génératrice de revenus (CA minimal 10K€)\n2. 🎯 Recruter un premier collaborateur et formaliser la structure RH\n3. 🎯 Ouvrir un compte bancaire professionnel et mettre en place une trésorerie\n\nOBJECTIFS MOYEN TERME (6-18 mois) :\n1. 📈 Atteindre un CA stable de 50K€ avec au moins 3 sources de revenus\n2. 📈 Constituer une équipe de 3 personnes minimum avec organigramme formalisé\n3. 📈 Mettre en place une politique RSE de base et outils numériques de gestion\n\nRECOMMANDATIONS D'ACCOMPAGNEMENT :\n• 🔧 Accompagnement par un expert-comptable pour structuration financière\n• 🔧 Coaching en développement commercial et stratégie d'entreprise\n• 🔧 Formation aux outils numériques et gestion d'équipe\n\nOPPORTUNITÉS DE FINANCEMENT IDENTIFIÉES :\n• 💶 Prêts d'honneur pour création d'entreprise\n• 💶 Aides à l'embauche pour premier recrutement\n• 💶 Subventions pour digitalisation des TPE\n\n5. 📎 ANNEXES\n\n• Méthodologie Trust PME appliquée : Référence au manuel v2024 - Grille d'évaluation 4 dimensions pondérées\n• Pondérations sectorielles utilisées : Services aux entreprises - Coefficient 1.0\n• Références manuel Trust PME v2024 : Chapitres 3.2 (évaluation financière), 4.1 (diagnostic opérationnel), 5.3 (évaluation RH), 6.2 (impact sociétal)\n• Contact pour approfondissement : Conseil Trust PME agréé - consultation@trustpme.fr\n\n=== FIN DU RAPPORT ===\n\n📌 **OBSERVATIONS FINALES :** Cette entreprise présente un profil de start-up en très phase amont nécessitant un accompagnement intensif avant d'envisager tout développement. La priorité absolue est la génération des premiers revenus et la constitution d'une équipe minimale."}`;

        // On extrait uniquement la partie utile du rapport
    const reportText = rapportString.split("=== RAPPORT TRUST PME - ÉVALUATION ENTREPRISE ===")[1]
                          .split("=== FIN DU RAPPORT ===")[0]
                          .trim();

    // On initialise l'objet JSON de sortie
    const report = {
        identite: {},
        syntheseExecutive: {},
        analyseDetaillee: {},
        diagnosticTransversal: {},
        planAction: {},
        annexes: {},
        observationsFinales: ""
    };

    // On split par les grandes sections (1., 2., 3., etc.)
    const sections = reportText.split(/\n(?=\d\.)/).map(s => s.trim());

    // 1. Identité entreprise
    const identiteLines = sections[0].split('\n');
    report.identite = {
        nom: identiteLines[0].replace(/^🏢\s*\*\*IDENTITÉ ENTREPRISE \*\*:\s*/, "").trim(),
        dateEvaluation: identiteLines[1].replace(/^📅\s*\*\*Date d'évaluation \*\*:\s*/, "").trim(),
        contexteSectoriel: identiteLines[2].replace(/^🔍\s*\*\*Contexte sectoriel \*\*:\s*/, "").trim()
    };

    // 2. Synthèse exécutive
    const syntheseLines = sections[1].split('\n').slice(1);
    report.syntheseExecutive = {
        identiteEntreprise: syntheseLines[0].replace(/^•\s*Identité entreprise\s*:\s*/, "").trim(),
        scoreGlobal: syntheseLines[1].replace(/^•\s*Score global\s*:\s*/, "").trim(),
        notationComposite: syntheseLines[2].replace(/^•\s*Notation composite\s*:\s*/, "").trim(),
        interpretationProfil: syntheseLines[3].replace(/^•\s*Interprétation du profil\s*:\s*/, "").trim(),
        conclusionSynthetique: syntheseLines[4].replace(/^•\s*Conclusion synthétique\s*:\s*/, "").trim()
    };

    // 3. Analyse détaillée par dimension
    const dimensions = sections[2].split(/\n(?=[A-D]\))/);
    report.analyseDetaillee = {};
    dimensions.forEach(dim => {
        const lines = dim.split('\n');
        const titleMatch = lines[0].match(/([A-D])\)\s*(.*?)\s*-\s*Note\s*:\s*(.*)/);
        if (titleMatch) {
            const [, letter, name, note] = titleMatch;
            const cleanName = name.replace(/[💰⚙️👥🌱]/g, "").trim();
            report.analyseDetaillee[cleanName] = { note: note.trim(), details: [] };
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].startsWith("•")) {
                    const detail = lines[i].replace(/^•\s*/, "").trim();
                    report.analyseDetaillee[cleanName].details.push(detail);
                }
            }
        }
    });

    // 4. Diagnostic transversal
    const diagnosticLines = sections[3].split('\n').slice(1);
    report.diagnosticTransversal = {
        patternPerformance: diagnosticLines[0].replace(/^•\s*Pattern de performance\s*:\s*/, "").trim(),
        forcesMajeures: [],
        defisCritiques: [],
        risqueGlobal: ""
    };
    let currentList = null;
    for (let i = 1; i < diagnosticLines.length; i++) {
        if (diagnosticLines[i].includes("3 forces majeures")) {
            currentList = "forcesMajeures";
        } else if (diagnosticLines[i].includes("3 défis critiques")) {
            currentList = "defisCritiques";
        } else if (diagnosticLines[i].startsWith("•") && currentList) {
            const item = diagnosticLines[i].replace(/^•\s*\d+\.\s*/, "").trim();
            report.diagnosticTransversal[currentList].push(item);
        } else if (diagnosticLines[i].includes("Évaluation du risque global")) {
            report.diagnosticTransversal.risqueGlobal = diagnosticLines[i].replace(/^•\s*Évaluation du risque global\s*:\s*/, "").trim();
        }
    }

    // 5. Plan d'action
    const planLines = sections[4].split('\n').slice(1);
    report.planAction = {
        prioritesImmediates: [],
        objectifsMoyenTerme: [],
        recommandationsAccompagnement: [],
        opportunitesFinancement: []
    };
    let currentSection = null;
    for (const line of planLines) {
        if (line.includes("PRIORITÉS IMMÉDIATES")) {
            currentSection = "prioritesImmediates";
        } else if (line.includes("OBJECTIFS MOYEN TERME")) {
            currentSection = "objectifsMoyenTerme";
        } else if (line.includes("RECOMMANDATIONS D'ACCOMPAGNEMENT")) {
            currentSection = "recommandationsAccompagnement";
        } else if (line.includes("OPPORTUNITÉS DE FINANCEMENT")) {
            currentSection = "opportunitesFinancement";
        } else if (line.startsWith("•") || line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
            const item = line.replace(/^\d+\.\s*|•\s*[🎯📈🔧💶]?\s*/, "").trim();
            if (currentSection) {
                report.planAction[currentSection].push(item);
            }
        }
    }

    // 6. Annexes
    const annexesLines = sections[5].split('\n').slice(1);
    report.annexes = {};
    for (const line of annexesLines) {
        if (line.startsWith("•")) {
            const [key, value] = line.replace(/^•\s*/, "").split(" : ").map(s => s.trim());
            report.annexes[key] = value;
        }
    }

    // 7. Observations finales
    report.observationsFinales = sections[6].replace(/^📌\s*\*\*OBSERVATIONS FINALES \*\*:\s*/, "").trim();

    // return report;

    console.log("<====== ITEM ========>", report)

    },

    goToHome() {
      this.$router.push('/home');
    },
    formatDate(date) {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    getRiskColor(niveau) {
      const colors = {
        danger: 'bg-red-100 text-red-800 border-red-200',
        warning: 'bg-orange-100 text-orange-800 border-orange-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        success: 'bg-green-100 text-green-800 border-green-200'
      };
      return colors[niveau] || colors.info;
    },

    createCharts() {
      this.createDimensionChart();
    },

    createDimensionChart() {
      const ctx = this.$refs.dimensionChart.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.dimensionData.map(d => d.dimension),
          datasets: [
            {
              label: 'Score Actuel',
              data: this.dimensionData.map(d => d.score),
              backgroundColor: this.dimensionData.map(d => d.color),
              borderRadius: 8,
              borderSkipped: false
            },
            {
              label: 'Objectif',
              data: this.dimensionData.map(d => d.target),
              backgroundColor: '#e5e7eb',
              borderRadius: 8,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
              }
            }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    },


  }
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.progress-bar {
  transition: width 0.8s ease-in-out;
}

.pulse-dot {
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.card-shadow {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}
    h1, h2, h3 { color: #2c3e50; }
    .rapport {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      white-space: pre-wrap; /* conserve les sauts de ligne */
    }
    .section-title {
      font-weight: bold;
      font-size: 18px;
      margin-top: 20px;
      color: #34495e;
    }
</style>

