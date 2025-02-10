document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    // Konfigurationsobjekt
    const config = {
        credentials: {
            username: 'admin',
            password: 'scp123'
        },
        redirectPath: './root/index.html',
        animationTime: 2000
    };

    // Login-Status-Handler
    const loginStatus = {
        success: {
            message: 'ACCESS GRANTED - INITIALIZING SECURE ENVIRONMENT...',
            color: 'var(--terminal-green)'
        },
        failure: {
            message: 'ACCESS DENIED - SECURITY PROTOCOL ENGAGED',
            color: '#ff0000'
        }
    };

    // Redirect-Funktion
    function performRedirect() {
        try {
            // Erstelle eine base URL vom aktuellen Pfad
            const baseUrl = new URL(window.location.href);
            // Setze den neuen Pfad relativ zur base URL
            baseUrl.pathname = baseUrl.pathname.replace(/\/[^/]*$/, '/' + config.redirectPath);
            // Navigate zur neuen URL
            window.location.replace(baseUrl.toString());
        } catch (error) {
            console.error('Navigation error:', error);
            // Fallback direkte Navigation
            window.location.href = config.redirectPath;
        }
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const isValidLogin = username === config.credentials.username && 
                           password === config.credentials.password;

        if (isValidLogin) {
            loginMessage.style.color = loginStatus.success.color;
            loginMessage.textContent = loginStatus.success.message;
            loginForm.classList.add('success-animation');
            
            setTimeout(performRedirect, config.animationTime);
        } else {
            loginMessage.style.color = loginStatus.failure.color;
            loginMessage.textContent = loginStatus.failure.message;
            document.getElementById('password').value = '';
        }
    });
});
