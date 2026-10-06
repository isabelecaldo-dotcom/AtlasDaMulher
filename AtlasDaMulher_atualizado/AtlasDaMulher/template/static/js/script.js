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

    const resultadosBusca =
        document.getElementById("resultados-busca");


    function realizarBusca() {

        const texto =
            pesquisaPrincipal.value.trim().toLowerCase();


        resultadosBusca.innerHTML = "";


        if (!texto) {

            resultadosBusca.style.display = "none";

            return;
        }

        let resultados = [];

        if (fuseIndicadores) {

            resultados =
                fuseIndicadores.search(texto);

        }

        else {
            resultados =
                indicadoresBusca
                    .filter(indicador => {
                        const textoIndicador =
                            (
                                indicador.titulo +
                                " " +
                                indicador.palavras.join(" ")
                            ).toLowerCase();
                        return textoIndicador.includes(texto);
                    })
                    .map(indicador => ({
                        item: indicador
                    }));
        }

        if (resultados.length === 0) {
            resultadosBusca.innerHTML = `
                <div class="sem-resultado">
                    Nenhum indicador encontrado.
                </div>
            `;
            resultadosBusca.style.display = "block";
            return;
        }

        resultados.forEach(resultado => {
            const indicador = resultado.item;
            const item =
                document.createElement("div");
            item.className =
                "resultado-indicador";
            item.innerHTML = `
                <strong>${indicador.titulo}</strong>
            `;

            item.addEventListener("click", function () {
                indicador.acao();
                resultadosBusca.style.display = "none";
                pesquisaPrincipal.value = "";
            });
            resultadosBusca.appendChild(item);
        });
        resultadosBusca.style.display = "block";h
    }
    pesquisaPrincipal.addEventListener(
        "input",
        realizarBusca
    );

    pesquisaPrincipal.addEventListener(
        "keydown",
        function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const primeiroResultado =
                    resultadosBusca.querySelector(
                        ".resultado-indicador"
                    );
                if (primeiroResultado) {
                    primeiroResultado.click();
                } else {
                    realizarBusca();
                }
            }
        }
    );
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
    const paginaInicial =
        document.getElementById("pagina-inicial");
    const mapa =
        document.getElementById("map");
    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }
    if (mapa) {
        mapa.style.display = "block";
    }
}

function mostrarGraficoChefia() {
    const grafico =
        document.getElementById("grafico-chefia");
    if (grafico) {
        grafico.style.display = "block";
    }
}

function esconderGraficoChefia() {
    const grafico =
        document.getElementById("grafico-chefia");
    if (grafico) {
        grafico.style.display = "none";
    }
}

function esconderQuantitativosRaca() {
    const quantitativosRaca =
        document.getElementById("quantitativos-raca");
    if (quantitativosRaca) {
        quantitativosRaca.style.setProperty(
            "display",
            "none",
            "important"
        );
    }
}

function esconderQuantitativosPopulacao() {
    const quantitativosPopulacao =
        document.getElementById("quantitativos-populacao");
    if (quantitativosPopulacao) {
        quantitativosPopulacao.style.setProperty(
            "display",
            "none",
            "important"
        );
    }
}

function mostrarRenda() {

    esconderQuantitativosRaca();
    esconderQuantitativosPopulacao();

    const paginaInicial =
        document.getElementById("pagina-inicial");

    const areaMapa =
        document.querySelector(".area-mapa");

    const grafico =
        document.getElementById("grafico-chefia");

    const graficoEscolaridade =
        document.getElementById("grafico-escolaridade");

    const populacaoFeminina =
        document.getElementById("populacao-feminina");

    const graficoRaca =
        document.getElementById("grafico-raca");

    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }

    if (areaMapa) {
        areaMapa.style.display = "none";
    }

    if (grafico) {
        grafico.style.setProperty(
            "display",
            "block",
            "important"
        );
    }

    if (graficoEscolaridade) {
        graficoEscolaridade.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (populacaoFeminina) {
        populacaoFeminina.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoRaca) {
        graficoRaca.style.setProperty(
            "display",
            "none",
            "important"
        );
    }
}

function mostrarEscolaridade() {

    esconderQuantitativosRaca();
    esconderQuantitativosPopulacao();

    const paginaInicial =
        document.getElementById("pagina-inicial");

    const areaMapa =
        document.querySelector(".area-mapa");

    const graficoChefia =
        document.getElementById("grafico-chefia");

    const graficoEscolaridade =
        document.getElementById("grafico-escolaridade");

    const populacaoFeminina =
        document.getElementById("populacao-feminina");

    const graficoRaca =
        document.getElementById("grafico-raca");

    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }

    if (areaMapa) {
        areaMapa.style.display = "none";
    }

    if (graficoChefia) {
        graficoChefia.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (populacaoFeminina) {
        populacaoFeminina.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoRaca) {
        graficoRaca.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoEscolaridade) {
        graficoEscolaridade.style.setProperty(
            "display",
            "block",
            "important"
        );
    }

}

