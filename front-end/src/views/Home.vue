<template>
  <form v-if="logged" v-on:submit.prevent="checkPost">
   <textarea v-model="post_content"  maxlength="280" rows="5" cols="33" style="resize: none;" ref="post_content"></textarea>
   <br>
  <input type="submit" name="submit">
  {{errorPost}}
  </form>
  <div id="messagesContaines">

    <div id="message" v-for="message in messages" v-bind:key="message.id_message">

      <div class="user">

        <div class="img">
          <img :src="message.profile_pic">
        </div>
        
        <p>{{message.login}} {{message.date_message}}</p>

      </div>

      <br><div class="post">
       {{message.content}}
      </div>

      <div class="react">
        <button @click="like(message.id_message)">Like</button>
        {{message.nb_likes}}
      </div>

    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Home',

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
        this.post_content="";
      },

      async post_message(){
          await axios.post('http://localhost:5050/home',{token : this.$cookies.get("token"), post_content :  this.post_content}, {useCredentails :true});
      },

      async checkPost(){

        if(this.post_content.length <= 280 && this.post_content.length >0){

          await this.post_message();
          this.messages= await this.getMessages();
          this.resetInput();
        }

        else{

          this.errorPost="Le poste doit faire entre 1 et 280 charactères";
        }

      },

      async like(id){

        if(this.logged){

            await axios.post('http://localhost:5050/home/react',{token : this.$cookies.get("token"), react : "l", id: id}, {useCredentails :true});
            this.messages= await this.getMessages();

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
     5000); 
    }
}


</script>