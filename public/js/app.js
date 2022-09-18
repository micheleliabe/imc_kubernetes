let nome = document.querySelector("#nome")
let altura = document.querySelector("#altura")
let peso = document.querySelector("#peso")


nome.addEventListener('input', (e) => {
    validaNome(nome.value)
    validaDados()
 })

altura.addEventListener('input', (e) => {
    validaAltura(altura.value)
    validaDados()
})
 
peso.addEventListener('input', (e) => {
    validaPeso(peso.value)
   validaDados()

})


function validaNome(nome) {
    let padrao = /[^a-zà-ú]/gi;
    let valida_nome = nome.match(padrao);
    if (valida_nome || !nome || nome.length <3) {
        document.getElementById("nome_invalido").removeAttribute("hidden")
        bloqueiaCalculo()
    } else {
        document.getElementById("nome_invalido").setAttribute("hidden", "hidden")
    
    }
    validaDados()
}

function validaAltura(altura) {
    if (altura != "" & altura >= 0 && altura <= 3) {
        document.getElementById("altura_invalida").setAttribute("hidden","hidden")
        bloqueiaCalculo()
    } else {
        document.getElementById("altura_invalida").removeAttribute("hidden")
    
    }
    validaDados()
}

function validaPeso(peso) {
    if (peso != "" && peso >= 0 && peso <= 400) {
        document.getElementById("peso_invalido").setAttribute("hidden","hidden")
    
    } else {
        document.getElementById("peso_invalido").removeAttribute("hidden")
        bloqueiaCalculo()
    }
    validaDados()
}

//Verifica se não existe nenhum campo com valores invalidos e habilita o botao para realizar o calculo
function validaDados(){
    if(nome.value == "" || altura.value == "" || peso.value == ""){
        bloqueiaCalculo()
    }else{
        if(document.querySelectorAll("small:not([hidden])").length == 0 ){
            liberaCalculo()
        }else{
            bloqueiaCalculo()
        }

    }
}

function bloqueiaCalculo(){
    document.getElementById("btnCalc").setAttribute("disabled", "disabled")
}

function liberaCalculo(){
    document.getElementById("btnCalc").removeAttribute("disabled")
}

//Preenche a lista ultimas verificações
async function listaHistorico() {
    let historico = await fetch("list").then((response) => response.json());
    for (const iterator of historico.message.pessoa) {
        let item = document.createElement("li");
        item.innerHTML = `<span>${iterator.nome}</span> <span>${iterator.imc}</span`;
        let lista = document.querySelector("#lista");
        lista.appendChild(item);
    }
}
listaHistorico();

//Chama a funçao realizaCalculo ao clicar em Calcular IMC
buttonElementCalc = document.querySelector("#btnCalc");
buttonElementCalc.onclick = async function calc() {
    realizaCalculo(nome.value, altura.value, peso.value)
};


//Faz a requisição para a API, recebe o resultado e o exibe para o usuário
async function realizaCalculo(nome, altura, peso){
     let response = await fetch(
        `/calculo?nome=${nome}&peso=${peso}&altura=${altura}`
    ).then((response) => response.json());
    let resultado = response.message; 
    let detalhes = "";
    detalhes = document.querySelector("#detalhes");

    //Verifica em qual situação o imc da pessoa se encaixa.
    if (resultado < 18.5) {
        detalhes.innerText =
            "Seu IMC é menor que 18.5 este valor é classificado como MAGREZA. Verifique se sua dieta possui todos os nutrientes que o seu corpo precisa";
        document.querySelector("#imgLogo").src = "/imgs/healthy-eating.svg";
        exibeDados();
    } else if (resultado <= 24.9) {
        detalhes.innerText =
            "Parabéns ! Seu IMC esta entre 18.5 e 24.9 este valor é classificado como NORMAL. Continue se alimentando bem e praticando exercicios ";
        document.querySelector("#imgLogo").src = "/imgs/happiness.svg";
        exibeDados();
    } else if (resultado <= 29.9) {
        detalhes.innerText =
            "Cuidado ! Seu IMC esta entre 25.0 e 29.9 este valor é classificado como SOBREPESO. Seu grau de obesidade é 1. Tente cortar alimentos calóricos e praticar alguma atividade física";
        document.querySelector("#imgLogo").src = "/imgs/excercise.svg";
        exibeDados();
    } else if (resultado <= 39.9) {
        detalhes.innerText =
            "Hey! Seu IMC esta entre 30.0 e 39.9 este valor é classificado como OBESIDADE. Seu grau de obesidade é 2. Adote uma alimentação de baixo teor calórico e pratique atividades físicas";
        document.querySelector("#imgLogo").src = "/imgs/excercise.svg";
        exibeDados();
    } else if (resultado > 40) {
        detalhes.innerText =
            "Atenção ! Seu IMC é maior que 40 este valor é classificado como OBESIDADE GRAVE. Seu grau de obesidade é 3. Adote uma alimentação de baixo teor calórico e pratique atividades físicas | Ah ! vê se não esquece de falar com um nutricionista";
        document.querySelector("#imgLogo").src = "/imgs/excercise.svg";
        exibeDados();
    }

    //Preenche os dados na tela
    function exibeDados() {
        document.querySelector("#textResultado").value = resultado;
        document.querySelector("#resultado").style.display = "flex";
        document.querySelector("#app").style.display = "none";

        //Atualiza a lista de ultimas verificações
        let lista = document.querySelector("#lista");
        lista.innerHTML = "";
        listaHistorico();
    }
}


buttonElementClear = document.querySelector("#clear");
buttonElementClear.onclick = function clear() {
    document.querySelector("#resultado").style.display = "none";
    document.querySelector("#app").style.display = "flex";
    document.querySelector("#nome").value = "";
    document.querySelector("#altura").value = "";
    document.querySelector("#peso").value = "";
    document.querySelector("#imgLogo").src = "/imgs/weight-loss.svg";
    document.getElementById("btnCalc").setAttribute("disabled", "disabled")
};