function mostrarPopulacaoFeminina() {

    esconderQuantitativosRaca();

    const paginaInicial =
        document.getElementById("pagina-inicial");

    const areaMapa =
        document.querySelector(".area-mapa");

    const graficoChefia =
        document.getElementById("grafico-chefia");

    const graficoEscolaridade =
        document.getElementById("grafico-escolaridade");

    const populacaoFeminina =
        document.getElementById("populacao-feminina");

    const graficoRaca =
        document.getElementById("grafico-raca");

    const quantitativosPopulacao =
        document.getElementById("quantitativos-populacao");

    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }

    if (areaMapa) {
        areaMapa.style.display = "none";
    }

    if (graficoChefia) {
        graficoChefia.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoEscolaridade) {
        graficoEscolaridade.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoRaca) {
        graficoRaca.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (populacaoFeminina) {
        populacaoFeminina.style.setProperty(
            "display",
            "block",
            "important"
        );
    }

    if (quantitativosPopulacao) {
        quantitativosPopulacao.style.setProperty(
            "display",
            "block",
            "important"
        );
    }
}

function mostrarChefiaFamilia() {

    esconderQuantitativosRaca();
    esconderQuantitativosPopulacao();

    const paginaInicial =
        document.getElementById("pagina-inicial");

    const areaMapa =
        document.querySelector(".area-mapa");

    const grafico =
        document.getElementById("grafico-chefia");

    const graficoEscolaridade =
        document.getElementById("grafico-escolaridade");

    const populacaoFeminina =
        document.getElementById("populacao-feminina");

    const graficoRaca =
        document.getElementById("grafico-raca");


    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }

    if (areaMapa) {
        areaMapa.style.display = "block";
    }

    if (grafico) {
        grafico.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoEscolaridade) {
        graficoEscolaridade.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (populacaoFeminina) {
        populacaoFeminina.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoRaca) {
        graficoRaca.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    const botaoInicial =
        document.querySelector(".selecao-chefia");

    if (botaoInicial) {
        mostrarMapaChefia(
            "webgis",
            botaoInicial
        );
    }
}

function mostrarMapaChefia(tipo, botao) {
    const mapa =
        document.getElementById("mapa");

    if (!mapa) return;

    document
        .querySelectorAll(".selecao-chefia")
        .forEach(item => {
            item.classList.remove("ativo");
        });

    if (botao) {
        botao.classList.add("ativo");
    }

    if (tipo === "webgis") {
        mapa.innerHTML = `
            <iframe
                src="/static/Webgis/index.html"
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

function mostrarCorRaca() {

    esconderQuantitativosRaca();
    esconderQuantitativosPopulacao();

    const paginaInicial =
        document.getElementById("pagina-inicial");

    const areaMapa =
        document.querySelector(".area-mapa");

    const graficoChefia =
        document.getElementById("grafico-chefia");

    const graficoEscolaridade =
        document.getElementById("grafico-escolaridade");

    const populacaoFeminina =
        document.getElementById("populacao-feminina");

    const graficoRaca =
        document.getElementById("grafico-raca");

    const quantitativosRaca =
        document.getElementById("quantitativos-raca");


    if (paginaInicial) {
        paginaInicial.style.display = "none";
    }

    if (areaMapa) {
        areaMapa.style.display = "none";
    }

    if (graficoChefia) {
        graficoChefia.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoEscolaridade) {
        graficoEscolaridade.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (populacaoFeminina) {
        populacaoFeminina.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    if (graficoRaca) {
        graficoRaca.style.setProperty(
            "display",
            "block",
            "important"
        );

        const graficoInterativo = graficoRaca.querySelector(".grafico-raca-interativo");

        if (graficoInterativo) {
            graficoInterativo.style.display = "block";
        }
    }

    if (quantitativosRaca) {
        quantitativosRaca.style.setProperty(
            "display",
            "block",
            "important"
        );
    }

}

const indicadoresBusca = [
    {
        titulo: "População Feminina",
        palavras: [
            "população",
            "populacao",
            "mulheres",
            "Mulheres",
            "população feminina",
            "Populacao feminina",
            "mulheres x homens",
            "homens x mulheres",
        ],
        acao: mostrarPopulacaoFeminina
    },

    {
        titulo: "Escolaridade",
        palavras: [
            "escolaridade",
            "educação",
            "educacao",
            "estudo",
            "analfabetismo",
            "alfabetização",
            "alfabetizacao"
        ],
        acao: mostrarEscolaridade
    },

    {
        titulo: "Renda",
        palavras: [
            "renda",
            "salário",
            "salario",
            "rendimento",
            "dinheiro",
            "distribuição",
            "distribuicao"
        ],
        acao: mostrarRenda
    },

    {
        titulo: "Cor / Raça",
        palavras: [
            "cor",
            "raça",
            "raca",
            "negra",
            "preta",
            "parda"
        ],
        acao: mostrarCorRaca
    },

    {
        titulo: "Chefia de Família",
        palavras: [
            "chefia",
            "família",
            "familia",
            "chefe",
            "domicílio",
            "domicilio"
        ],
        acao: mostrarChefiaFamilia
    }
];

const fuseIndicadores =
    typeof Fuse !== "undefined"
        ? new Fuse(indicadoresBusca, {
            keys: ["titulo", "palavras"],
            threshold: 0.4
        })
        : null;