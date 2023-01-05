function postData(data, url, methor) {
  fetch(url, {
    method: methor,
    //mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'omit', // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      getData();

      $("#mesenge").html(
        "<div class='alert alert-success'>Đăng Ký Thành Công</div>"
      );
    });
}
function deleteData(url) {
  fetch(url, {
    method: "DELETE", // or 'PUT'
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      getData(urlTX);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkID(MaSo) {
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == MaSo) {
      return ojb[a].id;
    }
  }
}

function KhoangSCChang() {
  var json2 = {
    KhoangSuaChua: $("#KhoangSuaChua").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function CoVanChange() {
  var json2 = {
    CoVanDichVu: $("#CoVanDichVu").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function RuaXechange() {
  var json2 = {
    KhachRuaXe: $("#KhachRX").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function KTV1change() {
  var json2 = {
    KyThuatVien1: $("#KyThuatVien1").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function KTV2change() {
  var json2 = { KyThuatVien2: $("#KyThuatVien2").val() };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function Nhomchange() {
  var json2 = { KyThuatVien2: $("#KyThuatVien2").val() };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function KetThuc() {
  var TThaiXuong;
  if (document.getElementById("KhachRX").value == "Rửa Xe") {
    TThaiXuong = "06 Chờ Rửa Xe";
  } else {
    TThaiXuong = "08 Chờ Giao Xe";
  }
  var json2 = {
    TimeEndGJ: TimesClick(),
    TrangThaiSCC: "Đã SC",
    TrangThaiXuong: TThaiXuong,
    BaiDauXe: "Rửa Xe",
  };
  $("#mesenge").html(
    '<div class="alert alert-warning" role="alert">Đang Dừng CV!</div>'
  );
  $("#ModalSCC").modal("hide");
  var ojb = useCaher;
  var ojb = useCaher;
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == document.getElementById("MaSo").value) {
      if (ojb[a].KhachRuaXe) {
      } else {
        $("#DKRUAXetitle").html(ojb[a].BienSoXe);
        $("#RuaXeModal").modal("show");
      }
    }
  }
  document.getElementById("contextMenu").style.display = "none"
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function Khongruaxe() {
  var json2 = {
    KhachRuaXe: "Không Rửa",
  };
  setTimeout($("#RuaXeModal").modal("hide"), 3000);
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function Coruaxe() {
  var json2 = {
    KhachRuaXe: "Rửa Xe",
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
  setTimeout($("#RuaXeModal").modal("hide"), 3000);
}

function DungCongViecGJ() {
  var json2 = {
    TimeStopGJ: TimesClick(),
    TrangThaiSCC: "Dừng CV",
    TrangThaiXuong: "05 Dừng Công Việc",
  };

  $("#mesenge").html(
    '<div class="alert alert-warning" role="alert">Đang Dừng CV!</div>'
  );
  document.getElementById("contextMenu").style.display = "none"
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function BatDauSC() {
  if (document.getElementById("KyThuatVien1").value == "") {
    alert("Chưa Có KTV");
    return false;
  }
  if (document.getElementById("GioKetThucSC").value == "") {
    alert("Chưa Có Giờ KT");
    return false;
  }
  if (document.getElementById("KhoangSuaChua").value == "") {
    alert("Chưa Có Khoang SC");
    return false;
  }
  if (document.getElementById("CoVanDichVu").value == "") {
    alert("Chưa Có Cố Vấn");
    return false;
  }
  var json2 = {
    TimeStartGJ: TimesClick(),
    TrangThaiSCC: "Đang SC",
    TrangThaiXuong: "05 Đang Sửa Chữa",
    KhoangSuaChua: $("#KhoangSuaChua").val(),
    TimeEndGJ: $("#GioKetThucSC").val(),
    KyThuatVien1: $("#KyThuatVien1").val(),
    KyThuatVien2: $("#KyThuatVien2").val(),
    NhomKTV: $("#NhomKTV").val(),
    BaiDauXe: $("#KhoangSuaChua").val(),
  };

  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == document.getElementById("MaSo").value) {
      if (ojb[a].TDKetThucTiepKhach) {
      } else {
        json2["TDKetThucTiepKhach"] = TimesClick();
      }
      if (ojb[a].KhachHangDoi) {
      } else {
        json2["KhachHangDoi"] = "Khách Đợi";
      }
      // if (ojb[a].KhachRuaXe) {
      // } else {
      //   $("#DKRUAXetitle").html(ojb[a].BienSoXe);
      //   $("#RuaXeModal").modal("hide");
      //   $("#RuaXeModal").modal("show");
      // }
      if (ojb[a].TDHenGiaoXe) {
      } else {
        json2["TDHenGiaoXe"] = TimesClick(
          new Date(
            1000 * 60 * 29 +
            new Date(DoiNgayDangKy($("#GioKetThucSC").val())).valueOf()
          )
        );
      }
    }
  }
  ThuTuGiaoXe($("#KhoangSuaChua").val())

  document.getElementById("contextMenu").style.display = "none"
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
setgiaoxe()
function setgiaoxe() {
  $.ajax({
    url: urlThongSo,
    type: 'GET',
    success: function (data) {
      localStorage.setItem("ThongSo", JSON.stringify(data))
      ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
      ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)

      $("#ThuTuGiaoXeEM").html('<p class="btn btn-success ">' + ThuTuEM[0] + '</p>')
      for (var a = 1; a < ThuTuEM.length; a++) {
        $("#ThuTuGiaoXeEM").html($("#ThuTuGiaoXeEM").html() +
          '<p class="btn">' + ThuTuEM[a] + '</p>')
      }



    }
  })

}

function ThuTuGiaoXe(value) {
  ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
  ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)
  var index = ThuTuEM.indexOf(value)
  if (index >= 0) {
    var a1 = ThuTuEM.slice(0, index);
    var a2 = ThuTuEM.slice(index + 1, ThuTuEM.length);
    var new_arr = a1.concat(a2);
    new_arr = new_arr.concat(ThuTuEM[index])
    var thutumoi = {}
    for (a in new_arr) {
      thutumoi["ThuTuEM" + a] = new_arr[a]
    }
    var json = { value: thutumoi }

    fetch(urlThongSo + "ThuTuEM", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    })

  }
}
function BatDauSC2() {
  if (document.getElementById("KyThuatVien1").value == "") {
    alert("Chưa Có KTV");
    return false;
  }
  if (document.getElementById("CoVanDichVu").value == "") {
    alert("Chưa Có Cố Vấn");
    return false;
  }
  var GioKetThucChip = new Date(
    $("#ChieuDaiChip").val() * 1 + new Date().valueOf()
  );
  var json2 = {
    TimeStartGJ: TimesClick(),
    TrangThaiSCC: "Đang SC",
    TrangThaiXuong: "05 Đang Sửa Chữa",
    KhoangSuaChua: $("#KhoangSuaChua").val(),
    TimeEndGJ: TimesClick(GioKetThucChip),
    KyThuatVien1: $("#KyThuatVien1").val(),
    KyThuatVien2: $("#KyThuatVien2").val(),
    NhomKTV: $("#NhomKTV").val(),
    BaiDauXe: $("#KhoangSuaChua").val(),
  };

  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == document.getElementById("MaSo").value) {
      if (ojb[a].MaSo == document.getElementById("MaSo").value) {
        if (ojb[a].MaSo == document.getElementById("MaSo").value) {
          if (ojb[a].TDKetThucTiepKhach) {
          } else {
            json2["TDKetThucTiepKhach"] = TimesClick();
          }
          if (ojb[a].KhachHangDoi) {
          } else {
            json2["KhachHangDoi"] = "Khách Đợi";
          }
          // if (ojb[a].KhachRuaXe) {
          // } else {
          //   $("#DKRUAXetitle").html(ojb[a].BienSoXe);
          //   $("#RuaXeModal").modal("hide");
          //   $("#RuaXeModal").modal("show");
          // }
          if (ojb[a].TDHenGiaoXe) {
          } else {
            json2["TDHenGiaoXe"] = TimesClick(
              new Date(
                1000 * 60 * 29 +
                new Date(DoiNgayDangKy($("#GioKetThucSC").val())).valueOf()
              )
            );
          }
        }
      }
      ThuTuGiaoXe($("#KhoangSuaChua").val())
      document.getElementById("contextMenu").style.display = "none"
      postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");

    }
  }
}

NhomSC(NhomKTV);
function NhomSC(values) {
  var list = document.getElementById("NhomKTV");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
function changeNhom() {
  var nhom = document.getElementById("NhomKTV").value;
  var json2 = {
    NhomKTV: $("#NhomKTV").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
  if (nhom == "Bạo") {
    NhanVienDropDown(KTVBao);
  }
  if (nhom == "Hoan") {
    NhanVienDropDown(KTVHoan);
  }
  if (nhom == "EM") {
    NhanVienDropDown(KTVEM);
  }
}
function NhanVienDropDown(values) {
  var list = document.getElementById("KyThuatVien1");
  var option = document.createElement("option");
  list.innerHTML = "";
  option.value = "";
  option.text = "";
  list.appendChild(option);
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
  var list2 = document.getElementById("KyThuatVien2");
  var option2 = document.createElement("option");
  list2.innerHTML = "";
  option2.value = "";
  option2.text = "";
  list2.appendChild(option2);
  for (var i = 0; i < values.length; i++) {
    var option2 = document.createElement("option");
    option2.value = values[i];
    option2.text = values[i];
    list2.appendChild(option2);
  }
}
KhoangSuaChua(KhoangSC);
function KhoangSuaChua(values) {
  var list = document.getElementById("KhoangSuaChua");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
CoVanlist(NhomCV);
function CoVanlist(values) {
  var list = document.getElementById("CoVanDichVu");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
function CapNhatGioSC() {

  var json2 = {
    TimeEndGJ: $("#GioKetThucSC").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function GioKetThucSCC() {
  var homnay = new Date();
  homnay = new Date(homnay * 1 + 7 * 60 * 60 * 1000);
  homnay = homnay.toJSON();
  homnay = homnay.slice(0, homnay.length - 5);
  if (document.getElementById("GioBatDauSCC").value == 0) {
    document.getElementById("GioBatDauSCC").value = TimesClick(homnay);
  }
  var hh = new Date(homnay);
  var TGianSuaChua = document.getElementById("inputThoiGianSCC").value;
  var div = Math.trunc(TGianSuaChua / 8);
  var TGDu = TGianSuaChua - div * 8;
  var GioBatDau = hh.getHours();
  var NgayHoanThanh = new Date(hh * 1 + div * 24 * 60 * 60 * 1000);
  if (TGDu < 4) {
    TGDu = TGDu;
  } else {
    TGDu = TGDu * 1 + 1;
  }
  NgayHoanThanh = new Date(NgayHoanThanh * 1 + TGDu * 60 * 60 * 1000);
  if (NgayHoanThanh.getHours() >= 17) {
    NgayHoanThanh = new Date(NgayHoanThanh * 1 + 15 * 60 * 60 * 1000);
  }
  if (NgayHoanThanh.getHours() == 12) {
    NgayHoanThanh = new Date(NgayHoanThanh * 1 + 60 * 60 * 1000);
  }
  if (NgayHoanThanh.getDay() == 0) {
    NgayHoanThanh = new Date(NgayHoanThanh * 1 + 24 * 60 * 60 * 1000);
  }
  NgayHoanThanh = new Date(NgayHoanThanh * 1 + 7 * 60 * 60 * 1000);
  var aa = NgayHoanThanh.toJSON();
  var bb = aa.slice(0, aa.length - 5);
  document.getElementById("GioKetThucSC").value = TimesClick(bb);
  return bb;
}

function timeSuaChua() {
  var timeBD = new Date(document.getElementById("GioBatDauSCC").value);
  var timeKT = new Date(document.getElementById("GioKetThucSC").value);
  var time = timeKT - timeBD;
  document.getElementById("inputThoiGianSCC").value = time / (60 * 60 * 1000);
  document.getElementById("rangerThoiGianSCC").value = time / (60 * 60 * 1000);
}
function clickbienso(value) {
  $("#BienSoXe").val(value)
  changvalue()
  $("#ModalSCC").modal("show");
}

function changvalue() {
  var ojb = useCaher;
  for (var a in ojb) {
    $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>");
    if (ojb[a].BienSoXe == BienSoXe.value) {
      if (ojb[a].TDHenGiaoXe) {
        // $("#mesenge").html(
        //   "<div class='alert alert-success'>Giờ Giao Xe : " +
        //   datevalue(DoiNgayDangKy(ojb[a].TDHenGiaoXe)) +
        //   "</div>"
        // );
      }
      if (ojb[a].MaSo) {
        document.getElementById("MaSo").value = ojb[a].MaSo;
      }
      if (ojb[a].TrangThaiXuong) {
        document.getElementById("TrangThai").value = ojb[a].TrangThaiXuong;
      }
      if (ojb[a].NhomKTV) {
        document.getElementById("NhomKTV").value = ojb[a].NhomKTV;
        changeNhom();
      }
      if (ojb[a].CoVanDichVu) {
        document.getElementById("CoVanDichVu").value = ojb[a].CoVanDichVu;
      }
      if (ojb[a].KhoangSuaChua) {
        document.getElementById("KhoangSuaChua").value = ojb[a].KhoangSuaChua;
      }
      if (ojb[a].TimeStartGJ) {
        document.getElementById("GioBatDauSCC").value = TimesClick(
          DoiNgayDangKy(ojb[a].TimeStartGJ)
        );
      }
      if (ojb[a].TimeEndGJ) {
        document.getElementById("GioKetThucSC").value = TimesClick(
          DoiNgayDangKy(ojb[a].TimeEndGJ)
        );
      }
      if (ojb[a].KyThuatVien1) {
        document.getElementById("KyThuatVien1").value = ojb[a].KyThuatVien1;
      }
      if (ojb[a].KyThuatVien2) {
        document.getElementById("KyThuatVien2").value = ojb[a].KyThuatVien2;
      }
      if (ojb[a].KhachRuaXe) {
        document.getElementById("KhachRX").value = ojb[a].KhachRuaXe;
      }
      if (ojb[a].TrangThaiSCC == "Đang SC") {
        $("#buttonSCC").html(
          '<button  type="button" class="btn btn-danger me-2" onclick="DungCongViecGJ()">Dừng CV!</button>&nbsp &nbsp <button  type="button" class="btn btn-primary me-2" onclick="KetThuc()">Kết Thúc!</button>'
        );
        return;
      } else {
        $("#buttonSCC").html(
          '<button  type="button" class="btn btn-success me-2" onclick="BatDauSC()">Bắt Đầu!</button>&nbsp &nbsp <button  type="button" class="btn btn-primary me-2" onclick="KeHoach()">Kế Hoạch!</button>'
        );
        return;
      }
      return;
    }
  }
}

var slider = document.getElementById("rangerThoiGianSCC");
var output = document.getElementById("inputThoiGianSCC");
output.value = slider.value;
slider.oninput = function () {
  output.value = Math.round((this.value / 6) * 100) / 100;
  GioKetThucSCC();
};

$(".Ngay").datetimepicker({
  format: "dd/mm/yyyy HH:MM:00 ",
  uiLibrary: "bootstrap4",
  modal: true,
  footer: true,
  datepicker: {
    disableDates: function (date) {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      return date.setHours(0, 0, 0, 0) >= currentDate ? true : false;
    },
  },
});

$("#GioBatDauSCC").datetimepicker({
  format: "dd/mm/yyyy HH:MM:00 ",
  uiLibrary: "bootstrap4",
  modal: true,
  footer: true,
  datepicker: {
    disableDates: function (date) {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      return date.setHours(0, 0, 0, 0) >= currentDate ? true : false;
    },
  },
});

CheckBO()
function CheckBO(BS) {
  if (BS) {
    BS = BS.replaceAll(" ", "")
    BS = BS.replaceAll("-", "")
    BS = BS.replaceAll(".", "")
  }
  fetch(urlBO + "/BODaiLy", {
    method: "GET", // or 'PUT'
    headers: { "Content-Type": "application/json" }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var r = data.ThongTin
      console.log(r);
      for (a in r) {
        if (r[a]["Biển số"] == BS && r[a]["ATA đại lý"] != "") {
          alert(`Xe "${r[a]["Biển số"]} Thiếu Hàng Kiểm tra lại`)
          console.log(r[a]["Biển số"]);
        }

      }
    })
}
