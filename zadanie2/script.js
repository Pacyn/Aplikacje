function insertToFrom(){
    insert(document.getElementById("insertForm").value, document.getElementById("dateForm").value, true);
}

function insert(insertToForm, insertToDate, initialize, inex){
    if(insertToForm.length < 3 || insertToForm.length > 255) return;
    if(initialize)
        if(new Date(insertToDate) < Date.now()) return;
    let newItem = document.createElement("p");
    newItem.setAttribute("class","pclass"); 
    if(!initialize)
        newItem.setAttribute("dataIndex",inex);
    objects.appendChild(newItem);
    let secondItem = document.createElement("a");
    secondItem.setAttribute("class","texta");
    secondItem.setAttribute("onclick","inputTextbox()");
    secondItem.innerText = insertToForm;
    newItem.appendChild(secondItem);

    if(initialize){
        var valuesArray = JSON.parse(localStorage.getItem("valueses"));
        if(valuesArray == null)
            valuesArray = [];
        valuesArray.push(insertToForm);
        localStorage.setItem("valueses", JSON.stringify(valuesArray));
    }
    

    if(new Date(insertToDate) >= Date.now() || insertToDate == 0){
        secondItem = document.createElement("a");
        secondItem.innerText = `\t${insertToDate}`;
        newItem.appendChild(secondItem);
        if(initialize){
                datesArray = JSON.parse(localStorage.getItem('dates'));
            if(datesArray == null)
                datesArray = [];
            if(insertToDate == 0)
                datesArray.push(null);
            else
                datesArray.push(insertToDate);
            localStorage.setItem('dates', JSON.stringify(datesArray));
            loadFunction();
        }
    }

    let remove = document.createElement("button");
    remove.type = "button";
    remove.innerText = "Remove";
    remove.setAttribute("onclick", "removeElement()");
    newItem.appendChild(remove);
}

function inputTextbox(){
    var input = event.target;
    let inputItem = document.createElement("input");
    inputItem.id = "temp";
    inputItem.defaultValue = input.innerText;
    input.innerText = "";
    input.appendChild(inputItem);
    inputItem.focus();
    inputItem.onblur = function(){
        var valueses = JSON.parse(localStorage.getItem("valueses"));
        let text = input.querySelector("input").value;
        valueses[input.parentElement.getAttribute("dataIndex")] = text;
        input.innerText = text;
        localStorage.setItem('valueses', JSON.stringify(valueses));
        loadFunction();
    };
}

function removeElement(){
    var valueses = JSON.parse(localStorage.getItem("valueses"));
    var dates = JSON.parse(localStorage.getItem('dates'));
    var input = event.target;
    valueses.splice(input.parentElement.getAttribute("dataIndex"),1);
    dates.splice(input.parentElement.getAttribute("dataIndex"),1);
    localStorage.setItem('valueses', JSON.stringify(valueses));
    localStorage.setItem('dates', JSON.stringify(dates));
    loadFunction();
}

function localStoragePrint(){
    console.log(localStorage.getItem("valueses"));
    console.log(localStorage.getItem("dates"));
    localStorage.clear();
}

function loadFunction(){
    objects.innerHTML = "";
    const valueses = JSON.parse(localStorage.getItem("valueses"));
    const dates = JSON.parse(localStorage.getItem('dates'));
    console.log(valueses);
    console.log(dates);
    if(valueses == null) return;
    for(var i = 0; i < valueses.length; i++){
        insert(valueses[i], dates[i], false, i);
        console.log(valueses[i]);
    }
}

const searchField = document.getElementById("searchForm");
searchField.addEventListener("input",function(){
    const valueses = JSON.parse(localStorage.getItem("valueses"));
    var input = document.getElementById("searchForm").value.toLowerCase();
    const regex = new RegExp(input);
    loadFunction();
    valueses.filter((task, index) =>{
        var element = document.getElementsByClassName("texta")[index];
        var item = document.getElementsByClassName("pclass")[index];
        if(regex.test(task)){
            var highlight = task.replace(regex, "<mark>$&</mark>");
            element.innerHTML = highlight;
        }
        else
            item.style.display = "none";
    })
});
let counter = 0;
const objects = document.getElementById("objectsHolder");
loadFunction();