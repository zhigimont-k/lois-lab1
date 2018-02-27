/**
 * Created by karina on 28-01-2018.
 */
var formula = "";
var subformulaAnswer = 0;
var isNeutralAnswer = false;
var table = [];
var subformulaCount = 0;

var unaryOrBinaryComplexFormula = new RegExp('([(][!]([A-Z]|[0-1])[)])|([(]([A-Z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[0-1])[)])', 'g');
var atomOrConstant = new RegExp('([A-Z]|[a-z]|[0-1])', 'g');
var RegExpFormula = new RegExp('([(][!]([A-Z]|[a-z]|[0-1])[)])|([(]([A-Z]|[a-z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[a-z]|[0-1])[)])', 'g');
var atomarExp = new RegExp('([A-Z]|[a-z]|[0-1])', 'g');
var replaceFormula = "F";
var result;
var tempFormula;

//основной алгоритм
function run() {
    clear();
    formula = document.getElementById("formula").value;
    if (!isFormula(formula)) {
        alert("Введённая формула некорректна");
        return 0;
    }
    subformulaAnswer = document.getElementById("subFormulaNumber").value;
    isNeutralAnswer = document.getElementById("neutral").checked;
    subformulaCount = getNumberOfSubformulas();
    checkAnswer();
}

//получение числа подформул
function getNumberOfSubformulas() {	
	var formulaCpy = formula;
    result = formulaCpy.match(atomOrConstant, 'g');
	if (formulaCpy.match(atomarExp, 'g')){
		return 1;
	}
    while (formulaCpy != tempFormula) {
        tempFormula = formulaCpy;
        result.push(formulaCpy.match(unaryOrBinaryComplexFormula, 'g'));
        formulaCpy = formulaCpy.replace(unaryOrBinaryComplexFormula, replaceFormula);
    }
    result = result.join(',');
    result = result.split(',');
    for (var i = 0; i < result.length; i++){
        for (var j = i + 1; j < result.length;){
            if (result[i] == result[j]) {
				result.splice(j, 1);
			} else {
				j++;
			}
		}
	}
	alert(result);
	if (result.match(atomOrConstant, 'g')){
		return 1;
	}
    return result.length - 1;
}

//проверка формулы на корректность
function isFormula() {
    var regExp = new RegExp("");
    if (!regExp.test(formula)) {
        return false;
    }
    return true;
}

//сброс
function clear() {
    document.getElementById("formula").innerHTML = "";
    document.getElementById("output-field").innerHTML = "";
    formula = "";
}

//проверка ответа пользователя
function checkAnswer() {
    if (subformulaCount == subformulaAnswer){
        //add class "correct"
        document.getElementById("output-field").innerHTML = "<p>Subformula number is correct!</p>";
    } else {
        //add class "not-correct"
        document.getElementById("output-field").innerHTML = "<p>You got subformula number wrong, the correct answer is "
            +subformulaCount+".</p>";
    }
	
	if ( isNeutralAnswer == isNeutral()){
        document.getElementById("output-field").innerHTML += "<p>Neutrality answer is correct!</p>";
    } else {
        document.getElementById("output-field").innerHTML += "<p>You got neutrality answer wrong.</p>";
    }
}

//валидация введённой формулы
function isFormula(){
	var result;
	var tempFormula;
	var formulaClone = formula;
	
	while (formulaClone != tempFormula ) {
			tempFormula = formulaClone;
			formulaClone = formulaClone.replace(RegExpFormula, replaceFormula);
	}
	  
    tempFormula=0;  
    var resultType = formulaClone.match(atomarExp, 'g');
	if ((formulaClone.length == 1) && (resultType != null) && (resultType.length == 1)){
		return true;
	}
    return false;
}