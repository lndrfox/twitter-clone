<template>

	<div class= "profil_bar">

		<div id="cover_pic">
			<img :src="user.cover_pic"> 
		</div>

		<div id="profil">

			<img :src="user.profile_pic"> 

			<div class = "bar" id="begin">
				<div class="text">Posts</div>
				{{posts.length}}
			</div>

			<div class = "bar">
				<div class="text">Following</div>
				0
			</div>

		</div>

	</div>

	<div class="profil_desc">

		<div id="name">
			{{user.login}}
		</div>

		<div v-if="!modifier" id="desc">
			{{user.description}}
		</div>

		<div v-if="modifier">
			<form v-on:submit.prevent="checkModif">
			<textarea v-model="desc" maxlength="200" rows="5" cols="33" style="resize: none;" ref="desc"></textarea>

			<div class="joined">
				<img src="../assets/img/calendar.webp">
				Rejoint le {{date}}
			</div>

			<div class="modif">
				<input type="submit" name="submit" value="Modifier">
			</div>
			</form>

		</div>

		<div v-if="!modifier" class="joined">
			<img src="../assets/img/calendar.webp">
			Rejoint le {{date}}
		</div>

		<div v-if="!modifier" class="modif">
			<button v-on:click="modifier = !modifier">Modifier</button>
		</div>

	</div>

	<div id="messagesContaines">

		<div id="message" v-for="message in posts" v-bind:key="message.id_message">

			<div class="user">

				<div class="img">
					<img :src="user.profile_pic">
				</div>

				<p>{{user.login}} {{message.date_message}}</p>

			</div>

			<br>
			<div class="post">
				{{message.content}}
			</div>

			<div class="react">
				like ici
			</div>

		</div>

	</div>
</template>

<script>

import axios from 'axios'

export default{

  data(){
    return {
      posts: [],
      logged: this.$cookies.isKey('token'),
      user: {},
      date: "",
      modifier: false,
      desc: ""
    }
  },

  methods: {

      async getInfo(){
        let response = await axios.post('http://localhost:5050/user', 
			{token: this.$cookies.get('token')}, 
			{useCredentails :true});
        return response.data;
      },

       async checkModif() {
		await axios.post('http://localhost:5050/usermodif',
			{token : this.$cookies.get("token"), 
			desc :  this.desc}, 
			{useCredentails :true});
		this.modifier = false;

      },

      getDate(s) {
		let mois = ["Janvier","Février","Mars","Avril",
          "Mai","Juin","Juillet","Août",
          "Septembre", "Octobre","Novembre","Décembre"];
        let a = s.substring(0,4);
        let m = mois[parseInt(s.substring(5,7)) - 1];
        let j = s.substring(8,10);
        return j+" "+m+" "+a
      }
  },

  beforeMount: async function(){

	let info = await this.getInfo();
	this.posts = info.posts;
	this.user = info.user;
	this.date = this.getDate(info.user.date_inscription.substring(0,10));
	this.desc = info.user.description;

  },

  mounted: async function() {
	setInterval(
		(function(self) {         
			return async function() {

				let info = await self.getInfo();
				self.posts = info.posts;
				self.user = info.user;
				self.date = self.getDate(info.user.date_inscription.substring(0,10));
				if(!self.modifier){
					self.desc = info.user.description;
				}

			}
		})(this), 1000);
	if(!this.$cookies.isKey('token')) {
		this.$router.push({ name: 'home' });
	}
  }
}

</script>
