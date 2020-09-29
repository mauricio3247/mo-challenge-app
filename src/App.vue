<template>
   <v-app>
    <v-main>
      <v-tabs v-model="e1" background-color="primary" centered fixed-tabs dark>
        <v-tab> Review </v-tab>
        <v-tab :disabled="isDatesNull"> Confirm </v-tab>
      </v-tabs>

      <v-tabs-items v-model="e1">
        <v-tab-item>
          <v-container>
            <v-row v-if="!home">
              <v-col class="d-flex justify-center">
                  <v-progress-circular
                    class="mt-10"
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
              </v-col>

            </v-row>
            <v-row v-if="home" >
              <v-col xs="12" sm="12" md="7" >
                <Review
                  v-on:go-confirm="goToConfirm"
                  :confirmMode="false"
                  :home="home"
                />
              </v-col>

              <v-col xs="12" sm="12" md="5">
                
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <v-row v-if="home">
              <v-col xs="12" sm="12" md="7">
                <Review
                  v-on:go-confirm="goToConfirm"
                  :confirmMode="true"
                  :home="home"
                />
              </v-col>

              <v-col xs="12" sm="12" md="5">
                
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import Review from './components/Review'

export default {
  name: 'App',
  async mounted() {
    this.$store.dispatch("load");
  },
  components: {
    Review,
  },

  data: () => ({
    e1: 0,
  }),
  methods: {
    goToConfirm() {
      this.e1 = 1;
    },
  },
  computed: {
    home() {
      return this.$store.getters["getHome"];
    },
    isConfirmMode() {
      return this.e1 !== 0;
    },
    isDatesNull() {
      return this.$store.getters["getDates"] === null;
    },
  },
};
</script>
