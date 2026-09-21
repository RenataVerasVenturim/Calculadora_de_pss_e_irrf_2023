/* JS Document */
/*
 * OBJETIVO:
 * Calculadora de desconto em folha de Previdência Social e IRRF
 *
 * ATUALIZAÇÃO:
 * Valores e regras vigentes para 2026.
 *
 * IRRF:
 * - Tabela mensal 2026
 * - Desconto simplificado: R$ 607,20
 * - Dependente: R$ 189,59
 * - Redução do IR para rendimentos tributáveis até R$ 7.350,00
 *
 * PREVIDÊNCIA:
 * - Modelo preservado conforme calculadora original:
 *   7,5% / 9% / 12% / 14%
 * - Limitado ao teto de R$ 8.475,55
 */


/* ============================================================
   FUNÇÃO PRINCIPAL
   ============================================================ */

function js_calcular() {

    /* ========================================================
       TABELA PREVIDENCIÁRIA 2026
       ======================================================== */

    var tabelavalor1 = 1621.00;
    var tabelavalor2 = 1621.01;
    var tabelavalor3 = 2902.84;
    var tabelavalor4 = 2902.85;
    var tabelavalor5 = 4354.27;
    var tabelavalor6 = 4354.28;
    var tabelavalor7 = 8475.55;

    /*
     * Tabela:
     *
     * Até R$ 1.621,00       -> 7,5%
     * R$ 1.621,01–2.902,84 -> 9%
     * R$ 2.902,85–4.354,27 -> 12%
     * R$ 4.354,28–8.475,55 -> 14%
     *
     * Acima do teto:
     * contribuição fica limitada ao valor calculado
     * até R$ 8.475,55.
     */


    /* ========================================================
       TABELA IRRF 2026
       ======================================================== */

    var irrfFaixa1 = 2428.80;
    var irrfFaixa2 = 2826.65;
    var irrfFaixa3 = 3751.05;
    var irrfFaixa4 = 4664.68;

    var irrfAliquota1 = 0.00;
    var irrfAliquota2 = 0.075;
    var irrfAliquota3 = 0.15;
    var irrfAliquota4 = 0.225;
    var irrfAliquota5 = 0.275;

    /*
     * Parcelas a deduzir:
     *
     * Faixa 1: R$ 0,00
     * Faixa 2: R$ 182,16
     * Faixa 3: R$ 394,16
     * Faixa 4: R$ 675,49
     * Faixa 5: R$ 908,73
     */

    var irrfDeducao1 = 0.00;
    var irrfDeducao2 = 182.16;
    var irrfDeducao3 = 394.16;
    var irrfDeducao4 = 675.49;
    var irrfDeducao5 = 908.73;


    /* ========================================================
       DEDUÇÕES IRRF
       ======================================================== */

    var deducaoSimplificado = 607.20;
    var deducaoDependente = 189.59;


    /* ========================================================
       REDUÇÃO IRRF 2026
       ======================================================== */

    var limiteReducaoIntegral = 5000.00;
    var limiteReducaoParcial = 7350.00;

    /*
     * Para rendimentos até R$ 5.000:
     * o IR calculado pela tabela é reduzido até zero.
     *
     * De R$ 5.000,01 até R$ 7.350:
     *
     * redução =
     * 978,62 - (0,133145 × rendimento tributável)
     *
     * Acima de R$ 7.350:
     * não há redução.
     */


    /* ========================================================
       DECLARAÇÃO DAS VARIÁVEIS
       ======================================================== */

    var x; // remuneração bruta

    var faixa = 0;
    var aliquotacontribuicao = 0;

    var descontofaixa1 = 0;
    var descontofaixa2 = 0;
    var descontofaixa3 = 0;
    var descontofaixa4 = 0;

    var soma = 0;

    var vencimento = 0;
    var descontoprevidencia = 0;

    var pensao = 0;
    var dependentes = 0;
    var outrasdeducoes = 0;

    var basepadrao = 0;
    var basesimplificada = 0;
    var basemaisbenefica = 0;

    var descontoirfaixa1 = 0;
    var descontoirfaixa2 = 0;
    var descontoirfaixa3 = 0;
    var descontoirfaixa4 = 0;
    var descontoirfaixa5 = 0;

    var somarir = 0;
    var reducaoIR = 0;

    var faixair = 0;
    var aliquotair = 0;

    var totaldescontos = 0;


    /* ========================================================
       ENTRADA DE DADOS
       ======================================================== */

    x = document.forms.f_calculadora.f_vencimentos.value;

    x = parseFloat(
        x.replace(',', '.')
    );


    /* Verificar remuneração */

    if (isNaN(x)) {

        window.alert(
            'Insira um valor de salário/remuneração bruta!'
        );

        return;
    }


    /* ========================================================
       LEITURA DOS DEMAIS CAMPOS
       ======================================================== */

    outrasdeducoes = parseFloat(
        document.forms.f_calculadora.f_outrasdeducoes.value
    );

    pensao = parseFloat(
        document.forms.f_calculadora.f_pensao.value
    );

    dependentes = parseFloat(
        document.forms.f_calculadora.f_dependentes.value
    );


    /*
     * Se os campos estiverem vazios, considerar zero.
     */

    if (isNaN(outrasdeducoes)) {
        outrasdeducoes = 0;
    }

    if (isNaN(pensao)) {
        pensao = 0;
    }

    if (isNaN(dependentes)) {
        dependentes = 0;
    }


    /* ========================================================
       VALIDAÇÕES
       ======================================================== */

    if (x < 0) {

        window.alert(
            'Por favor, insira um número válido na remuneração.'
        );

        return;
    }


    if (pensao < 0) {

        window.alert(
            'Por favor, insira um número válido para pensão, em reais.'
        );

        return;
    }


    if (dependentes < 0) {

        window.alert(
            'Por favor, insira um número válido para dependentes.'
        );

        return;
    }


    if (outrasdeducoes < 0) {

        window.alert(
            'Por favor, insira um número válido para "outras deduções".'
        );

        return;
    }


    /* ========================================================
       CÁLCULO DA PREVIDÊNCIA SOCIAL
       ======================================================== */

    /*
     * Determinação da faixa previdenciária.
     */

    if (x <= tabelavalor1) {

        faixa = 1;
        aliquotacontribuicao = 7.50;

    }
    else if (x <= tabelavalor3) {

        faixa = 2;
        aliquotacontribuicao = 9.00;

    }
    else if (x <= tabelavalor5) {

        faixa = 3;
        aliquotacontribuicao = 12.00;

    }
    else {

        faixa = 4;
        aliquotacontribuicao = 14.00;

    }


    /* ========================================================
       CÁLCULO PROGRESSIVO DA PREVIDÊNCIA
       ======================================================== */

    /*
     * Faixa 1
     */

    descontofaixa1 =
        Math.min(x, tabelavalor1) * 0.075;


    /*
     * Faixa 2
     */

    if (x > tabelavalor1) {

        descontofaixa2 =
            (Math.min(x, tabelavalor3) - tabelavalor1) * 0.09;

    }


    /*
     * Faixa 3
     */

    if (x > tabelavalor3) {

        descontofaixa3 =
            (Math.min(x, tabelavalor5) - tabelavalor3) * 0.12;

    }


    /*
     * Faixa 4
     *
     * Limitada ao teto de R$ 8.475,55.
     */

    if (x > tabelavalor5) {

        descontofaixa4 =
            (Math.min(x, tabelavalor7) - tabelavalor5) * 0.14;

    }


    /*
     * Total da previdência
     */

    soma =
        descontofaixa1 +
        descontofaixa2 +
        descontofaixa3 +
        descontofaixa4;


    /* ========================================================
       CÁLCULO DA BASE DO IRRF
       ======================================================== */

    vencimento = x;

    descontoprevidencia = soma;


    /*
     * BASE COM DEDUÇÕES LEGAIS
     *
     * Previdência
     * Pensão
     * Dependentes
     * Outras deduções legais
     */

    basepadrao =
        vencimento
        - descontoprevidencia
        - pensao
        - (dependentes * deducaoDependente)
        - outrasdeducoes;


    /*
     * BASE COM DESCONTO SIMPLIFICADO
     *
     * Em 2026:
     * R$ 607,20
     */

    basesimplificada =
        vencimento - deducaoSimplificado;


    /*
     * A base mais benéfica é a MENOR das duas.
     */

    basemaisbenefica =
        Math.min(
            basepadrao,
            basesimplificada
        );


    /*
     * Evitar base negativa.
     */

    if (basemaisbenefica < 0) {

        basemaisbenefica = 0;

    }


    /* ========================================================
       TABELA IRRF 2026
       ======================================================== */

    if (basemaisbenefica <= irrfFaixa1) {

        faixair = 1;
        aliquotair = 0;

        descontoirfaixa1 = 0;

    }
    else if (basemaisbenefica <= irrfFaixa2) {

        faixair = 2;
        aliquotair = 7.5;

        descontoirfaixa2 =
            (basemaisbenefica * irrfAliquota2)
            - irrfDeducao2;

    }
    else if (basemaisbenefica <= irrfFaixa3) {

        faixair = 3;
        aliquotair = 15;

        descontoirfaixa3 =
            (basemaisbenefica * irrfAliquota3)
            - irrfDeducao3;

    }
    else if (basemaisbenefica <= irrfFaixa4) {

        faixair = 4;
        aliquotair = 22.5;

        descontoirfaixa4 =
            (basemaisbenefica * irrfAliquota4)
            - irrfDeducao4;

    }
    else {

        faixair = 5;
        aliquotair = 27.5;

        descontoirfaixa5 =
            (basemaisbenefica * irrfAliquota5)
            - irrfDeducao5;

    }


    /* ========================================================
       IRRF ANTES DA REDUÇÃO
       ======================================================== */

    somarir =
        descontoirfaixa1 +
        descontoirfaixa2 +
        descontoirfaixa3 +
        descontoirfaixa4 +
        descontoirfaixa5;


    /*
     * Segurança contra resultado negativo.
     */

    if (somarir < 0) {

        somarir = 0;

    }


    /* ========================================================
       REDUÇÃO DO IRRF - 2026
       ======================================================== */

    /*
     * IMPORTANTE:
     *
     * A redução utiliza o RENDIMENTO TRIBUTÁVEL
     * sujeito à incidência mensal.
     *
     * Portanto, utiliza "x" e NÃO
     * "basemaisbenefica".
     */


    if (x <= limiteReducaoIntegral) {

        /*
         * Até R$ 5.000,00:
         * reduzir o IR calculado até zero.
         */

        reducaoIR = somarir;

    }
    else if (x <= limiteReducaoParcial) {

        /*
         * R$ 5.000,01 até R$ 7.350,00
         */

        reducaoIR =
            978.62 -
            (0.133145 * x);


        /*
         * A redução não pode ser maior
         * que o próprio IR devido.
         */

        if (reducaoIR > somarir) {

            reducaoIR = somarir;

        }


        /*
         * Segurança contra redução negativa.
         */

        if (reducaoIR < 0) {

            reducaoIR = 0;

        }

    }
    else {

        /*
         * Acima de R$ 7.350,00:
         * não há redução.
         */

        reducaoIR = 0;

    }


    /*
     * IRRF final após a redução.
     */

    somarir =
        somarir - reducaoIR;


    if (somarir < 0) {

        somarir = 0;

    }


    /* ========================================================
       TOTAL DE DESCONTOS
       ======================================================== */

    totaldescontos =
        descontoprevidencia +
        somarir;


    /* ========================================================
       SAÍDA DOS RESULTADOS
       ======================================================== */

    document.getElementById("x").textContent =
        x.toFixed(2);


    document.getElementById("faixa").textContent =
        faixa.toFixed(0);


    document.getElementById("aliquotacontribuicao").textContent =
        aliquotacontribuicao.toFixed(2);


    document.getElementById("soma").textContent =
        soma.toFixed(2);


    document.getElementById("pensao").textContent =
        pensao.toFixed(2);


    document.getElementById("dependentes").textContent =
        dependentes.toFixed(0);


    document.getElementById("outrasdeducoes").textContent =
        outrasdeducoes.toFixed(2);


    document.getElementById("basepadrao").textContent =
        basepadrao.toFixed(2);


    document.getElementById("basesimplificada").textContent =
        basesimplificada.toFixed(2);


    document.getElementById("basemaisbenefica").textContent =
        basemaisbenefica.toFixed(2);


    document.getElementById("faixair").textContent =
        faixair.toFixed(0);


    document.getElementById("aliquotair").textContent =
        aliquotair.toFixed(1);


    document.getElementById("somarir").textContent =
        somarir.toFixed(2);


    document.getElementById("totaldescontos").textContent =
        totaldescontos.toFixed(2);


    /* ========================================================
       FINALIZAÇÃO
       ======================================================== */

    window.alert(
        'Cálculo realizado com sucesso!'
    );

}


/* ============================================================
   TOOLTIP DA CALCULADORA
   ============================================================ */

document.getElementById("info-calculadora")
    .addEventListener("click", function () {

        var tooltip =
            document.getElementById("tooltip-calculadora");

        tooltip.style.display =
            (tooltip.style.display === "block")
                ? "none"
                : "block";

    });
