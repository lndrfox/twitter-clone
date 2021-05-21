<template>
  <h1>User</h1>
</template>

<script>

export default{

	mounted: function() {
		if(!this.$cookies.isKey('token')) {
			this.$router.push({ name: 'home' });
		}
	}
}


</script>
