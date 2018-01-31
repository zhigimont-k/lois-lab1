/**
 * Created by karina on 28-01-2018.
 */
var formula = "";
var subformulaAnswer = 0;
var isNeutralAnswer = false;

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
    alert(getNumberOfSubformulas());

}

//получение числа подформул
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

//возвращает массив из уникальных символов подаваемого массива
function getUniqueArray(array){
    return array.filter(function(item, index, ar){return ar.indexOf(item) === index;});
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

//сброс
function clear() {
    document.getElementById("formula").innerHTML = "";
    document.getElementById("outputField").innerHTML = "";
    formula = "";
}

//проверка ответа пользователя
function checkAnswer() {

}

function showResult(){

}