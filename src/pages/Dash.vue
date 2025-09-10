<template>
  
  <main>

        <section v-if="filter_data.length==0" class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune donnée disponible</h3>
        <p class="text-gray-500 mb-6">
            Désolé, nous n'avons trouvé aucune donnée à afficher pour le moment.
        </p>
        <div class="mt-4">
            <button @click="goToHome"
               class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Retour à l'accueil
            </button>
        </div>
    </div>
</section>

    <section v-else>
        <div class="rapport-container">
    <!-- En-tête du rapport -->
    <div class="header">
      <h1>Rapport Trust PME</h1>
      <h2>Évaluation Complète de l'Entreprise</h2>
      <p>
        {{ cleanIdentite(reportGlobal.identite.nom).replaceAll('*','') }} |
        {{ cleanDate(reportGlobal.identite.dateEvaluation).replaceAll('*','') }}
      </p>
    </div>

    <!-- Synthèse Exécutive -->
    <div class="section">
      <h2 class="section-title">1. Synthèse Exécutive</h2>
      <div class="score-card">
        <div class="score-header">
          <div>
            <p>
              <strong>Notation FOHI:</strong>
              {{ cleanNotation(reportGlobal.syntheseExecutive.notationComposite) }}
            </p>
            <p>
              <strong>Note:</strong>
              <span :class="'grade-' + extractGrade(reportGlobal.syntheseExecutive.scoreGlobal).toLowerCase()">
                 {{ extractGrade(reportGlobal.syntheseExecutive.scoreGlobal) }}
              </span>
            </p>
          </div>
          <div>
            <br>
            <!-- <p>
              <strong>Notation FOHI:</strong>
              {{ cleanNotation(reportGlobal.syntheseExecutive.notationComposite) }}
            </p> -->
          </div>
        </div>
        <p class="interpretation">
          <strong>Interprétation:</strong>
          {{ cleanInterpretation(reportGlobal.syntheseExecutive.conclusionSynthetique) }}
        </p>
      </div>
    </div>

    <!-- Analyse par Dimension -->
    <div class="section">
      <h2 class="section-title">2. Analyse Détaillée par Dimension</h2>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Score</th>
            <th>Note</th>
            <th>Recommandations Clés</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dim, key) in reportGlobal.analyseDetaillee" :key="key">
            <td>{{ cleanDimension(key) }}</td>
            <td>{{ extractScore(dim.note) }}%</td>
            <td>
              <span :class="'grade-' + extractGrade(dim.note).toLowerCase()">
                {{ extractGrade(dim.note) }}
              </span>
            </td>
            <td>
              <ul>
                <li v-for="(rec, i) in dim.details" :key="i">
                  {{ cleanRecommendation(rec) }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diagnostic Transversal -->
    <div class="section">
      <h2 class="section-title">3. Diagnostic Transversal</h2>
      <div class="diagnostic-header">
        <p><strong>Pattern de Performance:</strong> {{ reportGlobal.diagnosticTransversal.patternPerformance }}</p>
        <p><strong>Risque Global:</strong> {{ reportGlobal.diagnosticTransversal.risqueGlobal }}</p>
      </div>
      <div class="diagnostic-content">
        <div>
          <h3 class="forces-title">Forces Majeures</h3>
          <ul>
            <li v-for="(force, i) in reportGlobal.diagnosticTransversal.forcesMajeures" :key="i">
              {{ cleanListItem(force) }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="defis-title">Défis Critiques</h3>
          <ul>
            <li v-for="(defi, i) in reportGlobal.diagnosticTransversal.defisCritiques" :key="i">
              {{ cleanListItem(defi) }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Plan d'Action -->
    <div class="section">
      <h2 class="section-title">4. Plan d'Action Recommandé</h2>
      <div v-for="(section, key) in reportGlobal.planAction" :key="key" class="action-section">
        <h3>{{ formatSectionTitle(key) }}</h3>
        <ul>
          <li v-for="(item, i) in section" :key="i">
            {{ cleanActionItem(item) }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Observations Finales -->
    <div class="section">
      <h2 class="section-title">5. Observations Finales</h2>
      <div class="score-card">
        <p class="observations">
          {{ cleanObservations(reportGlobal.observationsFinales) }}
        </p>
      </div>
    </div>

    <!-- Pied de page -->
    <div class="footer">
      <p>Rapport généré le {{ new Date().toLocaleDateString('fr-FR') }} | Trust PME © 2025</p>
      <p>Contact: consultation@trustpme.fr</p>
    </div>

    <!-- Boutons -->
    <div class="no-print button-group">
      <button @click="printReport" class="print-button">
        🖨️ Imprimer le Rapport
      </button>
      <button @click="goToHome" class="return-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
        Retour
      </button>
    </div>
  </div>
    </section>
  </main>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getRapport } from '@/services/n8n';

const router = useRouter();
const reportGlobal = ref({
  identite: {
    nom: "",
    dateEvaluation: "",
  },
  syntheseExecutive: {
    scoreGlobal: "",
    notationComposite: "",
    conclusionSynthetique: "",
  },
  analyseDetaillee: {},
  diagnosticTransversal: {
    patternPerformance: "",
    forcesMajeures: [],
    defisCritiques: [],
    risqueGlobal: "",
  },
  planAction: {
    prioritesImmediates: [],
    objectifsMoyenTerme: [],
    recommandationsAccompagnement: [],
    opportunitesFinancement: [],
  },
  observationsFinales: "",
});

let filter_data =ref([])

    const report = {
      identite: {},
      syntheseExecutive: {},
      analyseDetaillee: {},
      diagnosticTransversal: {
        patternPerformance: "",
        forcesMajeures: [],
        defisCritiques: [],
        risqueGlobal: "",
      },
      planAction: {
        prioritesImmediates: [],
        objectifsMoyenTerme: [],
        recommandationsAccompagnement: [],
        opportunitesFinancement: [],
      },
      observationsFinales: "",
    };


const generateRapport = async () => {
  try {
    const resp = await getRapport();
    let rapportString = "";
    
    // Extraction de la chaîne de rapport depuis la réponse API
    if (Array.isArray(resp)) {
      filter_data.value = resp.filter((item) => {
        const createdAt = new Date(item.createdAt).getTime();
          const now = new Date().getTime();
          const diffHeures = (now - createdAt) / (1000 * 60 * 60); 
        return item.data.includes("output") 
        // && diffHeures <= 24;
      });

      console.log("filter", filter_data.value)

      // console.log("filter",filter_data)
      rapportString = filter_data.value.at(-1)?.data || "";
    } else if (typeof resp === "string") {
      rapportString = resp;
    } else if (resp?.output) {
      rapportString = resp.output;
    }

    // Si la chaîne est un JSON, on l'extraait
    if (rapportString.startsWith('{') && rapportString.includes('"output"')) {
      const jsonData = JSON.parse(rapportString);
      rapportString = jsonData.output;
    }

    // Parsing du rapport
    const reportText = rapportString.split("=== RAPPORT TRUST PME - ÉVALUATION ENTREPRISE ===")[1]?.split("=== FIN DU RAPPORT ===")[0]?.trim();
    if (!reportText) {
      console.error("Format de rapport invalide");
      return;
    }



    // 1. Identité
    const identiteLines = reportText.split('\n').slice(0, 3);
    report.identite = {
      nom: identiteLines[0].replace(/^🏢\s*\*\*IDENTITÉ ENTREPRISE \*\*:\s*/, "").trim(),
      dateEvaluation: identiteLines[1].replace(/^📅\s*\*\*Date d'évaluation \*\*:\s*/, "").trim(),
    };

    // 2. Synthèse Exécutive
    const syntheseSection = reportText.split('\n1. 📋 SYNTHÈSE EXÉCUTIVE')[1]?.split('\n2.')[0]?.trim();
    if (syntheseSection) {
      const syntheseLines = syntheseSection.split('\n').slice(1);
      report.syntheseExecutive = {
        scoreGlobal: syntheseLines[1]?.trim() || "",
        notationComposite: syntheseLines[2]?.trim() || "",
        interpretationProfil: syntheseLines[3]?.trim() || "",
        conclusionSynthetique: syntheseLines[4]?.trim() || "",
      };
    }

    // 3. Analyse Détaillée par Dimension
    const dimensionsSection = reportText.split('\n2. 📊 ANALYSE DÉTAILLÉE PAR DIMENSION')[1]?.split('\n3.')[0]?.trim();
    if (dimensionsSection) {
      const dimensions = dimensionsSection.split(/\n(?=[A-D]\))/);
      dimensions.forEach((dim) => {
        const lines = dim.split('\n');
        const titleMatch = lines[0].match(/([A-D])\)\s*(.*?)\s*-\s*Note\s*:\s*(.*)/);
        if (titleMatch) {
          const [, , name, note] = titleMatch;
          const cleanName = name.replace(/[💰⚙️👥🌱]/g, "").trim();
          const details = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith("•") && lines[i].includes("▶️")) {
              details.push(lines[i].replace(/^•\s*/, "").trim());
            }
          }
          report.analyseDetaillee[cleanName] = { note: note.trim(), details };
        }
      });
    }

    // 4. Diagnostic Transversal
    const diagnosticSection = reportText.split('\n3. 🎯 DIAGNOSTIC TRANSVERSAL')[1]?.split('\n4.')[0]?.trim();
    if (diagnosticSection) {
      const diagnosticLines = diagnosticSection.split('\n');
      report.diagnosticTransversal.patternPerformance = diagnosticLines[0]?.replace(/^•\s*Pattern de performance\s*:\s*/, "").trim() || "";
      let currentList = null;
      for (let i = 1; i < diagnosticLines.length; i++) {
        if (diagnosticLines[i].includes("forces majeures")) {
          currentList = "forcesMajeures";
        } else if (diagnosticLines[i].includes("défis critiques")) {
          currentList = "defisCritiques";
        } else if (diagnosticLines[i].startsWith("•") && currentList) {
          const item = diagnosticLines[i].replace(/^•\s*\d+\.\s*/, "").trim();
          report.diagnosticTransversal[currentList].push(item);
        } else if (diagnosticLines[i].includes("risque global")) {
          report.diagnosticTransversal.risqueGlobal = diagnosticLines[i].replace(/^•\s*Évaluation du risque global\s*:\s*/, "").trim();
        }
      }
    }

    // 5. Plan d'Action
    const planSection = reportText.split('\n4. 🚀 PLAN D\'ACTION RECOMMANDÉ')[1]?.split('\n5.')[0]?.trim();
    if (planSection) {
      const planLines = planSection.split('\n');
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
        } else if (line.match(/^\d+\.\s*[🎯📈🔧💶]?\s*/) || line.startsWith("•")) {
          const item = line.replace(/^\d+\.\s*[🎯📈🔧💶]?\s*/, "").trim();
          if (currentSection) report.planAction[currentSection].push(item);
        }
      }
    }

    // 6. Observations Finales
    const observationsSection = reportText.split('\n📌 **OBSERVATIONS FINALES :**')[1]?.trim();
    if (observationsSection) {
      report.observationsFinales = observationsSection;
    }

    reportGlobal.value = report;
  } catch (error) {
    console.error("Erreur lors de la génération du rapport :", error);
  }
};

