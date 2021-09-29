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
        if(paraBottom.textContent=="0" || isLastButtonOperator || isLastButtonEqualTo)
            paraBottom.textContent=button.textContent
        else if(!isLastButtonOperator)
            paraBottom.textContent+=button.textContent;

        total=paraBottom.textContent; //change value of total to current current number
        isLastButtonOperator=0;
        isLastButtonEqualTo=0;
    } 

//computes the total of the two arguments passed 
function computeTotal(a,b,button){
 
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

function checkDividebyZero(){
    if(total=="Error")
    paraBottom.textContent="";
}

function displayTotal(a,b,button){
    checkDividebyZero();
    if(button.textContent !="=") //if button is not '=' then the display the total(which doesn't change) and operator(which could change) on the top screen
        paraTop.textContent=`${total} ${button.textContent}`;
    else if( button.textContent=="="){ //if button is '=' and the last button was a number then condition is true
        paraTop.textContent=`${a} ${operator} ${b} =`;
    }
    paraBottom.textContent=total;
}

const bottomScreen=document.querySelector('.bottom');
const topScreen=document.querySelector('.top')
const buttons=document.querySelectorAll('button');
let isLastButtonOperator=0;
let isLastButtonEqualTo=0;
let paraBottom=document.createElement('p');
let paraTop=document.createElement('p');
let operator;
let total=0;

paraBottom.textContent=0;
bottomScreen.append(paraBottom);
topScreen.append(paraTop);


buttons.forEach((button)=>{

    button.addEventListener('click',()=>{
        if(button.parentElement.classList=="numbers")
            displayNumber(button);
        else if(button.classList=="operator"){
            if(!paraTop.textContent)//if there is no operator pressed then the number previously pressed along with the operator will be displayed on the top half of the screen
                paraTop.textContent=`${paraBottom.textContent} ${button.textContent}`;
            else if(paraTop.textContent && paraBottom.textContent){//if there exists text on the top half of the calculator 
                let a=parseFloat(paraTop.textContent.replace(/[^0-9.-]/g,''));
                let b=parseFloat(paraBottom.textContent.replace(/[^0-9.-]/g,''));
                if(isLastButtonOperator==0){//if last button pressed is not operator then total is computed
                    computeTotal(a,b); 
                    displayTotal(a,b,button);
                }
                else if(button.textContent!="=" && isLastButtonOperator){//last button pressed is not '=' but the last button is an operator, then we only change the
                    paraTop.textContent=`${total} ${button.textContent}`;
                }

            }
            if(button.textContent!="=")//since = is not an operator
                operator=button.textContent;
            isLastButtonOperator=1;
        }
        else if(button.classList=="clear"){
            clear(button);
        }
        else if(button.classList=="backspace"){
            paraBottom.textContent=paraBottom.textContent.slice(0,-1);
        }
    })
})
