// 购物车页面JavaScript

// 购物车数据
let cartData = [];
let selectedItems = new Set();

// 初始化购物车
function initCart() {
    loadCartData();
    renderCartList();
    updateTotal();
}

// 加载购物车数据
function loadCartData() {
    cartData = globalData.cartList.map(item => ({
        ...item,
        selected: true
    }));
    // 初始化选中项
    selectedItems = new Set(cartData.map(item => item.id));
}

// 渲染购物车列表
function renderCartList() {
    const cartListElement = document.getElementById('cartList');
    const emptyCartElement = document.getElementById('emptyCart');
    const cartFooterElement = document.getElementById('cartFooter');
    
    if (cartData.length === 0) {
        // 显示空购物车
        cartListElement.innerHTML = '';
        emptyCartElement.style.display = 'flex';
        cartFooterElement.style.display = 'none';
        return;
    }
    
    // 显示购物车列表
    emptyCartElement.style.display = 'none';
    cartFooterElement.style.display = 'flex';
    
    cartListElement.innerHTML = cartData.map(item => `
        <div class="cart-item">
            <div class="cart-item-select">
                <input type="checkbox" id="select-${item.id}" checked="${item.selected}" onchange="toggleItem(${item.id})")">
            </div>
            <a href="goods.html?id=${item.id}">
                <img class="cart-item-image" src="${item.image}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'">
            </a>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">¥${item.price}</div>
                <div class="cart-item-count">
                    <div class="cart-count-input">
                        <button class="cart-count-btn" onclick="changeCount(${item.id}, -1)">-</button>
                        <input type="number" class="cart-count-value" value="${item.count}" min="1" onchange="changeCountInput(${item.id}, this.value)")">
                        <button class="cart-count-btn" onclick="changeCount(${item.id}, 1)")">+</button>
                    </div>
                    <button class="cart-item-delete" onclick="deleteItem(${item.id})")">删除</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // 更新全选状态
    updateSelectAll();
}

// 切换商品选中状态
function toggleItem(itemId) {
    const item = cartData.find(item => item.id === itemId);
    if (item) {
        item.selected = !item.selected;
        if (item.selected) {
            selectedItems.add(itemId);
        } else {
            selectedItems.delete(itemId);
        }
        updateTotal();
        updateSelectAll();
    }
}

// 全选/取消全选
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const isSelectAll = selectAllCheckbox.checked;
    
    cartData.forEach(item => {
        item.selected = isSelectAll;
        if (isSelectAll) {
            selectedItems.add(item.id);
        } else {
            selectedItems.delete(item.id);
        }
    });
    
    renderCartList();
    updateTotal();
}

// 更新全选状态
function updateSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.checked = selectedItems.size === cartData.length;
}

// 改变购买数量
function changeCount(itemId, delta) {
    const item = cartData.find(item => item.id === itemId);
    if (item) {
        item.count = Math.max(1, item.count + delta);
        saveCartData();
        renderCartList();
        updateTotal();
    }
}

// 通过输入框改变数量
function changeCountInput(itemId, value) {
    const count = Math.max(1, parseInt(value) || 1);
    const item = cartData.find(item => item.id === itemId);
    if (item) {
        item.count = count;
        saveCartData();
        renderCartList();
        updateTotal();
    }
}

// 删除商品
function deleteItem(itemId) {
    if (confirm('确定要删除该商品吗？')) {
        cartData = cartData.filter(item => item.id !== itemId);
        selectedItems.delete(itemId);
        saveCartData();
        renderCartList();
        updateTotal();
        app.showToast('已删除');
    }
}

// 保存购物车数据
function saveCartData() {
    // 更新全局数据
    globalData.cartList = cartData.map(item => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        count: item.count
    }));
    // 更新购物车数量显示
    app.updateCartCount();
}

// 更新总价
function updateTotal() {
    let totalPrice = 0;
    let selectedCount = 0;
    
    cartData.forEach(item => {
        if (item.selected) {
            totalPrice += item.price * item.count;
            selectedCount += item.count;
        }
    });
    
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    document.getElementById('selectedCount').textContent = selectedCount;
}

// 结算
function settle() {
    const selectedGoods = cartData.filter(item => item.selected);
    
    if (selectedGoods.length === 0) {
        app.showToast('请选择商品');
        return;
    }
    
    // 将选中商品的ID通过URL参数传递给结算页面
    const selectedIds = selectedGoods.map(item => item.id).join(',');
    window.location.href = `settle.html?selectedIds=${selectedIds}`;
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    if (!app.checkLogin()) {
        return;
    }
    
    initCart();
    
    // 搜索功能
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            app.showToast('搜索功能开发中');
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});