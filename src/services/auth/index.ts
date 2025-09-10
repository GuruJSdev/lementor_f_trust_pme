
import router from "@/router";
import axios from "axios"


export class AuthService {


    static async login(email = "", password = "") {
        try {
            const response = await axios.post('https://lementor-b-trust-pme-2.onrender.com/api/auth/login', {
                email,
                password,
            });

            if (response) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }


    static async register(userData: any) {
        try {
            const response = await axios.post('https://lementor-b-trust-pme-2.onrender.com/api/auth/register', userData);

            if (response) {
                return response.data;
            } else {
                return false
            }

        } catch (error) {
            return false
        }
    }

    static async getAccount() {

        try {

            const token = localStorage.getItem("token")
            if(!token){
                router.push("login")
            }
            const { data } = await axios.get('https://lementor-b-trust-pme-2.onrender.com/api/auth/account', {
                headers: { Authorization: `Bearer ${token}` }, // utile même avec l'interceptor
            });
            if(data){
                return data
            }else{
                return false
            }
        } catch (error) {
            return false
        }

    }

}