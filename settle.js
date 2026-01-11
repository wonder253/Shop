// 结算页面JavaScript

// 结算商品数据
let settleGoods = [];
let totalPrice = 0;
const SHIPPING_FEE = 0; // 免运费

// 初始化结算页面
function initSettle() {
    // 从URL参数中获取选中商品的ID
    const urlParams = new URLSearchParams(window.location.search);
    const selectedIdsStr = urlParams.get('selectedIds');
    
    if (!selectedIdsStr) {
        app.showToast('请选择商品');
        window.location.href = 'cart.html';
        return;
    }
    
    const selectedIds = selectedIdsStr.split(',').map(id => parseInt(id));
    
    // 从全局数据中获取对应的购物车商品
    const selectedGoods = globalData.cartList.filter(item => selectedIds.includes(item.id));
    
    if (selectedGoods.length === 0) {
        app.showToast('请选择商品');
        window.location.href = 'cart.html';
        return;
    }
    
    settleGoods = selectedGoods;
    renderGoodsList();
    calculateTotal();
}

// 渲染商品列表
function renderGoodsList() {
    const goodsListElement = document.getElementById('goodsList');
    
    goodsListElement.innerHTML = settleGoods.map(item => `
        <div class="goods-item">
            <img class="goods-item-image" src="${item.image}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'">
            <div class="goods-item-info">
                <div class="goods-item-title">${item.title}</div>
                <div class="goods-item-bottom">
                    <div class="goods-item-price">¥${item.price.toFixed(2)}</div>
                    <div class="goods-item-count">x${item.count}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 计算总价
function calculateTotal() {
    // 计算商品总价
    const goodsTotal = settleGoods.reduce((sum, item) => {
        return sum + (item.price * item.count);
    }, 0);
    
    totalPrice = goodsTotal + SHIPPING_FEE;
    
    // 更新页面显示
    document.getElementById('goodsTotal').textContent = goodsTotal.toFixed(2);
    document.getElementById('shippingFee').textContent = SHIPPING_FEE.toFixed(2);
    document.getElementById('orderTotal').textContent = totalPrice.toFixed(2);
    document.getElementById('finalTotal').textContent = totalPrice.toFixed(2);
}

// 管理地址
function manageAddress() {
    app.showToast('地址管理功能开发中');
}

// 提交订单
function submitOrder() {
    // 获取支付方式
    const paymentMethodElement = document.querySelector('input[name="payment"]:checked');
    const paymentMethod = paymentMethodElement ? paymentMethodElement.value : 'wechat';
    
    // 获取支付方式名称
    let paymentMethodName = '微信支付';
    if (paymentMethod === 'alipay') {
        paymentMethodName = '支付宝';
    }
    
    // 生成订单数据
    const orderData = {
        id: 'order_' + Date.now(),
        orderNumber: 'ORD' + Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        createTime: new Date().toLocaleString(),
        goods: settleGoods,
        totalAmount: totalPrice,
        paymentMethod: paymentMethod,
        paymentMethodName: paymentMethodName,
        status: 'pending',
        address: {
            name: '张三',
            phone: '138****8888',
            detail: '上海市浦东新区张江高科技园区科苑路88号'
        }
    };
    
    console.log('提交订单:', orderData);
    
    // 保存订单到本地存储（模拟）
    saveOrder(orderData);
    
    // 清空购物车中已结算的商品
    clearCartAfterSettle();
    
    // 跳转到订单成功页面
    window.location.href = `order-success.html?orderId=${orderData.id}&totalAmount=${totalPrice}&paymentMethod=${paymentMethodName}`;
}

// 保存订单到本地存储
function saveOrder(orderData) {
    // 获取现有订单
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // 添加新订单
    orders.push(orderData);
    
    // 保存到本地存储
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // 更新全局数据
    if (!globalData.orders) {
        globalData.orders = [];
    }
    globalData.orders.push(orderData);
}

// 清空购物车中已结算的商品
function clearCartAfterSettle() {
    // 从URL参数中获取已结算商品的ID
    const urlParams = new URLSearchParams(window.location.search);
    const selectedIdsStr = urlParams.get('selectedIds');
    
    if (selectedIdsStr) {
        const selectedIds = selectedIdsStr.split(',').map(id => parseInt(id));
        
        // 只移除已结算的商品
        globalData.cartList = globalData.cartList.filter(item => !selectedIds.includes(item.id));
        
        // 更新本地存储
        localStorage.setItem('globalData', JSON.stringify(globalData));
        
        // 更新购物车数量显示
        app.updateCartCount();
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    if (!app.checkLogin()) {
        return;
    }
    
    initSettle();
    
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