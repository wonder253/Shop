// 用户中心页面JavaScript

// 初始化用户中心
function initUserCenter() {
    renderUserInfo();
    setupEventListeners();
}

// 渲染用户信息
function renderUserInfo() {
    const userInfoElement = document.getElementById('userInfo');
    const userInfo = globalData.userInfo;
    
    if (userInfo) {
        // 已登录状态
        userInfoElement.innerHTML = `
            <img class="user-avatar" src="${userInfo.avatarUrl || 'https://source.unsplash.com/100x100/?avatar,user'}" alt="用户头像" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNjY2NjY2Ij7lk4jlk4jlk4jwvdGV4dD4KPC9zdmc+'">
            <div class="user-info-text">
                <div class="user-name">${userInfo.nickName || '用户'}</div>
                <div class="user-stats">
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">待付款</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">待发货</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">待收货</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">待评价</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // 未登录状态
        userInfoElement.innerHTML = `
            <div class="login-prompt">
                <h3>欢迎来到用户中心</h3>
                <p>请登录后查看更多信息</p>
                <button class="login-btn" onclick="login()">登录</button>
            </div>
        `;
    }
}

// 模拟登录
function login() {
    // 模拟登录，设置默认用户信息
    const mockUserInfo = {
        nickName: '购物达人',
        avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNjY2NjY2Ij7lk4jlk4jlk4jwvdGV4dD4KPC9zdmc+'
    };
    
    globalData.userInfo = mockUserInfo;
    app.saveData('userInfo', mockUserInfo);
    renderUserInfo();
    app.showToast('登录成功');
}

// 绑定事件监听器
function setupEventListeners() {
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
}

// 退出登录
function logout() {
    app.logout();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    if (!app.checkLogin()) {
        return;
    }
    
    // 从本地存储加载用户信息
    const savedUserInfo = app.getData('userInfo');
    if (savedUserInfo) {
        globalData.userInfo = savedUserInfo;
    }
    
    initUserCenter();
});