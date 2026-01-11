// 首页JavaScript

// 轮播图功能
function initSwiper() {
    const swiperItems = document.querySelectorAll('.swiper-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalItems = swiperItems.length;
    
    // 自动切换
    const autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSwiper();
    }, 3000);
    
    // 更新轮播图
    function updateSwiper() {
        swiperItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 点击指示器切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSwiper();
        });
    });
}

// 生成商品列表
function generateGoodsList() {
    const goodsList = app.getAllGoods();
    const goodsListElement = document.getElementById('goodsList');
    
    goodsListElement.innerHTML = goodsList.map(goods => `
        <div class="goods-item">
            <a href="goods.html?id=${goods.id}">
                <img class="goods-image" src="${goods.image}" alt="${goods.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'">
            </a>
            <div class="goods-title">${goods.title}</div>
            <div class="goods-price">¥${goods.price}</div>
            <div class="goods-actions">
                <a href="goods.html?id=${goods.id}" class="btn btn-default">查看详情</a>
                <button class="btn btn-primary" onclick="addToCart(${goods.id})")">加入购物车</button>
            </div>
        </div>
    `).join('');
}

// 加入购物车
function addToCart(goodsId) {
    const goods = app.getGoodsById(goodsId);
    app.addToCart(goods);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    if (!app.checkLogin()) {
        return;
    }
    
    // 初始化轮播图
    initSwiper();
    
    // 生成商品列表
    generateGoodsList();
    
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