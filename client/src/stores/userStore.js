import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
export const useUserStore = defineStore("user", {
  state: () => ({
    error: null,
    searchQuery: "",
  }),
  getters: {},
  actions: {
    setSearchQuery(e) {
      this.searchQuery = e;
      console.log(this.searchQuery);
    },
    async addGrocery(groceryInfo) {
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
          .post(
            import.meta.env.VITE_SERVER_URL + "/admin/groceries/",
            groceryInfo
          )
          .then((res) => {
            console.log(res);
          });
        window.location.reload();
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
    async editGrocery(groceryInfo) {
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
          .patch(
            import.meta.env.VITE_SERVER_URL +
              "/admin/groceries/" +
              groceryInfo._id,
            groceryInfo
          )
          .then((res) => {
            console.log(res);
          });
        window.location.reload();
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
    async deleteGrocery(groceryInfo) {
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
          .delete(
            import.meta.env.VITE_SERVER_URL + "/admin/groceries/" + groceryInfo,
            groceryInfo
          )
          .then((res) => {
            console.log(res);
          });
        window.location.reload();
      } catch (err) {
        console.log(err);
        this.error = err.response.data ? err.response.data.error : err;
      }
    },
  },
});
