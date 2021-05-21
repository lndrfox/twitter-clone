<template>
  <form v-if="logged" v-on:submit.prevent="checkPost">
   <textarea v-model="post_content"  maxlength="280" rows="5" cols="33" style="resize: none;" ref="post_content"></textarea>
   <br>
  <input type="submit" id="submit" name="submit">
  {{errorPost}}
  </form>
</template>

<script>

import axios from 'axios';

export default {
  name: 'NavBar',

  data(){
    return {
      logged: this.$cookies.isKey('token'),
      post_content: "",
      errorPost: ""
    }
  },

  methods: {

      async getMessages(){

        await axios.get('http://localhost:5050/home', {useCredentails :true});
      },

      resetInput() {
        this.$refs["post_content"].value = "";
      },

      async post_message(){
          await axios.post('http://localhost:5050/home',{token : this.$cookies.get("token"), post_content :  this.post_content}, {useCredentails :true});
      },

        async checkPost(){

        if(this.post_content.length <= 10 && this.post_content.length >0){

          await this.post_message();
          this.resetInput();
        }

        else{

          this.errorPost="Le poste doit faire entre 1 et 280 charactères";
        }

      }

  },

  mounted: 
    async function () {
      setInterval(
     (function(self) {         
         return async function() {   
             await self.getMessages(); 
         }
     })(this),
     5000); 
    }
}


</script>