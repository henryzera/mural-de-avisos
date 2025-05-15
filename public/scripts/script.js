document.addEventListener('DOMContentLoaded', () => {
    updatePosts();
    newPost();
});

function updatePosts() {
    fetch("http://localhost:3000/api/all")
        .then(res => res.json())
        .then((data) => {
            let postElements = '';
            let posts = data;

            if (posts.length === 0) {
                postElements = `<div class="alert alert-info mt-3">Nenhum post disponível.</div>`;
            } else {
                posts.forEach(element => {
                    let postElement = `
                    <div id="${element.id}" class="card mb-4">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title m-0">${element.title}</h5>
                            <button class="btn btn-sm btn-danger delete-btn" data-id="${element.id}">Excluir</button>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${element.description}</div>
                        </div>
                    </div>`;
                    postElements += postElement;
                });
            }

            document.getElementById("posts").innerHTML = postElements;

            // Associa o evento de clique a todos os botões "Excluir"
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", () => {
                    const id = button.getAttribute("data-id");
                    deletePost(id);
                });
            });
        });
}

function newPost() {
    let button = document.getElementById("button");

    button.addEventListener('click', () => {
        let title = document.getElementById("title").value;
        let description = document.getElementById("desc").value;

        if (!title.trim() || !description.trim()) {
            document.getElementById("title").style.borderColor = 'red';
            document.getElementById("desc").style.borderColor = 'red';
            return;
        }

        document.getElementById("title").style.borderColor = 'rgb(203, 202, 202)';
        document.getElementById("desc").style.borderColor = 'rgb(203, 202, 202)';

        let post = { title, description };

        const options = {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(post)
        };

        fetch('http://localhost:3000/api/new', options)
            .then(res => {
                console.log(res);
                document.getElementById("title").value = '';
                document.getElementById("desc").value = '';
                updatePosts();
            });
    });
}

function deletePost(id) {
    fetch(`http://localhost:3000/api/delete/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            updatePosts();
        })
        .catch(err => console.error("Erro ao deletar:", err));
}
