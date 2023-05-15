function login() {
    var email = document.querySelector("#email")
    var senha = document.querySelector("#senha")
    var user = {
        "email": email.value,
        "senha": senha.value
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    fetch('http://localhost:3000/loginUser', options)
        .then(response => {
            if (response.status === 200) {
                window.location.href = "./Inicio.html"

                return response.json()

            } else if (response.status === 404) {
                document.getElementById("erro-massagem").style.display = "block"
            }
        })
        .then(resp => {
            console.log(resp)
            localStorage.setItem('User', JSON.stringify({"nome":resp.result.nome,"role":resp.result.role}))
        })


}

document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault()
})