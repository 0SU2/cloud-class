import { signOutApp } from './auth.js';
import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const productTable = document.getElementById('productTable');
const addProductForm = document.getElementById('addProductForm');

const products = collection(db, 'products');

// Funcion para cargar productos
const loadProducts = async() => {
  productTable.innerHTML = '';
  const allProducts = await getDocs(products);
  allProducts.forEach((element) => {
    const product = element.data();
    const row = document.createElement('tr');
    row.innerHTML = `
      <th>${product.name}</th>
      <th>${product.stock}</th>
      <th>
        <button class="btn btn-warning btn-sm edit-product" data-id="${element.id}">
          <i class="fa fa-edit"></i>
        </button>
        |
        <button class="btn btn-danger btn-sm delete-product" data-id="${element.id}">
          <i class="fa fa-trash"></i>
        </button>
      </th>
    `;
    productTable.appendChild(row);
    document.querySelectorAll('.edit-product').forEach((button) => {
      button.addEventListener('click', (e) => {
        openEditDialog(button.dataset.id);
      });
    });

    document.querySelectorAll('.delete-product').forEach((button) => {
      button.addEventListener('click', (e) => {
        deleteProduct(button.dataset.id);
      });
    });
  });
}

loadProducts();

// Funcion para agregar productos
addProductForm.addEventListener('submit', async(event) => {
  event.preventDefault();
  const name = document.getElementById('productName').value;
  const stock = document.getElementById('productStock').value;
  const stockInt = parseInt(stock)
  if (stockInt > 0 ) {
    try {
      await addDoc(products, { name, stock });
      alert('Producto agregado satisfactoriamente');
      addProductForm.reset();
      loadProducts();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  alert('El valor del stock debe ser mayor a 1');
});

const deleteProduct = async(id) => {
  const confirmation = confirm('¿Estas Seguro?');
  if (confirmation) {
    try {
      await deleteDoc(doc(db, 'products', id));
      alert('Se ha borrado correctamente');
      loadProducts();
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}

const openEditDialog = async(id) => {
  if(id) {
    const producto = doc(db, 'products', id);
    const productData = (await getDoc(producto)).data();

    const newStock = prompt(
      ` Editando Producto: ${productData.name}\n Cantidad Actual: ${productData.stock} \n Ingresa la Nueva Cantidad:
      `, productData.stock
    );
    // const PATTERN = "^(0|[1-9][0-9]*)$"
    if (newStock !== null) {
      try {
        await updateDoc(producto, { stock: parseInt(newStock) });
        alert('Actualizado correctamente!');
        loadProducts();
      } catch (error) {
        throw new Error('Error al actualizar el producto: ' + error.message);
        
      }
    }
    return;
  }
  console.log('no id');
  return
}

document.getElementById('logoutButton')?.addEventListener('click', async() => {
  signOutApp();
})