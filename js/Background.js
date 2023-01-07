

$.ajax({
  url: "https://deciduous-pentagonal-powder.glitch.me/ThongSo/",
  type: 'GET',
  success: function (data) {
    localStorage.setItem("ThongSo", JSON.stringify(data))

  }
})

var ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
var NhomTN = ["Có Hẹn", "Tiếp Nhận"];
//var NhomCV = ["Toàn", "Tài", "Rôn", "Mẫn", "Sang", "Vinh", "Triêng", "Lộc", "Hiệp", "None"];
//var NhomDH = ["EM", "SCC", "Đồng Sơn", "Báo Giá BH"];
var NhomCV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomCV" })[0].value)
var NhomDH = Object.values(ThongSo.filter(function (r) { return r.id == "GruopTDDatHen" })[0].value)
var KhoangSC = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangScc" })[0].value)
var KTVDong = Object.values(ThongSo.filter(function (r) { return r.id == "KTVDong" })[0].value)
var KTVSonDinh = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon1" })[0].value)
var KTVSonThien = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon2" })[0].value)
var PhongSon = Object.values(ThongSo.filter(function (r) { return r.id == "PhongSon" })[0].value)
var NhomSon = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSon" })[0].value)
var KhoangKoSuDung = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangKoSuDung" })[0].value)
var ChipGJ = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipGJ" })[0].value)[0]
var ChipDS = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipDong" })[0].value)[0]
var KTVDongSon = ["Châu", "Trường", "Phúc", "Trương", "Định", "Đình", "Thành", "Lưu", "Hùng", "Lâm", "Duy", "Tài", "Thiên", "Dũng", "Lực", "Tú", "Chương", "Đồng", "Quốc", "Lưu"];
//var KhoangSC = ["EM 01", "EM 02", "EM 03", "EM 04", "SCC 05", "SCC 06", "SCC 07", "SCC 08", "SCC 09", "SCC 10", "4 Trụ", "K Ngoài"];
var NhomKTV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSCC" })[0].value)
var KTVBao = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc1" })[0].value)
var KTVHoan = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc2" })[0].value)
var KTVEM = Object.values(ThongSo.filter(function (r) { return r.id == "KTVEM" })[0].value)
var ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)
var ListXe = ["Camry", "Inova", "Fortuner", "Altis", "Altis Cross", "Veloz", "Wigo", "Land Cruiser", "Land Prado", "Hilander", "Rav4", "Vios", "Rush", "Avanza", "Raize", "Lexus"];
var urlTX = "https://deciduous-pentagonal-powder.glitch.me/XeTrongXuong";
var urlDG = "https://deciduous-pentagonal-powder.glitch.me/XeDaGiao";
var urlBO = "https://deciduous-pentagonal-powder.glitch.me/BO";
var urlThongSo = "https://deciduous-pentagonal-powder.glitch.me/ThongSo/";
var urlSetting = "https://deciduous-pentagonal-powder.glitch.me/Setting/";
var KhuVucVT = ["Bà Rịa", "Vũng Tàu", "Long Điền", "Phú Mỹ", "Đất Đỏ", "Châu Đức", "Xuyên Mộc", "Côn Đảo", "KV Khác"];
var useCaher, useCaher2
var MasterData
var TenCoVan = localStorage.getItem("Ten");
var PhanQuyen = localStorage.getItem("PhanQuyen");
var emailnhanvienhen = "quipham@toyotavungtau.com";








function DoiNgayDangKy(ngayhen) {
  var aa;
  if (ngayhen) {
    var Thang = ngayhen.slice(3, 5);
    var Ngay = ngayhen.slice(0, 2);
    var Nam = ngayhen.slice(6, 10);
    var Gio = ngayhen.slice(11, 13);
    var Phut = ngayhen.slice(14, 16);
    var ThoiGianMoi =
      Nam + "-" + Thang + "-" + Ngay + "T" + Gio + ":" + Phut + ":00Z";
    var aa = new Date(ThoiGianMoi);
    aa = new Date(aa - 7 * 60 * 60 * 1000);
  }
  return aa;
}

function TimesClick(data) {
  if (data) {
    var use = new Date(data);
  } else {
    var use = new Date();
  }
  var useinfo = {};
  var Thang = use.getMonth() + 1;
  var Ngay = use.getDate();
  var Nam = use.getFullYear();
  var Gio = use.getHours();
  var Phut = use.getMinutes();
  if (Thang < 10) {
    Thang = "0" + Thang;
  }
  if (Ngay < 10) {
    Ngay = "0" + Ngay;
  }
  if (Gio < 10) {
    Gio = "0" + Gio;
  }
  if (Phut < 10) {
    Phut = "0" + Phut;
  }
  return Ngay + "/" + Thang + "/" + Nam + " " + Gio + ":" + Phut + ":00";
}

