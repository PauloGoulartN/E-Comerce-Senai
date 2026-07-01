const grid = document.getElementById("grid-produtos");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// 1. Atualizar contador da bolinha
function atualizarContadorCarrinho() {
    const contadorElemento = document.getElementById("contador-carrinho");
    if (contadorElemento) {
        contadorElemento.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0); 
    }
}

// 2. Renderizar produtos com suporte a Filtro por Categoria
function renderizarProdutos(categoriaFiltrada = "todos") {
    if (!grid) return;
    grid.innerHTML = "";

    // Filtra com base no clique do menu do meio
    const produtosFiltrados = categoriaFiltrada === "todos" 
        ? produtos 
        : produtos.filter(p => p.categoria === categoriaFiltrada);

    produtosFiltrados.forEach(produto => {
        const card = document.createElement("article");
        card.className = "card-produto";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="img-produto">
            
            <div class="info-produto">
                <div class="detalhes">
                    <h3>${produto.nome}</h3>
                    <p class="descricao-produto">${produto.descricao}</p>
                </div>

                <div class="acoes">
                    <label><strong>Escolha o tamanho:</strong></label>
                    <select id="tamanho-${produto.id}" class="select-tamanho">
                        ${produto.tamanhos.map(t => `<option value="${t}">${t}</option>`).join("")}
                    </select>
                    
                    <h2 class="preco-produto">R$ ${produto.preco.toFixed(2).replace(".", ",")}</h2>
                    
                    <button class="btn-adicionar-carrinho" onclick="adicionarCarrinho('${produto.id}')">
                        Adicionar ao Carrinho 🛒
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 3. Adicionar item ao LocalStorage
function adicionarCarrinho(id) {
    const produto = produtos.find(p => String(p.id) === String(id));
    if (!produto) return;

    const tamanho = document.getElementById(`tamanho-${id}`).value;

    // Verifica se já existe o mesmo produto com o mesmo tamanho no carrinho
    const itemExistente = carrinho.find(item => String(item.id) === String(id) && item.tamanho === tamanho);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            tamanho: tamanho,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    alert("Produto adicionado com sucesso!");
}

// 4. Configurar eventos de cliques nos Filtros do Cabeçalho (Filtros no meio)
document.querySelectorAll(".categoria").forEach(botao => {
    botao.addEventListener("click", (e) => {
        document.querySelectorAll(".categoria").forEach(b => b.classList.remove("ativa"));
        e.target.classList.add("ativa");
        
        const categoria = e.target.getAttribute("data-categoria");
        renderizarProdutos(categoria);
    });
});

// Inicialização
renderizarProdutos();
atualizarContadorCarrinho();