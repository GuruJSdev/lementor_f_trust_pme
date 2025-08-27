<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md">
      <Alert :message="'Erreur lors de l\'inscription'" v-if="error" />
      <form
        @submit.prevent="handleRegister"
        class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 class="text-2xl font-bold text-blue-darker mb-6 text-center">
          Inscription
        </h2>

        <!-- Prénom -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="firstname"
          >
            Prénom *
          </label>
          <input
            v-model="form.firstname"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Votre prénom"
            required
          />
        </div>

        <!-- Nom -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="lastname"
          >
            Nom *
          </label>
          <input
            v-model="form.lastname"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Votre nom"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email *
          </label>
          <input
            v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Votre email"
            required
          />
        </div>

        <!-- Mot de passe -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Mot de passe *
          </label>
          <input
            v-model="form.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="6 caractères minimum"
            required
            @input="validatePassword"
          />
          <p
            v-if="errors.password"
            class="text-red-500 text-xs italic mt-1"
          >
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirmation du mot de passe -->
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="confirmPassword"
          >
            Confirmer le mot de passe *
          </label>
          <input
            v-model="form.confirmPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirmez votre mot de passe"
            required
            @input="validatePassword"
          />
          <p
            v-if="errors.confirmPassword"
            class="text-red-500 text-xs italic mt-1"
          >
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Rôle -->
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="role"
          >
            Rôle
          </label>
          <select
            v-model="form.role"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
          >
            <option value="pme">PME</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- Bouton d'inscription -->
        <div class="flex items-center justify-between">
          <button
            :disabled="loading || !isFormValid"
            class="bg-blue-900 hover:bg-blue-darker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            <span v-if="!loading">S'inscrire</span>
            <span v-else>Chargement...</span>
          </button>
        </div>

        <!-- Lien vers la page de connexion -->
        <div class="mt-4 text-center">
          <p class="text-gray-600">
            Déjà un compte ?
            <router-link
              to="/login"
              class="text-blue-dark hover:underline font-medium"
            >
              Se connecter
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Alert from '../components/Alert.vue';
import {AuthService} from "../services/auth"

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'pme',
});
const error = ref(false)
const loading=ref(false)

const errors = ref({
  password: '',
  confirmPassword: '',
});

const authStore = useAuthStore();
const router = useRouter();

// Valide le mot de passe et sa confirmation
const validatePassword = () => {
  // Réinitialise les erreurs
  errors.value.password = '';
  errors.value.confirmPassword = '';

  // Vérifie la longueur minimale
  if (form.value.password && form.value.password.length < 6) {
    errors.value.password = 'Le mot de passe doit contenir au moins 6 caractères.';
  }

  // Vérifie la correspondance
  if (
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password !== form.value.confirmPassword
  ) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }
};

// Vérifie si le formulaire est valide
const isFormValid = computed(() => {
  return (
    form.value.firstname.trim() !== '' &&
    form.value.lastname.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.password.length >= 6 &&
    form.value.password === form.value.confirmPassword
  );
});

// Gère la soumission du formulaire
const handleRegister = async () => {
  if (!isFormValid.value) {
    validatePassword(); // Force la validation avant soumission
    return;
  }

  try {
    const { confirmPassword, ...registerData } = form.value;
    // await authStore.register(registerData);
    loading.value=true
    const response = await AuthService.register(registerData)

    if(response){
      router.push('/login');
    }

  } catch (err) {
    error.value=false
  }
  loading.value=false

  setTimeout(()=>{
     error.value=false
  },5000)
  
};
</script>

