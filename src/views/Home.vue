<template>
  <NavBar :page='1'/>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>