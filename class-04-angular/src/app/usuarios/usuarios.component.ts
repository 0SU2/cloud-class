import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any[] = [];
  showModal:boolean = false;
  isEditing:boolean = false;
  usuario = {
    id: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    direccion: '',
    telefono: '',
    ciudad: '',
    estado: '',
    usuario: '',
    password: '',
    rol: '',
    bloqueado: false,
    intentos: 0,
  }
  constructor(private userService: UserService) {
    this.loadUsuarios();
  }
  loadUsuarios() {
    this.userService.getAllUsers().subscribe(
      (data:any) => {
        console.log("Usuarios fetched successfully: ", data);
        this.usuarios = data;
      },
      (error) => {
        console.error('Error while fetching data: ', error)
      }
    )
  }
  openModal(user?: any) {
    this.showModal = true;
    this.isEditing = !!user;
    this.usuario = user ? { ...user } : {
      id: '',
      nombre: '',
      apaterno: '',
      amaterno: '',
      direccion: '',
      telefono: '',
      ciudad: '',
      estado: '',
      usuario: '',
      password: '',
      rol: '',
      bloqueado: false,
      intentos: 0,
    }
  }
  closeModal() {
    this.showModal = false;
    this.usuario = {
      id: '',
      nombre: '',
      apaterno: '',
      amaterno: '',
      direccion: '',
      telefono: '',
      ciudad: '',
      estado: '',
      usuario: '',
      password: '',
      rol: '',
      bloqueado: false,
      intentos: 0,
    }
  }
  saveUsuario() {
    if(this.isEditing) {
      this.userService.updateUser(this.usuario.id, this.usuario).subscribe(
        (response) => {
          console.log('Usuario updated successfully', response);
          this.loadUsuarios();
          this.closeModal();
        },
        (error) => {
          console.error('Error while updating: ', error);
        }
      );
    } else {
      this.userService.createUser(this.usuario).subscribe(
        (response) => {
          console.log('Usuario created successfully', response);
          this.loadUsuarios();
          this.closeModal();
        },
        (error) => {
          console.error('Error while creating: ', error);
        }
      )
    }
  }
  deleteUsuario(id:string) {
    if(confirm('Estas seuro de eliminar al usuario?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          console.log('Usuario deleted successfully', response);
          this.loadUsuarios();
        },
        (error) => {
          console.error('Error while deleting: ', error);
        }
      )
    }
  }
}
