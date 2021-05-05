<template>
  <h2>NOM SITE</h2>
  <div class="topnav">
    <router-link to="/">Home</router-link>
    <router-link to="/user">Compte</router-link>
    <router-link to="/deco">Déconnexion</router-link>
  </div>
  <router-view/> 
</template>

<script>

export default {
  name: 'NavBar'
}

</script>

<style scoped>
  @import './../assets/css/style.css'
</style>