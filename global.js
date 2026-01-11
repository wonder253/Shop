// 全局数据管理
const globalData = {
    userInfo: null,
    cartList: [],
    goodsData: {
        1: {
            id: 1,
            categoryId: 1,
            title: '小米12 Pro 5G智能手机',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 4999,
            desc: '骁龙8 Gen1处理器，2K AMOLED屏幕，50MP三主摄，4600mAh电池',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        },
        2: {
            id: 2,
            categoryId: 2,
            title: '华为MateBook X Pro 笔记本电脑',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 8999,
            desc: '13.9英寸3K全面屏，第11代酷睿处理器，16GB内存，512GB SSD',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        },
        3: {
            id: 3,
            categoryId: 1,
            title: 'AirPods Pro 无线耳机',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 1999,
            desc: '主动降噪，通透模式，自适应均衡，空间音频',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        },
        4: {
            id: 4,
            categoryId: 1,
            title: 'Apple Watch Series 7',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 2999,
            desc: 'Always-On视网膜显示屏，血氧检测，心电图，防水50米',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        },
        5: {
            id: 5,
            categoryId: 2,
            title: 'iPad Pro 12.9英寸平板电脑',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 7999,
            desc: 'M1芯片，Liquid视网膜XDR显示屏，5G，Apple Pencil支持',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        },
        6: {
            id: 6,
            categoryId: 1,
            title: '索尼WH-1000XM4 降噪耳机',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+',
            price: 2599,
            desc: '业界领先降噪，30小时续航，快速充电，智能免摘对话',
            detailImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzY2NjY2NiIgdmlld0JveD0iMCAwIDc1MCAyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNzUwIiBoZWlnaHQ9IjIwMDAiIGZpbGw9IiNGRjNGM0YiLz4KPHRleHQgeD0iMzc1IiB5PSIxMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPuWbv+aen++8jTwvdGV4dD4KPC9zdmc+'
        }
    },
    categories: [
        { id: 1, name: '手机数码' },
        { id: 2, name: '电脑办公' },
        { id: 3, name: '家用电器' },
        { id: 4, name: '服饰鞋包' },
        { id: 5, name: '美妆护肤' },
        { id: 6, name: '运动户外' }
    ]
};

// 全局函数
const app = {
    // 添加到购物车
    addToCart: function(goods) {
        const existingGoods = globalData.cartList.find(item => item.id === goods.id);
        if (existingGoods) {
            existingGoods.count += 1;
        } else {
            globalData.cartList.push({
                ...goods,
                count: 1
            });
        }
        this.updateCartCount();
        this.showToast('已加入购物车');
    },
    
    // 获取购物车数量
    getCartCount: function() {
        return globalData.cartList.reduce((total, item) => total + item.count, 0);
    },
    
    // 更新购物车数量显示
    updateCartCount: function() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getCartCount();
        }
    },
    
    // 显示提示信息
    showToast: function(message, duration = 2000) {
        // 创建提示元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
            z-index: 9999;
            pointer-events: none;
        `;
        
        // 添加到页面
        document.body.appendChild(toast);
        
        // 自动移除
        setTimeout(() => {
            toast.remove();
        }, duration);
    },
    
    // 获取商品详情
    getGoodsById: function(id) {
        return globalData.goodsData[id];
    },
    
    // 获取所有商品列表
    getAllGoods: function() {
        return Object.values(globalData.goodsData);
    },
    
    // 获取分类商品
    getGoodsByCategory: function(categoryId) {
        // 这里可以根据分类ID过滤商品，现在返回所有商品
        return Object.values(globalData.goodsData);
    },
    
    // 保存数据到本地存储
    saveData: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // 从本地存储获取数据
    getData: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // 检查用户是否登录
    checkLogin: function() {
        // 从本地存储获取用户信息
        const userInfo = this.getData('userInfo');
        if (!userInfo) {
            // 如果未登录，重定向到登录页面
            window.location.href = 'login.html';
            return false;
        }
        // 如果已登录，更新全局数据
        globalData.userInfo = userInfo;
        return true;
    },
    
    // 获取当前用户信息
    getUserInfo: function() {
        return globalData.userInfo || this.getData('userInfo');
    },
    
    // 登出
    logout: function() {
        // 清除用户信息
        globalData.userInfo = null;
        // 清除本地存储
        localStorage.removeItem('userInfo');
        // 重定向到登录页面
        window.location.href = 'login.html';
    }
};

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', function() {
    // 从本地存储加载用户信息
    const savedUserInfo = app.getData('userInfo');
    if (savedUserInfo) {
        globalData.userInfo = savedUserInfo;
    }
    
    // 从本地存储加载购物车数据
    const savedCart = app.getData('cartList');
    if (savedCart) {
        globalData.cartList = savedCart;
    }
    
    // 更新购物车数量
    app.updateCartCount();
    
    // 保存购物车数据到本地存储
    window.addEventListener('beforeunload', function() {
        app.saveData('cartList', globalData.cartList);
    });
});

// 导出全局对象
window.app = app;
window.globalData = globalData;