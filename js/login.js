// ==========================================
// 1. CAPTURANDO OS ELEMENTOS DO HTML
// ==========================================
const formLogin = document.getElementById("form-login");
const msgErroLogin = document.getElementById("msg-erro-login");

// ==========================================
// 2. LÓGICA DE VALIDAÇÃO E REDIRECIONAMENTO
// ==========================================
formLogin.addEventListener("submit", function(e) {
    // Impede que a página recarregue ao clicar em "Entrar"
    e.preventDefault(); 

    // Captura o que o usuário digitou
    const email = document.getElementById("input-email").value.trim();
    const senha = document.getElementById("input-senha").value.trim();

    // REGRA A: Login da Diretoria (Admin)
    if (email === "admin@sport.com" && senha === "admin123") {
        
        // Salva que o admin está logado
        localStorage.setItem("usuario_logado", "Diretoria");
        
        // Faz a viagem (Redirecionamento) para o HTML do painel
        window.location.href = "admin.html"; 
    } 
    
    // REGRA B: Login de Cliente Comum
    else if (email !== "" && senha.length >= 4) {
        
        // Truque: Pega o nome do e-mail antes do @ (ex: messi@barca.com vira 'messi')
        const nomeUsuario = email.split("@")[0];
        const nomeFormatado = nomeUsuario.charAt(0).toUpperCase() + nomeUsuario.slice(1);
        
        // Salva o nome do cliente no navegador
        localStorage.setItem("usuario_logado", nomeFormatado);
        
        // Faz a viagem (Redirecionamento) para o HTML da loja
        window.location.href = "vitrine.html"; 
    } 
    
    // REGRA C: E-mail ou senha inválidos
    else {
        // Mostra a mensagem de erro na tela
        msgErroLogin.innerText = "Credenciais inválidas! A senha deve ter no mínimo 4 caracteres.";
        msgErroLogin.classList.remove("oculto");
    }
});