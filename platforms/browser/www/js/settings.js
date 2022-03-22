var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: '#Вхолодильнике',
  // App id
  id: 'SMAl.holodilnik.app',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  statusbar: {
  iosOverlaysWebView: true,
                         iosBackgroundColor: 333444,
  },
  theme: 'ios',
  fastClicks: true,
  swipeout: {
    removeElements: false,
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');
var $$ = Dom7;
//Here I create var for GetItem from localStorage
var theme = localStorage.getItem('themeValue');
console.log(theme);

//This just enable click function for theme picker
$$(document.getElementById("dark")).on('click', function (e) {
  console.log('dark');
  getDark();
});
$$(document.getElementById("light")).on('click', function (e) {
  console.log('light');
  getLight();
});

//There I toggle classes on DOM
function getDark() {
  $$(document.documentElement).addClass('theme-dark');
  $$(document.getElementById("navbar")).removeClass('navbar-colored');
  $$(document.getElementsByClassName("ClassForRemove")).removeClass('app-navbar-color')
  $$(document.getElementById("lightcheck")).addClass('display-none');
  $$(document.getElementById("darkcheck")).removeClass('display-none');
  localStorage.removeItem("themeValue");
  localStorage.setItem('themeValue', '0');
};
function getLight() {
  $$(document.documentElement).removeClass('theme-dark');
  $$(document.getElementById("navbar")).addClass('navbar-colored');
  $$(document.getElementsByClassName("ClassForRemove")).addClass('app-navbar-color')
  $$(document.getElementById("lightcheck")).removeClass('display-none');
  $$(document.getElementById("darkcheck")).addClass('display-none');
  localStorage.removeItem("themeValue");
  localStorage.setItem('themeValue', '1');
};

// Open sheet for products in holodos
function holodosRows(name, diment, kolvo, datenew) {
  // Close inline sheet before
  app.sheet.close('.my-sheet');
  var newbgclass = 'anyclass'
  var newtxtclass = 'anytextclass'
  if (datenew <= 2 && datenew > 1) {
    newbgclass = 'orange'
    newtxtclass = 'change-color'
  }
  if (datenew <= 1) {
    newbgclass = 'red'
    newtxtclass = 'change-color'
  }
  if (datenew == 0) {
    datenew = 'Сегодня последний день';
  }
  if (datenew < 0) {
    datenew = 'Просрочен';
  }
  var dynamicSheet = app.sheet.create({
    swipeToClose: true,
    backdrop: true,
    content:    '<div class="sheet-modal sheet-modal-top my-sheet-top my-sheet-swipe-to-close" style="height:auto;">' +
                  '<div class="sheet-modal-inner">' +
                    '<div class="page-content '+ newbgclass +'">' +
                      '<div class="block-title block-title-large '+ newbgclass +'">'+ name +'</div>' +
                      '<div class="block '+ newbgclass +'">' +
                        '<p><b>Количество: '+ kolvo +' '+ diment +'</b></p>' +
                        '<p><b>Осталось дней: '+ datenew +'</b></p>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>',
  });
  // Open dynamic sheet
  dynamicSheet.open();
};
//Open sheet for products from "toBuy" list
function toBuySheets(name, diment, kolvo, id) {
  // Close inline sheet before
  app.sheet.close('.my-sheet');
  console.log(name);
  console.log(diment);
  console.log(kolvo);
  console.log(id);
  var toBuySheet = app.sheet.create({
    swipeToClose: true,
    backdrop: true,
    content:    '<div class="sheet-modal sheet-modal-top my-sheet-top my-sheet-swipe-to-close" style="height:auto;">' +
                  '<div class="sheet-modal-inner">' +
                    '<div class="page-content">' +
                      '<div class="block-title block-title-large">'+ name +'</div>' +
                      '<div class="block">' +
                        '<p><b>Количество: '+ kolvo +' '+ diment +'</b></p>' +
                        '<div class="list">' +
                           '<ul>' +
                              '<li class="item-content item-input">' +
                                 '<div class="item-inner">' +
                                    '<div class="item-title item-label">Укажите срок годности</div>' +
                                    '<div class="item-input-wrap">' +
                                       '<input type="date" placeholder="04.03.1993" id="changedate2">' +
                                       '<span class="input-clear-button"></span>' +
                                    '</div>' +
                                 '</div>' +
                              '</li>' +
                           '</ul>' +
                        '</div>' +
                        '<div class="row">' +
                           '<div class="col-80" style="margin:auto;">' +
                              '<button class="button button-raised button-large button-fill color-blue sheet-close" onclick="editProduct('+id+');">Переместить в холодильник</button>' +
                           '</div>' +
                        '</div>' +

                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>',
  });
  // Open dynamic sheet
  toBuySheet.open();
};
