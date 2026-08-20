document.addEventListener("DOMContentLoaded", () => {
    const pesquisaPrincipal = document.getElementById("buscar");
    const pesquisaMenu = document.querySelector("aside input");
    const indicadores = document.querySelectorAll("aside li");
    const cards = document.querySelectorAll(".card");
    const graficos = document.querySelectorAll(".grafico");

    if (pesquisaMenu) {
        pesquisaMenu.addEventListener("keyup", function () {
            const texto = this.value.toLowerCase();
            indicadores.forEach(item => {
                if (item.textContent.toLowerCase().includes(texto)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    if (pesquisaPrincipal) {
        pesquisaPrincipal.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                alert("Pesquisa: " + this.value);
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.03)";
            card.style.transition = ".3s";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    console.log("Atlas da Mulher carregado com sucesso.");

});

function atualizarHorario() {
    const agora = new Date();
    console.log(
        "Última atualização:",
        agora.toLocaleTimeString()
    );

}

setInterval(atualizarHorario, 60000);

function mostrarMapa() {
    const paginaInicial = document.getElementById("pagina-inicial");
    const mapa = document.getElementById("map");
    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }
    if (mapa) {
        mapa.style.display = "block";
    }

}

function mostrarChefiaFamilia() {
    const paginaInicial = document.getElementById("pagina-inicial");
    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }
    const areaMapa = document.querySelector(".area-mapa");
    if (areaMapa) {
        areaMapa.style.display = "block";
    }
    const botaoInicial = document.querySelector(".selecao-chefia");
    if (botaoInicial) {
        mostrarMapaChefia("webgis", botaoInicial);
    }

}

function mostrarMapaChefia(tipo, botao) {
    const mapa = document.getElementById("mapa");
    if (!mapa) return;
    document.querySelectorAll(".selecao-chefia").forEach(item => {
        item.classList.remove("ativo");
    });
    if (botao) {
        botao.classList.add("ativo");
    }

    if (tipo === "webgis") {
        mapa.innerHTML = `
            <iframe
                src="/static/webgis/index.html"
                frameborder="0"
                style="width:100%; height:100%; border:none;">
            </iframe>
        `;
    }

    else if (tipo === "mapa2") {
        mapa.innerHTML = `
            <img
                src="/static/mapas/mapa2.png"
                class="imagem-mapa"
                alt="Mapa 2">
        `;
    }
    else if (tipo === "mapa3") {

        mapa.innerHTML = `
            <img
                src="/static/mapas/mapa3.png"
                class="imagem-mapa"
                alt="Mapa 3">
        `;

    }

}