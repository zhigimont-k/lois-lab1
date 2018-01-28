/**
 * Created by karina on 28-01-2018.
 */
function run(){
    clear();
    if (!document.getElementById("input").value){
        alert("Введите формулу");
        return 0;
    }
    var userInput = document.getElementById("input").value;
    if(isFormula(userInput)){
        document.getElementById("outputField").innerHTML = "Является формулой.";
    } else {
        document.getElementById("outputField").innerHTML = "Не является формулой.";
    }
}

function generateFormula(){
    clear();
    document.getElementById("input").value = "(A|B)";
}

function isFormula(string){
    return true;
}

function clear(){
    document.getElementById("input").innerHTML = "";
    document.getElementById("outputField").innerHTML = "";
}