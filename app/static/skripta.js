function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    const lst = document.getElementById('user');
    if(token){
        let user = parseJwt(token)
        console.log(parseJwt(token))
        lst.innerHTML = `ID: ${user.userId}<br> name: ${user.user}<br> role: ${user.role}`;
    }

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/login.html';
    });
}