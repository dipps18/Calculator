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
        return("Error, cannot divide by 0");
    return (a/b);
}
function clear(){
    paraBottom.textContent=0;
    paraTop.textContent="";
    total=0;
    isLastButtonOperator=0;
}

function calcTotal(a,b,operator){
    if(operator=="+")
        return add(a,b);
    else if(operator=="-")
        return subtract(a,b);
    else if(operator=="*")
        return multiply(a,b);
    else 
        return divide(a,b);
}

function updateScreen(value,operator){
    paraTop.textContent=`${value} ${operator}`;
    paraBottom.textContent=`${value}`;
}


const bottomScreen=document.querySelector('.bottom');
const topScreen=document.querySelector('.top');
let paraBottom=document.createElement('p');
let paraTop=document.createElement('p');
bottomScreen.appendChild(paraBottom);
topScreen.appendChild(paraTop);
paraBottom.textContent="0";
let prevOperator,curOperator,prevButton;
let buttonClass,buttonText;
let decimalUsed=0;

const buttons=document.querySelectorAll('button');

buttons.forEach((button)=>{
    button.addEventListener('click',()=>{    
           buttonClass=button.parentElement.classList;
        buttonText=button.textContent;

        if(buttonClass=="numbers"){ 
            if(paraBottom.textContent.indexOf('.')==-1)
                decimalUsed=0;
            else
                decimalUsed=1;

            if(prevButton!="numbers" && button.textContent!="."){
                paraBottom.textContent=buttonText;
            }
            else if(decimalUsed==0 || button.textContent!="."){
                paraBottom.textContent+=buttonText;
            }
            prevButton="numbers";
        }

        else if(button.classList=="operator"){
            curOperator=button.textContent;
            console.log(curOperator);

            if(curOperator=="%"){
                let a=parseFloat(paraBottom.textContent);
                b=100;
                let total=calcTotal(a,b,divide);
                paraBottom.textContent=total;
                prevOperator="%";
            }
            else if(curOperator!="="){
                //if the previous button is number or there is no previous button, then 0(paraBottom.textContent) along with the operator are displayed on the top screen 
                if(!prevOperator){
                    updateScreen(paraBottom.textContent,curOperator);
                }
            
                else if((prevButton=="numbers" || prevButton=="backspace"||prevOperator=="%" ) && paraTop.textContent && prevOperator!="="){
                    let a,b,total;
                    a=parseFloat(paraTop.textContent.replace(/[^0-9.-]/g));
                    b=parseFloat(paraBottom.textContent.replace(/[^0-9.-]/g));
                    if(prevOperator!="%")
                        total=calcTotal(a,b,prevOperator);
                    else 
                        total=calcTotal(a,b,curOperator);
                    updateScreen(total,curOperator);
                }

                else{
                    updateScreen(paraBottom.textContent,curOperator);
                }
                prevOperator=curOperator;
            }   

            else if(curOperator=="="){
                if(prevButton && prevButton!="operator" && prevButton!="backspace"){
                    let a=parseFloat(paraTop.textContent.replace(/[^0-9.-]/g));
                    let b=parseFloat(paraBottom.textContent.replace(/[^0-9.-]/g));
                    let total=calcTotal(a,b,prevOperator);
                    paraTop.textContent=`${a} ${prevOperator} ${b} =`
                    paraBottom.textContent=`${total}`;
                    prevOperator="=";
                }
            }
            prevButton="operator";
        }
        
        else if(button.classList=="clear"){
            paraBottom.textContent="0"
            paraTop.textContent="";
            curOperator="";
            prevOperator="";
            prevButton="clear";
        }

        else if(button.classList=="backspace"){
            paraBottom.textContent=paraBottom.textContent.slice(0,-1);
            if(!paraBottom.textContent)
                paraBottom.textContent=0;
            prevButton="backspace";
        }

    })

})

