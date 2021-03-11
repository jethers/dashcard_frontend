  
function recuperarDashboard(){
    // antes de qualquer coisa, vou verificar se o usuário está mesmo conectado
    var strUser = localStorage.getItem("UserDash");
    if (!strUser) {
        window.location = "index.html";
        return;
    }
    var user = JSON.parse(strUser);
    carregaBioUsuario(user);

    var str = window.location.search;
    console.log("parametro da URL = "+str);
    const urlParams = new URLSearchParams(str);

    //var idAgente = str.substr(4);
    var idAgente = urlParams.get("id");
    console.log("ID do Agente = "+idAgente);

    fetch("http://localhost:8080/transacao/totais/" + idAgente)
    .then(res => res.json())
    .then(lista => preencheLista(lista))
}

function preencheLista(lista) {
    var linhaDashboard = ` <div class="row">
                              <div class="col-12 text-center">
                                    <h4>${lista[0].nomeAgente}</h4>
                                    <h6>Volume Financeiro: ${lista[0].volumeFinanceiro}</h6>
                              </div>
                           </div>
    
                           <div class="row">
                            <div id="colSucesso" class="col-sm-12 col-xs-12 col-md-4 col-lg-4 col-xl-4 text-center">
                                  Sucesso ${lista[0].quantidade} 
                            </div>
                            <div id="colFalha" class="col-sm-12 col-xs-12 col-md-4 col-lg-4 col-xl-4 text-center">
                                  Falha ${lista[1].quantidade} 
                            </div>
                            <div id="colFraude" class="col-sm-12 col-xs-12 col-md-4 col-lg-4 col-xl-4 text-center">
                                  Fraude ${lista[2].quantidade} 
                            </div>
                          </div>`;
    document.getElementById("relatorio").innerHTML = linhaDashboard;

    // aqui vai a definição do gráfico
    var ctx = document.getElementById('graficoGeral').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets :[{
                        label: lista[0].nomeAgente,
                        data : [lista[0].quantidade, lista[1].quantidade, lista[2].quantidade],
                        backgroundColor : [
                                           'rgb(115, 194, 115)',
                                           'rgb(194, 193, 115)',
                                           'rgb(194, 115, 115)' 
                                          ]
                        }
                      ] 
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });






}

function carregaBioUsuario(user) {
    document.getElementById("fotoUser").innerHTML = `<img src="${user.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML = `<h4> ${user.nome} </h4>
                                                     RACF: ${user.racf} <br>
                                                     Ramal: ${user.ramal} <br>
                                                     Email: ${user.email} <br>
                                                     <button type="button" class="btn btn-primary" onclick="logout()">
                                                     Logout</button>
                                                     `;

}

function logout() {
    localStorage.removeItem("UserDash");
    window.location = "index.html";
}