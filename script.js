const btnAddNota = document.querySelectorAll(".add-container");


btnAddNota.forEach(botao => {
    botao.addEventListener("click", renderNota);
});

function renderNota() {
    //pegar o id do conteiner que o botão está (ok)
    //mudar o conteiner atual para o id da div que foi selecionada
    //renderizar a nota dentro dessa div
    
    //id da div pai = this.getAttribute("data-pai")
    
    const containerAtual = document.getElementById(this.getAttribute("data-pai"));
    let contador = containerAtual.childElementCount - 1;

    //Criação do container da nota
    let novaNota = document.createElement("div");
    novaNota.className = "container-nota";
    novaNota.id = contador;

    let modeloNota = `
        <p class="nota-title" max-length="30">Nota ${contador}</p>
        <i class="fa-solid fa-pen edit-nota-icon"></i>
        <textarea name="conteudo-resumo" class="texto-nota-resumo"></textarea>
    `;

    //Inserção do conteiner da nota no conteiner das notas; e do conteúdo da nota no conteiner da nota
    containerAtual.appendChild(novaNota);
    const containerNota = document.getElementById(novaNota.id);
    containerNota.innerHTML = modeloNota;
};
