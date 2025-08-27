import { defineStore } from 'pinia';
import api from '../api/axios';
import { useAuthStore } from './auth';

export const usePmeStore = defineStore('pme', {
  state: () => ({
    pmes: [],
    evaluations: [],
    loading: false,
    error: null,
    filters: {
      secteurActivite: '',
      localisation: '',
      anneeCreation: '',
    },
  }),

  actions: {
    // Récupère les PME de l'utilisateur connecté (avec filtres)
    async fetchPmes() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();

        // On s'assure que l'utilisateur est chargé
        if (!authStore.user) {
          await authStore.getAccount(); // récupère le user depuis /auth/account
        }

        const userId = authStore.user?.id;
        if (!userId) {
          throw new Error("Impossible de récupérer l'utilisateur connecté");
        }

        const params = new URLSearchParams();
        Object.entries(this.filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        console.log(`[PME Store] Récupération des PME pour l'utilisateur ${userId} avec filtres:`, this.filters);
        const response = await api.get(`/pme/${userId}`, { params });

        this.pmes = response.data;
        console.log("[PME Store] PME(s) chargée(s):", this.pmes);
      } catch (error) {
        this.error = error.response?.data?.message || "Erreur lors de la récupération des PME";
        console.error("[PME Store] Erreur fetchPmes:", error.response?.data || error.message);
      } finally {
        this.loading = false;
      }
    },

    // Crée une nouvelle PME
    async createPme(pmeData) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();

        // Vérifie si le user est déjà connu sinon appelle /auth/account
        if (!authStore.user) {
          await authStore.getAccount();
        }

        const userId = authStore.user?.id;
        if (!userId) {
          throw new Error("Impossible de récupérer l'utilisateur connecté");
        }

        const dataToSend = {
          user_id: userId, // bien envoyer user_id
          ...pmeData,
        };

        console.log("[PME Store] Création d'une PME avec données:", dataToSend);

        const response = await api.post('/pme', dataToSend);
        this.pmes.push(response.data);

        console.log("[PME Store] PME créée avec succès:", response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Erreur lors de la création de la PME";
        console.error("[PME Store] Erreur createPme:", error.response?.data || error.message);
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    // ... (updatePme, deletePme, requestEvaluation inchangés)
  },
});
