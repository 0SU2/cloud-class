import { auth } from './firebase.js'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// iniciar sesion
document.getElementById("loginForm")?.addEventListener('submit', async(event) => {
  event.preventDefault();
  const email = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'inventario.html';
  } catch (error) {
    alert('Error al iniciar session: ' + error.message);
    throw new Error(error);
  }
});

// registrar usuario
document.getElementById("registerForm")?.addEventListener('submit', async(event) => {
  event.preventDefault();
  const email = document.getElementById('registerUser').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;
  const apellidoPA = document.getElementById('registerPA').value;
  const apellidoMA = document.getElementById('registerMA').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = 'index.html';
  } catch (error) {
    alert('Error al crear usuario: ' + error.message);
    throw new Error(error.message);
  }
});

// sign out
export async function signOutApp() {
    await signOut(auth)
    window.location.href = 'index.html'
}

document.getElementById("logoutButton")?.addEventListener('click', async(event) => {
  try {
    signOut();
  } catch (error) {
    alert('Error al cerrar session: ' + error.message);
    throw new Error(error.message);
  }
});