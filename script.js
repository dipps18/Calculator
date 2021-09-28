function add(a,b){
    return (a+b);
}

function subtract(a,b){
    return (a-b);
}

function multiply(a,b){
    return (a*b);
}

function divide(a,b){
    if(b==0)
        return("Error");
    return (a/b);
}
function clear(){
    paraBottom.textContent=0;
    paraTop.textContent="";
    total=0;
    isLastButtonOperator=0;
}

function displayNumber(button){
        paraBottom.textContent=button.textContent;
        isLastButtonOperator=0;
    } 

//computes the total of the two arguments passed 
function computeTotal(a,b,button){
    if(isLastButtonOperator==0){
        if(operator=="+")
            total=add(a,b);
        else if(operator=="-")
            total=subtract(a,b);
        else if(operator=="*")
            total=multiply(a,b);
        else if(operator=="÷"){
            total=divide(a,b);
            if(total=="Error")
                alert("Cannot divide by 0");          
        }
  
    }
}

function checkDividebyZero(){
    if(total=="Error")
    paraBottom.textContent="";
}

function displayTotal(a,b,button){
    checkDividebyZero();
    if(button.textContent !="=")
    paraTop.textContent=`${total} ${button.textContent}`;
else if( button.textContent=="=" && isLastButtonOperator==0)
    paraTop.textContent=`${a}${operator}${b} =`;
paraBottom.textContent=total;
}

const bottomScreen=document.querySelector('.bottom');
const topScreen=document.querySelector('.top')
const buttons=document.querySelectorAll('button');
let isLastButtonOperator=0;
let paraBottom=document.createElement('p');
let paraTop=document.createElement('p');
paraBottom.textContent=0;
bottomScreen.append(paraBottom);
topScreen.append(paraTop);
let operator;
let total=0;

buttons.forEach((button)=>{

    button.addEventListener('click',()=>{
        if(button.parentElement.classList=="numbers")
            displayNumber(button);
        else if(button.classList=="operator"){
            if(!paraTop.textContent){
                paraTop.textContent=`${paraBottom.textContent} ${button.textContent}`;
            }
            else if(paraTop.textContent){
                let a=parseFloat(paraTop.textContent.replace(/[^0-9.-]/g,''));
                let b=parseFloat(paraBottom.textContent.replace(/[^0-9.-]/g,''));
                computeTotal(a,b);
                displayTotal(a,b,button);
                console.log(button.textContent);
            }
            operator=button.textContent;
            isLastButtonOperator=1;
        }
        else if(button.classList=="clear"){
            clear(button);
        }
    })
})
