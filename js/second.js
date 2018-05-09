var countOne = 0;
var countZero = 0;
var n;

var NEGATION = "!";
var CONJUNCTION = "&";
var DISJUNCTION = "|";
var IMPLICATION = "->";
var EQUIVALENCE = "~";

var OPENING_BRACKET = "(";
var CLOSING_BRACKET = ")";

function checkNeutral (answer){
  neutrality = createTruthTable(Formula);
}

function createTruthTable(formula){
  neutrality = false;
  var ANSWER = formula;
  var sizeSymbols = symbols.length;
  n = Math.pow(2, sizeSymbols);
  countOne = 0;
  countZero = 0;

  if(sizeSymbols!=0){

    for (var i = 0; i < n; i++) {
      var valuesInRow = numberInBinary(i, sizeSymbols);
      var truthTable = setValueForSymbol(symbols, valuesInRow);
      var rewrittenFormula = rewriteFormula(formula, truthTable);
      truthTable[ANSWER] = calculateFormula(rewrittenFormula);
      if (truthTable[ANSWER] == 1) countOne++;
      if (truthTable[ANSWER] == 0) countZero++;
    }
  }
  if (countZero !=0 && countOne!=0) return true;
  return false;
}

function numberInBinary(number, stringSize){
    var string = (number).toString(2);
    for (var i = string.length; i < stringSize; i++){
        string = "0" + string;
    }
    return string;
}

function setValueForSymbol(symbolInFormula, valuesInRow){
    var row = {};
    for (var i = 0; i < symbolInFormula.length; i++){
        var symbol = symbolInFormula[i];
        row[symbol] = valuesInRow[i];
    }
    return row;
}

/* Перезапись формулы с заменой символов на константы
Константы берутся из таблицы истинности
*/

function rewriteFormula(formula, truthTable){
    var RewrittenFormula = formula;
    for (var key of Object.keys(truthTable)) {
        var val = truthTable[key];
        RewrittenFormula = RewrittenFormula.replace(new RegExp(key, 'g'), val);
    }
    return calculateFormula(RewrittenFormula);
}

/*
Подсчёт результата формулы
*/
function calculateFormula(formula){
    var regFormula = "([(][" + NEGATION + "][0-1][)])|" +
        "([(][0-1]((" + CONJUNCTION + ")|("+ "\\" + DISJUNCTION + ")|(" + IMPLICATION + ")|(" + EQUIVALENCE + "))[0-1][)])";
    regFormula = new RegExp(regFormula);
    while (regFormula.exec(formula) != null){
        var subFormula = regFormula.exec(formula)[0];
        var result = calcSubFormula(subFormula);
        formula = formula.replace(subFormula, result);
    }
    return formula;
}

/* Расчет результата 1-ой операции.
На основе входных данных получается результат унарной/бинарной простой формулы.
*/

function calcSubFormula(formula){
    if (formula[1]=="!") {
      var number = parseInt(formula[2]);
      if (!number) return 1;
      else return 0;
    }
    else if (formula[2]=="&") {
      var firstValue = parseInt(formula[1]);
      var secondValue = parseInt(formula[3]);
      if (firstValue&&secondValue)  return 1;
      else return 0;
    }
    else if (formula[2]=="|") {
      var firstValue = parseInt(formula[1]);
      var secondValue = parseInt(formula[3]);
      if (firstValue||secondValue) return 1;
      else return 0;
    }
    else if (formula[2]=="-") {
      var firstValue = parseInt(formula[1]);
      var secondValue = parseInt(formula[4]);
      if ((!firstValue)||secondValue) return 1;
      else return 0;
    }
    else if (formula[2]=="~"){
      var firstValue = parseInt(formula[1]);
      var secondValue = parseInt(formula[3]);
      if (firstValue==secondValue) return 1;
      else return 0;
    }
}