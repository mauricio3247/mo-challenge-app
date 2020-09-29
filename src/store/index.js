import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//import {getData} from '../helper/mock-get-data'
import * as moment from "moment";
const formatDate = "YYYY-MM-DD";
const URL_BACKEND = "https://mo-challenge-api.herokuapp.com";
export default new Vuex.Store({
  state: {
    checkIn: moment().format(formatDate),
    checkOut: moment()
      .add(1, "days")
      .format(formatDate),
    adults: 1,
    childrens: 0,
    pets: false,
    home: null,
    messageHost: "",
    messageErrorLoad: "",
  },
  getters: {
    getHome(state) {
      return state.home;
    },
    getAdults(state) {
      return state.adults;
    },
    getChildrens(state) {
      return state.childrens;
    },
    getErrorMessage(state) {
      return state.messageErrorLoad;
    },

    getCheckIn(state) {
      return state.checkIn;
    },
    getCheckOut(state) {
      return state.checkOut;
    },

    getDates(state) {
      if (state.checkIn === null || state.checkOut === null) {
        return null;
      } else {
        return `${state.checkIn} ${state.checkOut}`;
      }
    },
    getNightsCount(state) {
      if (state.checkIn === null || state.checkOut === null) {
        return 0;
      } else {
        return moment(state.checkOut, formatDate).diff(
          moment(state.checkIn, formatDate),
          "days"
        );
      }
    },

    getPets(state) {
      return state.pets;
    },

    getMessageHost(state) {
      return state.messageHost;
    },
  },
  mutations: {
    SET_MESSAGE_ERROR(state, message) {
      state.messageErrorLoad = message;
    },
    CLEAR_STATE(state) {
      state.messageErrorLoad = "";
      state.home = null;
      state.pets = false;
      state.checkIn = moment().format(formatDate);
      state.checkOut = moment()
        .add(1, "days")
        .format(formatDate);
      state.adults = 1;
      state.childrens = 0;
      state.messageHost = "";
    },
    LOAD_DATA(state, item) {
      state.messageErrorLoad = "";
      state.home = item;
    },
    SET_CHECK_DATES(state, { checkIn, checkOut }) {
      state.checkIn = checkIn;
      state.checkOut = checkOut;
    },
    CLEAR_CHECK_DATES(state) {
      state.checkIn = null;
      state.checkOut = null;
    },

    SET_PETS_VALUE(state, value) {
      state.pets = value;
    },

    SET_ADULTS(state, value) {
      state.adults = value;
    },

    SET_CHILDRENS(state, value) {
      state.childrens = value;
    },

    SET_MESSAGE_HOST(state, value) {
      state.messageHost = value;
    },
  },
  actions: {
    async load({ commit }) {
      try {
        commit("CLEAR_STATE");
        const response = await fetch(
          `${URL_BACKEND}/api/listings/28eed9aa-c27d-4217-ab21-ad65ead3a2aa`
        );
        const data = await response.json();
        if (data.success === false) {
          //error
          throw new Error(data.data.message);
        } else {
          commit("LOAD_DATA", data);
        }
      } catch (error) {
        console.log(error);
        commit("SET_MESSAGE_ERROR", "Error to load data");
      }
    },
    async confirmReservation({ commit }, payload) {
      try {
        const response = await fetch(
          `${URL_BACKEND}/api/listings/28eed9aa-c27d-4217-ab21-ad65ead3a2aa/confirm-reservation`,
          {
            mode:'cors',
            body: JSON.stringify(payload),
            method: "POST",
          }
        );
        const data = await response.json();
        return data.message;
      } catch (error) {
        console.log(error);
        commit("SET_MESSAGE_ERROR", "Error to send data");
        return "Error to send data";
      }
    },
    changeCheckDates({ commit }, { checkIn, checkOut }) {
      commit("SET_CHECK_DATES", { checkIn, checkOut });
    },
    clearCheckDates({ commit }) {
      commit("CLEAR_CHECK_DATES");
    },
    changePets({ commit }, value) {
      commit("SET_PETS_VALUE", value);
    },
    changeAdults({ commit }, value) {
      commit("SET_ADULTS", value);
    },
    changeChildrens({ commit }, value) {
      commit("SET_CHILDRENS", value);
    },

    changeMessageHost({ commit }, value) {
      commit("SET_MESSAGE_HOST", value);
    },
  },
});
