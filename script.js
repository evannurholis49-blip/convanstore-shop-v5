let cart = [];
let currentProduct = {};

// Fitur pencarian
const searchInput = document.getElementById('search');
const products = document.querySelectorAll('.product');
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        product.style.display = name.includes(query) ? 'inline-block' : 'none';
    });
});

// Buka modal produk
function openProductModal(name, img, desc, price) {
    currentProduct = { name, img, desc, price };
    document.getElementById('product-title').textContent = name;
    document.getElementById('product-img').src = img;
    document.getElementById('product-desc').textContent = desc;
    document.getElementById('product-price').textContent = price.toLocaleString();
    document.getElementById('size-select').value = ''; // Reset ukuran
    document.getElementById('product-modal').style.display = 'block';
}

// Tambah ke keranjang dari modal
function addToCartFromModal() {
    const size = document.getElementById('size-select').value;
    if (!size) {
        alert('Silakan pilih ukuran terlebih dahulu.');
        return;
    }
    addToCart(currentProduct.name, currentProduct.price, currentProduct.img, size);
    closeModal('product-modal');
}

// Tambah ke keranjang
function addToCart(name, price, img, size) {
    const existing = cart.find(item => item.name === name && item.size === size);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, img, size, quantity: 1 });
    }
    updateCartCount();
    showNotification();
}

// Update jumlah keranjang
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Buka modal keranjang
function openCartModal() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name} (Ukuran: ${item.size})</h4>
                    <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `;
    });
    document.getElementById('cart-total').textContent = total.toLocaleString();
    document.getElementById('cart-modal').style.display = 'block';
}

// Hapus dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCartModal(); // Refresh modal
}

// Checkout (simulasi)
function checkout() {
    alert('Checkout berhasil! Total: Rp ' + document.getElementById('cart-total').textContent);
    cart = [];
    updateCartCount();
    closeModal('cart-modal');
}

// Tutup modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Tampilkan notifikasi
function showNotification() {
    const notif = document.getElementById('notification');
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 2000);
}
