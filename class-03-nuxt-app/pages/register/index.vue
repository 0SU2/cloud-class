<template>
  <user-register/>
</template>

<script>
import userRegister from '~/components/auth/userRegister.vue';
export default {
  name: 'IndexPage',
  components: { userRegister }
}
</script>
