<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Filtre Arama"
            single-line
            width="100%"
            hide-details
          />
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.agent_name"
                        label="İsim"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.agent_surname"
                        label="Soyisim"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.appointment_date"
                        label="Randevu Tarihi"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.contact_name"
                        label="Müşteri İsim"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.contact_surname"
                        label="Müşteri Soyisim"
                      /> </v-col
                    ><v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fields.contact_email"
                        label="Müşteri Email"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.fields.contact_phone"
                        label="Müşteri Telefon"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="red" text @click="close"> Vazgeç </v-btn>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="save"> Kaydet </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="primary" @click="editItem(item)" class="mr-2">
          <v-icon> mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Airtable",
  data: function () {
    return {
      apiUrl: "https://api.airtable.com/",
      apiKey: "keyflBvWscqJ1ND3N",
      records: [],
      dialog: false,
      search: null,
      dialogDelete: false,
      headers: [
        // {
        //   text: "Tarih",
        //   align: "start",
        //   sortable: false,
        //   value: "createdTime",
        // },
        { text: "İsim", value: "fields.agent_name" },
        { text: "Soyisim", value: "fields.agent_surname" },
        { text: "Randevu Tarihi", value: "fields.appointment_date" },
        { text: "Müşteri İsim", value: "fields.contact_name" },
        { text: "Müşteri Soyisim", value: "fields.contact_surname" },
        { text: "Müşteri Email", value: "fields.contact_email" },
        { text: "Müşteri Telefon", value: "fields.contact_phone" },
        { text: "", value: "actions", align: "end", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        fields: {
          agent_name: "",
          agent_surname: "",
          appointment_date: "",
          contact_name: "",
          contact_surname: "",
          contact_email: "",
          contact_phone: "",
        },
      },
      defaultItem: {
        agent_name: "",
        agent_surname: "",
        appointment_date: "",
        contact_name: "",
        contact_surname: "",
        contact_email: "",
        contact_phone: "",
      },
    };
  },
  mounted: function () {
    this.getData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    table: function (newTable, oldTable) {
      this.getData();
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getData: function () {
      var app_id = "appgykZBGTF92MnHu";
      var app_key = "keyflBvWscqJ1ND3N";
      this.items = [];
      axios
        .get(
          "https://api.airtable.com/v0/" +
            app_id +
            "/Appointments?api_key=" +
            app_key,
          {
            headers: {
              Authorization: "Bearer " + app_key,
            },
          }
        )
        .then((data) => {
          this.desserts = data.data.records;
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
