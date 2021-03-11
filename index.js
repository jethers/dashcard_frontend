function enviar() {
    txtLogin = document.getElementById("txtLogin").value;
    txtSenha = document.getElementById("txtSenha").value;

    console.log(`Você digitou: ${txtLogin} / ${txtSenha}`);

    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha
    }

    var cabecalho = {
        method: "POST",
        body: JSON.stringify(msgBody),
        headers: {
            "content-type": "application/json"
        }
    }

    fetch("http://localhost:8080/login", cabecalho).then(resultado => trataResultado(resultado));
}

function trataResultado(resultado) {
    if (resultado.status == 200) {
        //resultado.json().then(usuario => console.log(usuario));
        resultado.json().then(usuario => {
            localStorage.setItem("UserDash", JSON.stringify(usuario));
            window.location = "agentes.html";
        });

    }
    else if (resultado.status == 401) {
        document.getElementById("msgErro").innerHTML = "Senha inválida";
    }
    else if (resultado.status == 404) {
        document.getElementById("msgErro").innerHTML = "Usuário não encontrado";
    }

}