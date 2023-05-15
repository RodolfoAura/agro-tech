let barra = document.querySelector(".barra-lateral");
let barraBtn = document.querySelector(".barra-lateralBtn");
barraBtn.onclick = function () {
  barra.classList.toggle("active");
  if (barra.classList.contains("active")) {
    barraBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else
    barraBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

let user = JSON.parse(localStorage.getItem("User"));

document.querySelector(".admin_name").innerHTML = user.nome

var role = document.querySelectorAll(".link")
if (user.role == "funcionario")
  for (let i = 1; i < role.length; i++) { role[i].classList.add("func") }

function trocarTela() {

  var link = document.querySelectorAll(".link")
  var model = document.querySelectorAll(".Tela")

  link.forEach((e) => {

    e.addEventListener("click", function (event) {
      event.preventDefault();

      if (e.id == 'h') {
        link[0].classList.add('active')

        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')


        model[0].classList.remove('model')

        model[1].classList.add('model')
        model[2].classList.add('model')
        model[3].classList.add('model')
        model[4].classList.add('model')
      }

      if (e.id == 'f') {
        link[1].classList.add('active')

        link[0].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')

        model[1].classList.remove('model')

        model[0].classList.add('model')
        model[2].classList.add('model')
        model[3].classList.add('model')
        model[4].classList.add('model')
      }

      if (e.id == 'd') {
        link[2].classList.add('active')


        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')

        model[2].classList.remove('model')

        model[0].classList.add('model')
        model[1].classList.add('model')
        model[3].classList.add('model')
        model[4].classList.add('model')
      }

      if (e.id == 'mo') {
        link[3].classList.add('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[4].classList.remove('active')

        model[3].classList.remove('model')

        model[0].classList.add('model')
        model[1].classList.add('model')
        model[2].classList.add('model')
        model[4].classList.add('model')
      }

      if (e.id == 'ma') {
        link[4].classList.add('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')

        model[4].classList.remove('model')

        model[0].classList.add('model')
        model[1].classList.add('model')
        model[3].classList.add('model')
        model[2].classList.add('model')
      }
    })



  })
}
var manutenção = 0

function listaFrota() {

  let frota = document.querySelector('.veiculos')
  let frotaDispo = document.querySelector('.frota-disponivel')
  let alocacao = document.querySelector('.alocacaoVeiculo')
  let tudo = document.querySelector('.Content-detalhes')
  let tableFrota = document.querySelector('.table-frota')
  let itensFrota = document.querySelector('.itensFrota')


  const options = { method: 'GET' };

  fetch('http://localhost:3000/readVeiculo', options)
    .then(response => response.json())
    .then(res => {
      frota.innerHTML = res.length

      var dis = 0
      var serviço = 0

      res.forEach((e) => {

        if ((e.Servico === 'Disponivel' && e.Manutencao === 'Disponivel') === true) {
          dis++
          frotaDispo.innerHTML = dis
        }
        let lista = alocacao.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('#modelo').innerHTML = e.modelo
        lista.querySelector('#placa').innerHTML = e.placa
        if (e.Manutencao.length == 1) {
          lista.querySelector('#situacao').innerHTML = 'Em manutenção'
        } else if (e.Manutencao.length > 1) {
          lista.querySelector('#situacao').innerHTML = e.Manutencao
        }
        if (e.Servico.length == 1) {
          serviço = e.Servico.length
          lista.querySelector('#situacao').innerHTML = 'Em serviço'
        }
        if (e.Servico.length == 1) {
          serviço = e.Servico.length
          lista.querySelector('#motorista').innerHTML = e.Servico[0].motorista.nome
        }
        tudo.appendChild(lista)



        let lista2 = itensFrota.cloneNode(true)
        lista2.classList.remove('model')
        lista2.id = "v" + e.id

        lista2.querySelector('.modeloCar').innerHTML = e.modelo
        lista2.querySelector('.marcaCar').innerHTML = e.marca
        lista2.querySelector('.placaCar').innerHTML = e.placa
        lista2.querySelector('.TipoCar').innerHTML = e.tipo
        lista2.querySelector('.statusCar').innerHTML = "Disponivel"

        if (e.Manutencao.length == 1) {
          lista2.querySelector('.statusCar').innerHTML = "Em manutenção"
        }
        if (e.Servico.length == 1) {
          lista2.querySelector('.statusCar').innerHTML = "Em Serviço"
        }




        tableFrota.appendChild(lista2)




      })
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Em Manutenção', 'Disponivel', 'Em serviço'],
          datasets: [{
            label: 'Veiculos',
            data: [manutenção, dis, serviço],
            backgroundColor: [
              '#f7d4d7',
              '#C0F2D8',
              '#ffe8b3'

            ],
          }]
        },
        options: {
          legend: {
            labels: {
              Fontcolor: 'white'
            }
          },
          responsive: true,
        }
      });
    })

}

function listaMotorista() {
  let tableMoto = document.querySelector('.table-Motorista')
  let itensMoto = document.querySelector('.itensMotorista')

  let motorista = document.querySelector('.motoristas')
  const options = { method: 'GET' };

  fetch('http://localhost:3000/readMotorista', options)
    .then(response => response.json())
    .then(res => {
      motorista.innerHTML = res.length
      res.forEach((e) => {

        let lista = itensMoto.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('.motoNome').innerHTML = e.nome
        lista.querySelector('.motoCpf').innerHTML = e.cpf
        lista.querySelector('.motoCnh').innerHTML = e.cnh
        lista.querySelector('.motoStatus').innerHTML = "Disponivel"

        if (e.Servico.length == 1) {
          lista.querySelector('.motoStatus').innerHTML = "Em Serviço"
        }

        tableMoto.appendChild(lista)

      })
    })
}



