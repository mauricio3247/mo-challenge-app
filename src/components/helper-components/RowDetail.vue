<template>
  <v-container class="pa-1">
      <v-row class="pa-0">
          <v-col xs="6" md="6" class="pa-1">
            <p class=" font-weight-bold">{{ title }}</p>
          </v-col>

          <v-col  xs="6" md="6" class="pa-1" >
            <p >{{ description }}</p>
          </v-col>

      </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["title", "description"],
};
</script>