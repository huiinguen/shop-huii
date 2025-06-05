// Khai báo biến global để các file khác có thể truy cập
var allProducts = [
    {
        id: 1,
        name: 'App python tổng hợp',
        price: 80000,
        image: 'images/py.jpg',
        images_gallery: ['images/py.jpg', 'images/placeholder.png', 'images/placeholder.png'], // Thêm ảnh cho gallery
        category: 'Source Code',
        description: 'Chức năng: (1) spam chỉ chuột vào đích  (2) spam dạng ctrl+v  (3) tạo list mail ',
        stock: 10 // Số lượng tồn kho (ví dụ)
    },
    {
        id: 2,
        name: 'python ?',
        price: 3200000,
        image: 'images/py.jpg',
        images_gallery: ['images/py.jpg'],
        category: 'Thanh Lý Đồ',
        description: 'Laptop Dell Latitude E7450, cấu hình Core i5, RAM 8GB, SSD 256GB. Máy còn hoạt động tốt, ngoại hình 90%. Phù hợp cho công việc văn phòng, học tập. Pin còn khoảng 2 giờ. Kèm sạc zin.',
        stock: 1
    },
    {
        id: 4,
        name: 'Source Code App Mobile Bán Hàng Flutter',
        price: 1200000,
        image: 'images/sourcecode_app.jpg',
        images_gallery: ['images/sourcecode_app.jpg'],
        category: 'Source Code',
        description: 'Source code ứng dụng bán hàng đa năng xây dựng bằng Flutter. Hỗ trợ cả Android và iOS. Giao diện người dùng thân thiện, tích hợp các tính năng cơ bản như danh sách sản phẩm, giỏ hàng, thanh toán (mô phỏng).',
        stock: 5
    },
    // Thêm các sản phẩm khác tương tự, nhớ cập nhật trường description và images_gallery
    {
        id: 5,
        name: 'Thanh Lý Máy Ảnh Sony A6000 + Lens Kit',
        price: 6800000,
        image: 'images/mayanh_thanhly.jpg',
        images_gallery: ['images/mayanh_thanhly.jpg'],
        category: 'Thanh Lý Đồ',
        description: 'Máy ảnh Sony Alpha A6000 kèm lens kit 16-50mm. Máy còn mới, ít sử dụng, đầy đủ phụ kiện hộp sách. Chất lượng ảnh tốt, phù hợp cho người mới bắt đầu.',
        stock: 1
    },
    {
        id: 7,
        name: 'Source Code Game Flappy Bird (Unity)',
        price: 0, // Sản phẩm miễn phí
        image: 'images/flappybird_code.jpg',
        images_gallery: ['images/flappybird_code.jpg'],
        category: 'Source Code',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999
    },
    {
        id: 8,
        name: 'Locket Gold Link 1',
        price: 0, // Sản phẩm miễn phí
        image: 'images/locket.jpg',
        images_gallery: ['images/locket.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/hvbstar/coderhvb/main/Locket_Gold_HVB.sgmodule'
    },
    {
        id: 9,
        name: 'Locket Gold Link 2',
        price: 0, // Sản phẩm miễn phí
        image: 'images/locket.jpg',
        images_gallery: ['images/locket.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/vuong2023/shad/main/modules/Locket_ohb.sgmodule'
    },
    {
        id: 10,
        name: 'Tải Shadowrocket',
        price: 0,
        image: 'images/shadow.jpg',
        images_gallery: ['images/shadow.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://idapple.csadata4g.me/' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 11,
        name: 'Module YouTube Premium',
        price: 0,
        image: 'images/yt.jpg',
        images_gallery: ['images/yt.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/quocchienn/YouTubePIP/refs/heads/YouTube%2B%2B/YouTubefix3.conf' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 12,
        name: 'Link YouTube Premium',
        price: 0,
        image: 'images/yt.jpg',
        images_gallery: ['images/yt.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/vuong2023/shad/main/modules/Locket_ohb.sgmodule' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 13,
        name: 'Spotify Config',
        price: 0,
        image: 'images/spotify.jpg',
        images_gallery: ['images/spotify.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/quocchienn/1in1/refs/heads/main/Spotify.conf' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 13,
        name: 'Spotify Module',
        price: 0,
        image: 'images/spotify.jpg',
        images_gallery: ['images/spotify.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/quocchienn/1in1/refs/heads/main/Spotify.module' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 14,
        name: 'SoundCloud',
        price: 0,
        image: 'images/',
        images_gallery: ['images/'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/vantuan380/vantuan/refs/heads/main/soundcloud.module' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 15,
        name: 'Module Tổng Hợp',
        price: 0,
        image: 'images/shadow.jpg',
        images_gallery: ['images/shadow.jpg'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/quocchienn/Make/refs/heads/crack/ALL_Lucky_VP3.modules' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 16,
        name: 'meitu module',
        price: 0,
        image: 'images/',
        images_gallery: ['images/'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/vantuan380/vantuan/refs/heads/main/Meitu.module' // <-- CẦN CẬP NHẬT LINK THẬT
    },
    {
        id: 13,
        name: 'Lightroom',
        price: 0,
        image: 'images/',
        images_gallery: ['images/'],
        category: 'Share Tài Nguyên',
        description: 'Source code game Flappy Bird đơn giản được viết bằng Unity. Phù hợp cho các bạn mới học làm game tham khảo.',
        stock: 999,
        resourceLink: 'https://raw.githubusercontent.com/vantuan380/phonton/refs/heads/main/lightroom.module' // <-- CẦN CẬP NHẬT LINK THẬT
    },

];

// Tạo ảnh placeholder nếu chưa có
// Bạn nên tạo một ảnh images/placeholder.png
const placeholderImage = 'images/placeholder.png';
allProducts.forEach(product => {
    if (!product.image) product.image = placeholderImage;
    if (!product.images_gallery || product.images_gallery.length === 0) {
        product.images_gallery = [product.image || placeholderImage];
    }
    product.images_gallery = product.images_gallery.map(img => img || placeholderImage);
});
