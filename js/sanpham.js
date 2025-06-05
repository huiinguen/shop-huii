document.addEventListener('DOMContentLoaded', function() {
    const allProductGrid = document.getElementById('allProductGrid');
    const categoryFilterContainer = document.getElementById('categoryFilter');
    const priceRangeSlider = document.getElementById('priceRange');
    const priceValueDisplay = document.getElementById('priceValue');
    const searchInput = document.getElementById('searchInput');
    const sortBySelect = document.getElementById('sortBy');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const paginationControls = document.getElementById('paginationControls');

    // Sidebar filter elements
    const filterToggleBtn = document.getElementById('filterToggle');
    const sidebarFilters = document.getElementById('sidebarFilters');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (typeof allProducts === 'undefined' || allProducts.length === 0) {
        console.warn("Dữ liệu sản phẩm (allProducts) rỗng hoặc product_data.js chưa tải.");
        if (allProductGrid) {
            allProductGrid.innerHTML = "<p>Không có sản phẩm nào để hiển thị. Vui lòng kiểm tra lại dữ liệu.</p>";
        }
        // Có thể ẩn các bộ lọc nếu không có sản phẩm
        if (document.querySelector('.filters')) document.querySelector('.filters').style.display = 'none';
        if (document.querySelector('.toolbar')) document.querySelector('.toolbar').style.display = 'none';
        return; // Ngừng thực thi nếu không có sản phẩm
    }

    const productsPerPage = 8; // Số sản phẩm trên mỗi trang
    let currentPage = 1;

    const categories = [...new Set(allProducts.map(p => p.category))];

    function setupCategories() {
        if (!categoryFilterContainer) return;

        categoryFilterContainer.innerHTML = '';
        // Thêm option "Tất cả"
        const allLi = document.createElement('li');
        const allLink = document.createElement('a');
        allLink.href = '#';
        allLink.textContent = 'Tất cả';
        allLink.dataset.category = 'all';
        allLink.classList.add('active'); // Mặc định active
        allLink.addEventListener('click', handleCategoryClick);
        allLi.appendChild(allLink);
        categoryFilterContainer.appendChild(allLi);

        categories.forEach(category => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = category;
            link.dataset.category = category;
            link.addEventListener('click', handleCategoryClick);
            li.appendChild(link);
            categoryFilterContainer.appendChild(li);
        });
    }

    function handleCategoryClick(event) {
        event.preventDefault();
        const clickedCategory = event.target.dataset.category;

        // Xóa class 'active' khỏi tất cả các link danh mục
        document.querySelectorAll('#categoryFilter a').forEach(link => {
            link.classList.remove('active');
        });
        // Thêm class 'active' vào link được click
        event.target.classList.add('active');

        // Set selected category, reset page, and re-filter
        currentFilters.category = clickedCategory === 'all' ? null : clickedCategory;
        currentPage = 1;
        filterAndSortProducts();
        closeSidebar(); // Đóng sidebar sau khi chọn bộ lọc trên mobile
    }


    let currentFilters = {
        category: null,
        minPrice: 0,
        maxPrice: 5000000, // Giá trị max của range slider
        searchTerm: '',
        sortBy: 'newest'
    };

    function filterAndSortProducts() {
        let filtered = [...allProducts]; // Bắt đầu với tất cả sản phẩm

        // 1. Lọc theo Danh mục
        if (currentFilters.category) {
            filtered = filtered.filter(product => product.category === currentFilters.category);
        }

        // 2. Lọc theo Khoảng giá
        filtered = filtered.filter(product =>
            product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice
        );

        // 3. Lọc theo Tìm kiếm
        if (currentFilters.searchTerm) {
            const lowerCaseSearchTerm = currentFilters.searchTerm.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // 4. Sắp xếp
        switch (currentFilters.sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
        }

        displayProducts(filtered, allProductGrid);
        setupPagination(filtered.length);
    }

    function displayProducts(products, container) {
        if (!container) {
            console.error("Product grid container not found!");
            return;
        }
        container.innerHTML = ''; // Xóa sản phẩm cũ

        if (products.length === 0) {
            container.innerHTML = '<p class=\"no-products-message\">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>';
            if (paginationControls) {
                paginationControls.innerHTML = '';
            }
            return;
        }

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = products.slice(startIndex, endIndex);

        productsToDisplay.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <a href="sanpham_chitiet.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <div class="product-info">
                        <h3><a href="sanpham_chitiet.html?id=${product.id}">${product.name}</a></h3>
                        <p class="product-price">${product.price === 0 ? 'Miễn phí' : formatCurrency(product.price)}</p>
                        <p class="product-category">${product.category}</p>
                        <a href="sanpham_chitiet.html?id=${product.id}" class="btn-view-product cta-button">Xem Chi Tiết</a>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });
    }

    function setupPagination(totalProducts) {
        if (!paginationControls) return;

        const totalPages = Math.ceil(totalProducts / productsPerPage);
        paginationControls.innerHTML = '';

        if (totalPages <= 1) {
            return; // Không hiển thị pagination nếu chỉ có 1 trang
        }

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('page-button');
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                filterAndSortProducts(); // Re-render sản phẩm cho trang mới
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
            });
            paginationControls.appendChild(button);
        }
    }

    // Initial setup
    if (allProductGrid) { // Chỉ chạy nếu có container sản phẩm
        setupCategories();
        if (priceRangeSlider && priceValueDisplay) {
            // Cập nhật giá trị hiển thị ban đầu của slider
            priceValueDisplay.textContent = formatCurrency(priceRangeSlider.value);
            // Cập nhật currentFilters.maxPrice theo giá trị slider ban đầu
            currentFilters.maxPrice = parseInt(priceRangeSlider.value);

            priceRangeSlider.addEventListener('input', () => {
                priceValueDisplay.textContent = formatCurrency(priceRangeSlider.value);
                // Không tự động filter khi kéo, đợi nhấn nút Áp Dụng
            });
        }

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                currentFilters.minPrice = 0; // Đặt lại minPrice
                currentFilters.maxPrice = parseInt(priceRangeSlider.value); // Lấy giá trị hiện tại của slider
                currentPage = 1; // Reset về trang 1 khi áp dụng bộ lọc
                filterAndSortProducts();
                closeSidebar(); // Đóng sidebar sau khi áp dụng bộ lọc
            });
        }
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    currentFilters.searchTerm = searchInput.value.trim();
                    currentPage = 1; // Reset về trang 1 khi tìm kiếm
                    filterAndSortProducts();
                }, 300);
            });
        }
        if (sortBySelect) {
            sortBySelect.addEventListener('change', () => {
                currentFilters.sortBy = sortBySelect.value;
                currentPage = 1; // Reset về trang 1 khi sắp xếp
                filterAndSortProducts();
            });
        }

        filterAndSortProducts(); // Hiển thị sản phẩm lần đầu
    }


    // =====================================
    // Sidebar Filter Logic
    // =====================================

    function openSidebar() {
        sidebarFilters.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Ngăn cuộn trang chính
    }

    function closeSidebar() {
        sidebarFilters.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Cho phép cuộn trang chính
    }

    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', openSidebar);
    }

    if (closeFilterBtn) {
        closeFilterBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
});