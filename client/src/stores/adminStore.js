import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    usersData: [],
    error: null,
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
    async getUsersInfo() {
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
          .get(import.meta.env.VITE_SERVER_URL + "/admin/users/", config)
          .then((res) => {
            this.usersData = res.data.users_res;
            console.log(this.usersData);
          });
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
  },
});
