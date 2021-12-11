<template>
  <div>
    <template>
      <v-app>
        <v-app-bar height="64px" app color="primary" dark elevation="0">
          <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu" />
          <v-spacer />
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on" class="mr-2">
                <v-avatar size="48">
                  <v-icon dark> mdi-logout </v-icon>
                </v-avatar>
              </v-btn>
            </template>
          </v-menu>
        </v-app-bar>
        <v-navigation-drawer
          v-model="sidebarMenu"
          app
          floating
          :permanent="sidebarMenu"
          :mini-variant.sync="mini"
        >
          <v-list dense dark color="primary">
            <v-list-item>
              <v-list-item-action>
                <v-icon @click.stop="sidebarMenu = !sidebarMenu"
                  >mdi-chevron-left</v-icon
                >
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="font-size: 15px">
                  Iceberg Digital
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list-item class="px-2" @click="toggleMini = !toggleMini">
            <v-list-item-avatar>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-truncate">
              Yusuf Taskiran
            </v-list-item-content>
            <v-btn icon small>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider />
          <v-list>
            <v-list-item
              v-for="item in links"
              :key="item.title"
              link
              :to="item.href"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-row class="fill-height">
          <v-col> <router-view></router-view></v-col>
        </v-row>
      </v-app>
    </template>
  </div>
</template>
<script>
export default {
  name: "apps",
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    buttonText() {
      return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    },
  },
  data: () => ({
    TokenName: "Yusuf TASK",
    sidebarMenu: true,
    toggleMini: false,
    themeState: true,
    mini: false,
    links: [
      {
        title: "Anasayfa",
        href: "/",
        icon: "mdi-home-outline",
      },
      {
        title: "Randevu Oluştur",
        href: "/appointments-create",
        icon: "mdi-calendar-plus",
      },
      {
        title: "Randevular",
        href: "/appointments",
        icon: "mdi-calendar-month-outline",
      },
    ],
  }),
  methods: {
    toggleTheme() {
      this.themeState = !this.themeState;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    name() {
      return this.data;
    },
  },
};
</script>
<style>
.v-list-item__icon {
  margin-right: 22px !important;
}
.v-list-item__action {
  margin-right: 22px !important;
}
</style>


