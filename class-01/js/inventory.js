import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
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
          <i class="fas fas-edit"></i>
        </button>
        |
        <button class="btn btn-danger btn-sm delete-product" data-id="${element.id}">
          <i class="fas fas-trash"></i>
        </button>
      </th>
    `;
    productTable.appendChild(row);
  });
}

// Funcion para agregar productos
addProductForm.addEventListener('submit', async(event) => {
  event.preventDefault();
  const name = document.getElementById('productName').value;
  const stock = document.getElementById('productStock').value;

  try {
    await addDoc(products, { name, stock });
    alert('Producto agregado satisfactoriamente');
    addProductForm.reset();
    loadProducts();
  } catch (error) {
    throw new Error(error.message);
  }
});

loadProducts();