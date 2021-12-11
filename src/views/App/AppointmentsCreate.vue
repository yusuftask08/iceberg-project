<template>
  <div>
    <div>
      <v-toolbar flat class="toolbar-color">
        <h2 class="h2">Randevu oluştur</h2>
      </v-toolbar>
    </div>
    <div class="mx-5">
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
    </div>
    <div class="d-flex justify-center">Map</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      tel: "",
    };
  },
};
</script>

<style>
</style>