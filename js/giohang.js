document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const subtotalPriceElement = document.getElementById('subtotalPrice');
    const totalPriceElement = document.getElementById('totalPrice');
    const cartSummaryContainer = document.getElementById('cartSummaryContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    if (!cartItemsContainer || !cartSummaryContainer || !emptyCartMessage) {
        console.error("Một số thành phần của trang giỏ hàng không tìm thấy.");
        return;
    }

    renderCart();

    function renderCart() {
        const cart = getCart(); // Từ cart_logic.js
        cartItemsContainer.innerHTML = ''; // Xóa item cũ

        if (cart.length === 0) {
            cartSummaryContainer.style.display = 'none';
            emptyCartMessage.style.display = 'block';
            return;
        }

        cartSummaryContainer.style.display = 'block';
        emptyCartMessage.style.display = 'none';

        cart.forEach(item => {
            const product = allProducts.find(p => p.id === item.id); // Lấy thông tin stock mới nhất
            const actualStock = product ? product.stock : item.stock; // Ưu tiên stock từ product_data

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image || placeholderImage}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">${formatCurrency(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" max="${actualStock}" data-product-id="${item.id}" class="quantity-input">
                </div>
                <div class="cart-item-subtotal">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
                <div class="cart-item-remove">
                    <button data-product-id="${item.id}" class="remove-item-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateCartSummary();
        addEventListenersToCartItems();
    }

    function updateCartSummary() {
        const total = getCartTotal(); // Từ cart_logic.js
        if (subtotalPriceElement) subtotalPriceElement.textContent = formatCurrency(total);
        if (totalPriceElement) totalPriceElement.textContent = formatCurrency(total); // Giả sử chưa có phí khác
    }

    function addEventListenersToCartItems() {
        // Xử lý thay đổi số lượng
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const productId = parseInt(this.dataset.productId);
                let newQuantity = parseInt(this.value);
                const product = allProducts.find(p => p.id === productId);
                const stock = product ? product.stock : 0;

                if (newQuantity > stock) {
                    newQuantity = stock;
                    this.value = stock; // Cập nhật lại input
                    alert(`Số lượng sản phẩm này chỉ còn ${stock} trong kho.`);
                }
                if (newQuantity < 1) newQuantity = 1; // Mặc định là 1 nếu nhập sai

                updateItemQuantity(productId, newQuantity); // Từ cart_logic.js
                renderCart(); // Vẽ lại toàn bộ giỏ hàng để cập nhật tổng tiền và subtotal
            });
        });

        // Xử lý nút xóa sản phẩm
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                    removeItemFromCart(productId); // Từ cart_logic.js
                    renderCart();
                }
            });
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Trong thực tế, đây sẽ là nơi xử lý chuyển đến trang thanh toán
            // và có thể gửi dữ liệu giỏ hàng lên server.
            const cart = getCart();
            if (cart.length > 0) {
                alert('Chức năng Thanh toán đang được phát triển! \nTổng tiền: ' + formatCurrency(getCartTotal()));
                // clearCart(); // Có thể xóa giỏ hàng sau khi thanh toán thành công
                // renderCart();
            } else {
                alert('Giỏ hàng của bạn trống!');
            }
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa toàn bộ sản phẩm trong giỏ hàng?')) {
                clearCart(); // Từ cart_logic.js
                renderCart();
            }
        });
    }
});