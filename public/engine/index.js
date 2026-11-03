async function intializeLogin() {
    var email = document.getElementById('emailLogin').value
    var senha = document.getElementById('senhaLogin').value
    try {
        const response = await fetch('./engine/user.json')
        const users = await response.json()
        const userValided = users.find(u =>
            u.email === email
            &&
            u.password === senha
        )

        if (userValided) {
            localStorage.setItem('usuarioAtual', JSON.stringify(userValided))
            console.log(userValided.email)
            setTimeout(() => {
                window.location.href = './dashboard.html'
            }, 3000);
        } else {
            alert('Erro ao processar o login, verifique os dados')
        }
    } catch (e) {
        console.error('Erro ao buscar os dados:', e)
    }
}

async function loadUserStorage() {
    const loadUser = JSON.parse(localStorage.getItem('usuarioAtual'))
    console.log(loadUser.email)
    if (loadUser.photoUrl != "") {
        document.getElementById("load-img").innerHTML = `<img src="${loadUser.photoUrl}" alt="${loadUser.name}" class="img-fluid rounded-start" width="100%">`
    } else {
        document.getElementById("load-img").innerHTML = `<img src="./assets/logo_claro.png" alt="Logo Padrão" class="img-fluid rounded-start" width="100%">`
    }
    document.getElementById("load-nome").innerText = loadUser.name
    document.getElementById("load-email").innerText = loadUser.email
    document.getElementById("load-data").innerText = new Date(Date.now()).toLocaleDateString('pt-BR')
}