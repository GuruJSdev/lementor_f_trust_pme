<template>
  <section class="bg-gray-50 min-h-screen">
    <!-- Header avec logo et progression -->
    <header class="bg-white shadow-md mb-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Trust PME</h1>
          </div>

          <div class="text-sm text-gray-500">

            <span>{{ account.email }}</span>

            <button class=" cursor-pointer bg-blue-500 text-teal-50 p-2 mx-2 rounded-sm"
              @click="goToDashboard()">Rapport</button>
            <button class=" cursor-pointer bg-red-500 text-teal-50 p-2 mx-2 rounded-sm"
              @click="deconnexion()">Déconnexion</button>
          </div>

        </div>
      </div>
    </header>

    <!-- Barre de progression -->
    <div class="bg-white  hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div class="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>Progression</span>
          <span id="progress-text">Étape 1 sur 9</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div id="progress-bar" class="progress-bar bg-blue-600 h-2 rounded-full" style="width: 11%"></div>
        </div>
      </div>
    </div>

    <!-- Navigation par onglets -->
    <div class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex space-x-8 overflow-x-auto">
          <button style="font-size: 10px;" @click="showTab('welcome', 1)"
            :class="(isActiveItem == 'welcome') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class=" cursor-pointer tab-button whitespace-nowrap py-4 px-1  font-medium text-sm ">
            1. Bienvenue
          </button>
          <button style="font-size: 10px;" @click="showTab('steps', 2)"
            :class="(isActiveItem == 'steps') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class=" cursor-pointer  tab-button whitespace-nowrap py-4 px-1 font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            2. Démarche
          </button>
          <button style="font-size: 10px;" @click="showTab('documents', 3)"
            :class="(isActiveItem == 'documents') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            3. Documents
          </button>
          <button style="font-size: 10px;" @click="showTab('engagement', 4)"
            :class="(isActiveItem == 'engagement') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            4. Engagement
          </button>
          <button style="font-size: 10px;" @click="showTab('general', 5)"
            :class="(isActiveItem == 'general') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            5. Informations
          </button>
          <button style="font-size: 10px;" @click="showTab('financial', 6)"
            :class="(isActiveItem == 'financial') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            6. Finances
          </button>
          <button style="font-size: 10px;" @click="showTab('operational', 7)"
            :class="(isActiveItem == 'operational') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            7. Opérationnel
          </button>
          <button style="font-size: 10px;" @click="showTab('impact', 8)"
            :class="(isActiveItem == 'impact') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            8. Impact
          </button>
          <button style="font-size: 10px;" @click="showTab('governance', 9)"
            :class="(isActiveItem == 'governance') ? 'border-blue-500 text-blue-600 border-b-2' : ''"
            class="cursor-pointer  tab-button whitespace-nowrap py-4 px-1  font-medium text-sm  text-gray-500 hover:text-gray-700 ">
            9. Gouvernance
          </button>
        </nav>
      </div>
    </div>

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Fenêtre 1: Bienvenue -->
      <div id="welcome" class="tab-content active fade-in" v-if="step == 1">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Bienvenue dans Trust PME !</h2>
              <p class="text-lg text-gray-600">Cette notation a pour but de renforcer la crédibilité de votre entreprise
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <div class="text-center p-6 bg-green-50 rounded-lg">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Renforcer votre crédibilité</h3>
                <p class="text-sm text-gray-600">Obtenez une notation reconnue par les banques et investisseurs</p>
              </div>

              <div class="text-center p-6 bg-blue-50 rounded-lg">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                    </path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Identifier vos forces</h3>
                <p class="text-sm text-gray-600">Découvrez vos points forts et axes d'amélioration</p>
              </div>

              <div class="text-center p-6 bg-purple-50 rounded-lg">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Note claire et utile</h3>
                <p class="text-sm text-gray-600">Une notation transparente pour vos partenaires</p>
              </div>
            </div>

            <div class="text-center">
              <button @click="showTab('steps', 2)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Découvrir la démarche →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 2: Étapes de la Démarche -->
      <div id="steps" class="tab-content active fade-in" v-if="step == 2">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Étapes de la Démarche</h2>
              <p class="text-lg text-gray-600">Votre notation se déroule en 3 phases</p>
            </div>

            <div class="space-y-6 mb-8">
              <div class="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div
                  class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1</div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Notation Flash</h3>
                  <p class="text-gray-700">Générée automatiquement à partir de vos réponses au formulaire</p>
                  <div class="mt-2 text-sm text-blue-700 font-medium">⚡ Résultat immédiat</div>
                </div>
              </div>

              <div class="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div
                  class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2</div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Entretien avec un Conseiller</h3>
                  <p class="text-gray-700">Vérification de vos données et documents par un expert</p>
                  <div class="mt-2 text-sm text-green-700 font-medium">👥 Accompagnement personnalisé</div>
                </div>
              </div>

              <div class="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div
                  class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3</div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Validation par le Comité de Notation</h3>
                  <p class="text-gray-700">La note peut être confirmée, dégradée ou relevée selon l'analyse</p>
                  <div class="mt-2 text-sm text-purple-700 font-medium">🏆 Note finale officielle</div>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    <strong>Important :</strong> La note finale validée vous sera communiquée officiellement par email
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <button @click="showTab('welcome', 1)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('documents', 3)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Préparer les documents →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 3: Préparez vos documents -->
      <div id="documents" class="tab-content active fade-in" v-if="step == 3">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Préparez vos Documents</h2>
              <p class="text-lg text-gray-600">Pour gagner du temps, préparez ces documents avant de commencer</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-8">
              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">Extrait RCCM à jour</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">Relevés bancaires (12 derniers mois)</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">Dernier rapport financier</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">Business plan actualisé</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">Organigramme de l'entreprise</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-800">CV/certificats des dirigeants clés</span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">?</span>
                </div>
                <span class="text-gray-800">Certifications sociales/environnementales <em>(si applicable)</em></span>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">?</span>
                </div>
                <span class="text-gray-800">Garanties financières <em>(si applicable)</em></span>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div class="flex">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-blue-800 text-sm">
                  <strong>Astuce :</strong> Numérisez vos documents au format PDF pour un téléchargement plus facile.
                  Les documents marqués d'un "?" sont optionnels mais valoriseront votre notation.
                </p>
              </div>
            </div>

            <div class="flex justify-between">
              <button @click="showTab('steps', 2)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('engagement', 4)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Conditions d'engagement →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 4: Confidentialité & Engagement -->
      <div id="engagement" class="tab-content active fade-in" v-if="step == 4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                  </path>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Confidentialité & Engagement</h2>
            </div>

            <div class="space-y-6 mb-8">
              <!-- Confidentialité -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div class="flex items-start space-x-3">
                  <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                    </path>
                  </svg>
                  <div>
                    <h3 class="text-lg font-semibold text-blue-900 mb-2">🔒 Confidentialité</h3>
                    <p class="text-blue-800">
                      Vos données restent strictement confidentielles et ne seront jamais partagées sans votre accord
                      explicite.
                      Nous respectons les normes de protection des données et utilisons un chiffrement de bout en bout.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Engagement de véracité -->
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-amber-900 mb-4">Engagement de Véracité</h3>
                <div class="bg-white border border-amber-200 rounded-lg p-4 text-sm text-gray-700 mb-4">
                  <p class="italic">
                    "Je soussigné(e) <strong>[Nom, Prénom]</strong>, représentant légal de <strong>[Nom de
                      l'entreprise]</strong>,
                    certifie sur l'honneur que les informations fournies sont exactes et conformes à la réalité de mon
                    entreprise.
                    Je comprends que toute fausse déclaration peut entraîner la révision, la suspension ou l'annulation
                    de la notation."
                  </p>
                </div>

                <div class="flex items-start space-x-3">
                  <input type="checkbox" id="engagement"
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required>
                  <label for="engagement" class="text-sm text-gray-700 cursor-pointer">
                    <strong class="text-red-600">*</strong> J'accepte et je m'engage sur l'honneur.
                    Je confirme que toutes les informations que je fournirai sont exactes et vérifiables.
                  </label>
                </div>
              </div>

              <!-- Utilisation des données -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                <div class="flex items-start space-x-3">
                  <svg class="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                    </path>
                  </svg>
                  <div>
                    <h3 class="text-lg font-semibold text-green-900 mb-2">Utilisation des Données</h3>
                    <p class="text-green-800 mb-3">
                      Vos données seront utilisées exclusivement pour :
                    </p>
                    <ul class="text-green-800 text-sm space-y-1">
                      <li>• Calculer votre notation Trust PME</li>
                      <li>• Générer votre rapport d'évaluation</li>
                      <li>• Vous accompagner dans l'amélioration continue</li>
                      <li>• Produire des statistiques anonymisées sectorielles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <button @click="showTab('documents', 3)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('general', 5)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                id="start-evaluation">
                Commencer l'évaluation →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 5: Informations Générales -->
      <div id="general" class="tab-content active fade-in" v-if="step == 5">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">📌 Informations Générales</h2>
                <p class="text-gray-600 mt-2">Renseignez les informations de base sur votre entreprise</p>
              </div>
              <div class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Section 1/5
              </div>
            </div>

            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise <span class="text-red-500">*</span>
                  </label>
                  <input v-model="formPme.nomEntreprise" type="text" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Nom complet tel qu'il figure sur vos documents légaux</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Année de création <span class="text-red-500">*</span>
                  </label>
                  <select v-model.number="formPme.anneeCreation" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Sélectionner une année</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <!-- Plus d'années peuvent être ajoutées -->
                  </select>
                  <p class="text-xs text-gray-500 mt-1">❓ Année où votre entreprise a officiellement démarré</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Statut légal <span class="text-red-500">*</span>
                  </label>
                  <select required v-model="formPme.statutLegal"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Choisir le statut</option>
                    <option value="SARL">SARL (Société à Responsabilité Limitée)</option>
                    <option value="SA">SA (Société Anonyme)</option>
                    <option value="SAS">SAS (Société par Actions Simplifiée)</option>
                    <option value="SNC">SNC (Société en Nom Collectif)</option>
                    <option value="SCS">SCS (Société en Commandite Simple)</option>
                    <option value="SCA">SCA (Société en Commandite par Actions)</option>
                    <option value="SASU">SASU (Société par Actions Simplifiée Unipersonnelle)</option>
                    <option value="EURL">EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</option>
                    <option value="Entreprise Individuelle">Entreprise Individuelle</option>
                    <option value="Auto-entrepreneur">Auto-entrepreneur / Micro-entreprise</option>
                    <option value="Coopérative">Coopérative</option>
                    <option value="Association">Association</option>
                    <option value="GIE">GIE (Groupement d’Intérêt Économique)</option>
                    <option value="ONG">ONG (Organisation Non Gouvernementale)</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">❓ Forme juridique inscrite au RCCM</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité <span class="text-red-500">*</span>
                  </label>
                  <select required v-model="formPme.secteurActivite"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Sélectionner un secteur</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Agroalimentaire">Agroalimentaire</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Services">Services</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Énergie">Énergie</option>
                    <option value="Mines">Mines</option>
                    <option value="Pétrole et Gaz">Pétrole et Gaz</option>
                    <option value="Transport">Transport</option>
                    <option value="Logistique">Logistique</option>
                    <option value="BTP">BTP (Bâtiment et Travaux Publics)</option>
                    <option value="Immobilier">Immobilier</option>
                    <option value="Technologies">Technologies</option>
                    <option value="Télécommunications">Télécommunications</option>
                    <option value="Finance">Finance / Banque / Assurance</option>
                    <option value="Santé">Santé</option>
                    <option value="Éducation">Éducation / Formation</option>
                    <option value="Tourisme">Tourisme / Hôtellerie / Restauration</option>
                    <option value="Culture">Culture / Arts / Médias</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Administration">Administration Publique</option>
                    <option value="ONG">ONG / Organisations internationales</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  RCCM (Registre de Commerce et du Crédit Mobilier) <span class="text-red-500"></span>
                </label>
                <div @click="openFile()"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="text-sm text-gray-600"><span class="text-blue-600 cursor-pointer">cliquez pour
                      parcourir</span></p>
                  <p class="text-xs text-gray-400 mt-1">PDF, PNG, JPG - Max 5 Mo</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">❓ Extrait RCCM à jour pour prouver l'existence légale</p>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre total d'employés <span class="text-red-500">*</span>
                  </label>
                  <input type="0" min="0" required v-model.number="formPme.nombreEmployes"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Employés permanents et temporaires actuels</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Localisation principale <span class="text-red-500">*</span>
                  </label>
                  <input type="text" required v-model="formPme.localisation"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Ville et quartier du siège principal</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone <span class="text-red-500">*</span>
                  </label>
                  <input type="tel" required v-model="formPme.telephone"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Numéro principal de contact</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email professionnel <span class="text-red-500">*</span>
                  </label>
                  <input type="email" required v-model="formPme.email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Adresse professionnelle de l'entreprise</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Description des activités principales
                </label>
                <textarea rows="3" maxlength="500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Décrivez vos produits, services et ce qui vous différencie..."></textarea>
                <p class="text-xs text-gray-500 mt-1">❓ Maximum 500 caractères</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Vision stratégique (12-24 mois)
                </label>
                <textarea rows="3" maxlength="500" v-model="formPme.visionStrategique"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Vos objectifs : croissance, innovation, nouveaux marchés..."></textarea>
                <p class="text-xs text-gray-500 mt-1">❓ Grands objectifs à court terme - Maximum 500 caractères</p>
              </div>
            </form>

            <div class="flex justify-between mt-8">
              <button @click="showTab('engagement', 4)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('financial', 6)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Analyse financière →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 6: Analyse Financière -->
      <div id="financial" class="tab-content active fade-in" v-if="step == 6">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">📊 Analyse Financière</h2>
                <p class="text-gray-600 mt-2">Données financières et économiques (Poids: 30%)</p>
              </div>
              <div class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Section 2/5
              </div>
            </div>

            <form class="space-y-6">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                    </path>
                  </svg>
                  <label class="block text-sm font-medium text-blue-900 mb-2">
                    Devise utilisée <span class="text-red-500">*</span>
                  </label>
                </div>
                <select required
                  class="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="XAF">XAF (Franc CFA)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="USD">USD (Dollar américain)</option>
                </select>
                <p class="text-xs text-blue-700 mt-1">❓ Monnaie principale de vos états financiers</p>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Chiffre d'affaires annuel (dernière année) <span class="text-red-500">*</span>
                  </label>
                  <input type="0" min="0" required v-model.number="formPme.chiffreAffaires"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Total des ventes (hors taxes) dernière année fiscale</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Bénéfice net annuel <span class="text-red-500">*</span>
                  </label>
                  <input type="0" required v-model.number="formPme.beneficeNet"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Résultat après charges et impôts</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ratio Dettes / Capitaux propres (%)
                  </label>
                  <input type="0" min="0" max="500" v-model.number="formPme.ratioDettes"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ (Dettes totales / Capitaux propres) × 100</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Trésorerie disponible
                  </label>
                  <input type="0" min="0" v-model.number="formPme.tresorerieDisponible"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Liquidités (caisse + banque) en fin d'exercice</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Délais moyens paiement clients (jours)
                  </label>
                  <input type="0" min="0" v-model.number="formPme.delaiPaiementClients"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Nombre moyen de jours avant encaissement</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Délais moyens paiement fournisseurs (jours)
                  </label>
                  <input type="0" min="0" v-model.number="formPme.delaiPaiementFournisseurs"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Nombre moyen de jours avant règlement</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Budget R&D / TIC (% du CA)
                  </label>
                  <input type="0" min="0" max="100" step="0.1" v-model.number="formPme.budgetRD"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ % du CA investi en innovation/technologies</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nouveaux produits/services (3 dernières années)
                  </label>
                  <input type="0" min="0" v-model.number="formPme.nbProduitsLances"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Nombre de lancements sur 3 ans</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Pertes sur les 3 dernières années ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="business_plan" value="true"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>

                    <label class="flex items-center">
                      <input type="radio" name="business_plan" value="false"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Part CA du plus gros client (%)
                  </label>
                  <input type="0" min="0" max="100" v-model.number="formPme.caClientPrincipal"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Concentration du risque client</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">CRM ou ERP pour la gestion ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="crm_erp" :value="true" v-model="formPme.crmOuErp"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="crm_erp" :value="false" v-model="formPme.crmOuErp"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Diversification produits/services (3 ans)
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="diversification" :value="true" v-model="formPme.diversification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="diversification" :value="false" v-model="formPme.diversification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Dépendance aux marchés publics ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="public_markets" :value="true" v-model="formPme.dependanceMarchesPublics"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="public_markets" :value="false"
                        v-model="formPme.dependanceMarchesPublics"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                  <p class="text-xs text-gray-500">❓ Plus de 50% des revenus</p>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Transformation digitale (3 ans) ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="digital_transformation" :value="true"
                        v-model="formPme.investissementDigital"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="digital_transformation" :value="false"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Actions de transformation digitale (si applicable)
                </label>
                <textarea rows="3" v-model="formPme.detailsDigitaux"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Site web, e-commerce, outils internes, automatisation..."></textarea>
                <p class="text-xs text-gray-500 mt-1">❓ Décrivez brièvement vos initiatives digitales</p>
              </div>

              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-700 min-w-fit">Manuel de procédures internes ?</span>
                <div class="flex space-x-6">
                  <label class="flex items-center">
                    <input type="radio" name="procedures_manual" :value="true" v-model="formPme.manuelProcedures"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Oui</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="procedures_manual" :value="false" v-model="formPme.manuelProcedures"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Non</span>
                  </label>
                </div>
              </div>

              <!-- Analyse de Résilience -->
              <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-red-900 mb-4">🎯 Analyse de Résilience - Simulation de Crises</h3>
                <p class="text-sm text-red-700 mb-6">Expliquez comment votre entreprise réagirait face aux situations
                  suivantes :</p>

                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-2">Scénario 1</span>
                      Perte de 50% de la clientèle (soudainement, sur une année)
                    </label>
                    <textarea rows="3" required v-model="formPme.resilience1"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Comment réagiriez-vous ? Quelles mesures prendriez-vous ?"></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-2">Scénario 2</span>
                      Augmentation de 30% des coûts de production
                    </label>
                    <textarea rows="3" required v-model="formPme.resilience2"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Matières premières, énergie, transport..."></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-2">Scénario 3</span>
                      Rupture d'approvisionnement (fournisseur principal indisponible 3 mois)
                    </label>
                    <textarea rows="3" required v-model="formPme.resilience3"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Solutions alternatives, stocks, nouveaux fournisseurs..."></textarea>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Business plan actualisé (optionnel)
                </label>
                <div @click="openFile()"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                  <p class="text-sm text-gray-600">Téléchargez votre business plan</p>
                  <p class="text-xs text-gray-400 mt-1">PDF, DOC - Max 10 Mo</p>
                </div>
              </div>
            </form>

            <div class="flex justify-between mt-8">
              <button @click="showTab('financial', 6)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('operational', 7)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Impact global →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 7: Analyse Opérationnelle & Stratégique -->
      <div id="operational" class="tab-content active fade-in" v-if="step == 7">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">📊 Analyse Opérationnelle & Stratégique</h2>
                <p class="text-gray-600 mt-2">Gestion & Résilience (Poids: 25%)</p>
              </div>
              <div class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Section 3/5
              </div>
            </div>

            <div class="space-y-6">
              <!-- Business Plan -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div class="flex items-center space-x-4 mb-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Business plan actualisé disponible ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="business_plan" :value="true" v-model="formPme.businessPlan"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="business_plan" :value="false" v-model="formPme.businessPlan"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mb-4">❓ Indiquez si vous disposez d'un business plan mis à jour au cours
                  des 12 derniers mois</p>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Télécharger le business plan (si disponible)
                  </label>
                  <div @click="openFile()"
                    class="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <svg class="w-8 h-8 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    <p class="text-sm text-gray-600">Business plan actualisé</p>
                    <p class="text-xs text-gray-400 mt-1">PDF, DOC - Max 10 Mo</p>
                  </div>
                </div>
              </div>
              <!-- 
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Part du chiffre d'affaires du plus gros client (%)
                  </label>
                  <input type="0" min="0" max="100"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Estimez la part du CA annuel provenant de votre client le plus
                    important</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center space-x-4">
                    <span class="text-sm font-medium text-gray-700 min-w-fit">CRM ou ERP pour la gestion ?</span>
                    <div class="flex space-x-6">
                      <label class="flex items-center">
                        <input type="radio" name="crm_erp" :value="true" v-model="formPme.crmOuErp"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                        <span class="ml-2 text-sm text-gray-700">Oui</span>
                      </label>
                      <label class="flex items-center">
                        <input type="radio" name="crm_erp" :value="false" v-model="formPme.crmOuErp"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                        <span class="ml-2 text-sm text-gray-700">Non</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <input type="text"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Précisez le nom du logiciel utilisé...">
                    <p class="text-xs text-gray-500 mt-1">❓ Citez le nom si applicable (Salesforce, SAP, Odoo...)</p>
                  </div>
                </div>
              </div> -->

              <!-- <div class="grid md:grid-cols-2 gap-6">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Diversification produits/services (3 ans)
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="diversification" :value="true" v-model="formPme.diversification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="diversification" :value="false" v-model="formPme.diversification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div> -->

              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-700 min-w-fit">Dépendance aux marchés publics ?</span>
                <div class="flex space-x-6">
                  <label class="flex items-center">
                    <input type="radio" name="marches_publics" :value="true" v-model="formPme.dependanceMarchesPublics"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Oui</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="marches_publics" :value="false" v-model="formPme.dependanceMarchesPublics"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Non</span>
                  </label>
                </div>
              </div>
            </div>

            <p class="text-xs text-gray-500">❓ Diversification : nouveaux produits/services sur 3 exercices fiscaux |
              Marchés publics : >50% des revenus annuels</p>

            <!-- Transformation digitale -->
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div class="flex items-center space-x-4 mb-4">
                <span class="text-sm font-medium text-gray-700 min-w-fit">Investissements en transformation digitale
                  (3 ans) ?</span>
                <div class="flex space-x-6">
                  <label class="flex items-center">
                    <input type="radio" name="digital_transformation" :value="true"
                      v-model="formPme.investissementDigital"
                      class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Oui</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="digital_transformation" :value="false"
                      v-model="formPme.investissementDigital"
                      class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300">
                    <span class="ml-2 text-sm text-gray-700">Non</span>
                  </label>
                </div>
              </div>
              <!-- <p class="text-xs text-gray-500 mb-4">❓ Actions de digitalisation : site web, e-commerce, outils
                  internes, automatisation</p>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Détails des investissements digitaux
                  </label>
                  <textarea rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Décrivez vos initiatives de transformation digitale..."></textarea>
                </div> -->
            </div>

            <!-- Manuel de procédures -->
            <!-- <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div class="flex items-center space-x-4 mb-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Manuel de procédures internes disponible
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="procedures_manual" :value="true"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="procedures_manual" :value="false"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mb-4">❓ Téléchargez votre manuel si vous disposez de procédures écrites
                </p>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Télécharger le manuel de procédures
                  </label>
                  <div @click="openFile()"
                    class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    <p class="text-sm text-gray-600">Manuel de procédures internes</p>
                    <p class="text-xs text-gray-400 mt-1">PDF, DOC - Max 10 Mo</p>
                  </div>
                </div>
              </div> -->

            <!-- Analyse de Résilience -->
            <!-- <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-red-900 mb-4">🛡️ Analyse de Résilience – Simulation de Crises
                </h3>
                <p class="text-sm text-red-700 mb-6">Expliquez comment votre entreprise réagirait face aux situations
                  suivantes, en vous basant sur vos capacités actuelles :</p>

                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="text-red-600 font-semibold">Scénario 1:</span> Perte de 50% de la clientèle
                      (soudainement, sur une année)
                    </label>
                    <textarea rows="4"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Décrivez votre stratégie de réaction : actions immédiates, réduction des coûts, recherche de nouveaux clients, diversification..."></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="text-red-600 font-semibold">Scénario 2:</span> Augmentation de 30% des coûts de
                      production (matières premières, énergie, transport)
                    </label>
                    <textarea rows="4"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Expliquez vos leviers d'adaptation : répercussion sur les prix, négociation fournisseurs, optimisation des processus, substitution..."></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="text-red-600 font-semibold">Scénario 3:</span> Rupture d'approvisionnement
                      (fournisseur principal indisponible pendant 3 mois)
                    </label>
                    <textarea rows="4"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Détaillez vos solutions de continuité : fournisseurs alternatifs, stocks de sécurité, adaptation de l'offre, partenariats..."></textarea>
                  </div>
                </div>

                <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p class="text-xs text-yellow-700">💡 <strong>Conseil :</strong> Soyez réaliste et précis. Ces
                    réponses évaluent votre capacité d'anticipation et de gestion de crise.</p>
                </div>
              </div> -->

          </div>

          <div class="flex justify-between mt-8">
            <button @click="showTab('financial', 6)"
              class="cursor-pointer text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              ← Retour
            </button>
            <button @click="showTab('impact', 8)"
              class="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Suivant : Impact Global →
            </button>
          </div>
        </div>
      </div>



      <!-- Fenêtre 8: Impact Global -->
      <div id="impact" class="tab-content active fade-in" v-if="step == 8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">🌍 Impact Global</h2>
                <p class="text-gray-600 mt-2">Social & Environnemental (Poids: 20%)</p>
              </div>
              <div class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Section 4/5
              </div>
            </div>

            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Emplois créés (12 derniers mois)
                  </label>
                  <input type="0" min="0" v-model.number="formPme.nbEmploisCrees"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Nouveaux emplois permanents et temporaires</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Pourcentage de femmes employées (%)
                  </label>
                  <input type="0" min="0" max="100" v-model.number="formPme.pourcentageFemmes"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Proportion actuelle dans l'effectif total</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Actions sociales/communautaires (12 mois)
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="social_actions" :value="true" v-model="formPme.actionsSociales"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="social_actions" :value="false" v-model="formPme.actionsSociales"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Précisez vos actions sociales (si applicable)
                  </label>
                  <textarea rows="2" v-model="formPme.detailsActionsSociales"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dons, soutien scolaire, projets communautaires..."></textarea>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Respect normes environnementales ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="environmental_norms" :value="true"
                        v-model="formPme.respectEnvironnement"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="environmental_norms" :value="false"
                        v-model="formPme.respectEnvironnement"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Certification environnementale/sociale
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="certification" :value="true" v-model="formPme.certification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="certification" :value="false" v-model="formPme.certification"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- ODD -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-green-900 mb-4">🎯 Objectifs de Développement Durable (ODD)</h3>
                <p class="text-sm text-green-700 mb-4">Sélectionnez les ODD directement impactés par votre entreprise :
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd1" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">1. Pas de pauvreté</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd2" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">2. Faim "zéro"</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd3" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">3. Bonne santé</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd4" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">4. Éducation de qualité</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd5" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">5. Égalité des sexes</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd8" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">8. Travail décent</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd9" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">9. Innovation industrielle</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd12" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">12. Consommation responsable</span>
                  </label>

                  <label class="flex items-center space-x-2 p-2 hover:bg-green-100 rounded cursor-pointer">
                    <input type="checkbox" value="odd13" v-model="formPme.oddImpactes" class="h-4 w-4 text-green-600">
                    <span class="text-sm">13. Mesures climatiques</span>
                  </label>
                </div>


                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description de votre impact sur les ODD sélectionnés
                  </label>
                  <textarea rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez comment votre activité contribue aux ODD choisis..."></textarea>
                </div>
              </div>

              <!-- Actions écologiques -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-blue-900 mb-4">🌱 Actions Écologiques (3 dernières années)</h3>
                <p class="text-sm text-blue-700 mb-4">Initiatives mises en place pour réduire votre impact écologique :
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    class="flex items-center space-x-3 p-3 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input type="checkbox" value="waste_reduction" v-model="formPme.actionsEcologiques"
                      class="h-4 w-4 text-blue-600">
                    <span class="text-sm">🌱 Réduction des déchets</span>
                  </label>

                  <label
                    class="flex items-center space-x-3 p-3 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input type="checkbox" value="recycling" v-model="formPme.actionsEcologiques"
                      class="h-4 w-4 text-blue-600">
                    <span class="text-sm">♻️ Recyclage</span>
                  </label>

                  <label
                    class="flex items-center space-x-3 p-3 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input type="checkbox" value="renewable_energy" v-model="formPme.actionsEcologiques"
                      class="h-4 w-4 text-blue-600">
                    <span class="text-sm">⚡ Énergie renouvelable</span>
                  </label>

                  <label
                    class="flex items-center space-x-3 p-3 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input type="checkbox" value="water_management" v-model="formPme.actionsEcologiques"
                      class="h-4 w-4 text-blue-600">
                    <span class="text-sm">💧 Gestion de l'eau</span>
                  </label>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Autres actions écologiques
                  </label>
                  <input type="text" v-model="formPme.autresActionsEcologiques"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Précisez d'autres initiatives...">
                </div>
              </div>


              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Certificat environnemental/social (optionnel)
                </label>
                <div @click="openFile()"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-sm text-gray-600">ISO 14001, FSC, Fairtrade, Label RSE...</p>
                  <p class="text-xs text-gray-400 mt-1">PDF, JPG - Max 5 Mo</p>
                </div>
              </div>
            </form>

            <div class="flex justify-between mt-8">
              <button @click="showTab('operational', 7)"
                class="cursor-pointer text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="showTab('governance', 9)"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Suivant : Gouvernance & équipe →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fenêtre 9: Gouvernance & Équipe -->
      <div id="governance" class="tab-content active fade-in" v-if="step == 9">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">👥 Gouvernance & Équipe</h2>
                <p class="text-gray-600 mt-2">Cohérence Humaine - Dirigeant & Équipe (Poids: 25%)</p>
              </div>
              <div class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Section 5/5
              </div>
            </div>

            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom du dirigeant principal <span class="text-red-500">*</span>
                  </label>
                  <input type="text" required v-model="formPme.dirigeantNom"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Gérant, DG, président...</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Expérience du dirigeant (années) <span class="text-red-500">*</span>
                  </label>
                  <input type="0" min="0" required v-model.number="formPme.experienceDirigeant"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <p class="text-xs text-gray-500 mt-1">❓ Total années d'expérience professionnelle</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Formation en gestion/finance du dirigeant
                    ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="management_training" :value="true" v-model="formPme.formationDirigeant"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="management_training" :value="false" v-model="formPme.formationDirigeant"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Équipe de direction définie ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="management_team" :value="true" v-model="formPme.equipeDirection"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="management_team" :value="false" v-model="formPme.equipeDirection"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Accès crédit bancaire/microfinance ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="credit" :value="true" v-model="formPme.accesCredit"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="credit" :value="false" v-model="formPme.accesCredit"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Garanties financières disponibles ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="guarantees" :value="true" v-model="formPme.garantiesFinancieres"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="guarantees" :value="false" v-model="formPme.garantiesFinancieres"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <span class="text-sm font-medium text-gray-700 min-w-fit">Rapport financier annuel établi ?</span>
                  <div class="flex space-x-6">
                    <label class="flex items-center">
                      <input type="radio" name="financial_report" :value="true" v-model="formPme.rapportFinancier"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Oui</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="financial_report" :value="false" v-model="formPme.rapportFinancier"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <span class="ml-2 text-sm text-gray-700">Non</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Relevé bancaire (12 derniers mois) <span class="text-red-500">*</span>
                  </label>
                  <div @click="openFile()"
                    class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                      </path>
                    </svg>
                    <p class="text-sm text-gray-600">Téléchargez vos relevés bancaires</p>
                    <p class="text-xs text-gray-400 mt-1">PDF - Max 10 Mo</p>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Dernier rapport financier (optionnel)
                  </label>
                  <div @click="openFile()"
                    class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    <p class="text-sm text-gray-600">Bilan, compte de résultat, annexes</p>
                    <p class="text-xs text-gray-400 mt-1">PDF - Max 10 Mo</p>
                  </div>
                </div>
              </div>
            </form>

            <div class="flex justify-between mt-8">
              <button @click="showTab('impact', 8)"
                class="cursor-pointer  text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ← Retour
              </button>
              <button @click="generateRapport()"
                class="cursor-pointer  bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <span v-if="isLoading">
                  En cours de traitement ...
                </span>
                <span v-else>
                  Suivant : Générer le rapport →
                </span>
              </button>
            </div>


          </div>
        </div>
      </div>

    </main>

    <!-- Alerte Tailwind -->
    <div v-if="isLoading"
      class="fixed bottom-10 bg-blue-100 border border-blue-400 text-blue-800 px-6 py-4 rounded-lg shadow-lg transition-all duration-300">
      <p class="font-semibold">Opération en cours...</p>
      <p class="text-sm">
        Vous recevrez une notification par mail à <span class="font-medium">{{ formPme.email }}</span>.
      </p>
    </div>
  </section>