function listaManutencao() {
  let frotaManutencao = document.querySelector('.frotaManutencao')

  const options = { method: 'GET' };

  fetch('http://localhost:3000/readManutencao', options)
    .then(response => response.json())
    .then(res => {
      manutenção = res.length
      frotaManutencao.innerHTML = res.length
    })

}

function tabelamanutencao() {
  let tableManu = document.querySelector('.table-Manutencao')
  let itensManu = document.querySelector('.itens')
  const options = { method: 'GET' };

  fetch('http://localhost:3000/readManutencao', options)
    .then(response => response.json())
    .then(res => {
      motorista.innerHTML = res.length
      res.forEach((e) => {

        let data = new Date()
        e.data_final = data.toLocaleDateString()
        e.data_inicio = data.toLocaleDateString()

        let lista = itensManu.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('.Manucar').innerHTML = e.veiculo.modelo
        lista.querySelector('.ManuDes').innerHTML = e.descricao
        lista.querySelector('.ManuEnt').innerHTML = e.data_inicio
        lista.querySelector('.ManuSai').innerHTML = e.data_final
        lista.querySelector('.ManuVal').innerHTML = e.valor

        tableManu.appendChild(lista)

      })
    })

}


function tabelaoperacao() {
  let tableOps = document.querySelector('.table-Ops')
  let itensOps = document.querySelector('.itensDisponibilidade')
  const options = { method: 'GET' };

  fetch('http://localhost:3000/readOperacao', options)
    .then(response => response.json())
    .then(res => {
      motorista.innerHTML = res.length
      res.forEach((e) => {

        let data = new Date()
        e.data_retorno = data.toLocaleDateString()
        e.data_saida = data.toLocaleDateString()

        let lista = itensOps.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('.Opsveiculo').innerHTML = e.veiculo.modelo
        lista.querySelector('.Opsmotorista').innerHTML = e.motorista.nome
        lista.querySelector('.OpsDesc').innerHTML = e.descricao
        lista.querySelector('.OpsSai').innerHTML = e.data_saida
        lista.querySelector('.Opsent').innerHTML = e.data_retorno

        tableOps.appendChild(lista)

        console.log(e)

      })
    })

}


function alterarVeiculo() {
  var inputs = document.querySelector(".putmodal").querySelectorAll("input")
  var placaCar = inputs.item(1)
  var modeloCar = inputs.item(0)
  var marcaCar = inputs.item(2)
  var tipoCar = inputs.item(3)
  var IdCar = inputs.item(4)


  var veiculo = {
    "modelo": modeloCar.value,
    "placa": placaCar.value,
    "marca": marcaCar.value,
    "tipo": tipoCar.value,
  }

  console.log(veiculo)

  fetch("http://localhost:3000/putVeiculo/" + IdCar.value, {
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(veiculo)
  })
    .then(response => {
      response.json()
    })
    .then(response => {
      window.location.reload()

    })
}

function Deletar(id) {
  console.log(id.slice);
  const options = { method: 'DELETE' };

  fetch('http://localhost:3000/deleteVeiculo/' + id.slice(0))
    .then(response => response.json())
    .then(response => window.location.reload())

}

function AtivaModal(id) {
  var modal_info = document.querySelector(".putmodal")

  modal_info.classList.toggle("escondido")

  var inputs = document.querySelector(".putmodal").querySelectorAll("input")
  var linha = document.querySelector("#" + id)

  linha.querySelector(".modeloCar").innerHTML
  console.log(linha.querySelector(".modeloCar").innerHTML)
  inputs.item(0).value = linha.querySelector(".modeloCar").innerHTML
  linha.querySelector(".placaCar").innerHTML
  console.log(linha.querySelector(".placaCar").innerHTML)
  inputs.item(1).value = linha.querySelector(".placaCar").innerHTML
  linha.querySelector(".marcaCar").innerHTML
  console.log(linha.querySelector(".marcaCar").innerHTML)
  inputs.item(2).value = linha.querySelector(".marcaCar").innerHTML
  linha.querySelector(".TipoCar").innerHTML
  console.log(linha.querySelector(".TipoCar").innerHTML)
  inputs.item(3).value = linha.querySelector(".TipoCar").innerHTML
  inputs.item(4).value = id.slice(1)
}




function listar() {
  listaManutencao()
  trocarTela()
  listaFrota()
  listaMotorista()
  tabelamanutencao()
  tabelaoperacao()

}


listar()

var ctx = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Em Manutenção', 'Disponivel', 'Em serviço'],
    datasets: [{
      label: 'Veiculos',
      data: [1, 2, 3],
      backgroundColor: [
        '#f7d4d7',
        '#C0F2D8',
        '#ffe8b3'

      ],
    }]
  },
  options: {
    legend: {
      labels: {
        Fontcolor: 'white'
      }
    },
    responsive: true,
  }
});

var ctx = document.getElementById('myChart3').getContext('2d');

// configurar o gráfico
var myChart3 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'Gastos',
      data: [0, 0, 0, 0, 200, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },

  options: {
    legend: {
      labels: {
        Color: 'white !important'
      }
    }
  }
});

function valida2() {

  var option = document.querySelector('#valida')
  var selecao = document.querySelector('.selecao')



  const options = { method: 'GET' };

  fetch('http://localhost:3000/readVeiculo', options)
    .then(response => response.json())
    .then(res => {
      res.forEach(e => {
        console.log()
        let lista = option.cloneNode(true)
        lista.classList.remove("model")

        lista.querySelector(".valida").innerHTML = e.modelo

        selecao.appendChild(lista)
      })

    })

}



valida2()
