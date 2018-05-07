var NEGATION = "!";

var CONJUNCTION = "&";
var DISJUNCTION = "|";
var IMPLICATION = "->";
var EQUIVALENCE = "~";

var OPENING_BRACKET = "(";
var CLOSING_BRACKET = ")";
var countAnswer = 0;
var countZero = 0;
var n;

function getAnswerTypeFormula() {
	var res = "";
  if (countAnswer == n | countZero==n) {
      res = "Данная формула не является нейтральной";
   } else {
      res = "Данная формула является нейтральной";
   }
    countAnswer = 0;
	return res;
}

function isNeutral() {
  countAnswer = 0;
  return (countAnswer != n | countZero != n);
}


function getCount() {
  return countAnswer;
}

function getZer() {
    return countZero;
}

function getN() {
  return n;
}

function getTableTruth(formula){
  var ANSWER = formula;
    var symbolInFormula = getSymbolInFormula(formula);
    symbolInFormula.sort();
    var sizeSymbolInFormula = symbolInFormula.length;
    n = Math.pow(2, sizeSymbolInFormula);
    var table = {}
    countAnswer = 0;
    for (var i = 0; i < n; i++) {
        var currentNumber = numberInBinaryString(i, sizeSymbolInFormula);
        var tempObject = getConstantForSymbol(symbolInFormula, currentNumber);
        tempObject[ANSWER] = getAnswer(formula, tempObject);
        table[i] = tempObject;
          if (tempObject[ANSWER] == 1) {
            countAnswer++;
          }
        if (tempObject[ANSWER] == 0) {
            countZero++;
        }
    }
      return  {
                  table: table,
                  sizeSymbolInFormula: sizeSymbolInFormula
              }
}

function getSymbolInFormula(formula){
    var symbol = "([A-Z])";
    symbol = new RegExp(symbol, "g");
    var results = formula.match(symbol) || [];
    var symbolInFormula = results.filter(function (symbol, index) {
        return results.indexOf(symbol) == index;
    });
    return symbolInFormula;
}

function numberInBinaryString(number, stringLength){
    var string = (number >>> 0).toString(2);
    for (var i = string.length; i < stringLength; i++){
        string = "0" + string;
    }
    return string;
}

function getConstantForSymbol(symbolInFormula, currentNumber){
    var object = {};
    for (var i = 0; i < symbolInFormula.length; i++){
        var symbol = symbolInFormula[i];
        object[symbol] = currentNumber[i];
    }
    return object;
}

function getAnswer(formula, tempObject){
    var constFormula = formula;
    for (var key of Object.keys(tempObject)) {
        var val = tempObject[key];
        constFormula = constFormula.replace(new RegExp(key, 'g'), val);
    }
    return calculateFormula(constFormula);
}

function calculateFormula(formula){
    var regFormula = "([(][" + NEGATION + "][0-1][)])|" +
        "([(][0-1]((" + CONJUNCTION + ")|("+ "\\" + DISJUNCTION + ")|(" + IMPLICATION + ")|(" + EQUIVALENCE + "))[0-1][)])";
    regFormula = new RegExp(regFormula);
    while (regFormula.exec(formula) != null){
        var subFormula = regFormula.exec(formula)[0];
        var result = calculateSimpleFormula(subFormula);
        formula = formula.replace(subFormula, result);
    }
    return formula;
}

function calculateSimpleFormula(formula){
    if (formula.indexOf(NEGATION) > -1){
        return calculateNegation(formula);
    } else if (formula.indexOf(CONJUNCTION) > -1){
        return calculateConjunction(formula);
    } else if (formula.indexOf(DISJUNCTION) > -1){
        return calculateDisjunction(formula);
    } else if (formula.indexOf(IMPLICATION) > -1){
        return calculateImplication(formula);
    } else if (formula.indexOf(EQUIVALENCE) > -1){
        return calculateEquivalence(formula);
    }
}

function calculateNegation(formula) {
    var number = parseInt(formula[2]);
	return Number(!number);
}

function calculateConjunction(formula) {
    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
	return Number(firstValue&&secondValue);
}

function calculateDisjunction(formula) {
    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
	return Number(firstValue || secondValue);
}

function calculateImplication(formula) {
    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[4]);
	return Number((!firstValue)||secondValue);
}

function calculateEquivalence(formula) {
    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
	return Number(firstValue==secondValue);
}