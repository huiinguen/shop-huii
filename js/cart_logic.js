// js/cart_logic.js

// Hàm khởi tạo hoặc lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

// Hàm lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartIcon(); // Cập nhật icon mỗi khi giỏ hàng thay đổi
}

// Hàm thêm sản phẩm vào giỏ hàng
function addItemToCart(productId, quantity = 1) {
    const cart = getCart();
    // Kiểm tra xem allProducts có tồn tại không
    if (typeof allProducts === 'undefined' || !allProducts) {
        console.error("Dữ liệu sản phẩm (allProducts) không tồn tại.");
        return; // Hoặc xử lý lỗi theo cách khác
    }
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        console.error(`Không tìm thấy sản phẩm với ID: ${productId}`);
        return;
    }
    if (product.price === 0) { // Không thêm sản phẩm miễn phí vào giỏ
        alert("Sản phẩm miễn phí không cần thêm vào giỏ hàng.");
        return;
    }

    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        // Sản phẩm đã có trong giỏ, cập nhật số lượng
        cart[existingItemIndex].quantity += quantity;
        // Đảm bảo không vượt quá stock
        if (cart[existingItemIndex].quantity > product.stock) {
            cart[existingItemIndex].quantity = product.stock;
            // Có thể thông báo cho người dùng ở đây
            console.warn(`Số lượng sản phẩm "${product.name}" trong giỏ đã đạt tối đa tồn kho.`);
        }
    } else {
        // Sản phẩm chưa có trong giỏ, thêm mới
        // Đảm bảo số lượng không vượt quá stock khi thêm lần đầu
        const addQuantity = Math.min(quantity, product.stock);
        if (addQuantity > 0) {
             cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: addQuantity,
                stock: product.stock
            });
        } else {
            console.warn(`Sản phẩm "${product.name}" đã hết hàng hoặc số lượng không hợp lệ.`);
            return; // Không thêm nếu stock = 0
        }
    }
    saveCart(cart);
}

// Hàm cập nhật số lượng sản phẩm trong giỏ
function updateItemQuantity(productId, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        const product = allProducts.find(p => p.id === productId);
        if (newQuantity > 0 && newQuantity <= product.stock) {
            cart[itemIndex].quantity = newQuantity;
        } else if (newQuantity > product.stock) {
            cart[itemIndex].quantity = product.stock; // Giới hạn bởi stock
            console.warn("Số lượng cập nhật vượt quá tồn kho.");
        } else { // newQuantity <= 0, xóa sản phẩm
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItemFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

// Hàm xóa toàn bộ giỏ hàng
function clearCart() {
    saveCart([]);
}

// Hàm tính tổng số lượng sản phẩm trong giỏ (để hiển thị trên icon)
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Hàm tính tổng tiền của giỏ hàng
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Hàm cập nhật số lượng trên icon giỏ hàng ở header
function updateCartIcon() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = getCartItemCount();
    }
}

// Gọi updateCartIcon khi trang tải lần đầu (trong main.js hoặc cuối file này nếu các page đều load cart_logic.js)
// document.addEventListener('DOMContentLoaded', updateCartIcon); // Sẽ chuyển qua main.js