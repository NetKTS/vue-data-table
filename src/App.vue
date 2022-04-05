<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">Kittisak</div>
       <v-btn to="/tutorials"> tutorials </v-btn>
       <v-btn to="/add"> Add </v-btn>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
