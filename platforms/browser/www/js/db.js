//Test for browser compatibility
var currentDate = new Date();
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("Products", "0.1", "DB with Products", 1024 * 1024);
    //create the cars table using SQL for the database using a transaction
    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY ASC, name TEXT, kolvo INTEGER, diment TEXT, date TEXT, icon TEXT, state INTEGER)");
    });
} else {
  app.dialog.alert('Проблема с созданием БД, ваше устройство не поддерживает WebSQL');
};
//function to output the list of cars in the database

function updateProducts (transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("ProductList");
    var buyholder = document.getElementById("ProducttoBuy");
    //clear cars list ul
    listholder.innerHTML = "";
    buyholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);
        var holodosbgclass = 'anyclass'
    if (row.state == 1) {
      var dateSecond = new Date(row.date);
      var daysLeft = Math.ceil(dateSecond.getTime() - currentDate.getTime());
      var daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24));
      var datenew = String(daysLeft).substr(0, 4);
      if (datenew <= 2 && datenew > 1) {
        holodosbgclass = 'orange'
      }
      if (datenew <= 1) {
        holodosbgclass = 'red'
      }
        listholder.innerHTML +=
        "<li class='swipeout' id='row" + row.id + "'>"+
          "<div class='item-content swipeout-content " + holodosbgclass + "' onClick='holodosRows(\"" + row.name + "\",\"" + row.diment + "\","+ row.kolvo +",\"" + datenew + "\");'>"+
            "<div class='item-media'><img src='" + row.icon + "' width='44'/></div>"+
            "<div class='item-inner'>"+
              "<div class='item-title-row'>"+
                "<div class='item-title'>" + row.name + "</div>"+
              "</div>"+
            "</div>"+
          "</div>"+
          "<div class='swipeout-actions-right'>" +
            "<a href='#' class='swipeout-delete' onclick='deleteProduct(" + row.id + ");return false;'>Удалить</a>" +
          "</div>" +
        "</li>";
    }
    if (row.state == 0) {
      buyholder.innerHTML +=
      "<li class='swipeout' id='r" + row.id + "'>"+
        "<div class='item-content swipeout-content' onClick='getId("+ row.id + ");toBuySheets(\"" + row.name + "\",\"" + row.diment + "\","+ row.kolvo +","+ row.id +");'>"+
          "<div class='item-media'><img src='" + row.icon + "' width='44'/></div>"+
          "<div class='item-inner'>"+
            "<div class='item-title-row'>"+
              "<div class='item-title'>" + row.name + "</div>"+
            "</div>"+
          "</div>"+
        "</div>"+
        "<div class='swipeout-actions-left'>"+
          "<a href='#' class='color-green swipeout-close swipeout-overswipe' onclick='makeItGreen(" + row.id + ")'><i class='f7-icons'>check</i></a>"+
        "</div>"+
        "<div class='swipeout-actions-right'>" +
          "<a href='#' class='swipeout-delete' onclick='deleteProduct(" + row.id + ");return false;'>Удалить</a>" +
        "</div>" +
      "</li>";
    }
    }
};

function makeItGreen(id) {
  console.log('WORK!',id);
  var fullId = 'r' + id;
  console.log(fullId);
  $$(document.getElementById(fullId)).toggleClass('green');
};


//function to get the list of cars from the database

function outputProducts() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM products", [], updateProducts);
        });
    } else {
    }
};

function addProduct() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        var name = document.getElementById("ProductName").value;
        var kolvo = document.getElementById("Kolitchestvo").value;
        var icon = document.getElementById("icon_input").value;
        var state = document.getElementById('state1').value;

        // Get select value
        var sel = document.getElementById("Dimention");
        var newsel = sel.options[sel.selectedIndex].value;
        var diment = String(newsel);

        // Calc difference between dates
        var date = document.getElementById("expdate").value;

        //Test to ensure that the user has entered both a make and model
        if (name !== "" && kolvo !== "" && date !== "" && icon !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO products (name, diment, kolvo, date, icon, state) VALUES (?, ?, ?, ?, ?, ?)", [name, diment, kolvo, date, icon, state]);
                outputProducts();
            });
            document.getElementById("ProductName").value = '';
            document.getElementById("Kolitchestvo").value = '';
            document.getElementById("icon_input").value = '';
            document.getElementById("expdate").value = '';
        } else {
          app.dialog.alert('Заполните все поля и выберите иконку');
        }
    } else {
      app.dialog.alert('Проблема с записью данных в БД. Попробуйте еще раз.');
    }
};

//Add product to buy list
function buyProduct() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        var name = document.getElementById("buyProductName").value;
        var kolvo = document.getElementById("buyKolitchestvo").value;
        var icon = document.getElementById("buyicon_input").value;
        var state = document.getElementById("state0").value;

        // Get select value
        var sel = document.getElementById("buyDimention");
        var newsel = sel.options[sel.selectedIndex].value;
        var diment = String(newsel);

        // Calc difference between dates
        var date = "321";


        //Test to ensure that the user has entered both a make and model
        if (name !== "" && kolvo !== "" && icon !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO products (name, diment, kolvo, date, icon, state) VALUES (?, ?, ?, ?, ?, ?)", [name, diment, kolvo, date, icon, state]);
                outputProducts();
            });
            document.getElementById("buyProductName").value = '';
            document.getElementById("buyKolitchestvo").value = '';
            document.getElementById("buyicon_input").value = '';
        } else {
          app.dialog.alert('Заполните все поля и выберите иконку');
        }
    } else {
      app.dialog.alert('Проблема с записью данных в БД. Попробуйте еще раз.');
    }
};


function getId (id) {
  newid = id;
};
//function to remove a car from the database, passed the row id as it's only parameter

function deleteProduct (id) {
  console.log(id);
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM products WHERE id=?", [id], outputProducts);
        });
    } else {
      app.dialog.alert('Не удалось удалить данные из БД. Попробуйте еще раз.');
    }
};

function editProduct(newid) {
  var id = newid;
  console.log('WORK!');
    //check to ensure the mydb object has been created
    if (mydb) {
      var date = document.getElementById('changedate2').value;
      console.log(date);
      console.log(id);
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command VALUES ('?')
        if (date !== "") {
        mydb.transaction(function (t) {
          t.executeSql("UPDATE products SET state=1, date=? WHERE id=? ", [date, id], outputProducts);
        });
      } else {
        app.dialog.alert('Не указан срок годности.')
      }

    } else {
      app.dialog.alert('Не удалось изменить значения в БД. Попробуйте еще раз.');
    }
};
outputProducts();
