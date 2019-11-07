var calculator = document.querySelector('.calculator');
var operators  = document.querySelectorAll(".operator"); 
var keys       = document.querySelector(".keys");
var btn        = document.querySelectorAll("button");                                            /*this returns the key that was pressed*/
const display  = document.querySelector('.calculator__display')

keys.addEventListener('click', e =>{
  if(e.target.matches("button")){
	const key = e.target
	const action = key.dataset.action
	const keyContent = key.textContent
    const displayedNum = display.textContent
	const previousKeyType = calculator.dataset.previousKeyType
		if (!action) {
		  calculator.dataset.previousKeyType = 'number';
		   // Remove .is-depressed class from all keys
             Array.from(key.parentNode.children).forEach(function(k){ k.classList.remove('is-depressed')});	
		  if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate' ) {
		    display.textContent = keyContent;
		  } else {
		      display.textContent = displayedNum + keyContent;
		  }
	}
   
	    if (action === 'add' ||
          action === 'subtract' ||
          action === 'multiply' ||
          action === 'divide') {
		    const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
			if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
              const calcValue = calculate(firstValue, operator, secondValue)
			  display.textContent = calcValue;
			  calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

    	if (action === 'decimal') {
		  calculator.dataset.previousKeyType = 'decimal'
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
        } else if (previousKeyType === 'operator' ||  previousKeyType === 'calculate') {
            display.textContent = '0.'
		}			
    }
        if (action === 'clear') {
		  const clearButton = calculator.querySelector('[data-action=clear]')
          clearButton.textContent = 'CE'
		  if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
          } else {
              key.textContent = 'AC'
          }
		  display.textContent = 0
		  calculator.dataset.previousKeyType = 'clear'
    }
    
        if (action === 'calculate') {
		  let firstValue = calculator.dataset.firstValue
          const operator = calculator.dataset.operator
  		  let secondValue = displayedNum
          if (firstValue) {
	        if (previousKeyType === 'calculate') {
              firstValue = displayedNum
			  secondValue = calculator.dataset.modValue
            }
            display.textContent = calculate(firstValue, operator, secondValue)
          }
		  calculator.dataset.modValue = secondValue
          calculator.dataset.previousKeyType = 'calculate'
        }
   }
})

const calculate = (n1, operator, n2) => {
  let result = '';
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  
  if (operator === 'add') {
    result = n1 + n2
  } else if (operator === 'subtract') {
    result = n1 - n2
  } else if (operator === 'multiply') {
    result = n1 * n2
  } else if (operator === 'divide') {
    result = n1 / n2
  }
  
  return result
}