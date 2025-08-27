<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6  lg:mx-50">
    <div class="max-w-8xl mx-auto space-y-8">
      
      <!-- Header Professionnel -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div class="flex justify-between items-center">
          <div>

            <h1 @click="goToHome()" class="flex items-center gap-3 text-3xl font-bold mb-6 cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" 
       width="28" height="28" 
       viewBox="0 0 24 24" 
       fill="none" 
       stroke="currentColor" 
       stroke-width="2" 
       stroke-linecap="round" 
       stroke-linejoin="round" 
       class="text-blue-600">
    <path d="M3 19V5"/>
    <path d="m13 6-6 6 6 6"/>
    <path d="M7 12h14"/>
  </svg>
  <span class="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
    Retour
  </span>
</h1>

              

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
        <div 
          v-for="(metric, index) in keyMetrics" 
          :key="index" 
          :class="`${metric.bgColor} rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover-lift`"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">{{ metric.label }}</p>
              <p :class="`text-3xl font-bold ${metric.color}`">{{ metric.value }}</p>
              <div class="flex items-center mt-2">
                <i :class="`fas ${metric.trend === 'up' ? 'fa-arrow-up text-green-500' : 'fa-arrow-down text-red-500'} mr-1`"></i>
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
            <div 
              v-for="(dim, index) in dimensionData" 
              :key="index" 
              class="border border-slate-200 rounded-lg p-4 hover-lift"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold text-slate-700">{{ dim.dimension }}</span>
                <div class="flex items-center space-x-2">
                  <span 
                    class="px-2 py-1 rounded text-sm font-bold text-white"
                    :style="{backgroundColor: dim.color}"
                  >
                    {{ dim.note }}
                  </span>
                  <span class="text-lg font-bold text-slate-800">{{ dim.score }}%</span>
                </div>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full progress-bar"
                  :style="{backgroundColor: dim.color, width: dim.score + '%'}"
                ></div>
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
          <div 
            v-for="(alert, index) in alerts" 
            :key="index" 
            :class="`p-6 rounded-xl border-l-4 ${alert.color} hover-lift`"
          >
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

  mounted() {
    // this.$nextTick(() => {
    //   this.createCharts();
    // });

    this.createCharts();
  },

  methods: {

    goToHome(){
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.card-shadow {
  box-shadow: 0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
}
</style>