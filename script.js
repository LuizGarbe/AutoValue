function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularDesvalorizacao() {
    const modelo = document.getElementById("modelo").value;
    const ano = Number(document.getElementById("ano").value);
    const km = Number(document.getElementById("km").value);
    const valor = Number(document.getElementById("valor").value);

    if (!modelo || !ano || !km || !valor || valor <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // 5% ao ano + pequeno ajuste conforme a quilometragem.
    let taxaAnual = 0.05;

    if (km > 200000) {
        taxaAnual += 0.02;
    } else if (km > 100000) {
        taxaAnual += 0.01;
    }

    const valor1 = valor * Math.pow(1 - taxaAnual, 1);
    const valor3 = valor * Math.pow(1 - taxaAnual, 3);
    const valor5 = valor * Math.pow(1 - taxaAnual, 5);
    const valor8 = valor * Math.pow(1 - taxaAnual, 8);
    const valor10 = valor * Math.pow(1 - taxaAnual, 10);
    const valor15 = valor * Math.pow(1 - taxaAnual, 15);

    const percentual5 = (1 - (valor5 / valor)) * 100;

    document.getElementById("tituloResultado").textContent = modelo;
    document.getElementById("resumo").textContent =
        "Estimativa considerando o valor atual e a quilometragem informada.";

    document.getElementById("valor1").textContent = formatarMoeda(valor1);
    document.getElementById("valor3").textContent = formatarMoeda(valor3);
    document.getElementById("valor5").textContent = formatarMoeda(valor5);
    document.getElementById("valor8").textContent = formatarMoeda(valor8);
    document.getElementById("valor10").textContent = formatarMoeda(valor10);
    document.getElementById("valor15").textContent = formatarMoeda(valor15);

    document.getElementById("percentual").textContent =
        percentual5.toFixed(1) + "% em 5 anos";

    document.getElementById("barraProgresso").style.width =
        Math.min(percentual5, 100) + "%";
}
