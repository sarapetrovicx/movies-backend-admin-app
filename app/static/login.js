window.addEventListener("load", function(){
    // alert("hello")
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    // document.cookie = `token=${el.token}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
                    window.location.href = 'index.html';
                }
            });
    });
})