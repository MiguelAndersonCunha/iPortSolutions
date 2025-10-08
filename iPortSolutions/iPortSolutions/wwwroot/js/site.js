const patio = document.getElementById('visualizacao-patio');
function carregarDados() {
    fetch('/api/container')
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar dados do servidor.');
        return response.json();
    })
    .then(data => {
        patio.innerHTML = "";
        const hoje = new Date();

        for (let i = 0; i < data.data.length; i++) {
            const saida = new Date(data.data[i].saida);
            const diferenca_ms = saida - hoje;
            const diferenca_dias = Math.ceil(diferenca_ms / (1000 * 60 * 60 * 24));
            let classe = "caixa_container ";

            if (diferenca_dias < 0) {
                classe += "saida_atrasada";
            }

            else if (diferenca_dias === 0 || diferenca_dias === 1) {
                classe += "saida_hoje";
            }

            else if (diferenca_dias === 2 || diferenca_dias === 3) {
                classe += "saida_2dias";
            }

            else if (diferenca_dias === 4) {
                classe += "saida_4dias";
            }

            else {
                classe += "saida_longe";
            }

            patio.innerHTML += `<div class="${classe}">${data.data[i].container}</div>`;
        }

        console.log(data);
    })

    .catch(erro => console.error('Erro ao ler JSON:', erro));
}

carregarDados();

const botao_adicionar = document.getElementById('btn_adicionar');
const formulario = document.getElementById('form_infos');
const inputCodigo = document.getElementById('input_codigo');
const inputEntrada = document.getElementById('input_entrada');
const inputSaida = document.getElementById('input_saida');

botao_adicionar.addEventListener('click', function (e) {
    e.preventDefault();

    if (formulario.classList.contains('visivel')) {
        formulario.classList.remove('visivel');
    }

    else {
        formulario.classList.add('visivel');
    }
});

const botao_cadastrar = document.getElementById('btn_cadastrar');

botao_cadastrar.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCodigo.value === "") {
        inputCodigo.setCustomValidity("O código não pode ser vazio!");
        inputCodigo.reportValidity();
        return;
    }

    if (inputEntrada.value === "") {
        inputEntrada.setCustomValidity("A data de entrada não pode ser vazia!");
        inputEntrada.reportValidity();
        return;
    }

    if (inputSaida.value === "") {
        inputSaida.setCustomValidity("A data de saída não pode ser vazia!");
        inputSaida.reportValidity();
        return;
    }

    if (inputSaida.value < inputEntrada.value) {
        inputSaida.setCustomValidity("A data de saída não pode ser menor que a data de entrada!");
        inputSaida.reportValidity();
        inputSaida.value = "";
        return;
    }

    const container = {
        bay: 1,
        row: 1,
        tier: 1,
        container: inputCodigo.value,
        entrada: inputEntrada.value,
        saida: inputSaida.value
    };

    fetch('/api/container', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(container)
    })

    .then(response => {
        if (!response.ok) throw new Error('Erro ao cadastrar contâiner.');
        return response.json();
    })

    .then(data => {
        alert(`Contâiner ${data.container} cadastrado com sucesso!`);
        inputCodigo.value = "";
        inputEntrada.value = "";
        inputSaida.value = "";
        carregarDados();
    })

    .catch(erro => console.error(erro));
    
});