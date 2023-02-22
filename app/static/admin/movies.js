window.addEventListener("load", function(){
////////////////// LOAD
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/movies', {
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
    function updateTaskList(movies){
        var tabela = document.getElementById("korisnici");
        tabela.innerHTML = "";
        for(i in movies){
            let redHTML = 
            `<tr data-taskID="`+movies[i].id+`">
                <td>`+movies[i].id+`</td>
                <td>`+movies[i].title+`</td>
                <td>`+movies[i].year+`</td>
                <td>`+movies[i].duration+`</td>
                <td>`+movies[i].language+`</td>
                <td>`+movies[i].movielistId+`</td>
                <td>
                    <a href="`+movies[i].trailer+`">link</a>
                </td>
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
                fetch('http://127.0.0.1:8080/api/movies/'+this.parentNode.parentNode.dataset.taskid,
                { method:"DELETE", headers:{'Authorization': `Bearer ${token}`}})
                .then( response=>response.json())
                .then( data => {fetch('http://127.0.0.1:8080/api/movies', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
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
                        title: document.getElementById("name").value,
                        year: document.getElementById("year").value,
                        duration:document.getElementById("duration").value,
                        language:document.getElementById("lang").value,
                        trailer:document.getElementById("trailer").value,
                        movielistId:1
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://127.0.0.1:8080/api/movies/edit/'+ id,{
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
                    fetch('http://127.0.0.1:8080/api/movies', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    }).catch(err => alert(err));
                })
            });
        }
    }  
////////////////// ADD
    this.document.getElementById("btn_dodaj").addEventListener("click", function(){
        let novi = {
            title: document.getElementById("novi_task_naziv").value,
            year: document.getElementById("novi_task_datum").value,
            duration: document.getElementById("novi_task_pass").value,
            language: document.getElementById("novi_task_lang").value,
            trailer: document.getElementById("novi_task_trailer").value,
            movielistId:1
        };
        console.log(novi);
        nt = JSON.stringify(novi);
        fetch('http://127.0.0.1:8080/api/movies', {
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
                    fetch('http://127.0.0.1:8080/api/movies', { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    document.getElementById("novi_task_naziv").value = '';
                    document.getElementById("novi_task_pass").value = '';
                    document.getElementById("novi_task_datum").value = '';
                    document.getElementById("novi_task_lang").value = '';
                    document.getElementById("novi_task_trailer").value = '';
                }
            });
    });
////////////////// FIND
    document.getElementById("btn_filter").addEventListener("click",function(){
        let q = document.getElementById("search_q").value;
        fetch('http://127.0.0.1:8080/api/movies/find/'+q, { method:"GET", headers:{'Authorization': `Bearer ${token}`}})
            .then( response=>response.json())
            .then( data => updateTaskList(data) );
    });
////////////////// LOGOUT
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/login.html';
    });
})


