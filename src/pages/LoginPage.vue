<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md">
      <Alert :message="'Email ou mot de passe incorrect'" v-if="error" />
      <form
        @submit.prevent="handleLogin"
        class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 class="text-2xl font-bold text-blue-darker mb-6 text-center">Connexion</h2>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            :disabled="loading"
            class=" cursor-pointer bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            <span v-if="!loading">Se connecter</span>
            <span v-else>Chargement...</span>
          </button>
        </div>
        <div class="mt-4 text-center">
          <p class="text-gray-600">
            Pas de compte ?
            <router-link to="/register" class="text-blue-dark hover:underline">
              S'inscrire
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuthStore } from '../stores/auth';
import Alert from '../components/Alert.vue';
import {AuthService} from "../services/auth"


const email = ref('');
const password = ref('');
// const authStore = useAuthStore();
const router = useRouter();
const error = ref(null);
const loading =ref(false)

const handleLogin = async () => {
  try {
    loading.value=true
    const resp = await AuthService.login(email.value, password.value)
    // const resp = await authStore.login(email.value, password.value);

    console.log("resp =>",resp)

    if(resp){
       localStorage.setItem("token",resp.access_token)
       router.push('/home');
    }else{
       error.value=true
    }
   
  } catch (err) {
     error.value=true
  }

  setTimeout(()=>{
    error.value=false
  },5000)

   loading.value=false
};
</script>
