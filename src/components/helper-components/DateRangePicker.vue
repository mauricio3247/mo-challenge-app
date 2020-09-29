<template>
  <div>
    <v-menu
      :disabled="disabled"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-container grid-list-xs>
          <v-btn
            color="primary"
            class="capitalize"
            block
            outlined
            :disabled="disabled"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon light>mdi-calendar</v-icon>
            <div>
              <span>{{ checkInFormatted }}</span>
              <span class="ml-5"
                >&nbsp; &nbsp; &nbsp; &#8594; &nbsp; &nbsp; &nbsp;</span
              >
              <span class="ml-5">{{ checkOutFormatted }}</span>
            </div>
          </v-btn>
        </v-container>
      </template>
      <v-date-picker
        v-model="dates"
        no-title
        range
        @input="inputDone"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import * as moment from "moment";
const formatDate = "YYYY-MM-DD";
const formatDateDisplay = "MMM Do";
export default {
  props: {
    value: String,
    disabled: Boolean,
  },
  mounted() {
    let myValue = this.value;
    if (myValue === undefined || myValue === null || myValue.trim() === "") {
      const today = moment().format(formatDate);
      myValue = `${today} ${today}`;
    }
    const [from, to] = myValue.split(" ");
    const fromDate = moment(from, formatDate).format(formatDate);
    const toDate = moment(to, formatDate).format(formatDate);
    this.dates = [fromDate, toDate];
  },
  data: () => ({
    menu: false,
    dates: [],
  }),
  methods: {
    inputDone() {
      if (this.dates.filter((item) => item !== undefined).length == 2) {
        this.menu = false;

        //check if the dates are inverse then fix array
        const diff = moment(this.dates[1], formatDate).diff(
          moment(this.dates[0], formatDate),
          "days"
        );
        if (diff < 0) {
          this.dates = this.dates.reverse();
        }
        if (diff == 0) {
          this.dates[1] = moment(this.dates[0], formatDate)
            .add(1, "days")
            .format(formatDate);
        }
        this.$emit("input", this.dates.join(" "));
      } else {
        this.$emit("input", null);
      }
    },
  },
  computed: {
    checkInFormatted() {
      return this.dates[0]
        ? moment(this.dates[0], formatDate).format(formatDateDisplay)
        : "Check In";
    },
    checkOutFormatted() {
      return this.dates[1]
        ? moment(this.dates[1], formatDate).format(formatDateDisplay)
        : "Check Out";
    },
  },
};
</script>

<style lang="css" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>