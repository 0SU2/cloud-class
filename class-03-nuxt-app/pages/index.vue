<template>
  <user-Login/>
</template>

<script>
import userLogin from '~/components/auth/userLogin.vue';
export default {
  name: 'IndexPage',
  components: { userLogin }
}
</script>
