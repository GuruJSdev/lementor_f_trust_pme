import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const error = ref(null);
  const loading = ref(false);

  const setError = (msg: string) => {
    // error.value = msg;
    setTimeout(() => (error.value = null), 5000);
  };

const getAccount = async () => {
  if (!token.value) throw new Error('Aucun token');
  loading.value = true;
  try {
    const { data } = await axios.get('http://localhost:3000/api/auth/account', {
      headers: { Authorization: `Bearer ${token.value}` }, // utile même avec l'interceptor
    });
    user.value = data; // objet utilisateur retourné par le backend
    return data;
  } finally {
    loading.value = false;
  }
};

  const register = async (userData: any) => {
    loading.value = true;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', userData);

      // après inscription, on redirige vers login
      localStorage.removeItem('token');
      window.location.href = '/login';
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      token.value = response.data.access_token;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);

      // dès que tu te connectes, tu récupères aussi le compte
      await getAccount();

      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  return { user, token, error, loading, register, login, logout, getAccount };
});
