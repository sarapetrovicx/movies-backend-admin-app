window.addEventListener("load", function(){
////////////////// LOAD
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:8080/api/comments', {
        method:"GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        if (data.msg) {
            alert(data.msg);
        } else {
            console.log(data);
            updateTaskList(data);
        }
    });
    function updateTaskList(data){
        var tabela = document.getElementById("korisnici");
        tabela.innerHTML = "";
        for(i in data){
            let redHTML = 
            `<tr data-taskID="`+data[i].id+`">
                <td>`+data[i].id+`</td>
                <td>`+data[i].content+`</td>
                <td>`+data[i].userId+`</td>
                <td>`+data[i].movieId+`</td>
                <td>
                    <button class="btn btn-danger btn-sm btn_obrisi">Delete</button>
                    <button type="button" class="btn btn-primary btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                </td>
            </tr>`;
            tabela.innerHTML += redHTML;
        }
////////////////// DELETE
        var btns_obrisi = document.querySelectorAll("#korisnici .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch('http://127.0.0.1:8080/api/comments/'+this.parentNode.parentNode.dataset.taskid,
                { method:"DELETE", headers:{'Authorization': `Bearer ${token}`}})
                .then( response=>response.json())
                .then( data => {fetch('http://127.0.0.1:8080/api/comments', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => updateTaskList(data) );
                });
            });
        }
////////////////// EDIT
        var btns_edits = document.querySelectorAll("#korisnici .btn_zavrsi");
        for(i=0; i < btns_edits.length; i++){
            btns_edits[i].addEventListener("click", function(){
                id = this.parentNode.parentNode.dataset.taskid;
                document.getElementById("save").addEventListener("click", function(){
                    let novi = {
                        userId: document.getElementById("name").value,
                        movieId: document.getElementById("email").value,
                        content: document.getElementById("content").value
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://127.0.0.1:8080/api/comments/edit/'+ id,{
                        method:"PUT",
                        headers: {'Accept': 'application/json','Content-Type': 'application/json','Authorization': `Bearer ${token}`},
                        body: nt})
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("HTTP status " + response.status);
                        }
                        return response.json();
                    })
                    .then( data => {
                    fetch('http://127.0.0.1:8080/api/comments', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    }).catch(err => alert(err));
                })
            });
        }
    }
////////////////// ADD
    this.document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviKomentar = {
            userId: document.getElementById("novi_task_naziv").value,
            content: document.getElementById("novi_task_opis").value,
            movieId: document.getElementById("novi_task_datum").value,
        };
        console.log(noviKomentar);
        nt = JSON.stringify(noviKomentar);
        fetch('http://127.0.0.1:8080/api/comments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`        
            },
            body: nt
        })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } 
            else{
                fetch('http://127.0.0.1:8080/api/comments', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => updateTaskList(data) );
                document.getElementById("novi_task_naziv").value = '';
                document.getElementById("novi_task_opis").value = '';
                document.getElementById("novi_task_datum").value = '';
            }
        });
    });
////////////////// FIND
    document.getElementById("btn_filter").addEventListener("click",function(){
        let q = document.getElementById("search_q").value;
        fetch('http://127.0.0.1:8080/api/comments/find/'+q, { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
        .then( response=>response.json())
        .then( data => updateTaskList(data) );
    });
////////////////// LOGOUT
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/login.html';
    });
})