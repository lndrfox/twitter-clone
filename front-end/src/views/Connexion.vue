<template>
	<div class="login"><br>
		<div class="header">
			<h1>Connexion</h1>
		</div>
		<div class="alert" v-if="(answer.length !== 0)">{{answer}}</div>
		<form v-on:submit.prevent="verify">
			<br>
			<input type="text" name="nickname" placeholder="Pseudo" v-model="nickname">
			<br>
			<input type="password" name="password" placeholder="Mot de passe" v-model="password">
			<br>
			<div class="connect">
				<input type="submit" name="submit" value="Se Connecter">
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
			else if(this.password.length > 60) {
				this.answer = "Le mot de passe est trop long"
			}
			else{
				this.login();
			}
			this.nickname = "";
			this.password = "";
		},
		async login(){
			try{
				
				let response = await axios.post('http://localhost:5050/login',
					{nickname : this.nickname , password : this.password}, 
					{useCredentails :true});

				this.answer=response.data.success;

				if(response.data.success == "Success"){

					this.$cookies.set('token',response.data.token);
					this.answer = ""
					this.$router.push({ name: 'home' })
					
				}
			}catch(error){
				console.log(error);
			}
		}
	},

	mounted: function() {
		if(this.$cookies.isKey('token')) {
			this.$router.push({ name: 'home' });
		}
	}
}

</script>

