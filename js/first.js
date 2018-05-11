/**
 * Created by karina on 28-01-2018.
 */
var formula = "";
var subformulaAnswer = 0;
var isNeutralAnswer = false;
var subformulaCount = 0;
var RegExpFormula = new RegExp('([(][!]([A-Z]|[a-z]|[0-1])[)])|([(]([A-Z]|[a-z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[a-z]|[0-1])[)])', 'g');
var atomarExp = new RegExp('([A-Z]|[a-z]|[0-1])', 'g');
var unaryOrBinaryComplexSubformula = new RegExp('([(][!]([A-Z]+|[0-1])[)])|([(]([A-Z]+|[0-1])((&)|(\\|)|(->)|(~))([A-Z]+|[0-1])[)])', 'g');
var atomOrConstant = new RegExp('([A-Z]|[0-1])', 'g');

var replaceFormula = "R";
var Formula = "";

var symbols = []
var tempFormula = "";
var subformulaNumber = 0;
var subformulas = [];
var neutrality;

//runs main algorithm
//author: Жигимонт К., гр. 521702
function run() {
    clear();

    subformulaNumber = 0;
    subformulas = [];
    formula = document.getElementById("formula").value;
    if (!isFormula(formula)) {
        alert("Please input a valid formula");
        return 0;
    }
    subformulaAnswer = document.getElementById("subFormulaNumber").value;
    isNeutralAnswer = document.getElementById("neutral").checked;
    subformulaCount = getNumberOfSubformulas();
    checkAnswer();
}

//author: Жигимонт К., гр. 521702
function getNumberOfSubformulas() {
    var formulaClone = formula;
    Formula = formula;
    searchSubformulas(formulaClone);
    return subformulaNumber;
}

//author: Жигимонт К., гр. 521702
function clear() {
    document.getElementById("formula").innerHTML = "";
    document.getElementById("output-field").innerHTML = "";
    formula = "";
}

//author: Жигимонт К., гр. 521702
function checkAnswer() {
    if (subformulaCount == subformulaAnswer) {
        document.getElementById("output-field").innerHTML = "<p id='correct-answer'>Subformula number is correct!</p>";
    } else {
        document.getElementById("output-field").innerHTML = "<p id='wrong-answer'>You got subformula number wrong, the correct answer is "
            + subformulaCount + ".</p>";
    }

    if (isNeutralAnswer == createTruthTable(formula)) {
        document.getElementById("output-field").innerHTML += "<p id='correct-answer'>Neutrality answer is correct!</p>";
    } else {
        document.getElementById("output-field").innerHTML += "<p id='wrong-answer'>You got neutrality answer wrong.</p>";
    }
}

//add subformula to subformula list if it's new
//author: Жигимонт К., гр. 521702
function addToSubformulas(subformula) {
    var firstTime = true;
    for (var i = 0; i < subformulaNumber; i++) {
        if (subformula == subformulas[i]) firstTime = false;
    }
    if (firstTime) {
        subformulas[subformulaNumber] = subformula;
        if (subformula.length == 1 && subformula != "1" && subformula != "0"){
            symbols[symbols.length] = subformula;
        }
        subformulaNumber++;
    }
}

//search all subformulas in a formula
//author: Жигимонт К., гр. 521702
function searchSubformulas(formula) {
    var result = formula.match(atomOrConstant, 'g');
    for (var i = 0; i < result.length; i++) {
        addToSubformulas(result[i]);
    }
    while (formula !== tempFormula) {
        tempFormula = formula;
        result = formula.match(unaryOrBinaryComplexSubformula);
        if (result != null) {
            for (var temp = 0; temp < result.length; temp++) {
                var sub = result[temp];
                var beginIndex = formula.indexOf(sub);
                var endIndex = sub.length;
                var subFormula = "";

                formula = tempFormula.substring(0, beginIndex);
                for (var i = beginIndex; i < beginIndex + endIndex; i++) {
                    subFormula = subFormula + Formula[i];
                    formula = formula + replaceFormula;
                }
                formula = formula + tempFormula.substring(beginIndex + endIndex, tempFormula.length);
                addToSubformulas(subFormula);
                subFormula = "";
            }
        }
    }
}

//check if the formula is correct
//author: Жигимонт К., гр. 521702
function isFormula() {
    var tempFormula;
    var formulaClone = formula;
    while (formulaClone != tempFormula) {
        tempFormula = formulaClone;
        formulaClone = formulaClone.replace(RegExpFormula, replaceFormula);
    }
    tempFormula = 0;
    var resultType = formulaClone.match(atomarExp, 'g');
    return formulaClone.length == 1 && resultType != null && resultType.length == 1;
}