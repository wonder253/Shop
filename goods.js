// 商品详情页JavaScript

// 从URL获取商品ID
function getGoodsIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// 生成商品详情
function generateGoodsDetail() {
    const goodsId = getGoodsIdFromUrl();
    const goods = app.getGoodsById(goodsId);
    const goodsContainer = document.getElementById('goodsContainer');
    
    if (!goods) {
        goodsContainer.innerHTML = '<div class="error">商品不存在</div>';
        return;
    }
    
    // 设置页面标题
    document.title = goods.title + ' - 购物商城';
    
    goodsContainer.innerHTML = `
        <div class="goods-detail">
            <div class="goods-images">
                <img class="main-image" src="${goods.image}" alt="${goods.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'">
            </div>
            <div class="goods-info-detail">
                <div class="goods-title-detail">${goods.title}</div>
                <div class="goods-price-detail">¥${goods.price}</div>
                <div class="goods-desc-detail">${goods.desc}</div>
                
                <div class="buy-count">
                    <span class="count-label">购买数量：</span>
                    <div class="count-input">
                        <button class="count-btn" onclick="changeCount(-1)">-</button>
                        <input type="number" class="count-value" id="countInput" value="1" min="1">
                        <button class="count-btn" onclick="changeCount(1)">+</button>
                    </div>
                </div>
                
                <div class="buy-actions">
                    <button class="btn btn-primary" onclick="buyNow()">立即购买</button>
                    <button class="btn btn-default" onclick="addToCartDetail()">加入购物车</button>
                </div>
            </div>
        </div>
        
        <div class="goods-content">
            <div class="content-title">商品详情</div>
            <img class="content-image" src="${goods.detailImage}" alt="${goods.title}详情" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'">
        </div>
    `;
}

// 改变购买数量
function changeCount(delta) {
    const countInput = document.getElementById('countInput');
    let currentCount = parseInt(countInput.value);
    currentCount = Math.max(1, currentCount + delta);
    countInput.value = currentCount;
}

// 加入购物车
function addToCartDetail() {
    const goodsId = getGoodsIdFromUrl();
    const countInput = document.getElementById('countInput');
    const count = parseInt(countInput.value);
    const goods = app.getGoodsById(goodsId);
    
    // 添加指定数量到购物车
    for (let i = 0; i < count; i++) {
        app.addToCart(goods);
    }
}

// 立即购买
function buyNow() {
    const goodsId = getGoodsIdFromUrl();
    const countInput = document.getElementById('countInput');
    const count = parseInt(countInput.value);
    
    app.showToast('立即购买功能开发中');
    console.log('立即购买:', { goodsId, count });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    if (!app.checkLogin()) {
        return;
    }
    
    // 生成商品详情
    generateGoodsDetail();
    
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