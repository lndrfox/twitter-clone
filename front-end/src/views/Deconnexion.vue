

<script>

import axios from 'axios';

export default{

  data(){
    return {
      password: "",
      answer: ""
    }
  },

  mounted: async function() {

    if(this.$cookies.isKey('token')) {
      
      let token = this.$cookies.get('token');
      this.$cookies.remove("token"); 
      await axios.post('http://localhost:5050/logout',{token : token}, {useCredentails :true});
      this.logged=false; 
    }

    this.$router.push({ name: 'login' });
  }


}

</script>