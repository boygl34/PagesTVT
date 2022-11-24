/*!
 * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (localStorage.getItem("TabDaDong") !== "") {
    gethtml(localStorage.getItem("TabDaDong"));
  } else {
    localStorage.setItem("TabDaDong", "html/Home.html");
    gethtml(localStorage.getItem("TabDaDong"));
  }



  if (sidebarToggle) {
    //Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.toggle("sb-sidenav-toggled");
    }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});





function hidemodal() {
  $(".modal").modal("hide");
}
function hidealert() {
  $(".modal").modal("hide");
}
function gethtml(value) {
  localStorage.setItem("TabDaDong", value);
  $("#layoutSidenav_content").html("")
  $.ajax({
    url: value,
    cache: false,
  })
    .done(function (html) {
      $("#layoutSidenav_content").html("")
      $("#layoutSidenav_content").html(html);
    })
    .then(function () {
      getData();
    });
}

function Logout() {
  localStorage.setItem("userName", "");
  localStorage.setItem("Password", "");
  localStorage.setItem("Ten", "");
  localStorage.setItem("id", "");
  localStorage.setItem("PhanQuyen", "");
  localStorage.setItem("BoPhan", "");
  console.log("logout");
  window.location = "login.html";
}
