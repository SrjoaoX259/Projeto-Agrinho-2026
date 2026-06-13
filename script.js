// ====== NAVEGAÇÃO ENTRE PÁGINAS ======
function mudarPagina(idPagina) {
    // Pega todas as seções que têm a classe 'pagina'
    let paginas = document.querySelectorAll('.pagina');
    
    // Remove a classe 'ativa' de todas
    paginas.forEach(function(pagina) {
        pagina.classList.remove('ativa');
    });

    // Adiciona a classe 'ativa' apenas na página clicada
    document.getElementById(idPagina).classList.add('ativa');
}


// ====== LÓGICA DO SIMULADOR ======
let diaAtual = 0;
let crescimentoTotal = 0; // Vai de 0 a 100%

// Atualiza os textos dos valores quando o usuário move as barras
document.getElementById('temperatura').addEventListener('input', function() {
    document.getElementById('temp-valor').innerText = this.value;
});
document.getElementById('umidade-ar').addEventListener('input', function() {
    document.getElementById('umi-ar-valor').innerText = this.value;
});
document.getElementById('umidade-solo').addEventListener('input', function() {
    document.getElementById('umi-solo-valor').innerText = this.value;
});

// Função chamada ao clicar em "Avançar 1 Dia"
function avancarDia() {
    if (crescimentoTotal >= 100) {
        alert("O tomateiro já está totalmente crescido e pronto para a colheita! Parabéns!");
        return;
    }

    diaAtual++;
    document.getElementById('dia-contador').innerText = diaAtual;

    // Pega os valores atuais dos controles
    let temp = parseInt(document.getElementById('temperatura').value);
    let umiAr = parseInt(document.getElementById('umidade-ar').value);
    let umiSolo = parseInt(document.getElementById('umidade-solo').value);

    let alertaTexto = "";
    let taxaCrescimento = 5; // Crescimento base por dia (5%)

    // --- AVALIAÇÃO DAS CONDIÇÕES ---
    
    // Temperatura Ideal: 18 a 28
    if (temp < 18) {
        taxaCrescimento -= 3;
        alertaTexto += "Muito frio! O crescimento está lento. ";
    } else if (temp > 28) {
        taxaCrescimento -= 3;
        alertaTexto += "Muito quente! A planta está sofrendo estresse térmico. ";
    }

    // Umidade do Ar Ideal: 60 a 80
    if (umiAr < 60) {
        taxaCrescimento -= 1;
        alertaTexto += "Ar muito seco. ";
    } else if (umiAr > 80) {
        taxaCrescimento -= 2;
        alertaTexto += "Risco de fungos! Ar muito úmido. ";
    }

    // Umidade do Solo Ideal: 60 a 70
    if (umiSolo < 50) {
        taxaCrescimento -= 4;
        alertaTexto += "Falta água no solo! Planta murchando. ";
    } else if (umiSolo > 80) {
        taxaCrescimento -= 3;
        alertaTexto += "Solo encharcado! As raízes podem apodrecer. ";
    }

    // Se tudo estiver perfeito
    if (alertaTexto === "") {
        alertaTexto = "Condições ideais! Crescimento excelente. 🌱✨";
        taxaCrescimento += 2; // Bônus de crescimento
    }

    // Se as condições estiverem péssimas, a planta não cresce
    if (taxaCrescimento < 0) taxaCrescimento = 0;

    // Atualiza o crescimento
    crescimentoTotal += taxaCrescimento;
    if (crescimentoTotal > 100) crescimentoTotal = 100;

    // Atualiza Interface (Barra e Mensagem)
    document.getElementById('mensagem-alerta').innerText = alertaTexto;
    document.getElementById('mensagem-alerta').style.color = (taxaCrescimento >= 5) ? "#2e7d32" : "#d32f2f";
    
    document.getElementById('crescimento-porcentagem').innerText = crescimentoTotal;
    document.getElementById('barra-crescimento').style.width = crescimentoTotal + "%";

    // Atualiza a imagem da planta com base no % de crescimento
    let visualPlanta = "🟫 (Semente)";
    if (crescimentoTotal > 5 && crescimentoTotal <= 30) visualPlanta = "🌱 (Brotinho)";
    else if (crescimentoTotal > 30 && crescimentoTotal <= 60) visualPlanta = "🌿 (Planta Jovem)";
    else if (crescimentoTotal > 60 && crescimentoTotal <= 85) visualPlanta = "🌿🌼 (Florescendo)";
    else if (crescimentoTotal > 85) visualPlanta = "🌿🍅 (Dando Frutos!)";

    document.getElementById('status-planta').innerText = visualPlanta;
}

// Função para resetar tudo
function resetarSimulador() {
    diaAtual = 0;
    crescimentoTotal = 0;
    
    document.getElementById('dia-contador').innerText = diaAtual;
    document.getElementById('crescimento-porcentagem').innerText = crescimentoTotal;
    document.getElementById('barra-crescimento').style.width = "0%";
    document.getElementById('status-planta').innerText = "🟫 (Semente plantada)";
    document.getElementById('mensagem-alerta').innerText = "Condições iniciais boas! Avance o tempo.";
    document.getElementById('mensagem-alerta').style.color = "#333";
    
    // Reseta os valores dos ranges para os padrões
    document.getElementById('temperatura').value = 25;
    document.getElementById('temp-valor').innerText = 25;
    
    document.getElementById('umidade-ar').value = 65;
    document.getElementById('umi-ar-valor').innerText = 65;
    
    document.getElementById('umidade-solo').value = 70;
    document.getElementById('umi-solo-valor').innerText = 70;
}