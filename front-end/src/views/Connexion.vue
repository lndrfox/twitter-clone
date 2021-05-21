<template>
  <h1>Connexion</h1>
  <form v-on:submit.prevent="login">
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
		async login(){
			try{
				
				let response =await axios.post('http://localhost:5050/login',{nickname : this.nickname , password : this.password}, {useCredentails :true});
				if(response.data.success == "Success"){

					this.$cookies.set('token',response.data.token);
					this.$cookies.set('nickname',response.data.nickname);
					
				}
				this.answer=response.data.success;
			}catch(error){
				console.log(error);
			}
		}
	},


}

</script>