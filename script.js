let notas = [];

const btnAddNota = document.querySelectorAll(".add-container");
const tituloEditavel = document.querySelectorAll(".nota-title");

/*--------------------------------------------*/
btnAddNota.forEach(botao => {
    botao.addEventListener("click", function() {
        const status = this.getAttribute("data-pai");
        inserirNota(status);
        renderNota();
        salvarStorage();
    });
    
});

function inserirNota(status) {
    const nota = {
        id:crypto.randomUUID(), //Gera uma string aleatória
        titulo:"Nova Nota",
        cor:"#ffffff",
        status:status,
        conteudo:""
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
        novaNota.setAttribute("data-id", nota.id)

        novaNota.innerHTML = `
            <h3 class="nota-title" onclick="abrirModal('${nota.id}')">${nota.titulo}</h3>

            <select class="card-status" onchange="alterarStatus(this)">
                <option value="to-do-container" ${nota.status === "to-do-container" ? "selected" : ""}>Não Iniciado</option>
                <option value="doing-container" ${nota.status === "doing-container" ? "selected" : ""}>Fazendo</option>
                <option value="done-container" ${nota.status === "done-container" ? "selected" : ""}>Pronto</option>
            </select>

            <p class="display-preview" onclick="abrirModal('${nota.id}')">${nota.conteudo || "Clique para editar..."}</p>

            <div class="seletor-cores">
                <i class="fa-solid fa-palette btn-abrir-cores" onclick="toggleMenuCores(event, this)"></i>
                <div class="menu-cores">
                    <button type="button" class="opcao-cor ${nota.cor === '#ffffff' ? 'selecionada' : ''}" data-cor="#ffffff" style="background-color: #ffffff;" title="Padrão" onclick="selecionarCor(event, this)"></button>
                    <button type="button" class="opcao-cor ${nota.cor === '#fff475' ? 'selecionada' : ''}" data-cor="#fff475" style="background-color: #fff475;" title="Amarelo" onclick="selecionarCor(event, this)"></button>
                    <button type="button" class="opcao-cor ${nota.cor === '#cbf0f8' ? 'selecionada' : ''}" data-cor="#cbf0f8" style="background-color: #cbf0f8;" title="Azul" onclick="selecionarCor(event, this)"></button>
                    <button type="button" class="opcao-cor ${nota.cor === '#fdcfe8' ? 'selecionada' : ''}" data-cor="#fdcfe8" style="background-color: #fdcfe8;" title="Rosa" onclick="selecionarCor(event, this)"></button>
                    <button type="button" class="opcao-cor ${nota.cor === '#ccff90' ? 'selecionada' : ''}" data-cor="#ccff90" style="background-color: #ccff90;" title="Verde" onclick="selecionarCor(event, this)"></button>
                    <button type="button" class="opcao-cor ${nota.cor === '#e6c9a8' ? 'selecionada' : ''}" data-cor="#e6c9a8" style="background-color: #e6c9a8;" title="Areia" onclick="selecionarCor(event, this)"></button>
                </div>
            </div>

            <i class="fa-solid fa-trash trash-nota-icon" onclick="removerNota(this)"></i>
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
    const idNotaSelecionada = botao.closest('.container-nota').id;
    const indexNotaSelecionada = notas.findIndex((nota) => nota.id === idNotaSelecionada);

    notas = notas.filter(nota => nota != notas[indexNotaSelecionada]);  //Retira aquela nota do array
    renderNota();
    salvarStorage();

    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};


//----------------- Seção do Modal -----------------//
const modalOverlay = document.getElementById("modal-overlay");

function abrirModal(idNota) {
    modalOverlay.style.display = "flex";
    renderModal(idNota);
};

//Fecha e salva o modal ao clicar no botão de salvar
document.getElementById("btn-salvar-modal").addEventListener("click", () => {
    modalOverlay.style.display = "none";
    renderNota();
});
//Fecha e salva o modal ao clicar fora dele
modalOverlay.addEventListener("click", (event) => {
    if(event.target === modalOverlay){
        modalOverlay.style.display = "none";
        renderNota();
    };
});

//Renderizar os elementos do modal
function renderModal(idNota) {
    const notaAtual = notas.find(nota => nota.id === idNota);

    const modalNota = document.getElementById("modal-nota");
    modalNota.setAttribute("data-id", idNota);
    modalNota.style.backgroundColor = notaAtual.cor;

    const modalRodape = document.getElementById("modal-rodape");
    modalRodape.setAttribute("data-id", idNota);

    document.getElementById("modal-title").value = String(notaAtual.titulo);
    document.getElementById("modal-conteudo").value = String(notaAtual.conteudo);
    document.getElementById("modal-status").value = notaAtual.status;   

    const menuModal = modalNota.querySelector(".menu-cores");
    menuModal.classList.remove("ativo");
    atualizarCheckCor(menuModal, notaAtual.cor);
};

function alterarTitulo(inputElement){
    const notaAtual = notas.find((nota) => nota.id === inputElement.closest('div').getAttribute("data-id"));
    const novoTitulo = inputElement.value.trim();

    if(novoTitulo != ""){ 
        notaAtual.titulo = novoTitulo;
    }else{
        notaAtual.titulo = "Sem Título";
        inputElement.value = "Sem Título";
    }

    salvarStorage()
    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function alterarConteudo(textareaElement) {
    const notaAtual = notas.find((nota) => nota.id === textareaElement.closest('div').getAttribute("data-id"));
    notaAtual.conteudo = textareaElement.value.trim();

    salvarStorage()
    console.log(notas); //Essa linha deve ser retirada posteriormente----------
};

function alterarStatus(selectElement) {
    const notaAtualHTML = selectElement.closest('[data-id]');
    const notaAtual = notas.find((nota) => nota.id === notaAtualHTML.getAttribute('data-id'))
    
    notaAtual.status = String(selectElement.value);

    if(notaAtualHTML.classList.contains("container-nota")){
        renderNota();
    }

    salvarStorage()
    console.log(notaAtual)  //Essa linha deve ser retirada posteriormente----------
};

//----------------- Seção do Seletor de Cores -----------------//
//Ativa o menu de cores ao clique
function toggleMenuCores(event, icone) {
    event.stopPropagation();
    const menuAtual = icone.closest(".seletor-cores").querySelector(".menu-cores");

    // Fecha outros menus de cor que estejam abertos em outros cards
    document.querySelectorAll(".menu-cores.ativo").forEach(menu => {
        if (menu !== menuAtual) {
            menu.classList.remove("ativo");
        }
    });

    menuAtual.classList.toggle("ativo");
}

//Troco o valor de cor no array e no estilo
function selecionarCor(event, botaoCor) {
    event.stopPropagation();
    const novaCor = botaoCor.getAttribute("data-cor");
    const containerComId = botaoCor.closest("[data-id]");
    const idNota = containerComId.getAttribute("data-id");

    const notaAtual = notas.find(nota => nota.id === idNota);
    notaAtual.cor = novaCor;

    // Pinta o fundo do elemento ativo (seja o modal ou o card da tela inicial)
    if (containerComId.id === "modal-rodape") {
        document.getElementById("modal-nota").style.backgroundColor = novaCor;
    } else {
        containerComId.style.backgroundColor = novaCor;
    }

    const menuAtual = botaoCor.closest(".menu-cores");
    atualizarCheckCor(menuAtual, novaCor);

    salvarStorage()
}

//Define qual ícone contém o elemento de selecionado
function atualizarCheckCor(menuElemento, corAtiva) {
    menuElemento.querySelectorAll(".opcao-cor").forEach(botao => {
        if (botao.getAttribute("data-cor") === corAtiva) {
            botao.classList.add("selecionada");
        } else {
            botao.classList.remove("selecionada");
        }
    });
}

// Fecha qualquer menu de cores aberto ao clicar fora dele
document.addEventListener("click", (event) => {
    if (!event.target.closest(".seletor-cores")) {
        document.querySelectorAll(".menu-cores.ativo").forEach(menu => {
            menu.classList.remove("ativo");
        });
    }
});

//----------------- Seção do JSON/localStorage -----------------//
//O salvamento no localStorage deverá ser chamado sempre que uma função de alteração for acionada. Ex: alterarTitulo -> salvar no localStorage
function salvarStorage() {
    localStorage.setItem("lista_Kanban", JSON.stringify(notas));
};

function carregarStorage() {
    const dadosSalvos = localStorage.getItem("lista_Kanban");
    if(dadosSalvos) {
        notas = JSON.parse(dadosSalvos);
        renderNota();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    carregarStorage();
});
