<template>
  <div>
    <div>
      <v-toolbar flat class="toolbar-color">
        <h2 class="h2">Randevu oluştur</h2>
      </v-toolbar>
    </div>
    <div class="d-flex">
      <v-col cols="12" md="6" class="">
        <v-card class="mx-5" min-width="600px" min-height="80vmin">
          <v-col class="d-flex justify-center px-5">
            <v-text-field
              v-model="name"
              class="mr-2 mt-5"
              outlined
              label="Müşteri İsim"
            />
            <v-text-field
              class="mt-5"
              v-model="surname"
              outlined
              label="Müşteri Soyisim"
            />
          </v-col>
          <v-col class="d-flex justify-center px-5">
            <v-text-field
              v-model="email"
              class="mr-2"
              outlined
              label="Müşteri Email"
            />
            <v-text-field v-model="tel" outlined label="Müşteri Telefon" />
          </v-col>
          <v-col class="d-flex justify-center px-5">
            <v-dialog max-width="300px" persistent v-model="modal">
              <template v-slot:activator="{ on: { click } }">
                <v-text-field
                  :click="click"
                  width="200"
                  @click="modal = !modal"
                  class="mr-2"
                  outlined
                  v-model="picker"
                  label="Randevu Tarihini seçiniz"
                  readonly
                />
              </template>
              <v-date-picker
                class="d-flex"
                ref="dialog"
                locale="tr"
                v-model="picker"
                @change="dateSelect"
              >
                <v-btn class="d-flex" color="primary" @click="modal = !modal"
                  >Vazgeç</v-btn
                >
                <v-btn color="primary" @click="modal = !modal">Kaydet</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-dialog
              ref="dialog1"
              v-model="modal2"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  outlined
                  label="Randevu Saatini Seçiniz"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  locale="tr"
                />
              </template>
              <v-time-picker
                v-if="modal2"
                v-model="time"
                full-width
                format="24hr"
                locale="tr"
              >
                <v-spacer />
                <v-btn text color="primary" @click="modal2 = false">
                  Vazgeç
                </v-btn>
                <v-btn text color="primary" @click="save(time)"> Kaydet </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col class="d-flex justify-center px-5">
            <v-select
              :items="personals"
              v-model="personal"
              item-value="id"
              class="mr-2 w"
              item-text="fields.agent_name"
              outlined
              label="Personel"
            />
            <v-text-field v-model="adress" outlined label="Randevu Adresi" />
          </v-col>
          <div class="d-flex justify-center">
            <v-btn width="270px" color="primary" class="py-3 px-3" height="55">
              <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
              Randevu oluştur</v-btn
            >
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="d-flex" min-width="600px">
          <GmapMap
            :center="center"
            :zoom="18"
            map-style-id="roadmap"
            :options="mapOptions"
            style="width: 100vmin; height: 80vmin"
            ref="mapRef"
            @click="handleMapClick"
          >
            <GmapMarker
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"
            />
          </GmapMap>
        </v-card>
        <!-- <button>Detect Location</button>
        <p>Selected Position: {{ marker.position }}</p> -->
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APP_PERSONEL, APP_POST_CODES_API_GET } from "@/store/actions.type";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      dialog: false,
      dialog1: false,
      modal2: false,
      DateTime: null,
      time: "",
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      name: "",
      surname: "",
      email: "",
      tel: "",
      personal: "",
      adress: "",
      appointmentsDate: "",
      marker: { position: { lat: 51.729157, lng: 0.478027 } },
      center: { lat: 51.729157, lng: 0.478027 },
      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  created() {
    this.init();
    console.log(`this.picker`, this.picker);
  },
  computed: {
    ...mapGetters({
      personals: "setAgentData",
      workPlocation: "setWorkLocation",
    }),
  },
  methods: {
    dateSelect(e) {
      this.picker = e;
    },
    save(time) {
      this.$refs.dialog1.save(time);
      this.DateTime = moment(this.picker + " " + time).format();
    },
    init() {
      this.$store.dispatch(APP_PERSONEL);
      this.$store.dispatch(APP_POST_CODES_API_GET);
    },
    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(18);
    },
    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },
  },
};
</script>

<style>
.w {
  width: 200px;
}
</style>