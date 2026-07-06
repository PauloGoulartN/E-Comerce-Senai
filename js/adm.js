// ==========================================================================
// GUARDA DE SEGURANÇA: Bloqueia invasões diretas pela barra de endereços
// ==========================================================================
if (localStorage.getItem("usuario_logado") !== "Diretoria") {
    alert("⚠️ Acesso não autorizado! Você precisa fazer o login da Diretoria primeiro.");
    window.location.href = "index.html"; // Chuta o invasor de volta para o login
}

carregarProdutos();

const form = document.getElementById("form-admin-produto");
const tabela = document.getElementById("lista-admin-produtos");

function renderizarTabelaAdmin(){

    tabela.innerHTML = "";

    produtos.forEach(produto=>{

        tabela.innerHTML += `

        <tr>

            <td>${produto.id}</td>

            <td>

                <img
                src="${produto.imagem}"
                width="60">

            </td>

            <td>

                ${produto.nome}

            </td>

            <td>

                R$ ${produto.preco.toFixed(2).replace(".",",")}

            </td>

            <td>

                <button
                class="btn-excluir"
                data-id="${produto.id}">

                🗑️ Remover

                </button>

            </td>

        </tr>

        `;

    });

    document
    .querySelectorAll(".btn-excluir")
    .forEach(botao=>{

        botao.addEventListener("click",()=>{

            const id = Number(botao.dataset.id);

            produtos = produtos.filter(produto=>produto.id!==id);

            salvarProdutos();

            renderizarTabelaAdmin();

        });

    });

}

renderizarTabelaAdmin();

form.addEventListener("submit",function(e){

    e.preventDefault();

    const nome =
    document.getElementById("admin-nome-produto").value;

    const preco =
    Number(document.getElementById("admin-preco-produto").value);

    const descricao =
document.getElementById("admin-descricao-produto").value;

const tamanhos =
document
.getElementById("admin-tamanhos-produto")
.value
.split(",");

const imagem =
document.getElementById("admin-img-produto").value;

const novoProduto = {

    id: Date.now(),

    nome,

    descricao,

    preco,

    imagem,

    tamanhos

};

    produtos.push(novoProduto);

    salvarProdutos();

    renderizarTabelaAdmin();

    form.reset();

});

const btnSair = document.querySelector(".btn-sair");

if (btnSair) {
    btnSair.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Limpa quem estava logado
        localStorage.removeItem("usuario_logado");
        
        // Manda de volta para a tela de login inicial
        window.location.href = "index.html"; 
    });
}