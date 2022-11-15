function DangNhap() {
  var urluser = "https://deciduous-pentagonal-powder.glitch.me/User/"
  var password = $("#password_use").val()
  fetch(urluser + $("#USER").val())
    .then(response => response.json())
    .then(data => {
      if (password == data.Password) {
        // checkPhanQuyen()
        localStorage.setItem("userName", data.useName)
        localStorage.setItem("Password", data.Password)
        localStorage.setItem("id", data.id)
        localStorage.setItem("Ten", data.Ten)
        localStorage.setItem("PhanQuyen", data.PhanQuyen)
        localStorage.setItem("BoPhan", data.BoPhan)
        localStorage.setItem("TabDaDong", "html/Home.html");
        window.location = "index.html";
        $.ajax({
          url: "https://deciduous-pentagonal-powder.glitch.me/ThongSo/",
          type: 'GET',
          success: function (data) {
            localStorage.setItem("ThongSo", JSON.stringify(data))

          }
        })

      }
      else {
        alert("Sai pass")
      }
    })
    .catch((error) => {
      alert(error)
    });
}