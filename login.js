// 登录/注册页面JavaScript

// 切换选项卡
function switchTab(tabName) {
    // 隐藏所有面板
    const panels = document.querySelectorAll('.form-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // 移除所有选项卡的激活状态
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的面板和选项卡
    document.getElementById(tabName + 'Panel').classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// 切换密码可见性
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// 切换注册密码可见性
function toggleRegPassword() {
    const passwordInput = document.getElementById('regPassword');
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// 切换确认密码可见性
function toggleConfirmPassword() {
    const passwordInput = document.getElementById('confirmPassword');
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// 登录功能
function login() {
    // 获取表单数据
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 表单验证
    if (!validateLoginForm(username, password)) {
        return false;
    }
    
    // 模拟登录过程
    simulateLogin(username, rememberMe);
    
    return false; // 阻止表单默认提交
}

// 验证登录表单
function validateLoginForm(username, password) {
    // 用户名验证
    if (!username) {
        showError('login', '用户名不能为空');
        return false;
    }
    
    // 密码验证
    if (!password) {
        showError('login', '密码不能为空');
        return false;
    }
    
    if (password.length < 6) {
        showError('login', '密码长度不能少于6位');
        return false;
    }
    
    return true;
}

// 注册功能
function register() {
    // 获取表单数据
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // 表单验证
    if (!validateRegisterForm(username, password, confirmPassword)) {
        return false;
    }
    
    // 模拟注册过程
    simulateRegister(username, password);
    
    return false; // 阻止表单默认提交
}

// 验证注册表单
function validateRegisterForm(username, password, confirmPassword) {
    // 用户名验证
    if (!username) {
        showError('register', '用户名不能为空');
        return false;
    }
    
    if (username.length < 3) {
        showError('register', '用户名长度不能少于3位');
        return false;
    }
    
    if (username.length > 20) {
        showError('register', '用户名长度不能超过20位');
        return false;
    }
    
    // 密码验证
    if (!password) {
        showError('register', '密码不能为空');
        return false;
    }
    
    if (password.length < 6) {
        showError('register', '密码长度不能少于6位');
        return false;
    }
    
    if (password.length > 20) {
        showError('register', '密码长度不能超过20位');
        return false;
    }
    
    // 确认密码验证
    if (!confirmPassword) {
        showError('register', '请确认密码');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('register', '两次输入的密码不一致');
        return false;
    }
    
    return true;
}

// 显示错误信息
function showError(formType, message) {
    // 移除已存在的错误提示
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 创建错误提示元素
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        background-color: #ffebee;
        color: #c62828;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
        font-size: 14px;
        text-align: center;
        border: 1px solid #ef5350;
    `;
    errorElement.textContent = message;
    
    // 添加到对应表单顶部
    const form = document.getElementById(formType === 'login' ? 'loginForm' : 'registerForm');
    form.insertBefore(errorElement, form.firstChild);
    
    // 3秒后自动移除
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

// 显示成功信息
function showSuccess(formType, message) {
    // 移除已存在的提示
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建成功提示元素
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.cssText = `
        background-color: #e8f5e8;
        color: #2e7d32;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
        font-size: 14px;
        text-align: center;
        border: 1px solid #4caf50;
    `;
    successElement.textContent = message;
    
    // 添加到对应表单顶部
    const form = document.getElementById(formType === 'login' ? 'loginForm' : 'registerForm');
    form.insertBefore(successElement, form.firstChild);
}

// 模拟登录
function simulateLogin(username, rememberMe) {
    // 显示加载状态
    const loginBtn = document.querySelector('#loginPanel .login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.disabled = true;
    loginBtn.textContent = '登录中...';
    loginBtn.style.background = 'linear-gradient(135deg, #ff8a00 0%, #ff5722 100%)';
    
    // 模拟登录延迟
    setTimeout(() => {
        // 登录成功，保存用户信息
        const mockUserInfo = {
            id: 1,
            username: username,
            nickName: username,
            avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNjY2NjY2Ij7lk4jlk4jlk4jwvdGV4dD4KPC9zdmc+'
        };
        
        // 保存到全局数据
        globalData.userInfo = mockUserInfo;
        
        // 保存到本地存储
        app.saveData('userInfo', mockUserInfo);
        
        // 如果记住密码，保存用户名
        if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
        
        // 恢复按钮状态
        loginBtn.disabled = false;
        loginBtn.textContent = originalText;
        loginBtn.style.background = 'linear-gradient(135deg, #ff6700 0%, #ff9800 100%)';
        
        // 显示登录成功提示
        showSuccess('login', '登录成功');
        
        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// 模拟注册
function simulateRegister(username, password) {
    // 显示加载状态
    const registerBtn = document.querySelector('#registerPanel .login-btn');
    const originalText = registerBtn.textContent;
    registerBtn.disabled = true;
    registerBtn.textContent = '注册中...';
    registerBtn.style.background = 'linear-gradient(135deg, #ff8a00 0%, #ff5722 100%)';
    
    // 模拟注册延迟
    setTimeout(() => {
        // 注册成功，保存用户信息
        const mockUserInfo = {
            id: Math.floor(Math.random() * 1000),
            username: username,
            nickName: username,
            avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNjY2NjY2Ij7lk4jlk4jlk4jwvdGV4dD4KPC9zdmc+'
        };
        
        // 保存到全局数据
        globalData.userInfo = mockUserInfo;
        
        // 保存到本地存储
        app.saveData('userInfo', mockUserInfo);
        
        // 恢复按钮状态
        registerBtn.disabled = false;
        registerBtn.textContent = originalText;
        registerBtn.style.background = 'linear-gradient(135deg, #ff6700 0%, #ff9800 100%)';
        
        // 显示注册成功提示
        showSuccess('register', '注册成功');
        
        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// 忘记密码功能
function forgotPassword() {
    showError('login', '忘记密码功能开发中');
    return false;
}

// 其他登录方式
function otherLogin(type) {
    let message = '';
    switch(type) {
        case 'phone':
            message = '手机验证码登录开发中';
            break;
        case 'wechat':
            message = '微信登录开发中';
            break;
        case 'qq':
            message = 'QQ登录开发中';
            break;
        default:
            message = '该登录方式开发中';
    }
    showError('login', message);
}

// 其他注册方式
function otherRegister(type) {
    let message = '';
    switch(type) {
        case 'phone':
            message = '手机验证码注册开发中';
            break;
        case 'wechat':
            message = '微信注册开发中';
            break;
        case 'qq':
            message = 'QQ注册开发中';
            break;
        default:
            message = '该注册方式开发中';
    }
    showError('register', message);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 填充记住的用户名
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.value = rememberedUsername;
            document.getElementById('rememberMe').checked = true;
        }
    }
    
    // 绑定回车事件
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            // 检查当前激活的面板
            const loginPanel = document.getElementById('loginPanel');
            const registerPanel = document.getElementById('registerPanel');
            
            if (loginPanel.classList.contains('active')) {
                // 如果当前在登录面板，执行登录
                if (activeElement.id === 'username' || activeElement.id === 'password') {
                    login();
                }
            } else if (registerPanel.classList.contains('active')) {
                // 如果当前在注册面板，执行注册
                if (activeElement.tagName === 'INPUT') {
                    register();
                }
            }
        }
    });
    
    // 绑定忘记密码链接
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPassword();
        });
    }
});
