document.addEventListener('DOMContentLoaded', () => {
    // SELETORES DE ELEMENTOS DOM 
    const visualizacaoPatio = document.getElementById('visualizacao-patio');
    const detalhesContainer = document.getElementById('detalhes-container');

    // Elementos do formulário de adição
    const btnAdicionar = document.getElementById('btn_adicionar');
    const formInfos = document.getElementById('form_infos');
    const inputNome = document.getElementById('input_nome');
    const inputChegada = document.getElementById('input_chegada');
    const inputSaida = document.getElementById('input_saida');

    // LÓGICA PARA ADICIONAR CONTÊINER 

    // 1. Mostrar/Esconder o formulário
    btnAdicionar.addEventListener('click', () => {
        formInfos.classList.toggle('visivel');
        // Esconde os detalhes do contêiner se estiverem visíveis
        if (formInfos.classList.contains('visivel')) {
            detalhesContainer.classList.add('escondido');
        }
    });

    // 2. Cadastro no submit do formulário
    formInfos.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const nome = inputNome.value.trim().toUpperCase();
        const chegada = inputChegada.value;
        const saida = inputSaida.value;

        if (!nome || !chegada || !saida) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoContainer = {
            bay: localVago.bay,
            row: localVago.row,
            tier: localVago.tier,
            container: nome,
            entrada: chegada,
            saida: saida
        };

        patioData.data.push(novoContainer);
        renderPatio();

        formInfos.reset();
        formInfos.classList.remove('visivel');
        alert(`Contêiner ${nome} adicionado com sucesso na posição ${localVago.bay}-${localVago.row}-${localVago.tier}!`);
    });

});