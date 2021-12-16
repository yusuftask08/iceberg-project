<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      :search="search"
    >
      <template v-slot:[`item.fields.appointment_date`]="{ item }">
        <v-chip :color="getColor(item.fields.appointment_date)" dark>
          {{ item.fields.appointment_date }}
        </v-chip>
      </template>
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
              <v-card-title class="justify-center d-flex">
                <span class="text-h5">Randevuyu Düzenle</span>
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
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
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
        <v-btn color="primary" @click="getData"> Yenile </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { APP_PUT_DATA } from "@/store/actions.type";
export default {
  name: "Airtable",
  props: ["data"],
  data: function () {
    return {
      dialog: false,
      search: null,
      dialogDelete: false,
      headers: [
        { text: "Randevu Tarihi", value: "fields.appointment_date" },
        { text: "İsim", value: "fields.agent_name" },
        { text: "Soyisim", value: "fields.agent_surname" },
        { text: "Müşteri İsim", value: "fields.contact_name" },
        { text: "Müşteri Soyisim", value: "fields.contact_surname" },
        { text: "Müşteri Email", value: "fields.contact_email" },
        { text: "Müşteri Telefon", value: "fields.contact_phone" },
        { text: "", value: "actions", align: "end", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        Id: "",
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
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getColor(e) {
      const mydate = e;
      const q = new Date();
      const m = q.getMonth();
      const d = q.getDay();
      const y = q.getFullYear();
      const date = new Date(y, m, d).toISOString();
      if (date > mydate) {
        return "red";
      } else {
        return "green";
      }
    },
    getData() {
      this.$store.dispatch(APP_GET_TABLE_LISTED);
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
      this.$store.dispatch(APP_PUT_DATA, this.editedItem);
    },
  },
};
</script>
