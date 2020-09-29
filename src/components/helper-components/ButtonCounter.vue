<template>
  <div class="d-flex">
    <v-btn
      v-if="!disabled"
      color="primary"
      :disabled="!canBeDecrease"
      @click="decrease"
      outlined
      fab
      small
    >
      <v-icon small>mdi-minus</v-icon>
    </v-btn>
    <div class="pa-2 pl-5 pr-5">{{ model }}</div>
    <v-btn
      v-if="!disabled"
      color="primary"
      :disabled="!canBeIncrease"
      @click="increase"
      outlined
      fab
      small
    >
      <v-icon small>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
    value: Number,
    disabled: Boolean,
  },
  mounted() {
    this.model = this.value;
  },
  data: () => ({
    model: 0,
  }),
  methods: {
    increase() {
      if (this.model < this.max) {
        this.model++;
        this.$emit("input", this.model);
      }
    },
    decrease() {
      const minimal = this.min === undefined ? 1 : this.min;
      if (this.model > minimal) {
        this.model--;
        this.$emit("input", this.model);
      }
    },
  },
  computed: {
    canBeDecrease() {
      const minimal = this.min === undefined ? 1 : this.min;
      return this.model > minimal;
    },
    canBeIncrease() {
      return this.model < this.max;
    },
  },
};
</script>