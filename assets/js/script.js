const data = new Date();
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth() + 1;
const diaAtual = data.getDate();

const form = document.querySelector('#formulario');
const campos = document.querySelectorAll('.required');
const span = document.querySelectorAll('.span-required');

const inforLabel = document.querySelectorAll('.inforLabel');

const resultados = document.querySelectorAll('.result');

campos[0].focus();



function validaData () {
    const dataHoje = new Date();
    const dataNasc = new Date(`${campos[2].value}-${campos[1].value}-${campos[0].value}`);
    const data = { 
        dia: campos[0].value, 
        mes: campos[1].value, 
        ano: campos[2].value
    }
    
    const dia = parseInt(data.dia)
    const mes = parseInt(data.mes)
    const ano = parseInt(data.ano)
    
    const diasNoMes = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ] 

    if(dataHoje < dataNasc){
        dataFutura();
        return false;
    }
    if (ano % 400 === 0 || ano % 4 === 0 && ano % 100 !== 0) {
      diasNoMes[2] = 29
    }
    
    if (mes < 1 || mes > 12 || dia < 1) {
        alert('Está data não existe');
        limpaInput()
        return false
    }

    else if (dia > diasNoMes[mes]) {
        alert('Está data não existe');
        limpaInput() 
        return false
    }  
    diaValidate();
    dataNascimento();
    return true
  }




form.addEventListener('submit', e =>{
    e.preventDefault();
    validaData ();
    
});


form.addEventListener('keyPress', e => {

    if (e.key === 'Enter') {
        e.preventDefault();
        validaData ();
        
    }
});

function limpaInput(){
    for(let i = 0; i < 3; i++){
        resultados[i].innerHTML = "--";
        campos[i].value = '';   
    }

}

function setError(index){
    campos[index].style.border = '2px solid #e63636';
    span[index].style.display = 'block';
    inforLabel[index].style.color = '#e63636';
}

function removeError(index){
    campos[index].style.border = '';
    span[index].style.display = 'none';
    inforLabel[index].style.color = '';
}
function diaValidate(){
    for(let i = 0; i < 3; i++){
        
        if(campos[i].value == ""){
            setError(i);
        }
        else{
            removeError(i);
        }

    }
}
function notStrin(){
    

}

function dataNascimento()   {
    const dataNasc = new Date(`${campos[2].value}-${campos[1].value}-${campos[0].value}`);

    const anoNasc = dataNasc.getFullYear();
    const mesNasc = dataNasc.getMonth() + 1;
    const diaNasc = dataNasc.getDate();
    
    calculaAno(anoNasc);
    calculaMes(diaNasc, mesNasc);
    calculaDia (diaNasc + 1);
    
}

function calculaAno( anoNasc ){
    
    if(campos[0].value == "" || campos[1].value == "" || campos[2].value == "" ){
        resultados[0].innerHTML = "--";
        resultados[1].innerHTML = "--";
        resultados[2].innerHTML = "--";
        return
    }
    const idade = anoAtual - anoNasc;
    resultados[0].innerHTML = idade;
}

function calculaMes( diaNasc, mesNasc ){
    if(campos[0].value == "" || campos[1].value == "" || campos[2].value == "" ){
        resultados[0].innerHTML = "--";
        resultados[1].innerHTML = "--";
        resultados[2].innerHTML = "--";
        return
    }
    if(diaNasc <= diaAtual){
        var dataInicio = new Date(`${anoAtual}-${mesNasc}-${diaNasc + 1}`);
        var dataFim = new Date(`${anoAtual}-${mesAtual}-${diaAtual}`);
    
        const diferencaEmMeses = (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 + (dataFim.getMonth() - dataInicio.getMonth());
        resultados[1].innerHTML = diferencaEmMeses; 

    } else{
        var dataInicio = new Date(`${anoAtual}-${mesNasc}-${diaNasc + 1}`);
        var dataFim = new Date(`${anoAtual}-${mesAtual}-${diaAtual}`);
    
        const diferencaEmMeses = (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 + (dataFim.getMonth() - dataInicio.getMonth());
        resultados[1].innerHTML = diferencaEmMeses - 1; 
    }
}

function calculaDia (diaNasc){
    if(campos[0].value == "" || campos[1].value == "" || campos[2].value == "" ){
        resultados[0].innerHTML = "--";
        resultados[1].innerHTML = "--";
        resultados[2].innerHTML = "--";
        return
    }
    if(diaNasc == diaAtual){
        resultados[2].innerHTML = 0;
        return
    }
    
    if(diaNasc < diaAtual){
        const diferencaEmDias = diaAtual - diaNasc;
        const numInteiro = parseInt(diferencaEmDias)
        const numPositivo = Math.abs(numInteiro)
        resultados[2].innerHTML = numPositivo;
        
        
    }  else {
        var dataInicio = new Date(`${anoAtual}-${mesAtual - 1}-${diaNasc}`);
        var dataFim = new Date(`${anoAtual}-${mesAtual}-${diaAtual}`);

        var diferencaEmMilissegundos =  dataInicio - dataFim;

        var diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
        const numInteiro = parseInt(diferencaEmDias)
        const numPositivo = Math.abs(numInteiro)
        resultados[2].innerHTML = numPositivo;
        
    }
}
function dataFutura(){
    alert('A data está no futuro')
    limpaInput();
}
function focusAutomarico(){
    if(campos[0].value.length == 2){
        campos[1].focus();
    }
    if(campos[1].value.length == 2){
        campos[2].focus();
    }
}
function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;   
    if((tecla>47 && tecla<58 || tecla == 32 || tecla == 13)) return true;
    else{
    	if (tecla==8 || tecla==0) return true;
	else  
	alert ( "Este campo aceita apenas números.");
	return false; 
    }
}