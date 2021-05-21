<template>
  <form v-if="logged" v-on:submit.prevent="checkPost">
   <textarea v-model="post_content"  maxlength="280" rows="5" cols="33" style="resize: none;" ref="post_content"></textarea>
   <br>
  <input type="submit" id="submit" name="submit">
  {{errorPost}}
  </form>
  <div id="messagesContaines">
    <div id="message" v-for="message in messages" v-bind:key="message.id_message">
       {{message.login}}
       {{message.profile_pic}}
       {{message.content}}
       {{message.date_message}}
    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'NavBar',

  data(){
    return {
      messages: [],
      logged: this.$cookies.isKey('token'),
      post_content: "",
      errorPost: ""
    }
  },

  methods: {

      async getMessages(){

        let response =await axios.get('http://localhost:5050/home', {useCredentails :true});
        return response.data.messages;
      },

      resetInput() {
        this.$refs["post_content"].value = "";
      },

      async post_message(){
          await axios.post('http://localhost:5050/home',{token : this.$cookies.get("token"), post_content :  this.post_content}, {useCredentails :true});
      },

        async checkPost(){

        if(this.post_content.length <= 280 && this.post_content.length >0){

          await this.post_message();
          this.resetInput();
          this.messages= await this.getMessages();
        }

        else{

          this.errorPost="Le poste doit faire entre 1 et 280 charactères";
        }

      }

  },

  beforeMount: async function(){

    this.messages= await this.getMessages();
  },

  mounted: 
    async function () {
      setInterval(
     (function(self) {         
         return async function() {   
            self.messages= await self.getMessages(); 

         }
     })(this),
     10000); 
    }
}


</script>