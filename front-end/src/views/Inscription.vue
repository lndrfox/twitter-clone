<template>
	<div class="login"><br>
		<div class="header">
			<h1>Inscription</h1>
		</div>
		<div class="alert" v-if="(answer.length !== 0)">{{answer}}</div>
		<form v-on:submit.prevent="verify">
			<br>
			<input type="text" id="nickname" name="nickname" placeholder="Pseudo" v-model="nickname">
			<br><br>
	
			<input type="password" id="password" name="password" placeholder="Mot de passe" v-model="password">
			<br>
			<input type="password" id="password" name="password1" placeholder="Vérifier mot de passe" v-model="password1">
			<br>
			<div class="connect">
				<input type="submit" id="submit" name="submit">
			</div>
		</form>
		<br>
	</div>
</template>

<script>

import axios from 'axios';

export default{

	data(){
		return {
			nickname: "",
			password: "",
			password1: "",
			answer: ""
		}
	},

	methods: {
		verify() {
			if(this.nickname.length === 0) {
				this.answer = "Vous devez entrer un pseudo"
			}
			else if (this.password.length === 0) {
				this.answer = "Vous devez entrer un mot de passe"
			}
			else if(this.nickname.length > 50) {
				this.answer = "Le pseudo est trop long"
			}
			else if(this.password.length > 60 || this.password1.length > 60) {
				this.answer = "Le mot de passe est trop long"
			}
			else if(this.password !== this.password1) {
				this.answer = "Les deux champs de mot de passe ne sont pas identiques"
			}
			else{
				this.register()
			}
			this.nickname = "";
			this.password = "";
			this.password1 = "";
		},
		async register(){
			try{
				let response = await axios.post('http://localhost:5050/register',
					{nickname : this.nickname , password : this.password}, 
					{useCredentails :true});

				this.answer=response.data;
				
				if(this.answer === "Inscription avec succès"){
					this.answer = ""
					this.$router.push({ name: 'login' });
				}
			}catch(error){
				console.log(error);
			}
		}
	}


}

</script>

<style scoped>
  @import './../assets/css/style.css'
</style>