// Fonctions utilitaires
const extractScore = (text) => {
  const match = text.match(/(\d+\.?\d*)%/);
  return match ? parseFloat(match[1]) : 0;
};

const extractGrade = (text) => {
  const match = text.match(/Note\s*:\s*([A-D][+-]?)/);
  if (match) return match[1];
  return text.match(/([A-D][+-]?)/)?.[0] || 'N/A';
};

const cleanIdentite = (text) => text.replace(/^🏢\s*\*\*IDENTITÉ ENTREPRISE \*\*:\s*/, '');
const cleanDate = (text) => text.replace(/^📅\s*\*\*Date d'évaluation \*\*:\s*/, '');
const cleanNotation = (text) => text.replace(/^•\s*Notation composite\s*:\s*/, '');
const cleanInterpretation = (text) => text.replace(/^•\s*Interprétation du profil\s*:\s*/, '');
const cleanDimension = (key) => key.replace(/DIMENSION\s*/i, '').replace(/\(\d+%\)/, '').trim();
const cleanRecommendation = (rec) => rec.replace(/^•\s*|▶️\s*/, '');
const cleanListItem = (item) => item.replace(/^\d+\.\s*|🚨\s*/, '');
const cleanActionItem = (item) => item.replace(/^\d+\.\s*[🎯📈🔧💶]?\s*/, '');
const cleanObservations = (text) => text.replace(/^📌\s*\*\*OBSERVATIONS FINALES \*\*:\s*/, '');

const formatSectionTitle = (key) => {
  const titles = {
    prioritesImmediates: "Priorités Immédiates (0-6 mois)",
    objectifsMoyenTerme: "Objectifs Moyen Terme (6-18 mois)",
    recommandationsAccompagnement: "Recommandations d'Accompagnement",
    opportunitesFinancement: "Opportunités de Financement",
  };
  return titles[key] || key;
};

const printReport = () => window.print();
const goToHome = () => router.push('/home');

onMounted(() => {
  generateRapport();
});
</script>

<style scoped>
@page { size: A4; margin: 1cm; }
.rapport-container { max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
.header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
.header h1 { color: #0066cc; font-size: 24px; margin-bottom: 5px; }
.section { margin-bottom: 30px; page-break-inside: avoid; }
.section-title { color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; }
.score-card { background-color: #f8f9fa; border-left: 4px solid #0066cc; padding: 15px; margin-bottom: 20px; }
.score-header { display: flex; justify-content: space-between; }
.grade-a { color: #28a745; }
.grade-b { color: #007bff; }
.grade-c { color: #ffc107; }
.grade-d { color: #dc3545; }
table { width: 100%; border-collapse: collapse; margin: 20px 0; }
th, td { border: 1px solid #dee2e6; padding: 8px; text-align: left; }
th { background-color: #f8f9fa; }
.diagnostic-content { display: flex; gap: 20px; margin-top: 20px; }
.diagnostic-content > div { flex: 1; }
.forces-title { color: #28a745; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.defis-title { color: #dc3545; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.observations { white-space: pre-line; font-style: italic; }
.footer { text-align: center; margin-top: 40px; font-size: 10px; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
.no-print { text-align: center; margin: 20px 0; }
.button-group { display: flex; justify-content: center; gap: 10px; }
.print-button, .return-button { background-color: #0066cc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
.return-button { background-color: #6c757d; }
@media print { .no-print { display: none; } body { font-size: 10pt; } }
</style>
