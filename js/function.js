/**
 * Created by karina on 28-01-2018.
 */
var formula = "";
var subformulaAnswer = 0;
var isNeutralAnswer = false;
var table = [];
var subformulaCount = 0;

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
    var subformulas = 0;
    var letters = [];
    for (var i = 0; i < formula.length; i++) {
        var letter = formula.charAt(i);
        var regexp = new RegExp("[A-Za-z0-1]");
        if (letter == "(") {
            subformulas++;
        }
        if (regexp.test(letter)) {
            letters.push(letter);
        }
    }
    if (letters.length == 1) {
        subformulas = 1;
    } else {
        subformulas += getUniqueArray(letters).length;
    }
    return subformulas;
}

//возвращает массив из уникальных символов подаваемого массива
function getUniqueArray(array) {
    return array.filter(function (item, index, ar) {
        return ar.indexOf(item) === index;
    });
}

//проверяет, является ли формула нейтральной
function isNeutral(formula) {

    return true;
}

//проверка формулы на корректность
function isFormula() {
    var regExp = new RegExp("");
    if (!regExp.test(formula)) {
        return false;
    }
    return true;
}

function fillTruthTable(){
    for (var i = 0; i < subformulaCount; i++){
        table[i] = [];
    }
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
}

function showResult() {

}

//валидация введённой формулы
function isFormula(){
	var RegExpFormula = new RegExp('([(][!]([A-Z]|[a-z]|[0-1])[)])|([(]([A-Z]|[a-z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[a-z]|[0-1])[)])', 'g');
	var atomarExp = new RegExp('([A-Z]|[a-z]|[0-1])', 'g');
	var replaceFormula = "F";
	var result;
	var tempFormula;
	var formulaClone = formula;

	while (formulaClone != tempFormula ) {
			tempFormula = formulaClone;
			formulaClone = formulaClone.replace(RegExpFormula, replaceFormula);
			}
	  
    tempFormula=0;  
    var resultType = formulaClone.match(new RegExp(atomarExp, 'g'));
    if ((formulaClone.length == 1) && (resultType != null) && (resultType.length == 1)) {
        return true;
    } 
	return false;
}