// 分类页面JavaScript

// 全局变量
let currentCategory = 0; // 0表示全部商品
let categories = [];
let goodsData = [];

// 初始化分类页面
function initCategory() {
    loadData();
    renderCategoryList();
    renderGoodsList();
}

// 加载数据
function loadData() {
    categories = globalData.categories;
    goodsData = app.getAllGoods();
}

// 渲染分类列表
function renderCategoryList() {
    const categoryLeftElement = document.getElementById('categoryLeft');
    
    // 添加"全部商品"选项
    const allCategory = {
        id: 0,
        name: '全部商品'
    };
    
    const allCategories = [allCategory, ...categories];
    
    categoryLeftElement.innerHTML = allCategories.map(category => `
        <div class="category-item ${currentCategory === category.id ? 'active' : ''}" onclick="selectCategory(${category.id})" data-id="${category.id}">
            ${category.name}
        </div>
    `).join('');
}

// 选择分类
function selectCategory(categoryId) {
    currentCategory = categoryId;
    renderCategoryList();
    renderGoodsList();
    updateCategoryTitle();
}

// 更新分类标题
function updateCategoryTitle() {
    const categoryTitleElement = document.getElementById('currentCategoryName');
    if (currentCategory === 0) {
        categoryTitleElement.textContent = '全部商品';
    } else {
        const category = categories.find(cat => cat.id === currentCategory);
        categoryTitleElement.textContent = category ? category.name : '商品分类';
    }
}

// 渲染商品列表
function renderGoodsList() {
    const goodsListElement = document.getElementById('categoryGoodsList');
    
    // 根据分类过滤商品
    let filteredGoods = goodsData;
    if (currentCategory !== 0) {
        // 根据分类ID过滤商品
        filteredGoods = goodsData.filter(item => item.categoryId === currentCategory);
    }
    
    if (filteredGoods.length === 0) {
        goodsListElement.innerHTML = '<div class="no-goods">该分类下暂无商品</div>';
        return;
    }
    
    goodsListElement.innerHTML = filteredGoods.map(goods => `
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
    
    // 初始化分类列表
    initCategoryList();
    
    // 初始化商品列表
    initGoodsList();
    
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