</template>

<script>


import { AuthService } from "../services/auth"
import { createScoring } from "../services/n8n"
// import { PmeService } from "../services/pme"

export default {

  data() {
    return {
      isActiveItem: 'welcome',
      isLoading: false,
      step: 1,
      formPme: {
        user_id: "",
        nomEntreprise: "",
        anneeCreation: 0,
        statutLegal: "",
        secteurActivite: "",
        nombreEmployes: 0,
        localisation: "",
        telephone: "",
        email: "",
        historiqueBancaire: "",
        visionStrategique: "",
        chiffreAffaires: 0,
        beneficeNet: 0,
        ratioDettes: 0,
        tresorerieDisponible: 0,
        delaiPaiementClients: 0,
        delaiPaiementFournisseurs: 0,
        budgetRD: 0,
        nbProduitsLances: 0,
        enregistrePertes: false,
        accesCredit: false,
        garantiesFinancieres: false,
        rapportFinancier: false,
        businessPlan: false,
        caClientPrincipal: 0,
        crmOuErp: false,
        diversification: false,
        dependanceMarchesPublics: false,
        investissementDigital: false,
        detailsDigitaux: "",
        manuelProcedures: false,
        resilience1: "",
        resilience2: "",
        resilience3: "",
        nbEmploisCrees: 0,
        pourcentageFemmes: 0,
        actionsSociales: false,
        detailsActionsSociales: "",
        respectEnvironnement: false,
        certification: false,
        oddImpactes: [],
        actionsEcologiques: [],
        dirigeantNom: "",
        experienceDirigeant: 0,
        formationDirigeant: false,
        equipeDirection: false,
        gouvernance: false,
        cartographieCompetences: "", //[],
        planSuccession: false,
        formationContinue: false,
        tauxRotationPersonnel: 0,
        programmeBienEtre: false,
        detailsBienEtre: "",
        defisActuels: "",//[],
        objectifs12Mois: "", //[],
        benchmarking: "",
        caMoyenSecteur: 0,
        margeMoyenneSecteur: 0,
        autorisationDonnees: false,
        nomSignataire: "",
        dateSignature: "",
      },
      account: {}
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push({ path: "dashbaord" })
    },
    async generateRapport() {
      this.isLoading = true
      this.formPme.user_id = this.account.id

      this.formPme.oddImpactes = JSON.stringify(this.formPme.oddImpactes)
      this.formPme.actionsEcologiques = JSON.stringify(this.formPme.actionsEcologiques)

      console.log("🧑‍💼🧑‍💼", this.formPme)

      //==========ici
      await createScoring(this.formPme)

      setTimeout(() => {
        this.isLoading = false
        // window.location.reload()
      }, 5000)

      //============ fin 
    },
    // async generateRapport() {
    //   this.isLoading = true
    //   this.formPme.user_id = this.account.id
    //   console.log("this.formPme", this.formPme)
    //   // await createScoring(this.formPme)
    // },
    generateScoring() {
      // this.$router.push({ name: "Scoring" }

      createScoring(this.formPme)
      // this.$router.push({ name: "Rapport" })
    },
    openFile() {
      const file = document.createElement("input")

      file.setAttribute("type", "file")

      file.click()
    },
    deconnexion() {
      localStorage.clear()
      window.location.reload()
    },
    showTab(item, count) {
      this.isActiveItem = item
      this.step = count

      // console.log("this.form", this.formPme)
    },
    async getAccount() {
      const resp = await AuthService.getAccount()
      if (resp) {
        this.account = resp
      }
    }
  },
  async mounted() {
    await this.getAccount()
  }
}
</script>

<style scoped>
/* Custom styles for tab functionality */
.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* Custom animations */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.3s ease-in-out;
}
</style>