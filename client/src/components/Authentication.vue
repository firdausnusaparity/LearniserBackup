<template>
  <div>
  <!--Login Comp -->
    <login/>
    
  <!-- Sign-up-->
    <sign-up/>
    
  </div>
</template>

<script>
import Login from "./Login"
import SignUp from "./SignUp"

export default {
  name: 'app',
  components: {
    Login,SignUp
  }
}
</script>


