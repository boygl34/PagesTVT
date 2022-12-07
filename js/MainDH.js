

startWorker2()
function postData(data, url, methor) {
  fetch(url, {
    method: methor, // or 'PUT'
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      getData(urlTX)


    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function deleteData(url) {
  fetch(url, {
    method: "DELETE", // or 'PUT'
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      getData(urlTX)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



function checkID(MaSo) {
  var ojb = useCaher
  for (var a in ojb) {
    if (ojb[a].MaSo == MaSo) { return ojb[a].id }
  }
}

KhuVuc()
function KhuVuc() {
  var values = KhuVucVT;
  var list = document.getElementById('KhuVuc');
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");

    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);

  }
}
function ChangKhuVuc() {
  var MaSo = $('#MaSo').val()
  console.log(MaSo)
  var json2 = {
    KhuVuc: $('#KhuVuc').val(),
  }
  postData(json2, urlTX + "/" + checkID(MaSo), "PATCH")
}

function DanhSachCoVan2() {
  var values = NhomCV;
  var list = document.getElementById('CoVanDichVu');
  $("#CoVanDichVu").html("")
  var option = document.createElement("option");
  option.value = "";
  option.text = "";
  list.appendChild(option)
  for (var i = 0; i < values.length; i++) {
    var khongduoc = " 🆗"
    if (CoVanDuocDatHen(values[i]) == "ok") {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i] + khongduoc;
      list.appendChild(option);
    }
  }
}
function XeChuaTiepNhan() {
  var dataArrayhen = useCaher.filter(function (r) {
    return r.TrangThaiXuong == "00 Có Hẹn" && (r.TrangThaiHen == null || r.TrangThaiHen == "")
  })
  dataArrayhen = dataArrayhen.sort(function (a, b) { return (new Date(DoiNgayDangKy(a.ThoiGianHen)).valueOf() > new Date(DoiNgayDangKy(b.ThoiGianHen)).valueOf() ? 1 : -1); })
  var list = document.getElementById('XeChuaXN');
  $("#XeChuaXN").html("")
  var option = document.createElement("option");
  option.value = "";
  option.text = "";
  list.appendChild(option)
  for (var i = 0; i < dataArrayhen.length; i++) {
    values = dataArrayhen[i]
    var option = document.createElement("option");
    option.value = values.BienSoXe;
    option.text = values.BienSoXe;
    list.appendChild(option);
  }
}
function timxehen(BienSoXe) {
  var ojb = useCaher
  var ids
  for (var a in ojb) {
    if (ojb[a].BienSoXe == BienSoXe) { ids = ojb[a].MaSo }
  }

  timeline.setSelection(ids, { focus: true })
}

function DanhSachCoVan() {
  $("#CoVanDichVu").html("")
  var list = document.getElementById('CoVanDichVu');
  var option = document.createElement("option");
  var values = NhomCV;
  option.value = "";
  option.text = "";
  list.appendChild(option)
  for (var i = 0; i < values.length; i++) {
    var khongduoc = " 🆗"
    if (CoVanDuocDatHen(values[i]) == "NotOK") { khongduoc = ' ⛔' }
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i] + khongduoc;
    list.appendChild(option);

  }

}



function CoVanDuocDatHen(tencovan) {
  var ojb = useCaher;
  ojb = ojb.filter(function (r) { return (r.CoVanDichVu === tencovan && r.TrangThaiXuong === "00 Có Hẹn") })
  var b = "ok"
  var giodathen = new Date(DoiNgayDangKy($("#ThoiGianHen").val()))
  for (var a in ojb) {

    var start = new Date(DoiNgayDangKy(ojb[a].ThoiGianHen))
    if (giodathen.valueOf() == start.valueOf()) {
      var b = "NotOK";
    }
  }
  return b
}





function checkloaihinhGJ() {
  var LoaiHinhSCC = $('#LoaiHinhSuaChua').val()
  var giodathen = new Date(DoiNgayDangKy($("#ThoiGianHen").val()))
  if (LoaiHinhSCC == "EM60") { LoaiHinhSCC = "EM" }
  if (LoaiHinhSCC == "FIR") { LoaiHinhSCC = "SCC" }
  if (LoaiHinhSCC == "SCC") { giodathen.setMinutes(0) }
  var dataArray1 = useCaher;
  var dataArrayhen = dataArray1.filter(function (r) {
    if (r.LoaiHinhSuaChua == "EM60") { r.LoaiHinhSuaChua = "EM" }
    if (r.LoaiHinhSuaChua == "FIR") { r.LoaiHinhSuaChua = "SCC" }
    return r.TrangThaiXuong == "00 Có Hẹn" && r.LoaiHinhSuaChua == LoaiHinhSCC && (new Date(DoiNgayDangKy(r.ThoiGianHen)).valueOf() == giodathen.valueOf())
  })
  var soluong = dataArrayhen.length
  if (LoaiHinhSCC == "EM" && soluong >= 3) { $('#LoaiHinhSuaChua').val(""); alert("Quá Số lượng đặt hẹn cho xe EM. Tối đa 3 xe") }
  if (LoaiHinhSCC == "SCC" && soluong >= 2) { $('#LoaiHinhSuaChua').val(""); alert("Quá Số lượng đặt hẹn cho xe SCC. Tối đa 2 xe") }
  return soluong
}



function checkloaihinhDS() {
  var LoaiHinhDS = $('#LoaiHinhDongSon').val()
  var giodathen = new Date(DoiNgayDangKy($("#ThoiGianHen").val()))
  var dataArray1 = useCaher;
  var dataArrayhen = dataArray1.filter(function (r) {
    return r.TrangThaiXuong == "00 Có Hẹn" && r.LoaiHinhDongSon == LoaiHinhDS && (new Date(DoiNgayDangKy(r.ThoiGianHen)).valueOf() == giodathen.valueOf())
  })
  var soluongDS = dataArrayhen.length
  if (soluongDS >= 1) { $('#LoaiHinhDongSon').val(""); alert("Quá Số lượng đặt hẹn cho xe " + LoaiHinhDS + ". Tối đa 1 xe") }
  return soluongDS
}



function DangKyHen() {
  if ($('#BienSoXe').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  if ($('#TenKH').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  if ($('#NoiDungHen').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  if ($('#ThoiGianHen').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  if ($('#CoVanDichVu').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  if ($('#LoaiHinhDongSon').val() == "" && $('#LoaiHinhSuaChua').val() == "") { alert("Không Thể Đặt Hẹn, Thiếu Thông Tin"); return false }
  try {
    if (changvalueBS() !== false) {

      $("#buttonDK").html("<button  type='button' class='btn btn-warning me-2' disable >Đang Đăng Ký!</button>")
      var MaSohen = TaoMaSo($('#ThoiGianHen').val()) + $('#BienSoXe').val()
      var thoigiandung = DoiNgayDangKy(document.getElementById("ThoiGianHen").value)
      var khachhen = "Khách Hẹn"
      var giohientai = new Date()
      var thoigiandathen = (thoigiandung.getTime() - giohientai.getTime()) / (60 * 1000)
      if (thoigiandathen <= 30) { alert("Không Thể Đặt Hẹn, Đặt hẹn trước 30p"); return false }
      if (thoigiandathen > 30 && thoigiandathen <= 120) { khachhen = "Hẹn Vãn Lai" }
      if ($('#LoaiHinhSuaChua').val() == "SCC") { $('#ThoiGianHen').val(TimesClick(DoiNgayDangKy($('#ThoiGianHen').val()).setMinutes(0))) }
      var json2 = {
        MaSo: MaSohen,
        BienSoXe: $('#BienSoXe').val(),
        TenKH: $('#TenKH').val(),
        SoDT: $('#SoDT').val(),
        NoiDungHen: $('#NoiDungHen').val(),
        CoVanDichVu: $('#CoVanDichVu').val(),
        LoaiHinhDongSon: $('#LoaiHinhDongSon').val(),
        LoaiHinhSuaChua: $('#LoaiHinhSuaChua').val(),
        ThoiGianHen: $('#ThoiGianHen').val(),
        KhuVuc: $('#KhuVuc').val(),
        TDNgayHen: ngayGiohen($('#ThoiGianHen').val()).ngaythang,
        GioHen: ngayGiohen($('#ThoiGianHen').val()).giophut,
        KhachHangHen: khachhen,
        TrangThaiXuong: "00 Có Hẹn",
        NguoiDatHen: localStorage.getItem("userName"),
        TDXacNhanHen: TimesClick()
      }
      if ($('#LoaiHinhSuaChua').val() == "EM" || $('#LoaiHinhSuaChua').val() == "EM60") { json2["KhoangSuaChua"] = "EM 0" + (checkloaihinhGJ() + 1) }
      if ($('#LoaiHinhSuaChua').val() == "SCC" || $('#LoaiHinhSuaChua').val() == "FIR") { json2["KhoangSuaChua"] = "SCC 0" + (checkloaihinhGJ() + 5) }
      $("#mesenge").html('<div class="alert alert-warning" role="alert">Đang Đăng Ký! ' + khachhen + '</div>')
      postData(json2, urlTX, "POST")
    } else { alert("Xe Đã Có Hẹn") }
  }
  catch (error) {
    $("#buttonDK").html("<button  type='button' class='btn btn-danger me-2' disable >Không Thành Công!</button>")
  }
  //finally{$("#buttonDK").html("<button  type='button' class='btn btn-success me-2' disable >Đăng Ký Thành Công!</button>")}


}


function CapNhatHen() {
  var MaSohen = TaoMaSo($('#ThoiGianHen').val()) + $('#BienSoXe').val()
  var json2 = {
    MaSo: MaSohen,
    BienSoXe: $('#BienSoXe').val(),
    TenKH: $('#TenKH').val(),
    SoDT: $('#SoDT').val(),
    NoiDungHen: $('#NoiDungHen').val(),
    CoVanDichVu: $('#CoVanDichVu').val(),
    LoaiHinhDongSon: $('#LoaiHinhDongSon').val(),
    LoaiHinhSuaChua: $('#LoaiHinhSuaChua').val(),
    ThoiGianHen: $('#ThoiGianHen').val(),
    TDNgayHen: ngayGiohen($('#ThoiGianHen').val()).ngaythang,
    GioHen: ngayGiohen($('#ThoiGianHen').val()).giophut,
    KhachHangHen: "Khách Hẹn",
    TrangThaiXuong: "00 Có Hẹn",
    KhuVuc: $('#KhuVuc').val(),
    NguoiDatHen: $('#NguoiDatHen').val(),
    TDXacNhanHen: TimesClick()
  }

  $("#mesenge").html('<div class="alert alert-warning" role="alert">Đang Cập Nhật!</div>')
  postData(json2, urlTX + "/" + checkID($('#MaSo').val()), "PATCH")
}




function CapNhatHenKeo(MaSo, ThoiGianHenMoi) {
  var ojb = useCaher
  for (var a in ojb) {
    if (ojb[a].MaSo == MaSo) {
      if (localStorage.getItem("userName") === ojb[a].NguoiDatHen || localStorage.getItem("userName") === $("#NguoiDatHen").val() ||
        localStorage.getItem("PhanQuyen") == "AdminHen" || localStorage.getItem("PhanQuyen") == "admin"
      ) {
        var json2 = {
          ThoiGianHen: ThoiGianHenMoi,
          TDNgayHen: ngayGiohen(ThoiGianHenMoi).ngaythang,
          GioHen: ngayGiohen(ThoiGianHenMoi).giophut,
        }
        postData(json2, urlTX + "/" + checkID(MaSo), "PATCH")
      } else { alert("Bạn không thể dời hẹn, Bạn không Đặt hẹn xe này"); loadData() }
    }
  }
}



function XacNhanHen() {
  var MaSo = $('#MaSo').val()

  var json2 = {
    TrangThaiHen: $('#TrangThaiHen').val(),
    TDXacNhanHen: TimesClick()
  }
  postData(json2, urlTX + "/" + checkID(MaSo), "PATCH")
}

function HuyHen() {
  let text = "Hủy Hẹn Xe";
  if (confirm(text) == true) {
    var MaSo = $('#MaSo').val()

    try {
      json3 = {
        TrangThaiHen: "Hủy Hẹn",
        TDXacNhanHen: TimesClick()
      };

      fetch(urlTX + "/" + checkID(MaSo), {
        method: "PATCH", // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json3),
      }).then(response => response.json())
        .then(data => {
          $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxIfaWmzDpVW3erjRGP6y-da5aEOKaG5tKrQYz-wrqSpHKqPU0zNqsc_BUxZ-bhEnKL/exec",
            method: "GET",
            mode: 'no-cors',
            credentials: 'omit',
            referrerPolicy: 'no-referrer',
            dataType: "json",
            data: data
          })

          var data2 = data
          delete data2.id
          postData(data2, urlDG, "POST")
          deleteData(urlTX + "/" + checkID(data.MaSo))
        });
    } catch (error) {
      alert("Lỗi : " + error)
    }

  }

}


function changvalue() {

  var ojb = useCaher
  for (var a in ojb) {
    $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>")
    if (ojb[a].MaSo == $("#MaSo").val()) {
      if (ojb[a].BienSoXe) { document.getElementById("BienSoXe").value = ojb[a].BienSoXe }
      if (ojb[a].TrangThaiXuong) {
        document.getElementById("TrangThaiXuong").value = ojb[a].TrangThaiXuong
        if (ojb[a].CoVanDichVu) { document.getElementById("CoVanDichVu").value = ojb[a].CoVanDichVu }
        if (ojb[a].LoaiHinhDongSon) { document.getElementById("LoaiHinhDongSon").value = ojb[a].LoaiHinhDongSon }
        if (ojb[a].LoaiHinhSuaChua) { document.getElementById("LoaiHinhSuaChua").value = ojb[a].LoaiHinhSuaChua }
        if (ojb[a].TenKH) { document.getElementById("TenKH").value = ojb[a].TenKH }
        if (ojb[a].SoDT) { document.getElementById("SoDT").value = ojb[a].SoDT }
        if (ojb[a].KhuVuc) { document.getElementById("KhuVuc").value = ojb[a].KhuVuc }
        if (ojb[a].NoiDungHen) { document.getElementById("NoiDungHen").value = ojb[a].NoiDungHen }
        if (ojb[a].ThoiGianHen) { document.getElementById("ThoiGianHen").value = ojb[a].ThoiGianHen }
        if (ojb[a].NguoiDatHen) { document.getElementById("NguoiDatHen").value = ojb[a].NguoiDatHen }
        if (ojb[a].TrangThaiHen) { document.getElementById("TrangThaiHen").value = ojb[a].TrangThaiHen }
        if (ojb[a].TrangThaiXuong == "00 Có Hẹn" && ojb[a].NguoiDatHen == $('#Email').val()) { $("#buttonDK").html("<button  type='button' class='btn btn-primary me-2' onclick='CapNhatHen()'>Cập Nhật!</button>") } else if (ojb[a].TrangThaiXuong == "00 Có Hẹn" && emailnhanvienhen == $('#Email').val()) { $("#buttonDK").html("<button  type='button' class='btn btn-primary me-2' onclick='CapNhatHen()'>Cập Nhật!</button>") } else { $("#buttonDK").html("") }
        goithongtin()
      }
    }
  }

}




function changvalueBS() {

  var ojb = useCaher
  for (var a in ojb) {
    $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>")
    if (ojb[a].BienSoXe == $("#BienSoXe").val() && ojb[a].TrangThaiXuong == "00 Có Hẹn") {
      alert("Xe Đã Có Hẹn");
      $("#buttonDK").html("")
      timeline.setSelection(ojb[a].MaSo, { focus: true })
      return false
    }
    if (ojb[a].BienSoXe == $("#BienSoXe").val() && ojb[a].TrangThaiXuong !== "00 Có Hẹn") {
      alert("Xe Còn Trong Xưởng. Vui lòng gặp cố Vấn " + ojb[a].CoVanDichVu + " cho xe ra cổng");
      $("#buttonDK").html("")
      return false
    }


  }

  var thongtin = checkMasterData($("#BienSoXe").val())[0]
  if (checkMasterData($("#BienSoXe").val()) !== false && checkMasterData($("#BienSoXe").val()).length > 0) {
    document.getElementById("KhuVuc").value = thongtin["Quận/Huyện"]
    if (thongtin["Điện thoại người mang xe"]) {
      document.getElementById("SoDT").value = thongtin["Điện thoại người mang xe"]
      document.getElementById("TenKH").value = thongtin["Người mang xe"]
    } else {
      document.getElementById("SoDT").value = thongtin["Điện thoại KH"]
      document.getElementById("TenKH").value = thongtin["Tên KH"]
    }

  }
}


function goithongtin() {
  var SDT = $("#SoDT").val()
  if (SDT.slice(0, 1) == "0") { SDT = SDT.slice(1) }
  var dienthoai = "<a href='tel:+84" + SDT + "' class='col-sm-7'>Call</a>"
  var ThoiGianDen = DoiNgayDangKy($("#ThoiGianHen").val())
  ThoiGianDen = new Date(ThoiGianDen - 15 * 60 * 1000)
  var sms = "<a href='sms:+84" + SDT + "?body=Toyota Vũng Tàu xác nhận cuộc hẹn \n" + $("#BienSoXe").val() + " .Nội Dung: " + $("#NoiDungHen").val() + ". Vào Lúc : " + Doingay2(ThoiGianDen) + ".Quý Khách vui lòng đến ĐÚNG GIỜ TẠI QUẦY ĐĂNG KÝ DỊCH VỤ.Xin cảm ơn!!' class='col-sm-7'>SMS</a>"

  var EMail = '<a href="mailto:' + $("#NguoiDatHen").val() + '?&subject=Thông báo xác nhận hẹn ' + $("#BienSoXe").val() + ' &body=Xác Nhận hẹn xe ' + $("#BienSoXe").val() + ' .Nội Dung :' + $("#NoiDungHen").val() + '  .Vào Lúc:' + Doingay2(ThoiGianDen) + '.Thanks!!"> Emailr</a>'
  // <a href=”sms://+15552345678, +15552345679;?&amp;body=Hello%20World”>Gửi SMS</a>
  $("#NhanTin").html(sms)
  $("#CuocGoi").html(dienthoai)
  // $("#email").html(EMail)
}

