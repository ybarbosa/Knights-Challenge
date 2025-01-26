<template>
  <v-app-bar color="rgb(240 240 240)" elevate-on-scroll dense fixed>
    <v-container class="nav-box">
      <img
        width="44px"
        @click="$router.push('/')"
        src="../assets/knight.png"
        alt="Knights Logo"
        role="button"
        class="logo"
      />

      <v-spacer></v-spacer>
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        @click="$router.push(link.route)"
        class="mx-2 nav-btn"
        text
        rounded
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.label }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavComp",
  data() {
    return {
      links: [
        { label: "Home", route: "/", icon: "mdi-home" },
        { label: "Create", route: "/create-knight", icon: "mdi-plus" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      console.log("Menu toggled"); 
    },
  },
};
</script>

<style scoped>
.nav-box {
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 800px;
  align-items: center;
}
.v-app-bar {
  height: 70px;
}
.v-btn {
  text-transform: none;
}
.text-h5 {
  color: white;
}

.nav-btn {
  transition: all 0.3s ease-in-out;
}

.nav-btn:hover {
  color: #fff; 
  background-color: #c02418;
}
</style>
