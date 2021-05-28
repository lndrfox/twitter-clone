<template>

  <!-- Barre de recherche -->

  <div id="recherche">
    <input type="search" placeholder="@everyone" v-model="recherche_text">
    <button v-on:click="rechercher">Rechercher</button>
  </div>

  <div id="messagesContaines" v-if="logged">

    <!-- Barre de selection -->

    <div id="tab">
      <button :id="afficheActive()" v-on:click="afficheTout">Tout</button>
      <button :id="afficheAbonnementsActive()" v-on:click="afficheAbonnements">Abonnements</button>
    </div>

    <!-- Ecrire un post -->

    <div id="message" class="poster">

      <div class="user">
        <div class="img">
            <img :src="user.profile_pic">
          </div>
          
          <p id="login">{{user.t_name}}</p>
          <p id="credit">@{{user.login}}</p>
      </div>

      <form v-on:submit.prevent="checkPost">
       <textarea v-model="post_content" maxlength="280" cols="44" :rows="resize()" ref="post_content" placeholder="Quoi de neuf ?"></textarea>
       <br>
      <input type="submit" name="submit" value="Publier">
      <p id="error">{{errorPost}}</p>
      </form>
    </div>

  </div>

  <div id="messagesContaines">

   <div v-for="usr in users" v-bind:key="usr.id" v-on:click="redirectUser(usr.login)">

      <div class="users" v-if="affichage_profil(usr.login, recherche_text_sav)">

        <div class="img">
          <img :src="usr.profile_pic">
        </div>
        <div class="name">
          <p id="login">{{usr.t_name}}</p>
          <p id="credit">@{{usr.login}}</p>
        </div>

      </div>

    </div>

  </div>


  <!-- Affichage des posts -->

  <div id="messagesContaines">

    <div id="message" v-for="message in messages" v-bind:key="message.id_message">
      <div v-if="affichage(recherche_text_sav, message.content, message.login, message.login_rter)">

      <!-- Posts qui n'appartiennent pas à la catégorie retweet -->

      <div v-if="!isRT(message)">

         <div class="user" v-on:click="redirectUser(message.login)">

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

           <!-- Reactions -->

          <div class="react">

              <button :id="likeActive(message.user_liked)" @click="like(message.id_message, message.user_liked, message.user_disliked)"></button>
              <p>{{message.nb_likes}}</p>

              <button :id="dislikeActive(message.user_disliked)" @click="dislike(message.id_message, message.user_liked, message.user_disliked)"></button>
              <p>{{message.nb_dislikes}}</p>

              <button :id="commentActive(message.id_message)" @click="openComments(message.id_message)"></button>
              <p>{{nbComments(message.id_message)}}</p>

              <button :id="rtActive(message.user_rt)" @click="rt(message.id_message,message.user_rt)" ></button>
              <p>{{message.nb_rt}}</p>

              <!-- Commentaires -->

              <div v-if="commentsactive[message.id_message -1]"><br>
                <div class="com" v-for="com in showComments(message.id_message)" v-bind:key="com.id_commentaire"><br><br>
                  <div v-on:click="redirectUser(com.login)">
                    <div class="img">
                      <img :src="com.profile_pic">
                    </div>
              
                    <p id="login">{{com.t_name}}</p>
                    <p id="credit">@{{com.login}}</p>
                    

                    <br><div class="commentContent">
                      {{com.content}}
                    </div>

                    <p id="date">{{getDate(com.date_commentaire)}}</p>

                  </div>
                </div>
                <br v-if="nbComments(message.id_message) > 0">

                <!-- Ecrire un commentaire -->
      
                <div class ="writeComment">

                  <form v-on:submit.prevent="checkComment(message.id_message)">
                    <textarea v-model="post_comment[message.id_message -1]" maxlength="280" cols="44" :rows="resizeComment(message.id_message, false)" ref="post_comment[message.id_message - 1]" placeholder="Donner votre avis"></textarea>
                    <input type="submit" name="submit" value="Commenter">
                  </form>
                  {{errorComment[message.id_message -1]}}

                </div>

              </div>

          </div>
        </div>

      </div>

      <!-- Posts retweet -->

      <div v-if="isRT(message)">

       <div class="user" v-on:click="redirectUser(message.login_rter)">

        <div class="img">
          <img :src="message.profile_pic_rter">
        </div>
        
        <p id="login">{{message.t_name_rter}}</p>
        <p id="credit">@{{message.login_rter}}</p>

      </div>

      <div id="message">

      <!-- Post original -->

      <div class="user" v-on:click="redirectUser(message.login)">

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

           <!-- Réactions -->

          <div class="react">

              <button :id="likeActive(message.user_liked)" @click="like(message.id_message, message.user_liked, message.user_disliked)"></button>
              <p>{{message.nb_likes}}</p>

              <button :id="dislikeActive(message.user_disliked)" @click="dislike(message.id_message, message.user_liked, message.user_disliked)"></button>
              <p>{{message.nb_dislikes}}</p>

              <button :id="commentActive(message.id_message)" @click="openComments(message.id_message)"></button>
              <p>{{nbComments(message.id_message)}}</p>

              <button :id="rtActive(message.user_rt)" @click="rt(message.id_message,message.user_rt)" ></button>
              <p>{{message.nb_rt}}</p>

              <!-- Commentaires -->

              <div v-if="commentsactive[message.id_message -1]"><br>
                <div class="com" v-for="com in showComments(message.id_message)" v-bind:key="com.id_commentaire"><br><br>
                  <div v-on:click="redirectUser(com.login)">
                    <div class="img">
                      <img :src="com.profile_pic">
                    </div>
              
                    <p id="login">{{com.t_name}}</p>
                    <p id="credit">@{{com.login}}</p>
                    

                    <br><div class="commentContent">
                      {{com.content}}
                    </div>

                    <p id="date">{{getDate(com.date_commentaire)}}</p>

                  </div>
                </div>
                <br v-if="nbComments(message.id_message) > 0">

                <!-- Ecrire un commentaire -->
      
                <div class ="writeComment">

                  <form v-on:submit.prevent="checkComment(message.id_message)">
                    <textarea v-model="post_comment[message.id_message -1]" maxlength="280" cols="44" :rows="resizeComment(message.id_message, true)" ref="post_comment[message.id_message - 1]" placeholder="Donner votre avis"></textarea>
                    <input type="submit" name="submit" value="Commenter">
                  </form>
                  {{errorComment[message.id_message -1]}}

                </div>

              </div>


          </div>
        </div>

      </div>

      <div class="footer"> 

        <p>{{getDate(message.date_retweet)}}</p>

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
      errorPost: "",

      home: true,
      comments: [],
      commentsactive: [],
      post_comment: [],
      errorComment: [],

      recherche: false,
      recherche_text: "",
      recherche_text_sav: "",

      user: {},
      following: [],
      users: []
    }
  },

  methods: {

      redirectUser(login){

        this.$router.push({ name: 'user', query: { login: login }});
      },

      redirectConnect(){

        this.$router.push({ name: 'login'});
      },

      isRT(message){

        if(message.login_rter != null){

          return true;
        }

        return false;
      },

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

      async getUser(){

        if(this.logged){

          let response = await axios.post('http://localhost:5050/user',
            {token : this.$cookies.get("token")}, 
            {useCredentails :true});
          return response.data.user;
        }

        else{
          return {};
        }

      },

      async getComments() {
        let response = await axios.post('http://localhost:5050/home/comments',  {useCredentails :true});
        return response.data.comments;
      },

      async getFollowing(){

        if(this.logged){

          let response = await axios.post('http://localhost:5050/user/following',
            {token : this.$cookies.get("token")}, 
            {useCredentails :true});
          return response.data.following;
        }

        else{
          return [];
        }
      },

      async getUsers() {
        let response = await axios.post('http://localhost:5050/user/users',
          {useCredentails :true});
        return response.data.users;
      },

      resetInput() {
        this.$refs["post_content"].value = "";
        this.post_content="";
      },

      resize () {
        let lines = this.post_content.split("\n");
        let rows = lines.length;
        if(rows < 2) {
          rows = 2;
        }
        for(var i = 0; i < lines.length; i++) {
          let len = lines[i].length;
          while(len > 44) {
            rows += 1;
            len -= 44;
          }
        }
        return rows;
      },

      resizeComment (id_message, retweet) {
        let line;
        if(retweet) {
          line = 47;
        } else {
          line = 51;
        }
        let lines = this.post_comment[id_message -1].split("\n");
        let rows = lines.length;
        if(rows < 2) {
          rows = 2;
        }
        for(var i = 0; i < lines.length; i++) {
          let len = lines[i].length;
          while(len > line) {
            rows += 1;
            len -= line;
          }
        }
        return rows;
      },

      async post_message(){
          await axios.post('http://localhost:5050/home',{token : this.$cookies.get("token"), post_content :  this.post_content}, {useCredentails :true});
      },

      async checkPost(){

        if(this.post_content.length <= 280 && this.post_content.length >0){

          await this.post_message();
          this.messages= await this.getMessages();
          this.resetInput();
          this.commentsactive.length = this.messages.length;
          this.commentsactive[this.messages.length - 1] = false;
        }

        else{

          this.errorPost="Le poste doit faire entre 1 et 280 charactères";
        }

      },

      async post_com(id_message){
          await axios.post('http://localhost:5050/home/addcomment',
            {token : this.$cookies.get("token"), 
            content :  this.post_comment[id_message -1],
            id_message: id_message}, 
            {useCredentails :true});
      },

      async checkComment(id_message){

        if(this.post_comment[id_message -1].length <= 280 && this.post_comment[id_message -1].length >0){

          await this.post_com(id_message);
          this.comments = await this.getComments();
          this.post_comment[id_message -1] = "";
        }

        else{

          this.errorComment[id_message -1] = "Le commentaire doit faire entre 1 et 280 charactères";
        }

      },

      async rt(id, user_rt){

        if(!this.logged) {
          this.redirectConnect();
        }

        if(this.logged && user_rt==0 ){

            await axios.post('http://localhost:5050/home/rt',{token : this.$cookies.get("token"), id: id}, {useCredentails :true});
            this.messages= await this.getMessages();

        }

        if(this.logged && user_rt ==1 ){

            await axios.post('http://localhost:5050/home/rt/un',{token : this.$cookies.get("token"), id: id}, {useCredentails :true});
            this.messages= await this.getMessages();
        }

      },

      async like(id, user_liked, user_disliked){

        if(!this.logged) {
          this.redirectConnect();
        }

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

        if(!this.logged) {
          this.redirectConnect();
        }

        if(this.logged && user_liked==0 && user_disliked == 0){

            await axios.post('http://localhost:5050/home/react',{token : this.$cookies.get("token"), react : "d", id: id}, {useCredentails :true});
            this.messages= await this.getMessages();

        }

        if(this.logged && user_liked ==0 && user_disliked ==1){

            await axios.post('http://localhost:5050/home/react/un',{token : this.$cookies.get("token"), id: id}, {useCredentails :true});
            this.messages= await this.getMessages();
        }

      },

      openComments(id_message) {
        if(this.commentsactive[id_message - 1] === false) {
          this.commentsactive[id_message - 1] = true;
        } else {
          this.commentsactive[id_message - 1] = false;
        }
      },

      commentsactiveReset() {
        for (var i = 0; i < this.messages.length; i++) {
          this.commentsactive[i] = false;
        }
      },

      postCommentReset() {
        for (var i = 0; i < this.messages.length; i++) {
          this.post_comment[i] = "";
        }
      },

      postErrorReset() {
        for (var i = 0; i < this.messages.length; i++) {
          this.errorComment[i] = "";
        }
      },

      commentActive(id_message){
        if(this.commentsactive[id_message - 1] === true) {
          return 'commentActive';
        } else {
          return 'comment';
        }

      },

      nbComments(id_message) {
        let nb = 0;
        for(var i = 0; i < this.comments.length; i++) {
          if(this.comments[i].id_message === id_message) {
            nb ++;
          }
        }
        return nb;
      },

      showComments(id_message){
        if(this.commentsactive[id_message - 1]) {
          let comments_message = [];
          for(var i = 0; i < this.comments.length; i++) {
            if(this.comments[i].id_message === id_message) {
              comments_message.push(this.comments[i]);
            }
          }
          comments_message.sort(function (a, b) {
            return new Date(a.date_commentaire) - new Date(b.date_commentaire);
          });
          return comments_message;
        }
        return [];
      },

      likeActive(user_liked) {
        if(user_liked === 0 || !this.logged) {
          return 'like';
        } else {
          return 'likeActive';
        }
      },

      dislikeActive(user_disliked) {
        if(user_disliked === 0 || !this.logged) {
          return 'dislike';
        } else {
          return 'dislikeActive';
        }
      },

      rtActive(user_rt) {
        if(user_rt === 0 || !this.logged) {
          return 'rt';
        } else {
          return 'rtActive';
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
      },

      rechercher() {
        if((this.recherche_text === "") || (this.recherche_text[0] !== '@' && this.recherche_text[0] !== '#')) {
          this.recherche = false;
          this.recherche_text = "";
          this.recherche_text_sav = "";
        } 
        else {

          this.recherche = true;
          this.recherche_text_sav = this.recherche_text;
          this.home = true;
        }
      },

      getMentionUser(s, login) {
        if(s[0] === '@') {
          if (login === s.substring(1,s.length)) {
            return true;
          }
        }
        return false;
      },

      getMention(s, text) {
        let i = text.search(s);
        if(i !== -1) {
          if((text[i-1] === '\n' ||  text[i-1] === ' ' || i === 0) && 
             (text[i+s.length] === '\n' ||  text[i+s.length] === ' ' || i+s.length === text.length)) {
                return true;
          }
        }
        return false;
      },

      afficheTout() {
        this.home = true;
        this.recherche = false;
        this.recherche_text = "";
        this.recherche_text_sav = "";
        this.commentsactiveReset();
        this.postCommentReset();
      },

      afficheAbonnements() {
        this.home = false;
        this.recherche = false;
        this.recherche_text = "";
        this.recherche_text_sav = "";
        this.commentsactiveReset();
        this.postCommentReset();
      },

      afficheActive() {
        if(this.home === false) {
          return 'affiche';
        } else {
          return 'afficheActive';
        }
      },

      afficheAbonnementsActive() {
        if(this.home === true) {
          return 'afficheabo';
        } else {
          return 'afficheaboActive';
        }
      },

      affichage_profil(login, s) {
        if(this.recherche) {
          let r = s.split(" ");
          let res = false;

          for(var k = 0; k < r.length; k++) {
           res = res || this.getMentionUser(r[k], login);
          }
          
          return res;
        }
        return false;
      },

      affichage(s, text, login_user, login_rter) {

        let login = login_user;

        /* Si c'est un retweet */ 
          if(login_rter != null) {
            login = login_rter;
            text = "";
          }

        /* Par barre de recherche multiple arguments */
        if(this.recherche) {
          let r = s.split(" ");
          let res = false;

          for(var k = 0; k < r.length; k++) {
           res = res || (this.getMention(r[k], text) || 
                      this.getMentionUser(r[k], login));
          }
          
          return res;
        }

        /* Utilisateur non connecte */
        if(this.logged === false) {

          return this.getMention("@everyone", text);
        }

        /* Utilisateur connecte*/
        else {

          let follow = false;

          for(var i = 0; i < this.following.length; i++) {
            follow = follow || (this.following[i] === login);
          }

          /* Tout */
          if(this.home) {
            return (this.getMention("@everyone", text) || 
                    this.getMention(text, this.user.login) || follow);
          }
          /* Abonnements uniquement */
          else {
            return follow;
          }
        }

      },
  },

  beforeMount: async function(){

    this.messages = await this.getMessages();
    this.user = await this.getUser();
    this.following = await this.getFollowing();
    this.users = await this.getUsers();
    this.comments = await this.getComments();
    this.commentsactive = new Array(this.messages.length);
    this.commentsactiveReset();
    this.post_comment = new Array(this.messages.length);
    this.postCommentReset();
    this.errorComment =  new Array(this.messages.length);
    this.postErrorReset();
  },

  mounted: 

    async function () {
      setInterval(
     (function(self) {         
         return async function() {   
            self.messages = await self.getMessages();
            self.comments = await self.getComments();
         }
     })(this),
     5000); 
    }
}


</script>