// js/main.js

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

    // =====================================
    // Logic cho Hamburger Menu (Đoạn mã cần thêm/kiểm tra)
    // =====================================
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    // Ensure you select the correct element for the nav links.
    // Based on your HTML, the nav links are directly under .navbar
    const mainNavLinks = document.querySelector('.navbar .nav-links'); 

    if (hamburgerMenu && mainNavLinks) {
        hamburgerMenu.addEventListener('click', function() {
            mainNavLinks.classList.toggle('active');
            // Optional: Add a class to hamburger for animation if desired
            hamburgerMenu.classList.toggle('open'); 
        });

        // Optional: Close menu when a link is clicked (for single-page navigation or convenience)
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            });
        });
    } else {
        console.warn("Hamburger menu or main navigation links not found. Mobile menu functionality might be impaired.");
    }
});

// Hàm formatCurrency đã có
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
