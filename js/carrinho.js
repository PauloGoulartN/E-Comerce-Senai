let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const lista = document.getElementById("lista-carrinho");
const total = document.getElementById("valor-total-compra");

function renderizarCarrinho() {

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((produto, indice) => {

        valorTotal += produto.preco * produto.quantidade;

        lista.innerHTML += `

        <li class="item-carrinho">

            <img src="${produto.imagem}" class="img-mini">

            <div class="detalhes-item">

                <h4>${produto.nome}</h4>

                <p>Tamanho: ${produto.tamanho}</p>

                <p>R$ ${produto.preco.toFixed(2).replace(".",",")}</p>

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

    });

    total.innerHTML = "R$ " + valorTotal.toFixed(2).replace(".",",");

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

function aumentar(indice){

    carrinho[indice].quantidade++;

    renderizarCarrinho();

}

function diminuir(indice){

    if(carrinho[indice].quantidade > 1){

        carrinho[indice].quantidade--;

    }

    renderizarCarrinho();

}

function remover(indice){

    carrinho.splice(indice,1);

    renderizarCarrinho();

}

document.getElementById("btn-finalizar-compra").addEventListener("click",function(){

    alert("Compra realizada com sucesso!");

    carrinho = [];

    localStorage.removeItem("carrinho");

    renderizarCarrinho();

});

renderizarCarrinho();