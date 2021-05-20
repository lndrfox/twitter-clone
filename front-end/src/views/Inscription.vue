<template>
  <h1>Inscription</h1>
  <form v-on:submit.prevent="register">
   <label for="nickname">Choisissez votre pseudo : </label>
   <input type="text" id="nickname" name="nickname" v-model="nickname">
   <br>
   <label for="password">Choisissez votre mot de passe : </label>
   <input type="password" id="password" name="password" v-model="password">
   <br>
   <input type="submit" id="submit" name="submit">
  </form>
  <br>
  {{answer}}
</template>

<script>

import axios from 'axios';

export default{

	data(){
		return {
			nickname: "",
			password: "",
			answer: ""
		}
	},

	methods: {
		async register(){
			try{
				
				let response =await axios.post('http://localhost:5050/register',{nickname : this.nickname , password : this.password}, {useCredentails :true});
				this.answer=response.data;
			}catch(error){
				console.log(error);
			}
		}
	},


}

</script>