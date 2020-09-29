<template>
  <div>
    <v-card rounded class="mb-12 elevation-3 pa-5">
      <h3 class="mb-5 primary--text">
        Review trip details and adjust options if needed
      </h3>
      <RowDetail title="Dates:" :description="date"></RowDetail>
      <RowDetail title="Guests:" :description="guestCount"></RowDetail>
      <RowDetail
        title="Trip Duration:"
        :description="nightsCount + ' nights'"
      ></RowDetail>
      <RowDetail title="Base Price: " :description="basePrice"></RowDetail>

      <hr class="mb-2" flat />

      <v-textarea
        v-if="!confirmMode"
        solo
        name="input-7-4"
        label="Say hello to your host:"
        v-model="messageHost"
      ></v-textarea>

      <v-btn
        :disabled="isDatesNull"
        v-if="!confirmMode"
        @click="goToConfirm"
        block
        rounded
        color="primary"
        >Continue</v-btn
      >
      <v-btn
        :disabled="isDatesNull"
        v-if="confirmMode"
        @click="confirm"
        block
        rounded
        color="primary"
        >Confirm</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import RowDetail from "./helper-components/RowDetail";
import * as moment from "moment";
export default {
  props: ["home", "confirmMode"],
  components: { RowDetail },
  data: () => ({
    messageHost: "",
  }),
  methods: {
    goToConfirm() {
      this.$emit("go-confirm");
    },
    async confirm() {
      const payload ={
        message: this.message,
        checkin: this.checkIn,
        checkout: this.checkOut,
        adults: this.getAdults,
        children: this.getChildrens,
        pets: this.getPets,
      };
      const response = await this.$store.dispatch(
        "confirmReservation",
        payload
      );

      this.$emit("done-process", response);
    },
  },
  watch: {
    messageHost(value) {
      this.$store.dispatch("changeMessageHost", value);
    },
  },
  computed: {
    basePrice() {
      return this.home?.base_price + "$";
    },
    guestCount() {
      return (
        this.$store.getters["getAdults"] + this.$store.getters["getChildrens"]
      );
    },
    nightsCount() {
      return this.$store.getters["getNightsCount"];
    },
    checkIn() {
      return this.$store.getters["getCheckIn"];
    },
    checkOut() {
      return this.$store.getters["getCheckOut"];
    },
    getAdults() {
      return this.$store.getters["getAdults"];
    },
    getChildrens() {
      return this.$store.getters["getChildrens"];
    },
    getPets() {
      return this.$store.getters["getPets"];
    },
    date() {
      if (this.checkIn === null || this.checkOut === null) {
        return "";
      }
      const checkIn = moment(this.checkIn, "YYYY-MM-DD").format("MMMM Do");
      const checkOut = moment(this.checkOut, "YYYY-MM-DD").format(
        "MMMM Do YYYY"
      );
      return `${checkIn} to ${checkOut}`;
    },
    isDatesNull() {
      return this.$store.getters["getDates"] === null;
    },
    message() {
      return this.$store.getters["getMessageHost"];
    },
  },
};
</script>
