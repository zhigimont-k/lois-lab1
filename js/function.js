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

//runs main algorithm
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

function getNumberOfSubformulas() {
var subformulas = 0;
    var letters = [];
    for (var i = 0; i < formula.length; i++) {
        var letter = formula.charAt(i);
        var regexp = new RegExp("[A-Z]");
        if (letter == "(") {
            subformulas++;
        }
        if (regexp.test(letter)){
            letters.push(letter);
        }
    }
    if (letters.length == 1){
        subformulas = 1;
    } else {
        subformulas += getUniqueArray(letters).length;
    }
    return subformulas;
}

//returns an array that consists of unique elements from given array
function getUniqueArray(array){
    return array.filter(function(item, index, ar){return ar.indexOf(item) === index;});
}

function clear() {
    document.getElementById("formula").innerHTML = "";
    document.getElementById("output-field").innerHTML = "";
    formula = "";
}

function checkAnswer() {
    if (subformulaCount == subformulaAnswer){
        document.getElementById("output-field").innerHTML = "<p id='correct-answer'>Subformula number is correct!</p>";
    } else {
        document.getElementById("output-field").innerHTML = "<p id='wrong-answer'>You got subformula number wrong, the correct answer is "
            +subformulaCount+".</p>";
    }
	
	if ( isNeutralAnswer == isNeutral()){
        document.getElementById("output-field").innerHTML += "<p id='correct-answer'>Neutrality answer is correct!</p>";
    } else {
        document.getElementById("output-field").innerHTML += "<p id='wrong-answer'>You got neutrality answer wrong.</p>";
    }
}

//check if the formula is correct
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
	return (formulaClone.length == 1) && (resultType != null) && (resultType.length == 1);
}