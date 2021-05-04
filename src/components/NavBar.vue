<template>
  <div id="#app">
    <h2>NOM SITE</h2>
    <div class="topnav">
      <router-link class="active" to="/">Home</router-link>
      <router-link to="/user">Compte</router-link>
      <router-link to="/deco">Déconnexion</router-link>
    </div>
  <router-view/> 
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    page: Number
  }
}

</script>

<style scoped>
  @import './../assets/css/style.css';
</style>