import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const productosEmpresa = collection(db, 'productos')

// Función para cargar productos en la tabla
async function cargarProductos() {
    const tabla = document.getElementById("productTable").getElementsByTagName("tbody")[0] || document.createElement("tbody");
    console.log(tabla)
    tabla.innerHTML = ""; // Limpiar tabla

    const querySnapshot = await getDocs(productosEmpresa);
    querySnapshot.forEach((doc) => {
        const producto = doc.data();
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.productName || ""}</td>
            <td>${producto.buyingPrice || ""}</td>
            <td>${producto.quantity || ""}</td>
            <td>${producto.threshold || ""}</td>
            <td>${producto.expiryDate || ""}</td>
            <td>${producto.quantity > producto.threshold ? "Available" : "Low Stock"}</td>
            <td><button class="editar-boton btn btn-sm btn-outline-primary" data-id="${doc.id}">Edit</button>
            <button class="eliminar-boton btn btn-sm btn-outline-danger" data-id="${doc.id}">Eliminar</button></td>
        `;
        tabla.appendChild(fila);

        document.querySelectorAll('.eliminar-boton').forEach((button) => {
          button.addEventListener('click', (e) => {
            deleteProduct(button.dataset.id)
          })
        })

    });

    // Si el tbody no existía, lo añadimos
    if (!document.getElementById("productTable").getElementsByTagName("tbody")[0]) {
        document.getElementById("productTable").appendChild(tabla);
    }
}


document.getElementById('file-blob').addEventListener('change', (e) => {
  let selectedImage = e.target.files[0]
  if(selectedImage) {

  }
})

const deleteProduct = async(id) => {
  try {
    await deleteDoc(doc(db, 'productos', id))
    cargarProductos()
  } catch (error) {
    throw new Error('Error al elminar el producto: ' + error.message)
  }
}
cargarProductos()

document.getElementById("add-product-modal").addEventListener("click", async () => {
    // Obtener los valores del formulario
    const productName = document.getElementById("product-name-modal").value;
    const productId = document.getElementById("product-id-modal").value;
    const category = document.getElementById("product-category-modal").value;
    const buyingPrice = document.getElementById("product-buying-modal").value;
    const quantity = document.getElementById("product-quantity-modal").value;
    const unit = document.getElementById("product-unit-modal").value;
    const expiryDate = document.getElementById("product-expiry-modal").value;
    const threshold = document.getElementById("product-threshold-modal").value;
    console.log(productName, productId, category, buyingPrice, quantity, unit, expiryDate, threshold);

    try {
        // Guardar en Firestore
        const docRef = await addDoc(productosEmpresa, {
            productName,
            productId,
            category,
            buyingPrice: parseFloat(buyingPrice),
            quantity: parseInt(quantity),
            unit,
            expiryDate,
            threshold: parseInt(threshold),
            createdAt: new Date()
        });
        alert("Producto agregado con ID: " + docRef.id);

        // Limpiar el formulario
        document.querySelector('#newProductModal form').reset();
        cargarProductos()
        // Cerrar el modal (requiere Bootstrap JS)
        const modal = bootstrap.Modal.getInstance(document.getElementById("newProductModal"));
        modal.hide();
    } catch (error) {
        console.error("Error al agregar producto:", error);
        alert("Error al guardar producto. Ver consola.");
    }
});