function CreateTable(link, output, nOfRows){

function loadDB(){
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
        alert( request.status + ': ' + request.statusText );}
        var usersDB = JSON.parse(request.responseText);
        ShowUsers(usersDB);
     };
}

function ShowUsers(usersDB){

    var col = [];

    for (let i = 0; i<usersDB.length; i++){
        for (var key in usersDB[i]){
            if (col.indexOf(key) === -1){
                col.push(key);
            }
        }
    }

    var table = document.createElement("table"); // Creating output table 

    var tr = table.insertRow(-1); //table row

    for (let i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i].toUpperCase();
        tr.appendChild(th);
        th.onclick = function(){
            sortTable(i);
        };
    }

    for (let i = 0; i < usersDB.length; i++) {
        
      if (!nOfRows){
          tr = table.insertRow(-1);
        } else if(i<nOfRows){
          tr = table.insertRow(-1);
        } else break;

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = usersDB[i][col[j]];
            
        }
    }

    var container = output;
    container.appendChild(table);
}

loadDB();


function sortTable(n){
    
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    
    table = document.querySelector("table");

    switching = true;
    dir = "asc"; 
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++; 
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}



var container = document.querySelector('.container');

CreateTable('testtakers.json', container, 50);