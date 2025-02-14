<template>
  <v-card>
    <v-card-title>
      Registro de Usuarios
    </v-card-title>
    
    <v-card-text>
      <v-row>
	<v-col cols="4">
	  <v-text-field v-model="user.nombre" label="Nombre" outlined/>	  
	</v-col>	
	<v-col cols="4">
	  <v-text-field v-model="user.apaterno" label="A. Paterno" outlined/>
	</v-col>
	<v-col cols="4">
	  <v-text-field v-model="user.amaterno" label="A. Materno" outlined/>
	</v-col>
	<v-row>
	  <v-col cols="6">
	    <v-text-field v-model="user.direccion" label="Direcccion" outlined/>
	  </v-col>
	  <v-col cols="6">
	    <v-text-field v-model="user.telefono" label="telefono" outlined/>
	  </v-col>
	</v-row>
	<v-row>
	  <v-col cols="6">
	    <v-text-field v-model="user.ciudad" label="Ciudad" outlined/>
	  </v-col>
	  <v-col cols="6">
	    <v-text-field v-model="user.estado" label="Estado" outlined/>
	  </v-col>
	  <v-col cols="6">
	    <v-text-field v-model="user.usuario" label="Usuario" outlined/>
	  </v-col>
	  <v-col cols="6">
	    <v-text-field v-model="user.password" label="Password" type="password" outlined/>
	  </v-col>	  
	</v-row>
	
      </v-row>
      

    </v-card-text>
    
    <v-card-actions>
      <v-btn color="primary" @click="register">
	Registrarse
      </v-btn>
      <v-btn color="secondary" to="/">
	Regresar
      </v-btn>      
      
    </v-card-actions>
  </v-card>
  
</template>


<script>
export default {
    data() {
	return {
	    user: {
		nombre: '',
		apaterno: '',
		amaterno: '',
		direccion: '',
		telefono: '',
		ciudad: '',
		estado: '',
		usuario: '',
		password: ''
	    }
	}
    },
    methods: {
	async register() {
	    const response = await this.$axios.post('/users/create', this.user);
	    if (response && reponse.data && response.data.id) {
		this.$store.commit('alert/setAlert', { message: 'Usuario Registrado Satisfactoriamente', type: 'success' });
		this.$router.push('/');
	    }
	}
    }
 }
</script>

<style scoped>
</style>
