/**
 * Created by karina on 28-01-2018.
 */
var formula = "";
var subformulaAnswer = 0;
var isNeutralAnswer = false;
var subformulaCount = 0;
var SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '0'];

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
function run() {
    clear();

    subformulaNumber = 0;
    subformulas = [];
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
    var formulaClone = formula;
    Formula = formula;
    searchSubformuls(formulaClone);
    return subformulaNumber;
}

function clear() {
    document.getElementById("formula").innerHTML = "";
    document.getElementById("output-field").innerHTML = "";
    formula = "";
}

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
function addToSubFormuls(subformula) {
    var firstTime = true;
    for (var i = 0; i < subformulaNumber; i++) {
        if (subformula == subformulas[i]) firstTime = false;
    }
    if (firstTime) {
        subformulas[subformulaNumber] = subformula;
        for (var i = 0; i < 26; i++) {
            if (subformula == SYMBOLS[i])
                symbols[symbols.length] = subformula;
        }
        subformulaNumber++;
    }
}

//search all subformulas in a formula
function searchSubformuls(formula) {

    var result = formula.match(atomOrConstant, 'g');
    for (var i = 0; i < result.length; i++) {
        addToSubFormuls(result[i]);
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
                addToSubFormuls(subFormula);
                subFormula = "";
            }
        }
    }
}

//check if the formula is correct
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