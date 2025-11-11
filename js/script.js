document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    // Check if elements exist
    if (!container || !registerBtn || !loginBtn) {
        console.error('Required elements not found!');
        return;
    }

    // Switch to register form
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Register button clicked');
        container.classList.add('active');
    });

    // Switch to login form
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Login button clicked');
        container.classList.remove('active');
    });
});

