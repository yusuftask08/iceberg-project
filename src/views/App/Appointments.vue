<template>
  <div>
    <v-toolbar flat class="toolbar-color">
      <h2 class="h2">Randevular</h2>
    </v-toolbar>
    <div>
      <AirTable :data="data" />
    </div>
  </div>
</template>
<script>
import AirTable from "@/components/AirTable.vue";
import { mapGetters } from "vuex";
import { APP_GET_TABLE_LISTED } from "@/store/actions.type";
export default {
  components: {
    AirTable,
  },
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch(APP_GET_TABLE_LISTED);
    },
  },
  computed: {
    ...mapGetters({
      data: "setTableData",
    }),
  },
};
</script>
<style>
</style>