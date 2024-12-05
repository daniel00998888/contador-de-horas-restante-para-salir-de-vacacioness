
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

function loadVideos() {
    const videosDiv = document.getElementById('videos');
    videosDiv.innerHTML = '';
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach((video, index) => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <p><strong>${video.user}</strong> compartió:</p>
            <video src="${video.data}" controls></video>
            <div class="actions">
                <button onclick="likeVideo(${index})">👍 ${video.likes}</button>
                <button onclick="showComments(${index})">💬 Comentarios (${video.comments.length})</button>
                <button onclick="shareVideo(${index})">🔗 Compartir</button>
            </div>
            <div id="comments-${index}" class="comments" style="display: none;">
                <textarea id="comment-input-${index}" placeholder="Escribe un comentario..."></textarea>
                <button onclick="addComment(${index})">Enviar</button>
                <div id="comment-list-${index}"></div>
[_{{{CITATION{{{_1{](https://github.com/la9una/web/tree/ba1073ae044ebb7b538a3b13f0f9598f7c410bb6/docs%2Fbootstrap%2Falignci.md)[_{{{CITATION{{{_2{](https://github.com/CLONATORE/markdowns/tree/82cfb03683ceb807a7091de48045e6a7485acd72/webpack.md)
