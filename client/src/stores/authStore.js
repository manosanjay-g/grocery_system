import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    userData: {},
    error: null,
    groceriesData: [],
  }),
  getters: {
    getLoginState: (state) => {
      return state.isLoggedIn;
    },
    getAdminState: (state) => {
      return state.isAdmin;
    },
    getLoadingState: (state) => {
      return state.isLoading;
    },
    getErrorMessage: (state) => {
      return state.error;
    },
  },
  actions: {
    async login(loginInfo) {
      try {
        this.error = null;
        console.log(import.meta.env.SERVER_URL);
        // eslint-disable-next-line no-unused-vars
        let response = await axios
          .post(import.meta.env.VITE_SERVER_URL + "/auth/login", loginInfo)
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            this.isLoggedIn = true;
          });
        await this.getUserInfo();
        console.log(this.userData);
        router.replace("/");
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
    async getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const config = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
        // eslint-disable-next-line no-unused-vars
        const user = await axios
          .get(import.meta.env.VITE_SERVER_URL + "/user/" + id, config)
          .then((res) => {
            this.userData = res.data.user_res;
          });
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
    async getGroceries() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const config = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
        // eslint-disable-next-line no-unused-vars
        const groceries = await axios
          .get(import.meta.env.VITE_SERVER_URL + "/user/groceries/", config)
          .then((res) => {
            this.groceriesData = res.data.groceries_res;
            console.log(res);
          });
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
    async logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      window.location.reload();
    },
  },
});
