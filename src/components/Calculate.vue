<template>
  <v-card rounded class="mb-12 elevation-3 pa-5">
    <v-container grid-list-xs class="pa-0">
      <v-row>
        <v-col xs="9" class="pa-0 ml-2">
          <h3 class="primary--text">{{ home.name }}</h3>
          <p>{{ home.description }}</p>
          <v-rating readonly v-model="rating"></v-rating>
        </v-col>
        <v-spacer></v-spacer>
        <v-col xs="3" class="pa-0">
          <v-avatar class="profile" color="grey" size="100" tile>
            <v-img :src="home.image_url"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
    <hr class="mt-2 mb-3" />
    <v-container grid-list-xs class="pa-0">
      <v-row>
        <v-col xs="12" md="12" class="pa-0">
          <DateRangePicker
            :disabled="confirmMode"
            v-model="dates"
          ></DateRangePicker>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="8" sm="8" class="pa-0">
          <p class="pt-2">how many guests?</p>
        </v-col>
        <v-col xs="4" sm="4" class="pa-0">
          <ButtonCounter
            :disabled="confirmMode"
            :max="maxAdults"
            v-model="adults"
          ></ButtonCounter>
        </v-col>
      </v-row>

      <v-row>
        <v-col xs="8" sm="8" class="pa-0">
          <p class="pt-2">how many childrens?</p>
        </v-col>
        <v-col xs="4" sm="4" class="pa-0">
          <ButtonCounter
            :disabled="confirmMode"
            :min="minChildrens"
            :max="maxChildrens"
            v-model="childrens"
          ></ButtonCounter>
        </v-col>
      </v-row>

      <v-row>
        <v-col xs="8" sm="8" class="pa-0">
          <p class="pt-5">do you have pets?</p>
        </v-col>

        <v-col xs="2" sm="2" class="pa-0">
          <v-switch
            v-if="!confirmMode"
            :disabled="!allowPets"
            v-model="havePets"
            :label="`${havePetsYesNo}`"
          ></v-switch>
          <p class="pt-5 text-center" v-if="confirmMode">{{ havePetsYesNo }}</p>
        </v-col>
      </v-row>
      <h4 class="mt-5 mb-2 primary--text">Your reservation cost:</h4>
      <RowTotal
        itemName="Stay Duration:"
        :itemDescription="nightsCount + ' nights'"
      />
      <RowTotal itemName="Nights Cost:" :itemDescription="totalNigths + '$'" />
      <RowTotal itemName="Discount:" :itemDescription="totalDiscount + '$'" />
      <RowTotal itemName="Cleaning Fee:" :itemDescription="cleaningFee + '$'" />
      <RowTotal itemName="Your Total:" :itemDescription="total + '$'" />
    </v-container>
  </v-card>
</template>

<script>
import DateRangePicker from "./helper-components/DateRangePicker";
import ButtonCounter from "./helper-components/ButtonCounter";
import RowTotal from "./helper-components/RowTotal";
export default {
  props: ["home", "confirmMode"],
  components: { DateRangePicker, ButtonCounter, RowTotal },
  beforeMount() {
    this.dates = this.$store.getters["getDates"];
    this.allowPets = this.home?.is_pets_allowed;
    this.havePets = this.$store.getters["getPets"];
    this.maxAdults = this.home?.adults;
    this.maxChildrens = this.home?.children;
    this.adults = this.$store.getters["getAdults"];
    this.childrens = this.$store.getters["getChildrens"];
  },
  data: () => ({
    maxAdults: 10,
    minChildrens: 0,
    maxChildrens: 2,
    allowPets: true,
    havePets: false,
    dates: null,
    adults: 2,
    childrens: 0,
    rating: 5,
  }),
  computed: {
    havePetsYesNo() {
      return this.$store.getters["getPets"] ? "Yes" : "No";
    },
    nightsCount() {
      return this.$store.getters["getNightsCount"];
    },
    totalNigths() {
      return parseFloat((this.nightsCount * this.home?.base_price).toFixed(2));
    },
    totalDiscount() {
      let discount = 0;
      if (this.nightsCount > 7) {
        discount =
          discount + (this.home?.weekly_discount * this.nightsCount) / 7;
      }
      if (this.nightsCount > 30) {
        discount =
          discount + (this.home?.monthly_discount * this.nightsCount) / 30;
      }

      return parseFloat(discount.toFixed(2));
    },
    cleaningFee() {
      return this.home?.cleaning_fee;
    },
    total() {
      return (this.totalNigths + this.cleaningFee - this.totalDiscount).toFixed(
        2
      );
    },
  },

  watch: {
    dates(value) {
      if (value != null) {
        const [checkIn, checkOut] = value.split(" ");
        this.$store.dispatch("changeCheckDates", { checkIn, checkOut });
      } else {
        this.$store.dispatch("clearCheckDates");
      }
    },
    havePets(value) {
      this.$store.dispatch("changePets", value);
    },
    adults(value) {
      this.$store.dispatch("changeAdults", value);
    },
    childrens(value) {
      this.$store.dispatch("changeChildrens", value);
    },
  },
};
</script>