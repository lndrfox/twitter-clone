<template>
	<div classe= "profil_bar">
  <div id="cover_pic">
	<img :src="user.cover_pic"> 
  </div>
  <div id="profil">
	<img :src="user.profile_pic"> 
	<p>Posts</p>
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

      <br><div class="post">
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
      user: {}
    }
  },

  methods: {

      async getInfo(){
        let response = await axios.post('http://localhost:5050/user', 
			{token: this.$cookies.get('token')}, 
			{useCredentails :true});
        return response.data;
      }
  },

  beforeMount: async function(){

	let info = await this.getInfo();
	this.posts = info.posts;
	this.user = info.user;

  },

  mounted: async function() {
	setInterval(
		(function(self) {         
			return async function() {

				let info = await self.getInfo();
				self.posts = info.posts;
				self.user = info.user;

			}
		})(this), 5000);
	if(!this.$cookies.isKey('token')) {
		this.$router.push({ name: 'home' });
	}
  }
}

</script>
