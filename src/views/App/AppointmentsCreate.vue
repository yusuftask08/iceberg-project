<template>
  <div>
    <div>
      <v-toolbar flat class="toolbar-color">
        <h2 class="h2">Randevu oluştur</h2>
      </v-toolbar>
    </div>
    <div class="d-flex">
      <v-col cols="12" md="5">
        <v-card class="d-flex" max-width="500px">Map</v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-5 my-5" min-width="700px">
          <v-col class="d-flex justify-center">
            <v-text-field
              v-model="name"
              class="mr-2"
              outlined
              label="Müşteri İsim"
            />
            <v-text-field v-model="surname" outlined label="Müşteri Soyisim" />
          </v-col>
          <v-col class="d-flex justify-center">
            <v-text-field
              v-model="email"
              class="mr-2"
              outlined
              label="Müşteri Email"
            />
            <v-text-field v-model="tel" outlined label="Müşteri Telefon" />
          </v-col>
          <v-col class="d-flex justify-center">
            <v-select
              :items="personals"
              v-model="personal"
              item-value="id"
              item-text="fields.agent_name"
              class="mr-2"
              outlined
              label="Personel"
            />
          </v-col>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APP_PERSONEL } from "@/store/actions.type";
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      tel: "",
      personal: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch(APP_PERSONEL);
    },
  },
  computed: {
    ...mapGetters({
      personals: "setAgentData",
    }),
  },
};
</script>

<style>
</style>