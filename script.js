let notas = [];

const btnAddNota = document.querySelectorAll(".add-container");
const tituloEditavel = document.querySelectorAll(".nota-title");

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
        cor:"#ffffff", //para o caso de adicionar um seletor de cor nas notas
        status:status
    };
    notas.push(nota);

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function renderNota() {     //Apenas renderiza novas notas com base nos objetos do array -> Será chamado no trabalho do localStorage
    document.querySelectorAll(".container-nota").forEach(notaHTML => notaHTML.remove());    //Remove as notas pré-existentes

    notas.forEach(nota => {

        const containerPai = document.getElementById(nota.status);  //Conteiner que possui o espaço reservado para as notas
        const destinoNota = containerPai.querySelector(".notas-lista");

        //Criação do container da nota
        let novaNota = document.createElement("div");
        novaNota.className = "container-nota";
        novaNota.id = nota.id;
        novaNota.style.backgroundColor = nota.cor;
        //novaNota.onclick = () => abrirModal(nota.id);

        novaNota.innerHTML = `
            <h3 class="nota-title">${nota.titulo}</h3>
            <i class="fa-solid fa-pen edit-nota-icon"></i>
            <i class="fa-solid fa-trash trash-nota-icon" onclick="removerNota(this)"></i>
            <p class="display-preview" onclick="abrirModal('${nota.id}')">${nota.conteudo || "Clique para editar..."}</p>
        `;
        //<p class="nota-title" max-length="30" contenteditable="true" onblur="alterarTitulo(this)">${nota.titulo}</p>
        //<textarea name="conteudo-resumo" disabled class="texto-nota-resumo">${nota.conteudo}</textarea>
        destinoNota.appendChild(novaNota);

        // Rolagem das listas
        destinoNota.scrollTo({
            top: destinoNota.scrollHeight,
            behavior: "smooth"
        });
    });  
};


function removerNota(botao) {
    const idNotaSelecionada = botao.closest('div').id;
    const indexNotaSelecionada = notas.findIndex((nota) => nota.id === idNotaSelecionada);

    notas = notas.filter(nota => nota != notas[indexNotaSelecionada]);  //Retira aquela nota do array
    renderNota();

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function alterarTitulo(text){
    const notaAtual = notas.find(nota => nota.id === text.closest('div').id);
    const novoTitulo = text.value.trim();

    if(novoTitulo != ""){ 
        notaAtual.titulo = novoTitulo;
    }else{
        notaAtual.titulo = "Sem Título";
        text.value = "Sem Título";
    }

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function abrirModal(idModal) {
    console.log("Modal clicado: " + idModal);
    //Criar a estrutura para abrir o modal
    
};
