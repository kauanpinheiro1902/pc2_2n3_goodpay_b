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

    let extrato = `<ol class="list-group list-group-numbered">`
    extrato += `<li class="list-group-item d-flex justify-content-between align-items-start">`
    extrato += `<div class="ms-2 me-auto">`
    extrato += `<div class="fw-bold">Subheading</div>`
    extrato += `Content for list item`
    extrato += `</div>`
    extrato += `<span class="badge text-bg-primary rounded-pill">14</span>`
    extrato += `</li>`
    extrato += `<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Content for list item
    </div>
    <span class="badge text-bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Content for list item
    </div>
    <span class="badge text-bg-primary rounded-pill">14</span>
  </li>
</ol>`
    document.getElementById("login-extrato").innerHTML = extrato
    document.getElementById("load-extrato").innerHTML = extrato
}