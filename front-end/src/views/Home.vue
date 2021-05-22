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
        
        <p id="login">{{message.t_name}}</p>
        <p id="credit">@{{message.login}}</p>

      </div>

      <br><div class="post">
       {{message.content}}
      </div>

      <div class="footer">

        <p>{{getDate(message.date_message)}}</p>

        <div class="react">

          <div v-if="logged">
            <button id="like" @click="like(message.id_message, message.user_liked, message.user_disliked)"></button>
            <p>{{message.nb_likes}}</p>

            <button id="dislike" @click="dislike(message.id_message, message.user_liked, message.user_disliked)"></button>
            <p>{{message.nb_dislikes}}</p>
          </div>

        </div>
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

        if(this.logged){

          let response =await axios.post('http://localhost:5050/home/logged',{token : this.$cookies.get("token")}, {useCredentails :true});
          return response.data.messages;
        }

        else{

          let response =await axios.get('http://localhost:5050/home', {useCredentails :true});
          return response.data.messages;
        }

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

      async like(id, user_liked, user_disliked){

        if(this.logged && user_liked==0 && user_disliked == 0){

            await axios.post('http://localhost:5050/home/react',{token : this.$cookies.get("token"), react : "l", id: id}, {useCredentails :true});
            this.messages= await this.getMessages();

        }

        if(this.logged && user_liked ==1 && user_disliked ==0){

            await axios.post('http://localhost:5050/home/react/un',{token : this.$cookies.get("token"), id: id}, {useCredentails :true});
            this.messages= await this.getMessages();
        }

      },

      async dislike(id, user_liked, user_disliked){

        if(this.logged && user_liked==0 && user_disliked == 0){

            await axios.post('http://localhost:5050/home/react',{token : this.$cookies.get("token"), react : "d", id: id}, {useCredentails :true});
            this.messages= await this.getMessages();

        }

        if(this.logged && user_liked ==0 && user_disliked ==1){

            await axios.post('http://localhost:5050/home/react/un',{token : this.$cookies.get("token"), id: id}, {useCredentails :true});
            this.messages= await this.getMessages();
        }

      },

       getDate(s) {
        let mois = ["Janvier","Février","Mars","Avril",
          "Mai","Juin","Juillet","Août",
          "Septembre", "Octobre","Novembre","Décembre"];
        let a = s.substring(0,4);
        let m = mois[parseInt(s.substring(5,7)) - 1];
        let j = s.substring(8,10);
        let t = s.substring(11, 16);
        return t + " · " + j + " " + m + ", " + a;
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