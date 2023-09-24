/*JS Document*/
/*OBJETIVO: Calculadora de desconto em folha de Seguridade social e IRRF*/
/*Declaração das variáveis*/
function js_calcular(){
    var x; //vencimento
    var faixa; //faixa de desconto da previdencia
    var descontofaixa1=0; // valor de desconto da faixa 1
    var descontofaixa2=0; // valor de desconto da faixa 2
    var descontofaixa3=0; // valor de desconto da faixa 3
    var descontofaixa4=0; // valor de desconto da faixa 4 com valor inferior ao teto
    var descontofaixa4maior=0; // valor de desconto da faixa 4 com valor superior ao teto do INSS
    var aliquotacontribuicao=0; // alíquota de contribuição social

    var soma; // valor total de recolhimento da previdencia social na folha de pagamento

    var vencimento; // valor do vencimento básico
    var descontoprevidencia;    /*desconto total na folha de pagamento referente a contribuição social*/ 
    var pensao=0; /*valor de pensão paga*/
    var dependentes=0; /* quantidade de dependentes do usuário*/
    var outrasdeducoes=0; /* outras deduções legais do usuário*/
    var basepadrao; /*base de cálculo do IRRF padrão*/
    var basesimplificada; /*base de cálculo do IRRF simplificado*/
    var basemaisbenefica; /*base mais benéfica para o usuário (simplificado ou padrão com deduções)*/
    var descontoirfaixa1=0; /*valor de desconto do IRRF da faixa 1*/
    var descontoirfaixa2=0; /* valor de desconto do IRRF da faixa 2*/
    var descontoirfaixa3=0;/* valor de desconto do IRRF da faixa 3*/
    var descontoirfaixa4=0;/* valor de desconto do IRRF da faixa 4*/
    var descontoirfaixa5=0;/* valor de desconto do IRRF da faixa 5*/
    var somarir; // TOTAL de descontos de IRRF
    var faixair=0; // faixa de irrf em que o usuário se encontra
    var totaldescontos=0; // TOTAL de descontos de PSS e IRRF
    var aliquotair=0; // alíquota de irrf    
    
/*Entrada de dados*/     
    /*Impedir entrada de valor vazio */
    x=document.forms.f_calculadora.f_vencimentos.value;
    x=parseFloat(x.replace(',', '.'));

    if(x==="" || isNaN(x)){
        window.alert('Insira um valor de salário/remuneração bruta!')
        return;
    }
    else{
    /*Usuário insere o valor de outras deduções legais, se houver*/
    outrasdeducoes=parseFloat(document.forms.f_calculadora.f_outrasdeducoes.value);
    /*Usuário insere o valor de pensão, se houver*/
    pensao=parseFloat(document.forms.f_calculadora.f_pensao.value);
    /*Usuário insere a quantidade de dependentes, se houver */
    dependentes=parseFloat(document.forms.f_calculadora.f_dependentes.value);     
    
    /*Invalidar quando vencimento não for inserido */

    /*Invalidar números negativos inseridos pelo usuário*/
    if(x<0)
        {
            window.alert('Por favor, insira um número válido na remuneração');
    }
    else{
        if(pensao<0){
            window.alert('Por favor, insira um número válido para pensão, em reais')
        } 
        else{
            if(dependentes<0){
                window.alert('Por favor, insira um número válido para dependentes')
            }
            else{
                if(outrasdeducoes<0){
                    window.alert('Por favor, insira um número válido para "outras deduções"')
                }
                else{
   

    /*Ver em qual faixa o usuário está*/
    if(x<=1320.00){
        faixa=1;
        aliquotacontribuicao=7.50;
    }
    else{    if(x>=1320.01 && x<=2571.29){
        faixa=2; 
        aliquotacontribuicao=9;
    }
             else{if(x>=2571.30 && x<=3856.94){
                faixa=3;  
                aliquotacontribuicao=12;
            }
            else{        if(x>=3856.95 && x<=7507.49){
                faixa=4;  
                aliquotacontribuicao=14;
            }
                        else{
                            if(x>7507.49){
                                faixa=5;
                                aliquotacontribuicao=14;
                            }
                }
            } 
        }
    }

    
    
    /*Calcular o valor de desconto de cada faixa*/
    if(faixa==1){
        descontofaixa1=(x-0)*0.075;
    }
    else{if(faixa==2){
        descontofaixa1= 1320.00*0.075;
        descontofaixa2= (x - 1320.01)*0.09;
        }
        else{
            if(faixa==3){
                descontofaixa1= 1320.00*0.075;
                descontofaixa2= (2571.29 - 1320.01)*0.09;
                descontofaixa3= (x-2571.29)*0.12;
            }
            else{
                if(faixa==4){
                    descontofaixa1= 1320.00*0.075;
                    descontofaixa2= (2571.29 - 1320.01)*0.09;
                    descontofaixa3= (3856.94-2571.29)*0.12;                                        
                    descontofaixa4= (x-3856.95)*0.14;                                                        
                }
                else{if(faixa==5){
                    descontofaixa1= 1320.00*0.075;
                    descontofaixa2= (2571.29 - 1320.01)*0.09;
                    descontofaixa3= (3856.94-2571.29)*0.12;                                        
                    descontofaixa4= (7507.49-3856.95)*0.14;                                                      
                }
                    
                }
            }
        }
    }        

    /*Somar descontos de todas as faixas - PREVIDENCIA SOCIAL*/
    soma=descontofaixa1+descontofaixa2+descontofaixa3+descontofaixa4;
    
    /*Objetivo: Calculadora de desconto em folha de IRRF*/
    vencimento=x;
    descontoprevidencia=soma;
    basepadrao=vencimento-descontoprevidencia-pensao-(dependentes*189.59);
    basesimplificada=vencimento-528.00;

 
    /*verificar qual base de cálculo é mais benéfica para o usuário*/

if(basepadrao<=basesimplificada){
    basemaisbenefica=basepadrao;  
    document.getElementById("basemaisbenefica").textContent = basemaisbenefica.toFixed(2);
               
}
    else{ 
        basemaisbenefica=basesimplificada;
        document.getElementById("basemaisbenefica").textContent = basemaisbenefica.toFixed(2);

    }
    
    /*Ver em qual faixa o usuário está*/
    if(basemaisbenefica<=2112.00){
        faixair=1;
        aliquotair=0;   
    }
    else{if(basemaisbenefica>=2112.01 && basemaisbenefica<=2826.65){
        faixair=2;     
        aliquotair=7.5;
    }   
        else{
            if(basemaisbenefica>=2826.66 && basemaisbenefica<=3751.05){
                faixair=3; 
                aliquotair=15;
                              
            }
            else{
                if(basemaisbenefica>=3751.06 && basemaisbenefica<=4664.68){
                    faixair=4;    
                    aliquotair=22.5;   
                    
                }
                else{
                    if(basemaisbenefica>4668.69){
                        faixair=5;
                        aliquotair=27.5;
                    }
               
                }
            
            }
        }

    }

        /*Calcular o valor de desconto de cada faixa IRRF*/
    if(faixair==1){
        descontoirfaixa1=(2112.00-0)*0;
    }
    else{
        if(faixair==2){
            descontoirfaixa2= basemaisbenefica*0.075-158.40;
        } 
        else{
            if(faixair==3){
                descontoirfaixa3= basemaisbenefica*0.15-370.40;
            }  
            else{
                if(faixair==4){
                    descontoirfaixa4= basemaisbenefica*0.225-651.73;                                                        
                }
                else{
                    if(faixair==5){     
                       descontoirfaixa5=basemaisbenefica*0.275-884.96; 
                   }
               
                }
            
            }              
           
        }      

    }
    
    

        /*Somar descontos de todas as faixas IRRF*/
        somarir=descontoirfaixa1+descontoirfaixa2+descontoirfaixa3+descontoirfaixa4+descontoirfaixa5;             

/*Saída de dados*/
    
        
    /*Exibir o valor da variável x no elemento span com o id "x"*/
    document.getElementById("x").textContent = x.toFixed(2); // Exibe o valor com 2 casas decimais

    /*Exibir o valor da variável faixa no elemento span com o id "faixa"*/
    document.getElementById("faixa").textContent = faixa.toFixed(0);             
    /*Exibir o valor da variável aliquotacontribuicao no elemento span com o id "faixa"*/
    document.getElementById("aliquotacontribuicao").textContent =  aliquotacontribuicao.toFixed(2);
    /*Informar o valor de desconto em folha de seguridade social em R$*/
    document.getElementById("soma").textContent = soma.toFixed(2);
    /*Exibir o valor da variável pensao span com o id "pensao"*/
    document.getElementById("pensao").textContent = pensao.toFixed(2);
    /*Exibir o valor da variável dependentes span com o id "dependentes"*/
    document.getElementById("dependentes").textContent = dependentes.toFixed(0);
    /*Exibir o valor da variável outrasdeducoes span com o id "outrasdeducoes"*/
    document.getElementById("outrasdeducoes").textContent = outrasdeducoes.toFixed(2);
    /*Exibir o valor da variável basepadrao span com o id "basepadrao"*/
    document.getElementById("basepadrao").textContent = basepadrao.toFixed(2);
    /*Exibir o valor da variável basesimplificada span com o id "basesimplificada"*/
    document.getElementById("basesimplificada").textContent = basesimplificada.toFixed(2);
    /*Exibir o valor da variável soma span com o id "soma"*/
    document.getElementById("soma").textContent = soma.toFixed(2);
    /*Exibir o valor da variável faixair span com o id "faixair"*/
   document.getElementById("faixair").textContent = faixair.toFixed(0);
    /*Exibir o valor da variável aliquotair span com o id "aliquotair"*/
    document.getElementById("aliquotair").textContent = aliquotair.toFixed(1);
    /*Exibir o valor da variável somarir span com o id "somarir"*/
    document.getElementById("somarir").textContent = somarir.toFixed(2);
    /*DESCONTOS TOTAIS - IRRF e CONTRIBUIÇÃO DE PREVIDÊNCIA SOCIAL*/
    totaldescontos=parseFloat(descontoprevidencia+somarir);
    document.getElementById("totaldescontos").textContent = totaldescontos.toFixed(2);
    
    /*Aviso de cálculo realizado com sucesso*/
    window.alert('Cálculo realizado com sucesso!')
                                }
                            }
                        }
                    }
                }

            }

document.getElementById("info-calculadora").addEventListener("click", function() {
  var tooltip = document.getElementById("tooltip-calculadora");
  tooltip.style.display = (tooltip.style.display === "block") ? "none" : "block";
});
            

