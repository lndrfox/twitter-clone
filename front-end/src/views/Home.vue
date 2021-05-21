<template>
  <h1>Hello</h1>
  {{users}}
</template>

<script>

import axios from 'axios';

export default{

	data(){
		return {
			users: "a"
		}
	},

	methods: {
		async loadUsers(){
			try{
				let response= await axios.get('http://localhost:5050/',{useCredentails :true});
				this.users = response.data;

			}catch(error){
				console.log(error);
			}
		}
	},

 mounted: async function() {

  await this.loadUsers();

 }
	

}

</script>