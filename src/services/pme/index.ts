import axios from "axios";

export class PmeService {
    static baseUrl = "http://localhost:3000/api"; // modifie si besoin

    // Récupère les PME d'un utilisateur avec filtres
    static async fetchPmes(userId: string, filters: any = {}) {
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value as string);
            });

            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${this.baseUrl}/pme/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });

            return data;
        } catch (error: any) {
            console.error("[PmeService] fetchPmes error:", error.response?.data || error.message);
            throw error.response?.data?.message || "Erreur lors de la récupération des PME";
        }
    }

    // Crée une nouvelle PME
    static async createPme(pmeData: any) {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(`${this.baseUrl}/pme`, pmeData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            console.error("[PmeService] createPme error:", error.response?.data || error.message);
            throw error.response?.data?.message || "Erreur lors de la création de la PME";
        }
    }

    // Exemple pour update
    static async updatePme(pmeId: string, pmeData: any) {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(`${this.baseUrl}/pme/${pmeId}`, pmeData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            console.error("[PmeService] updatePme error:", error.response?.data || error.message);
            throw error.response?.data?.message || "Erreur lors de la mise à jour de la PME";
        }
    }

    // Exemple pour delete
    static async deletePme(pmeId: string) {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.delete(`${this.baseUrl}/pme/${pmeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            console.error("[PmeService] deletePme error:", error.response?.data || error.message);
            throw error.response?.data?.message || "Erreur lors de la suppression de la PME";
        }
    }
}
