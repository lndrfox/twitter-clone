<template>
  <div class="topnav">
    <router-link to="/">Home</router-link>
    <router-link v-if="logged" to="/user">Compte</router-link>
    <router-link v-if="!logged" to="/login">Connexion</router-link>
    <router-link v-if="logged" to="/logout">Deconnexion</router-link>
  </div>
  <router-view/> 
</template>

<script>

export default {
  name: 'NavBar',

  data(){
    return {
      logged: false
    }
  },

  methods: {

      loggedIn(){

          return this.$cookies.isKey('token');
      }

  },

  mounted: 
    function () {
      window.setInterval(() => {
        this.logged=this.loggedIn();
      }, 10)
    }
}

</script>

<style scoped>
  @import './../assets/css/style.css'
</style>