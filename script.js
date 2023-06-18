<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Calculadora de descontos</title>
        <style type="text/css">
        </style>
    </head>
    <body>
<script language="javascript">

<!--  

/*Declaração das variáveis*/
    var x; //vencimento
    var faixa; //faixa de desconto da previdencia
    var descontofaixa1=0; // valor de desconto da faixa 1
    var descontofaixa2=0; // valor de desconto da faixa 2
    var descontofaixa3=0; // valor de desconto da faixa 3
    var descontofaixa4=0; // valor de desconto da faixa 4 com valor inferior ao teto
    var descontofaixa4maior=0; // valor de desconto da faixa 4 com valor superior ao teto do INSS

    var soma; // valor total de recolhimento da previdencia social na folha de pagamento

/*Entrada de dados*/     
    /*Solicitar ao usuário o valor de seu vencimento básico R$*/
    x=parseFloat(window.prompt('Digite seu vencimento básico (R$):','Digite no formato: 1500.00 ou 1500,00').replace(',', '.'));
    
    document.write('Vencimentos: R$'+x);

    /*Ver em qual faixa o usuário está*/
    if(x<=1320.00){
        document.write('</p><p>Você está na faixa de contribuição previdenciária: <b>1</b></p><p>Alíquota = <b>7,5%</b>')
        faixa=1;                    
    }
    if(x>=1320.01 && x<=2571.29){
        document.write('<p>Você está na faixa de contribuição previdenciária: <b>2</b></p><p>Alíquota = <b>9%</b></p>')
        faixa=2;                    
    }
    if(x>=2571.30 && x<=3856.94){
        document.write('<p>Você está na faixa de contribuição previdenciária: <b>3</b></p><p>Alíquota = <b>12%</b></p>')
        faixa=3;                   
    }
    if(x>=3856.95 && x<=7507.49){
        document.write('<p>Você está na faixa de contribuição previdenciária: <b>4</b></p><p>Alíquota = <b>14%</b></p>')
        faixa=4;                    
    }
    if(x>7507.49){
        document.write('<p>Você está na faixa de contribuição previdenciária:<b>4</b><p>Alíquota = <b>14%</b></p>')
        faixa=5;
    }
    
    /*Calcular o valor de desconto de cada faixa*/
    if(faixa==1){
        descontofaixa1=(x-0)*0.075;
    }
    if(faixa==2){
        descontofaixa1= 1320.00*0.075;
        descontofaixa2= (x - 1320.01)*0.09;
    }
    if(faixa==3){
        descontofaixa1= 1320.00*0.075;
        descontofaixa2= (2571.29 - 1320.01)*0.09;
        descontofaixa3= (x-2571.30)*0.12;
    }
    
   
    if(faixa==4){
        descontofaixa1= 1320.00*0.075;
        descontofaixa2= (2571.29 - 1320.01)*0.09;
        descontofaixa3= (3856.94-2571.30)*0.12;                                        
        descontofaixa4= (x-3856.95)*0.14;                                                        
    }
    if(faixa==5){
        descontofaixa1= 1320.00*0.075;
        descontofaixa2= (2571.29 - 1320.01)*0.09;
        descontofaixa3= (3856.94-2571.30)*0.12;                                        
        descontofaixa4= (7507.49-3856.95)*0.14;                                                      
    }
        


    /*Somar descontos de todas as faixas*/
    soma=descontofaixa1+descontofaixa2+descontofaixa3+descontofaixa4;
    

/*Saída de dados*/
    /*Informar o valor de desconto em folha de seguridade social em R$*/
 
    document.write('<p>O desconto em folha para contribuição de plano seguridade social é de: R$'+soma);
    
/*Objetivo: Calculadora de desconto em folha de IRRF*/
/*Declaração de variáveis*/
var vencimento; // valor do vencimento básico
var descontoprevidencia;    // desconto total na folha de pagamento referente a contribuição social 
var pensao=0; // valor de pensão paga
var dependentes=0; // quantidade de dependentes do usuário
var basepadrao; // base de cálculo do IRRF padrão
var basesimplificada; // base de cálculo do IRRF simplificado
var basemaisbenefica; // base mais benéfica para o usuário (simplificado ou padrão com deduções)
var descontoirfaixa1=0; // valor de desconto do IRRF da faixa 1
var descontoirfaixa2=0; // valor de desconto do IRRF da faixa 2
var descontoirfaixa3=0;// valor de desconto do IRRF da faixa 3
var descontoirfaixa4=0;// valor de desconto do IRRF da faixa 4
var descontoirfaixa5=0;// valor de desconto do IRRF da faixa 5
var somarir; // TOTAL de descontos de IRRF
var faixair=0; 
var totaldescontos=0;

