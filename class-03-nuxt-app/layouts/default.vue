<template>
  <v-app dark>
   <v-container fill-height>
    <v-row justify="center" align="center" class="fill-height">
     <v-col cols="12" sm="8" md="4">
      <v-alert
       v-if="$store.state.alert.show"
       :type="$store.state.alert.type"
       class="alert-fixed"
       dismissible
      >
       {{ $store.state.alert.message }}
      </v-alert>
      <Nuxt/>
     </v-col>
    </v-row>
   </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .alert-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  }
 </style>
