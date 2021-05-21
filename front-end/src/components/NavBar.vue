<template>
  <h2>NOM SITE</h2>
  <div class="topnav">
    <router-link to="/">Home</router-link>
    <router-link to="/user">Compte</router-link>
    <router-link v-if="!logged" to="/register">Inscription</router-link>
    <router-link v-if="!logged" to="/login">Connexion</router-link>
    <button v-if="logged" v-on:click="logout">Deconnexion</button>
  </div>
  <router-view/> 
</template>

<script>

import axios from 'axios';

export default {
  name: 'NavBar',

  data(){
    return {
      logged: this.loggedIn()
    }
  },

  methods: {

      loggedIn(){

          return this.$cookies.isKey('token');
      },

       async logout(){

        if(this.loggedIn()){

          let nickname = this.$cookies.get('nickname') ;
          let token= this.$cookies.get('token') ;
          this.$cookies.remove("token"); 
          this.$cookies.remove("nickname");
          await axios.post('http://localhost:5050/logout',{token : token, nickname : nickname }, {useCredentails :true});
          this.logged=false;
        }

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