/*Entrada de dados*/
vencimento=x;
descontoprevidencia=soma;
pensao=parseFloat(window.prompt('Valor referente a pensão:','00'));
dependentes=parseFloat(window.prompt('Quantidade de dependentes:','00'));            
basepadrao=vencimento-descontoprevidencia-pensao-(dependentes*189.59);
basesimplificada=vencimento-528.00;


/*Saída de dados*/
document.write('<p>Pensão:'+pensao);
document.write('<p>Nº de dependentes:'+dependentes);                   
document.write('<p>A base de IRRF padrão é de:'+basepadrao);
document.write('<p>A base de IRRF simplificada é de:'+basesimplificada);
    /*verificar qual base de cálculo é mais benéfica para o usuário*/

if(basepadrao<=basesimplificada){
    document.write('<p>A base '+basepadrao+' é mais benéfica')
    basemaisbenefica=basepadrao;             
}
    else{ 
        document.write('<p>A base '+basesimplificada+' é a mais benéfica')
        basemaisbenefica=basesimplificada;
    }
    
    /*Ver em qual faixa o usuário está*/
    if(basemaisbenefica<=2112.00){
        document.write('<p>Você está na faixa de IRRF: <b>1 - ISENTO</b><p>Alíquota:<b>0%</b></p>')
        faixair=1;                    
    }
    if(basemaisbenefica>=2112.01 && basemaisbenefica<=2826.65){
        document.write('<p>Você está na faixa de IRRF: <b>2</b></p><p><b>Alíquota 7,5%</b></p>')
        faixair=2;                    
    }
    if(basemaisbenefica>=2826.66 && basemaisbenefica<=3751.05){
        document.write('<p>Você está na faixa de IRRF: <b>3</b></p><p><b>Alíquota 15%</b></p>')
        faixair=3;                   
    }
    if(basemaisbenefica>=3751.06 && basemaisbenefica<=4664.68){
        document.write('<p>Você está na faixa de IRRF: <b>4</b></p><p><b>Alíquota 22,5%</b></p>')
        faixair=4;                    
    }
    if(basemaisbenefica>4668.69){
        document.write('<p>Você está na faixa de IRRF:<b>5</b></p><p><b>Alíquota 27,5%</b></p>')
        faixair=5;
    }

        /*Calcular o valor de desconto de cada faixa IRRF*/
    if(faixair==1){
        descontoirfaixa1=(2112.00-0)*0;
    }
    if(faixair==2){
        descontoirfaixa1= (2112.00-0)*0;
        descontoirfaixa2= (basesimplificada - 2112.01)*0.075;
    }
    if(faixair==3){
        descontoirfaixa1= (2112.00-0)*0;
        descontoirfaixa2= (2826.65 - 2112.01)*0.075;
        descontoirfaixa3= (basesimplificada-2826.66)*0.15;
    }                
   
    if(faixair==4){
        descontoirfaixa1= (2112.00-0)*0;
        descontoirfaixa2= (2826.65 - 2112.01)*0.075;
        descontoirfaixa3= (3751.05-2826.66)*0.15;
        descontoirfaixa4= (basesimplificada-3751.06)*0.225;                                                        
    }
    if(faixair==5){
         descontoirfaixa1= (2112.00-0)*0;
        descontoirfaixa2= (2826.65 - 2112.01)*0.075;
        descontoirfaixa3= (3751.05-2826.66)*0.15;
        descontoirfaixa4= (4664.68-3751.06)*0.225;      
        descontoirfaixa5=(basesimplificada-4664.69)*0.275; 
    }


    /*Somar descontos de todas as faixas IRRF*/
    somarir=descontoirfaixa1+descontoirfaixa2+descontoirfaixa3+descontoirfaixa4+descontoirfaixa5;
                 
    /*Informar o valor de desconto em folha de IRRF em R$*/
 
    document.write('<p>O desconto em folha de IRRF é de: R$'+somarir);
    
    /*DESCONTOS TOTAIS - IRRF e CONTRIBUIÇÃO DE PREVIDÊNCIA SOCIAL*/
    totaldedescontos=descontoprevidencia+somarir
    document.write('<p>TOTAL DE DESCONTOS EM FOLHA (IRRF + CONTRIBUIÇÃO DE PREVIDÊNCIA SOCIAL):'+totaldedescontos);

//-->

</script>
</body>
</html>