function Doingay2(use) {
  use = new Date(use);
  var Thu = use.getDay() + 1;
  var Thang = use.getMonth() + 1;
  var Ngay = use.getDate();
  var Nam = use.getFullYear();
  var Gio = use.getHours();
  var Phut = use.getMinutes();
  if (Thang < 10) {
    Thang = "0" + Thang;
  }
  if (Ngay < 10) {
    Ngay = "0" + Ngay;
  }
  if (Gio < 10) {
    Gio = "0" + Gio;
  }
  if (Phut < 10) {
    Phut = "0" + Phut;
  }
  var ThoiGian =
    Gio + ":" + Phut + " Thứ " + Thu + " ngày " + Ngay + "/" + Thang + " ";
  return ThoiGian;
}
checkPhanQuyen();
function checkPhanQuyen() {
  var PhanQuyen = localStorage.getItem("PhanQuyen");
  var BoPhan = localStorage.getItem("BoPhan")
  if (PhanQuyen == "admin" || PhanQuyen == "LeTan") {
    $("#fonmid").show();
  }
  if (PhanQuyen == "admin") {
    $("#Setting").show()

  } else {
    $("#Setting").hide()

  }
  if (BoPhan == "admin" || PhanQuyen == "admin") {
    $("#PQDichVu2").show()
    $("#PQPhuKien").show()
    $("#PQKinhDoanh").show()
    $("#PQManHinh").show()
    $("#PQCoVan").show()

  }
  if (BoPhan == "Dịch Vụ" || BoPhan == "CS") {
    $("#PQDichVu2").show()

    if (PhanQuyen == "CoVandichvu" || PhanQuyen == "admin") {
      $("#PQCoVan").show()

    }
  }
  if (BoPhan == "Phụ Kien") {
    $("#PQPhuKien").show()

  }
  if (BoPhan == "Kinh Doanh") {
    $("#PQKinhDoanh").show()

  }

}

function Doingay(use) {
  var ThoiGian = "Chưa XN";
  if (use) {
    use = new Date(use);
    var Thang = use.getMonth() + 1;
    var Ngay = use.getDate();
    var Nam = use.getFullYear();
    var Gio = use.getHours();
    var Phut = use.getMinutes();
    if (Thang < 10) {
      Thang = "0" + Thang;
    }
    if (Ngay < 10) {
      Ngay = "0" + Ngay;
    }
    if (Gio < 10) {
      Gio = "0" + Gio;
    }
    if (Phut < 10) {
      Phut = "0" + Phut;
    }
    var ThoiGian = Ngay + "/" + Thang + " " + Gio + ":" + Phut;
  }
  return ThoiGian;
}
function ngayGiohen(ngayhen) {
  var Thang = ngayhen.slice(3, 5);
  var Ngay = ngayhen.slice(0, 2);
  var Nam = ngayhen.slice(6, 10);
  var Gio = ngayhen.slice(11, 13);
  var Phut = ngayhen.slice(14, 16);
  var NgayThang = Ngay + "/" + Thang + "/" + Nam;
  var use = {};
  use.ngaythang = NgayThang;
  use.giophut = Gio + ":" + Phut + ":00";

  return use;
}

