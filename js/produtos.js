let produtos = [

{
    id: 1,
    nome: "Mochila Legacy Flap 24L Unissex Preto",
    descricao: "Mochila esportiva resistente com amplo espaço interno.",
    preco: 999.99,
    imagem: "img/mochila-legacy.png",
    tamanhos: ["Único"],
    categoria: "acessorios"
},

{
    id: 2,
    nome: "Chuteira Society Umbro Adamant Master Class Pro Bump",
    descricao: "Ideal para gramado sintético.",
    preco: 90.00,
    imagem: "img/chuteira-society.png",
    tamanhos: ["35","36","37","38","39","40"],
    categoria: "chuteira"
},

{
    id: 3,
    nome: "Chuteira Nike Mercurial Zoom Vapor 16 Pro Vini Jr",
    descricao: "Modelo profissional para campo.",
    preco: 731.00,
    imagem: "img/chuteira-vinijr.png",
    tamanhos: ["35","36","37","38","39","40"],
    categoria: "chuteira"
},

{
    id: 4,
    nome: "Bola Nike Academy Branca",
    descricao: "Bola oficial Nike Academy.",
    preco: 239.00,
    imagem: "img/bola-branca.png",
    tamanhos: ["Único"],
    categoria: "bola"
},

{
    id: 5,
    nome: "Bola Nike Academy Amarela",
    descricao: "Bola oficial Nike Academy.",
    preco: 249.00,
    imagem: "img/bola-amarela.png",
    tamanhos: ["Único"],
    categoria: "bola"
},

{
    id: 6,
    nome: "Meião Nike Academy",
    descricao: "Meião esportivo.",
    preco: 90.00,
    imagem: "img/meia-trail.png",
    tamanhos: ["P","M","G"],
    categoria: "acessorios"
},

{
    id: 7,
    nome: "Meia Nike Dri-FIT Trail",
    descricao: "Conforto para corrida.",
    preco: 208.00,
    imagem: "img/meiao.png",
    tamanhos: ["P","M","G"],
    categoria: "acessorios"
},

{
    id: 8,
    nome: "Caneleira Nike J Guard",
    descricao: "Proteção para partidas.",
    preco: 65.00,
    imagem: "img/caneleira.png",
    tamanhos: ["P","M","G"],
    categoria: "acessorios"
},

{
    id: 9,
    nome: "Luva Nike Grip 3",
    descricao: "Luva profissional.",
    preco: 208.00,
    imagem: "img/luva-grip3.png",
    tamanhos: ["6","7","8","9"],
    categoria: "acessorios"
},

{
    id: 10,
    nome: "Short Flamengo Adidas",
    descricao: "Short oficial.",
    preco: 319.00,
    imagem: "img/shorts-flamengo.png",
    tamanhos: ["P","M","G"],
    categoria: "short"
},

{
    id: 11,
    nome: "Calção São Paulo",
    descricao: "Calção oficial.",
    preco: 237.00,
    imagem: "img/calcao-sp.png",
    tamanhos: ["P","M","G"],
    categoria: "short"
},

{
    id: 12,
    nome: "Camisa Brasil Nike",
    descricao: "Camisa oficial.",
    preco: 247.00,
    imagem: "img/camisa-brasil.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 13,
    nome: "Camisa Flamengo Braziline",
    descricao: "Camisa casual.",
    preco: 139.00,
    imagem: "img/camisa-flamengo-braziline.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 14,
    nome: "Camisa Flamengo II Adidas",
    descricao: "Temporada 25/26.",
    preco: 359.00,
    imagem: "img/camisa-flamengo2.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 15,
    nome: "Camisa Brasil Jordan",
    descricao: "Modelo azul.",
    preco: 449.00,
    imagem: "img/camisa-brasil-jordan.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 16,
    nome: "Camisa São Paulo III",
    descricao: "Modelo jogador.",
    preco: 590.00,
    imagem: "img/camisa-sp3.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 17,
    nome: "Camisa São Paulo I",
    descricao: "Modelo oficial.",
    preco: 569.00,
    imagem: "img/camisa-sp1.png",
    tamanhos: ["P","M","G"],
    categoria: "camisa"
},

{
    id: 18,
    nome: "Luva Nike",
    descricao: "Luva para goleiro.",
    preco: 195.00,
    imagem: "img/luvas-nike.png",
    tamanhos: ["6","7","8","9"],
    categoria: "acessorios"
},

{
    id: 19,
    nome: "Chuteira Umbro Kintsugi",
    descricao: "Modelo profissional.",
    preco: 1049.90,
    imagem: "img/chuteira-kintsugi.png",
    tamanhos: ["35","36","37","38","39","40"],
    categoria: "chuteira"
}

];

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function carregarProdutos() {

    localStorage.removeItem("produtos");

    salvarProdutos();

    produtos = JSON.parse(localStorage.getItem("produtos"));

}

carregarProdutos();