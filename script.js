
//Sugestão de alterações que fiz em dupla ( eu e gemini) pq após mudar o layout fique perdida com o JS
// Foi pra ver como ficava sem bug no contador e com a rolagem

const btnAddNota = document.querySelectorAll(".add-container");

btnAddNota.forEach(botao => {
    botao.addEventListener("click", renderNota);// quando usuário clica, chama a func. renderNota
});

function renderNota() { //Essa função insere, agora, as notas dentro de notas-ista -> Para a rolagem 
    const idPai = this.getAttribute("data-pai"); //o this é o botão que foi clicado
    const containerAtual = document.getElementById(idPai);
   

    // Procura a div notas-lista dentro da coluna, se não existir, usa o próprio container
    const destinoNotas = containerAtual.querySelector(".notas-lista") || containerAtual;
    const contador = destinoNotas.querySelectorAll(".container-nota").length + 1; 
    

    // ID único para não colidir entre colunas; Dps que o código foi mesclado, deu uns erros nisso aq, mexi n sei em que
    const novaNota = document.createElement("div");
    novaNota.className = "container-nota";


    novaNota.id = `${idPai}-nota-${contador}`; // -> Estrutura chamada ID Composto -> O que o elemento é, 
    // onde tá e evita que tenham o mesmo identificador -> Separados por hífen

    novaNota.innerHTML = `
        <p class="nota-title" contenteditable="true" max-length="30">Nota ${contador}</p>
        <textarea name="conteudo-resumo" class="texto-nota-resumo" placeholder="Digite aqui..."></textarea>
    `;

    destinoNotas.appendChild(novaNota);

    // Rolagem das listas
    destinoNotas.scrollTo({
        top: destinoNotas.scrollHeight,
        behavior: "smooth"
    });
}

