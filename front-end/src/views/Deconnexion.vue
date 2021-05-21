<template>
  <h1>Deconnexion</h1>
  <form v-on:submit.prevent="logout">
   <input type="submit" id="submit" name="submit">
  </form>
  <br>
</template>

<script>

import axios from 'axios';

export default{

  data(){
    return {
      password: "",
      answer: ""
    }
  },

  methods: {

       async logout(){

        if(this.$cookies.isKey('token')){

          let token= this.$cookies.get('token') ;
          this.$cookies.remove("token"); 
          await axios.post('http://localhost:5050/logout',{token : token}, {useCredentails :true});
          this.logged=false;

        }

      }
  },


}

</script>