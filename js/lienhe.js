document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn việc gửi form mặc định

            // Basic client-side validation (có thể thêm phức tạp hơn)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                displayStatus('Vui lòng điền đầy đủ các trường bắt buộc.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                displayStatus('Địa chỉ email không hợp lệ.', 'error');
                return;
            }

            // Nếu có backend, bạn sẽ gửi dữ liệu ở đây bằng fetch() hoặc XMLHttpRequest
            // Ví dụ:
            // const formData = new FormData(contactForm);
            // fetch('/api/contact', { method: 'POST', body: formData })
            //     .then(response => response.json())
            //     .then(data => {
            //         if (data.success) {
            //             displayStatus('Tin nhắn của bạn đã được gửi thành công!', 'success');
            //             contactForm.reset();
            //         } else {
            //             displayStatus('Có lỗi xảy ra: ' + (data.message || 'Không thể gửi tin nhắn.'), 'error');
            //         }
            //     })
            //     .catch(error => {
            //         displayStatus('Lỗi kết nối. Vui lòng thử lại.', 'error');
            //     });

            // Giả lập gửi thành công (vì chưa có backend)
            setTimeout(() => {
                displayStatus('Tin nhắn của bạn đã được gửi (giả lập)! Chúng tôi sẽ sớm liên hệ lại.', 'success');
                contactForm.reset(); // Xóa nội dung form
            }, 1000);
        });
    }

    function displayStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = type; // 'success' or 'error'
        }
    }

    function isValidEmail(email) {
        // Biểu thức chính quy đơn giản để kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});