function suabienso(myValue) {

  var myValue2 = myValue.toUpperCase();
  myValue = myValue.replace(" ", "");
  myValue = myValue.replace("-", "");
  myValue = myValue.replace(".", "");


  if (myValue.length > 5) {
    myValue = myValue.replace("[h] ", "");
    myValue = myValue.replace("[H] ", "");
    myValue = myValue.replace("[L] ", "");
    var ins = myValue.indexOf("-");
    var BiensoLD = myValue.slice(2, 4).toUpperCase();
    if (ins == "-1" && BiensoLD == "LD") {
      myValue = myValue.slice(0, 4) + "-" + myValue.slice(4, myValue.length);
    }
    if (ins == "-1" && BiensoLD != "LD") {
      myValue = myValue.slice(0, 3) + "-" + myValue.slice(3, myValue.length);
    }
    var myValue1 = myValue.replace(myValue.charAt(myValue.indexOf(".")), "");
    var soxe = myValue1.slice(myValue1.indexOf("-") + 1, myValue1.length);
    var aa = myValue1.slice(myValue1.length - 2, myValue1.length);
    if (soxe.length == 5) {
      var aaaa =
        soxe.charAt(0) +
        soxe.charAt(1) +
        soxe.charAt(2) +
        soxe.charAt(3) +
        soxe.charAt(4);
      var bbbb =
        soxe.charAt(0) +
        soxe.charAt(1) +
        soxe.charAt(2) +
        "." +
        soxe.charAt(3) +
        soxe.charAt(4);
      var myValue2 = myValue1.toString(6).replace(aaaa, bbbb).toUpperCase();
    } else {
      var myValue2 = myValue1.toUpperCase();
    }
  }
  return myValue2;
}

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
$(".Ngay2").datetimepicker({
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
$(".NgayDK").datetimepicker({
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

function datevalue(value) {
  try {
    var NgayHoanThanh = new Date(value);
    NgayHoanThanh = new Date(NgayHoanThanh * 1 + 7 * 60 * 60 * 1000);
    var aa = NgayHoanThanh.toJSON();
    var bb = aa.slice(0, aa.length - 5);
    return bb;
  } catch { return "" }
}
function TaoMaSo(ngayhen) {
  var Thang = ngayhen.slice(3, 5);
  var Ngay = ngayhen.slice(0, 2);
  var Nam = ngayhen.slice(6, 10);
  var MaSo = "TVT" + Nam + Thang + Ngay + "_";
  return MaSo;
}

function ngaydathen() {
  var datehen = document.getElementById("ngaydathenval").value;
  let optionngay = {
    //clickToUse:true,
    verticalScroll: true,
    zoomable: false,
    start: new Date(datehen).setHours(6),
    end: new Date(datehen).setHours(17),
  };
  timeline.setOptions(optionngay);
}

function canhBaoThanhCong(tieude, noidung) {
  var alert =
    ' <div class="alert alert-success" role="alert" data-delay="10000">' +
    ' <h4 class="alert-heading">Thành Công!</h4>' +
    "<p>Đăng Ký Thành công biến số xe</p>" +
    "</div>" +
    $("#alert").html($("#alert").html() + alert);
}

function checkMasterData(myValue) {
  var thongtinkhachhang
  myValue = myValue.replace(" ", "");
  myValue = myValue.replace("-", "");
  myValue = myValue.replace(".", "");
  try {
    return thongtinkhachhang = MasterData.filter(function (r) { return r["Biển số"] == myValue })
  } catch { return thongtinkhachhang = false }


}

function checkBienSo(MaSo) {
  var ojb = useCaher;
  var Chechresule = true;
  for (var a in ojb) {
    if (ojb[a].BienSoXe == MaSo) {
      Chechresule = false;
    }
  }
  return Chechresule;
}
CoVanlistDK(NhomCV);
function CoVanlistDK(values) {
  var list = document.getElementById("CoVanDichVuDK");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
function TaoMaSoDK() {
  var use = new Date();
  var useinfo = {};
  var Thang = use.getMonth() + 1;
  var Ngay = use.getDate();
  var Nam = use.getFullYear();
  var Gio = use.getHours();
  var Phut = use.getMinutes();
  if (Thang < 10) {
    Thang = "0" + Thang;
  }
  if (Ngay < 10) {
    Ngay = "0" + Ngay;
  }
  if (Gio < 10) {
    Gio = "0" + Gio;
  }
  if (Phut < 10) {
    Phut = "0" + Phut;
  }
  useinfo.ThoiGian = Ngay + "/" + Thang + " " + Gio + ":" + Phut;
  var MaSo = "TVT" + Nam + Thang + Ngay + "_";
  return MaSo;
}

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
      var r = data.ThongTin
      var time = new Date(data.createdAt)
      time = time.toDateString() + " " + time.toLocaleTimeString()
      for (a in r) {
        if (r[a]["Biển số"] == BS && r[a]["ATA đại lý"] == "") {
          alert(`Xe ${r[a]["Biển số"]} Thiếu Phụ Tùng Kiểm tra lại <br> Cập nhật BO lúc : ${time}`)

          console.log("thieu hàng", r[a]["Biển số"]);
        }

      }
    })
}
document.getElementById("input_dom_element").addEventListener("change", handleFileTMSS, false);
function handleFileTMSS(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, { type: "binary", });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var ojb = XLSX.utils.sheet_to_json(worksheet, { raw: true, range: 1 })//range: 7
    var data
    console.log(ojb);
    // gridOptions.api.setRowData(ojb)
    var jsonData = {
      "id": "BODaiLy",
      "ThongTin": ojb
    }

    try {
      fetch("https://deciduous-pentagonal-powder.glitch.me/BO", {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == "500") {
            response500(jsonData)
          }
          response.json()
        })
        .then((result) => {
          alert("Upload Thành Công")
          console.log('Success:', result);

        })
    } catch { alert("Lỗi") }
  };
  reader.readAsArrayBuffer(file);

}