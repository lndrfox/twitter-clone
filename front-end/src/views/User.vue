<template>

	<div class= "profil_bar">

		<div id="cover_pic">
			<img :src="link_cover_sav"> 
			<img v-on:click="modifierCover" v-if="modifier" id="plus" src="../assets/img/plus.png">
			<div v-if="modifier_cover">
				<input type="text" v-model="link_cover">

			</div>

		</div>

		<div id="profil">

			<img :src="link_photo_sav"> 

			<img v-on:click="modifierPhoto" v-if="modifier" id="plus" src="../assets/img/plus.png">
			<div v-if="modifier_photo">
				<input type="text" v-model="link_photo">
			</div>

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
			<p>@{{user.login}}</p>
		</div>

		<div v-if="!modifier" id="desc">
			{{user.description}}
		</div><div v-if="modifier" id="desc">
			<textarea v-model="desc" maxlength="200" rows="5" cols="33" ref="desc"></textarea>
		</div>

		<div class="joined">
			<img src="../assets/img/calendar.webp">
			Rejoint le {{date}}
		</div>

		<div class="modif">
			<button id="modifier" v-on:click="checkModif">Modifier</button>
			<button id="annuler" v-if="modifier" v-on:click="annuler">Annuler</button>
		</div>


	</div>

	<div id="messagesContaines">

    <div id="message" v-for="message in posts" v-bind:key="message.id_message">

      <div class="user">

        <div class="img">
          <img :src="link_photo_sav">
        </div>
        
        <p id="login">{{user.login}}</p>
        <p id="credit">@{{user.login}}</p>

      </div>

      <br><div class="post">
       {{message.content}}
      </div>

      <div class="footer">

        <p>{{getDatePost(message.date_message)}}</p>

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

import axios from 'axios'
import swal from 'sweetalert';

export default{

  data(){
    return {
      posts: [],
      logged: this.$cookies.isKey('token'),
      user: {},
      date: "",
      modifier: false,
      modifier_photo: false,
      modifier_cover: false,
      desc: "",
      link_cover: "",
      link_photo: "",
      link_cover_sav: "",
      link_photo_sav: ""
    }
  },

  methods: {

      async getInfo(){
        let response = await axios.post('http://localhost:5050/user', 
			{token: this.$cookies.get('token')}, 
			{useCredentails :true});
        return response.data;
      },

      annuler() {
		this.modifier_cover = false;
		this.modifier_photo = false;
		this.modifier = false;
		this.link_photo = "";
		this.link_cover= "";
		this.link_photo_sav = this.user.profile_pic;
		this.link_cover_sav = this.user.cover_pic;
      },

       async checkModif() {
			if(!this.modifier) {
				this.modifier = true
			}
			else {
				if(this.desc !== this.user.description){
					await axios.post('http://localhost:5050/user/modif',
						{token : this.$cookies.get("token"), 
						desc :  this.desc}, 
						{useCredentails :true});
				}
				if(this.link_cover_sav !== this.user.cover_pic) {
					await axios.post('http://localhost:5050/user/cover',
						{token : this.$cookies.get("token"), 
						link :  this.link_cover_sav}, 
						{useCredentails :true});
				}
				console.log(this.link_photo_sav !== this.user.profile_pic);
				if(this.link_photo_sav !== this.user.profile_pic) {
					await axios.post('http://localhost:5050/user/photo',
						{token : this.$cookies.get("token"), 
						link :  this.link_photo_sav}, 
						{useCredentails :true});
				}
				this.modifier_cover = false;
				this.modifier_photo = false;
				this.modifier = false;
				this.link_photo = "";
				this.link_cover= "";
			}

      },

		modifierCover() {
			if(!this.modifier_cover) {
				this.modifier_cover = true;
			}
			else {
				this.link_cover = this.link_cover.trim();
				if(this.link_cover === "") {
					this.link_cover = this.user.cover_pic;
				}
				else if(!this.checkIfImageExists(this.link_cover)) {
					this.link_cover = this.user.cover_pic;
					swal({text: "Cette image n'existe pas", icon: "warning"});
				}
				this.modifier_cover = false;
				this.link_cover_sav = this.link_cover;
				this.link_cover = ""; 
			}
		},

		modifierPhoto() {
			if(!this.modifier_photo) {
				this.modifier_photo = true;
			}
			else {
				this.link_photo = this.link_photo.trim();
				if(this.link_photo === "") {
					this.link_photo = this.user.profile_pic;
				}
				else if(!this.checkIfImageExists(this.link_photo)) {
					this.link_photo =  this.user.profile_pic;
					swal({text: "Cette image n'existe pas", icon: "warning"});
				}
				this.modifier_photo = false;
				this.link_photo_sav = this.link_photo;
				this.link_photo = "";
			}
		},

      getDate(s) {
		let mois = ["Janvier","Février","Mars","Avril",
          "Mai","Juin","Juillet","Août",
          "Septembre", "Octobre","Novembre","Décembre"];
        let a = s.substring(0,4);
        let m = mois[parseInt(s.substring(5,7)) - 1];
        let j = s.substring(8,10);
        return j+" "+m+" "+a;
      },

      getDatePost(s) {
        let mois = ["Janvier","Février","Mars","Avril",
          "Mai","Juin","Juillet","Août",
          "Septembre", "Octobre","Novembre","Décembre"];
        let a = s.substring(0,4);
        let m = mois[parseInt(s.substring(5,7)) - 1];
        let j = s.substring(8,10);
        let t = s.substring(11, 16);
        return t + " · " + j + " " + m + ", " + a;
      },

      checkIfImageExists(url) {
		const img = new Image();

		img.src = url;

		if (img.complete) {
			return true;
		} else {
			img.onload = () => {
				return true;
			};
			img.onerror = () => {
				return false;
			};
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

      }
  },

  beforeMount: async function(){

	let info = await this.getInfo();
	this.posts = info.posts;
	this.user = info.user;
	this.date = this.getDate(info.user.date_inscription.substring(0,10));
	this.desc = info.user.description;
	this.link_cover_sav = info.user.cover_pic;
	this.link_photo_sav = info.user.profile_pic;

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
					self.link_cover_sav = info.user.cover_pic;
					self.link_photo_sav = info.user.profile_pic;

				}

			}
		})(this), 1000);
	if(!this.$cookies.isKey('token')) {
		this.$router.push({ name: 'home' });
	}
  }
}

</script>
