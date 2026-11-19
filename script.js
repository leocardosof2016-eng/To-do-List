let notas = [];

const btnAddNota = document.querySelectorAll(".add-container");

/*--------------------------------------------*/
btnAddNota.forEach(botao => {
    botao.addEventListener("click", function() {
        const status = this.getAttribute("data-pai");
        inserirNota(status);
        renderNota();
    });
    
});

function inserirNota(status) {
    const nota = {
        id:crypto.randomUUID(), //Gera uma string aleatória
        titulo:"Nova Nota",
        conteudo:"",
        cor:"", //para o caso de adicionar um seletor de cor nas notas
        status:status
    };
    notas.push(nota);

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function renderNota() {     //Apenas renderiza novas notas com base nos objetos do array -> Será chamado no trabalho do localStorage
    document.querySelectorAll(".container-nota").forEach(notaHTML => notaHTML.remove());    //Remove as notas pré-existentes

    notas.forEach(nota => {

        const containerPai = document.getElementById(nota.status);  //Conteiner que a nota será inserida

        //Criação do container da nota
        let novaNota = document.createElement("div");
        novaNota.className = "container-nota";
        novaNota.id = notas[notas.length-1].id;

        novaNota.innerHTML = `
            <p class="nota-title" max-length="30">${notas[notas.length-1].titulo}</p>
            <i class="fa-solid fa-pen edit-nota-icon"></i>
            <i class="fa-solid fa-trash trash-nota-icon" onclick="removerNota(this)"></i>
            <textarea name="conteudo-resumo" class="texto-nota-resumo"></textarea>
        `;

        //Inserção do conteiner da nota no conteiner das notas; e do conteúdo da nota no conteiner da nota
        containerPai.appendChild(novaNota);
    });  
};

function removerNota(botao) {
    const idNotaSelecionada = botao.closest('div').id;
    const indexNotaSelecionada = notas.findIndex((nota) => nota.id === idNotaSelecionada);
    const notaSelecionadaHTML = document.getElementById(idNotaSelecionada);
    const divPai = document.getElementById(notas[indexNotaSelecionada].status);

    notas = notas.filter(nota => nota != notas[indexNotaSelecionada]);  //Retira aquela nota do array
    divPai.removeChild(notaSelecionadaHTML);

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};
