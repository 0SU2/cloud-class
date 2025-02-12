<template>
  <v-card>
    <v-card-title>
      Iniciar Sesión
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="username"
        label="Usuario"
        outlined
      />

      <v-text-field
        v-model="password"
        label="Password"
        outlined
        type="password"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="login">
        Ingresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            usuario: this.username,
            password: this.password
          }
        })
        this.$store.dispatch('alert/showAlert', {
          message: 'Inicio de Sesión Correcto',
          type: 'success'
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.$store.dispatch('alert/showAlert', {
          message: error.message,
          type: 'error'
        })
      }
    }
  }
}
</script>