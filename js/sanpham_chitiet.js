document.addEventListener('DOMContentLoaded', function () {
    const productDetailContainer = document.getElementById('productDetailContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productDetailContainer) {
        console.error("Product detail container not found!");
        return;
    }

    if (isNaN(productId) || !allProducts) {
        productDetailContainer.innerHTML = '<p class=\"error-text\">ID sản phẩm không hợp lệ hoặc dữ liệu sản phẩm chưa sẵn sàng.</p>';
        return;
    }

    const product = allProducts.find(p => p.id === productId);

    if (product) {
        displayProductDetails(product);
    } else {
        productDetailContainer.innerHTML = '<p class=\"error-text\">Không tìm thấy sản phẩm.</p>';
    }

    function displayProductDetails(prod) {
        let actionSectionHtml = '';

        // Check if it's a free resource
        if (prod.category === 'Share Tài Nguyên' && prod.price === 0) {
            if (prod.resourceLink) {
                actionSectionHtml = `
                    <div class="resource-actions">
                        <p class="resource-link-display">
                            Đường dẫn tài nguyên: <a href="${prod.resourceLink}" target="_blank" rel="noopener noreferrer">${prod.resourceLink}</a>
                        </p>
                        <div class="resource-buttons">
                            <button id="copyLinkBtn" class="cta-button">
                                <i class="far fa-copy"></i> Copy Link
                            </button>
                            <button id="goLinkBtn" class="cta-button primary-button">
                                <i class="fas fa-external-link-alt"></i> Đi đến Tài Nguyên
                            </button>
                        </div>
                        <p id="copyStatusMessage" class="status-message"></p>
                    </div>
                `;
            } else {
                actionSectionHtml = `<p class="error-text">Không tìm thấy đường link tài nguyên cho sản phẩm này.</p>`;
            }
        } else {
            // Original cart/quantity logic for paid products
            actionSectionHtml = `
                <div class="product-actions">
                    <div class="quantity-control">
                        <label for="quantity">Số lượng:</label>
                        <input type="number" id="quantity" value="1" min="1" max="${prod.stock}">
                    </div>
                    <button class="btn-add-to-cart cta-button" id="addToCartBtn">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                    </button>
                </div>
                <p id="addToCartMessage" class="status-message"></p>
            `;
        }


        productDetailContainer.innerHTML = `
            <div class="product-gallery">
                <div class="main-image-container">
                    <img src="${prod.images_gallery[0] || placeholderImage}" alt="${prod.name}" id="mainProductImage">
                </div>
                <div class="thumbnail-images">
                    ${prod.images_gallery.map((img, index) => `
                        <img src="${img || placeholderImage}" alt="Thumbnail ${index + 1}" class="${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img || placeholderImage}')">
                    `).join('')}
                </div>
            </div>
            <div class="product-info">
                <h1 class="product-title">${prod.name}</h1>
                <p class="product-price">${prod.price === 0 ? 'Miễn phí' : formatCurrency(prod.price)}</p>
                <div class="product-meta">
                    <p><b>Danh mục:</b> ${prod.category}</p>
                    <p><b>Tình trạng:</b> ${prod.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
                </div>
                <div class="product-description">
                    <h2>Mô tả sản phẩm</h2>
                    <p>${prod.description}</p>
                </div>
                ${actionSectionHtml}
            </div>
        `;

        // Add event listeners based on product type
        if (prod.category === 'Share Tài Nguyên' && prod.price === 0) {
            const copyLinkBtn = document.getElementById('copyLinkBtn');
            const goLinkBtn = document.getElementById('goLinkBtn');
            const copyStatusMessage = document.getElementById('copyStatusMessage');

            if (copyLinkBtn) {
                copyLinkBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(prod.resourceLink).then(() => {
                        copyStatusMessage.textContent = 'Đã sao chép đường link!';
                        copyStatusMessage.style.color = 'green';
                        setTimeout(() => { copyStatusMessage.textContent = ''; }, 3000);
                    }).catch(err => {
                        console.error('Không thể sao chép: ', err);
                        copyStatusMessage.textContent = 'Không thể sao chép. Vui lòng thử lại.';
                        copyStatusMessage.style.color = 'red';
                        setTimeout(() => { copyStatusMessage.textContent = ''; }, 3000);
                    });
                });
            }

            if (goLinkBtn) {
                goLinkBtn.addEventListener('click', () => {
                    window.open(prod.resourceLink, '_blank');
                });
            }
        } else {
            const addToCartBtn = document.getElementById('addToCartBtn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    const quantityInput = document.getElementById('quantity');
                    const quantity = parseInt(quantityInput.value);
                    const messageDiv = document.getElementById('addToCartMessage');

                    if (quantity > 0 && quantity <= prod.stock) {
                        addItemToCart(prod.id, quantity); // Gọi hàm từ cart_logic.js
                        messageDiv.textContent = `Đã thêm ${quantity} "${prod.name}" vào giỏ hàng!`;
                        messageDiv.style.color = 'green';
                    } else if (quantity > prod.stock) {
                        messageDiv.textContent = `Số lượng vượt quá tồn kho (${prod.stock}).`;
                        messageDiv.style.color = 'red';
                    } else {
                        messageDiv.textContent = 'Vui lòng nhập số lượng hợp lệ.';
                        messageDiv.style.color = 'red';
                    }
                    setTimeout(() => { messageDiv.textContent = ''; }, 3000);
                });
            }
        }
    }
});

// Hàm thay đổi ảnh chính khi click vào thumbnail (đặt ở global scope hoặc trong DOMContentLoaded)
function changeMainImage(newImageUrl) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = newImageUrl;
        // Cập nhật class active cho thumbnail
        document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.src === newImageUrl || thumb.src.endsWith(newImageUrl.substring(newImageUrl.lastIndexOf('/') +1 ))) { // So sánh cả URL đầy đủ hoặc tên file
                thumb.classList.add('active');
            }
        });
    }
}