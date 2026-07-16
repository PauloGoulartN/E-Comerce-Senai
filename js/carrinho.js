let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const lista = document.getElementById("lista-carrinho");
const total = document.getElementById("valor-total-compra");

// ======================
// FUNÇÕES AUXILIARES
// ======================

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function criarItemCarrinho(produto, indice) {
    return `
        <li class="item-carrinho">

            <img src="${produto.imagem}" class="img-mini">

            <div class="detalhes-item">
                <h4>${produto.nome}</h4>
                <p>Tamanho: ${produto.tamanho}</p>
                <p>${formatarPreco(produto.preco)}</p>
            </div>

            <div class="controles-quantidade">
                <button onclick="diminuir(${indice})">-</button>

                <span>${produto.quantidade}</span>

                <button onclick="aumentar(${indice})">+</button>
            </div>

            <button class="btn-remover" onclick="remover(${indice})">
                🗑️ Remover
            </button>

        </li>
    `;
}

// ======================
// RENDERIZAÇÃO
// ======================

function renderizarCarrinho() {

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((produto, indice) => {

        valorTotal += produto.preco * produto.quantidade;

        lista.innerHTML += criarItemCarrinho(produto, indice);

    });

    total.textContent = formatarPreco(valorTotal);

    salvarCarrinho();

}

// ======================
// CONTROLES
// ======================

function aumentar(indice) {

    carrinho[indice].quantidade++;

    renderizarCarrinho();

}

function diminuir(indice) {

    if (carrinho[indice].quantidade > 1) {

        carrinho[indice].quantidade--;

    } else {

        carrinho.splice(indice, 1);

    }

    renderizarCarrinho();

}

function remover(indice) {

    carrinho.splice(indice, 1);

    renderizarCarrinho();

}

document.getElementById("btnEsvaziar").addEventListener("click", function () {
    localStorage.removeItem("carrinho");
    location.reload();
});
// ======================
// FINALIZAR COMPRA
// ======================

document
    .getElementById("btn-finalizar-compra")
// ==========================================================================
// FINALIZANDO A COMPRA COM O POLIMORFISMO
// ==========================================================================
document.getElementById("btn-finalizar-compra").addEventListener("click", () => {
    
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Vá às compras primeiro.");
        return;
    }

    // Pega o valor total atual e o método que o usuário escolheu
    const valorTotalStr = document.getElementById("valor-total-compra").innerText.replace("R$ ", "").replace(",", ".");
    const valorTotal = parseFloat(valorTotalStr).toFixed(2);
    
    const tipoPagamento = document.getElementById("select-pagamento").value;
    
    // Usando Polimorfismo: Criamos uma variável genérica de pagamento
    let pagamento;

    // Instanciamos a classe correta dependendo da escolha
    if (tipoPagamento === "pix") {
        pagamento = new PagamentoPix();
    } else if (tipoPagamento === "cartao") {
        pagamento = new PagamentoCartao();
    } else if (tipoPagamento === "boleto") {
        pagamento = new PagamentoBoleto();
    }

    const sucesso = pagamento.processar(valorTotal);

    if (sucesso) {
        // Se a classe autorizou, limpamos o carrinho e voltamos pra loja
        alert("🏆 Compra finalizada com sucesso! Obrigado, Torcedor!");
        carrinho = [];
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        window.location.href = "vitrine.html";
    } else {
        alert("❌ Pagamento cancelado pelo usuário.");
    }
});

renderizarCarrinho();

// ==========================================================================
// APLICANDO POLIMORFISMO: SISTEMA DE PAGAMENTOS
// ==========================================================================

// 1. Classe "Pai" (A base abstrata)
class MetodoPagamento {
    processar(valor) {
        // Isso obriga as classes filhas a criarem suas próprias versões desse método
        throw new Error("O método processar() precisa ser implementado pela classe filha!");
    }
}

// 2. Classe "Filha" 1: Pagamento via PIX
class PagamentoPix extends MetodoPagamento {
    processar(valor) {
        alert(`🟢 Gerando QR Code PIX no valor de R$ ${valor}...\nPagamento aprovado em segundos!`);
        return true;
    }
}

// 3. Classe "Filha" 2: Pagamento via Cartão
class PagamentoCartao extends MetodoPagamento {
    processar(valor) {
        const ultimosDigitos = prompt("💳 Digite os 4 últimos dígitos do cartão:");
        if(ultimosDigitos) {
            alert(`🔵 Contatando a operadora...\nPagamento de R$ ${valor} aprovado no cartão final ${ultimosDigitos}.`);
            return true;
        }
        return false; // Se cancelar
    }
}

// 4. Classe "Filha" 3: Pagamento via Boleto
class PagamentoBoleto extends MetodoPagamento {
    processar(valor) {
        alert(`📄 Gerando Boleto no valor de R$ ${valor}...\nO vencimento é em 3 dias úteis. A compra será liberada após a compensação.`);
        return true;
    }
}