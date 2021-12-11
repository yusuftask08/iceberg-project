<template>
  <div>
    <v-toolbar flat class="toolbar-color">
      <h2 class="h2">Randevular</h2>
    </v-toolbar>
    <div>
      <AirTable />
    </div>
  </div>
</template>

<script>
import AirTable from "@/components/AirTable.vue";
export default {
  components: {
    AirTable,
  },
  data() {
    return {
      base: "appgykZBGTF92MnHu",
    };
  },
};
</script>
<style>
</style>