<template>
  <v-row>
    <v-col xs="8" sm="8" class="pa-0">
      <p :class="{ 'font-weight-bold': isRelevant }">{{ itemName }}</p>
    </v-col>
    <v-col xs="4" sm="4" class="pa-0 pr-5">
      <p :class="{ 'font-weight-bold': isRelevant, 'text-right': true }">
        {{ itemDescription }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["itemName", "itemDescription", "relevant"],

  computed: {
    isRelevant() {
      return this.relevant == true;
    },
  },
};
</script>