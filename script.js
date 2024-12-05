function showRegister() {
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('video-container').style.display = 'none';
}

function showLogin() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('video-container').style.display = 'none';
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username === '' || password === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    localStorage.setItem(username, password);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    showLogin();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(username) === password) {
        localStorage.setItem('loggedInUser', username);
        showVideoContainer(username);
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    showLogin();
}

function showVideoContainer(username) {
    document.getElementById('user-name').innerText = username;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('video-container').style.display = 'block';
    loadVideos();
}

window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showVideoContainer(loggedInUser);
    } else {
        showLogin();
    }
};

function shareVideo() {
    const videoFile = document.getElementById('video-file').files[0];
    if (!videoFile) {
        alert('Por favor, selecciona un archivo de video.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({ user: localStorage.getItem('loggedInUser'), data: e.target.result, likes: 0, comments: [] });
        localStorage.setItem('videos', JSON.stringify(videos));
        document.getElementById('video-file').value = '';
        loadVideos();
    };
    reader.readAsDataURL(videoFile);
}
