document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang web đã tải xong!");

    // Xử lý active link trên navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cập nhật icon giỏ hàng khi trang tải
    if (typeof updateCartIcon === 'function') { // Kiểm tra hàm có tồn tại không (từ cart_logic.js)
        updateCartIcon();
    }
});

// Hàm formatCurrency đã có
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}