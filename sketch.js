let musica
let estoque = 120;         // Estoque inicial do agricultor
let lucro = 0;             // Lucro acumulado
let rodada = 1;            // Contador de rodadas
let maxRodadas = 5;        // Número total de rodadas
let propostas = [];        // Lista de propostas da rodada
let jogoFinalizado = false; // Controle do fim de jogo
let mensagem = "";         // Mensagem para avisos
let jogoIniciado = false;  // Controle da introdução

// Lista de compradores possíveis
let compradores = ["Supermercado", "Restaurante", "Distribuidora", "Padaria", "Quitanda", "Bourguer Queen", "Irmãos Macnalds", "Indústria", "KFT", "Lanchonete", "Conveniência"];

function setup() {
  createCanvas(700, 500);
  textFont('Arial');
}

function preload() {
  musica = loadSound('musicafundov2.mp3');
}

function draw() {
  background(200, 240, 180);

  if (!jogoIniciado) {
    mostrarIntroducao();
    //musica.play();
    musica.loop();
    musica.setVolume(0.2);   // código da música feito pelo chatGPT
    
    return;
  }
  
    if (!musica.isPlaying()) {
    musica.loop();
    musica.setVolume(0.4); // Ajuste o volume se quiser
  }

  
  // Título do projeto
  fill(50, 90, 40);
  textSize(28);
  textAlign(CENTER, TOP);
  text("Vendas Inteligentes do Agricultor", width/2, 22);

  // Informações principais como o texto 
  textSize(20);
textAlign(LEFT, TOP);
text("Rodada: " + rodada + " / " + maxRodadas, 30, 70); 
text("Estoque atual: " + estoque + " unidades", 30, 100);
var faturamentoFormatado = lucro.toFixed(2);
text("Faturamento: R$ " + faturamentoFormatado, 30, 130);

  // Se o jogo terminou, mostra o resumo final
  if (jogoFinalizado) {
    fill(30, 120, 30, 220);
    rect(150, 170, 420, 170, 18); // aqui muda o retângulo na parte final
    fill(255);
    textSize(26);
    textAlign(CENTER, CENTER);
    text("Fim do Jogo!", width/2, 195);
    textSize(20); // tamanho das letras
var lucroFinal = lucro.toFixed(2);
text("Lucro total: R$ " + lucroFinal, width/2, 235);
text("Estoque restante: " + estoque + " unidades", width/2, 265);
    musica.stop();
    
    // mensagens no final dependendo do dinheiro arrecadado
    let msgFinal = "";
    if (lucro > 380) msgFinal = "Ótimo trabalho! Você maximizou seus lucros!";
    else if (lucro > 250) msgFinal = "Bom desempenho! Sua fazenda está crescendo.";
    else msgFinal = "Continue tentando, logo terá mais lucro!";
    text(msgFinal, width/2, 300);

    fill(210, 255, 210);
    rect(width/2 - 70, 335, 140, 35, 10); //335
    fill(50, 90, 60);
    textSize(17);
    text("Jogar Novamente", width/2, 353);
    return;
  }

  // Mostra as propostas da rodada
  textSize(19);
  textAlign(LEFT, TOP);
  fill(40, 70, 30);
  text("Escolha uma proposta para vender seus produtos:", 30, 165); // texto das propostas da rodada

  for (let i = 0; i < propostas.length; i++) {
    let y = 200 + i*70;
    let prop = propostas[i];

    // Retângulo do botão da proposta
    fill(211,211,211)
    rect(50, y, 520, 55, 8);

    // Texto da proposta
    fill(50, 90, 60);
    textSize(16);
    textAlign(LEFT, TOP);
    let comprador = prop.comprador;
    text(comprador, 55, y + 8);
   text("Quer comprar: " + prop.quantidade + " unidades", 55, y + 30);
var precoFormatado = prop.preco.toFixed(2);
text("Preço por unidade: R$ " + precoFormatado, 290, y + 30);

    // Botão vender e sua customização
    fill(60, 130, 60);
    rect(500, y + 15, 110, 28, 6);
    fill(255);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("Vender", 555, y + 29);
  }

  // Mensagem de feedback/erro da rodada (as definições de customização)
  if (mensagem !== "") {
    fill(200, 80, 80);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(mensagem, width/2, 440);
  }
}
// Instruções para a tela inicial
function mostrarIntroducao() {
  fill(30, 90, 30);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("Bem-vindo ao jogo Seja Inteligente como Agricultor!", width / 2, 100);

  textSize(18);
  text("Instruções:", width / 2, 150);

  textSize(16);
  let textoY = 200;
  let espaco = 25;
  textAlign(CENTER, TOP);

  text("Você é um agricultor que pretende vender seus produtos para a cidade.", width / 2, textoY);
  text("Em cada rodada, aparecerão propostas de compradores diferentes.", width / 2, textoY + espaco);
  text("Seu objetivo é escolher a melhor proposta para obter maior faturamento.", width / 2, textoY + espaco * 2);
  text("Seja inteligente e tome as melhores decisões!", width / 2, textoY + espaco * 3);

  textSize(17);
  fill(50, 100, 50);
  text("Clique em qualquer lugar para começar!", width / 2, textoY + espaco * 5);
}


function gerarPropostas() {
  propostas = [];
  let usados = [];
  for (let i = 0; i < 3; i++) {
    let comprador;
    do {
      comprador = random(compradores);
    } while (usados.includes(comprador));
    usados.push(comprador);
// Aqui estipulamos o quando que as propostas vão exigir de preço e de quantidade
    let quantidade = int(random(10, 31)); // Entre 10 e 30 unidades
    let preco = random(2, 10);            // Entre R$2,00 e R$10,00 por unidade

    propostas.push({
      comprador: comprador,
      quantidade: quantidade,
      preco: preco
    });
  }
}

function mouseSobreBotao(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mousePressed() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    gerarPropostas();
    return;
  }
// Definições predefinidas (iniciais)
  if (jogoFinalizado) {
    if (mouseSobreBotao(width/2 - 70, 335, 140, 35)) {
      estoque = 120; // numero do estoque inicial
      lucro = 0; // o quanto de dinheiro inicial
      rodada = 1;
      jogoFinalizado = false;
      mensagem = "";
      jogoIniciado = false; // Volta pra tela de introdução
    }
    return;
  }

  for (let i = 0; i < propostas.length; i++) {
    let y = 200 + i * 70;
    if (mouseSobreBotao(500, y + 15, 110, 28)) {
      aceitarProposta(i);
      break;
    }
  }
}
// Função para dizer se a quantidade que a proposta pede é maior do que o agricultor já tem
function aceitarProposta(indice) {
  let prop = propostas[indice];
  if (prop.quantidade > estoque) {
    mensagem = "Estoque insuficiente!";
    return;
  }
  estoque -= prop.quantidade;
  let valor = prop.quantidade * prop.preco;
  lucro += valor;
  var valorFormatado = valor.toFixed(2);
 mensagem = "Venda realizada: +R$" + valorFormatado + "!"; // Caso a proposta for aceita aparece a mensagem na tela dizendo

  setTimeout(() => {
    mensagem = "";
    rodada++; // adiciona a rodada a + quando a proposta terminar
    if (rodada >= maxRodadas) { // verifica se as rodadas estão dentro das 5
      jogoFinalizado = true;
    } else {
      gerarPropostas();
    }
  }, 900);
}
