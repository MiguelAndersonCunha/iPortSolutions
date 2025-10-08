const botao_adicionar = document.getElementById('adicionar');
const formulario = document.querySelector('.form');
formulario.classList.add('escondido');

botao_adicionar.addEventListener('click', function(e) {
    e.preventDefault();
    formulario.classList.remove('escondido');
});

const codigo = document.getElementById('codigo');
const data_entrada = document.getElementById('data_entrada');
const data_saida = document.getElementById('data_saida');

const botao_cadastrar = document.getElementById('cadastrar');
botao_cadastrar.addEventListener('click', function (e) {
    e.preventDefault();
});