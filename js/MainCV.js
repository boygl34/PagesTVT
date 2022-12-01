function postData(data, url, methor) {
  fetch(url, {
    method: methor, // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      getData(urlTX);
      $("#message").html("<div class='alert alert-success'>Thành Công</div>");
      $("#NutNhan").html("")
      document.getElementById("myForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
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

function LoadTimeLine() {
  loadDataCV();
  var CoHen = 0,
    ChoTN = 0,
    DangTN = 0,
    DaTN = 0,
    DangSC = 0,
    ChoRX = 0,
    DangRX = 0,
    ChoGiao = 0;
  var dataArray0 = useCaher;
  var CoVan = TenCoVan;
  var dataArray = dataArray0.filter(function (r) {
    return r.CoVanDichVu === CoVan && r.TrangThaiXuong !== "09 Đã Giao Xe";
  });
  // if(document.getElementById("TenCoVan").value==""){ dataArray= dataArray0.filter(function(r){return (r.TrangThaiXuong!=="09 Đã Giao Xe")})}
  var tbodyTim = document.getElementById("table-body");
  tbodyTim.innerHTML = "";
  $("#alert").html("");
  dataArray.forEach(function (r) {
    var tbodyTim = document.getElementById("table-body");
    var row = document.createElement("tr");
    var ColBS = document.createElement("td");
    var ColCV = document.createElement("td");
    var ColTKH = document.createElement("td");
    var ColCD = document.createElement("td");
    var ColLHSCC = document.createElement("td");
    var ColLDDS = document.createElement("td");
    var ColRX = document.createElement("td");
    var ColKD = document.createElement("td");
    var ColNH = document.createElement("td");
    var ColGH = document.createElement("td");
    var ColTime = document.createElement("td");
    ColBS.textContent = r.BienSoXe;
    ColTKH.textContent = r.TenKH;
    ColCV.textContent = r.CoVanDichVu;
    ColLHSCC.textContent = r.LoaiHinhSuaChua;
    ColLDDS.textContent = r.LoaiHinhDongSon;
    ColRX.textContent = r.KhachRuaXe;
    ColKD.textContent = r.KhachHangDoi;
    if (r.TrangThaiXuong == "00 Có Hẹn") {
      ColCD.innerHTML = "Có Hẹn";
    }
    if (r.TrangThaiXuong == "02 Chờ Tiếp Nhận") {
      ColCD.innerHTML = "Chờ TN";
      row.setAttribute("class", "ChoTiepNhan");
    }
    if (r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") {
      ColCD.innerHTML = "CB Tiếp";
      row.setAttribute("class", "SapTiepNhan");
    }
    if (r.TrangThaiXuong == "03 Đang Tiếp Nhận") {
      ColCD.innerHTML = "Đang TN";
      row.setAttribute("class", "DangTiepNhan");
    }
    if (r.TrangThaiXuong == "04 Đã Tiếp Nhận") {
      ColCD.innerHTML = "Đã TN";
      row.setAttribute("class", "DaTiepNhan");
    }
    if (r.TrangThaiXuong == "05 Đang Sửa Chữa") {
      ColCD.innerHTML = "Đang SC";
      row.setAttribute("class", "DangSuaChua");
      if (r.KhachRuaXe == "" || r.KhachRuaXe == null) {
        alert(`${r.BienSoXe} chưa có thông tin rửa xe`)
        row.setAttribute("class", "DungCongViec");
      }
    }
    if (r.TrangThaiXuong == "05 Dừng Công Việc") {
      ColCD.innerHTML = "Dừng CV";
      row.setAttribute("class", "DungCongViec");
    }
    if (r.TrangThaiXuong == "06 Chờ Rửa Xe") {
      ColCD.innerHTML = "Chờ RX";
      row.setAttribute("class", "DangTiepNhan");
    }
    if (r.TrangThaiXuong == "07 Đang Rửa Xe") {
      ColCD.innerHTML = "Đang RX";
      row.setAttribute("class", "DangSuaChua");
    }
    if (r.TrangThaiXuong == "08 Chờ Giao Xe") {
      ColCD.innerHTML = "Chờ Giao";
      row.setAttribute("class", "ChoGiaoXe");
    }
    //if( r.NgayHen){ColNH.textContent = r.NgayHen.slice(5,10)}else{ColNH.textContent =""}
    if (r.ThoiGianHen) {
      ColGH.textContent = Doingay(DoiNgayDangKy(r.ThoiGianHen));
    } else {
      ColGH.textContent = "";
    }

    if (r.TrangThaiXuong == "02 Chờ Tiếp Nhận" || r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") {
      var time = Math.round((new Date() - new Date(DoiNgayDangKy(r.TDGapLeTan))) / (60 * 1000) * 1) / 1
      ColTime.innerHTML = time + " P"
      if (time > 15) { canhBao("Chờ Tiếp Nhận", "Bạn có xe " + r.BienSoXe + "chờ tiếp " + time + "Phút", "danger") }
    }
    if (r.TrangThaiXuong == "03 Đang Tiếp Nhận") {
      var time = Math.round((new Date() - new Date(DoiNgayDangKy(r.TDBDTiepKhach))) / (60 * 1000) * 1) / 1
      ColTime.innerHTML = time + " P"
      if (time > 30) { canhBao("Tiếp Nhận", "Bạn Tiếp nhận xe " + r.BienSoXe + " quá lâu " + time + "Phút", "danger") }
    }
    if (r.TrangThaiXuong == "07 Đang Rửa Xe") {
      canhBao("Rửa Xe", "Bạn Có Xe " + r.BienSoXe + " Đang Rửa ", "success")
    }
    if (r.TrangThaiXuong == "08 Chờ Giao Xe") {
      canhBao("Giao Xe", "Bạn có xe " + r.BienSoXe + " Đang Chờ Giao", "primary")
    }
    if (
      r.TrangThaiXuong == "05 Đang Sửa Chữa" ||
      r.TrangThaiXuong == "06 Chờ Rửa Xe" ||
      r.TrangThaiXuong == "07 Đang Rửa Xe" ||
      r.TrangThaiXuong == "04 Đã Tiếp Nhận" ||
      r.TrangThaiXuong == "08 Chờ Giao Xe"
    ) {
      ColTime.innerHTML = Doingay(DoiNgayDangKy(r.TDHenGiaoXe));
    }
    row.appendChild(ColBS);
    if (CoVan == "") {
      row.appendChild(ColCV);
    } else {
      row.appendChild(ColTKH);
    }
    row.appendChild(ColCD);
    row.appendChild(ColLHSCC);
    row.appendChild(ColLDDS);
    row.appendChild(ColRX);
    row.appendChild(ColKD);
    //row.appendChild(ColNH);
    row.appendChild(ColGH);
    row.appendChild(ColTime);
    tbodyTim.appendChild(row);

    sortTable1();
  });
}

function sortTable1() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("data-table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function TiepNhan() {
  $("#message").html("<div class='alert alert-success'>Đang Cập Nhật</div>");
  var json2 = {
    TDBDTiepKhach: TimesClick(),
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    TrangThaiXuong: "03 Đang Tiếp Nhận",
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function KetThucTiepNhan() {
  if ($("#KhachDoi").val() == "") {
    alert("Thông Tin Khách Đợi");
    return false;
  }
  if ($("#KhachRX").val() == "") {
    alert("Thông Tin Rửa Xe");
    return false;
  }
  if ($("#LoaiHinh").val() == "" && $("#LoaiHinhBP").val() == "") {
    alert("chưa Có Loại Hình");
    return false;
  }
  if (
    $("#LoaiHinh").val() == "Báo Giá SCC" ||
    $("#LoaiHinhBP").val() == "Báo Giá BH"
  ) {
    $("#NgayGiaoXe").val("");
  } else {
    if ($("#NgayGiaoXe").val() == "") {
      alert("chưa Có Ngày Giao Xe");
      return false;
    }
  }
  $("#message").html("<div class='alert alert-success'>Đang Cập Nhật</div>");
  var json2 = {
    TDKetThucTiepKhach: TimesClick(),
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    TrangThaiXuong: "04 Đã Tiếp Nhận",
    KhachHangDoi: $("#KhachDoi").val(),
    KhachRuaXe: $("#KhachRX").val(),
    TDHenGiaoXe: $("#NgayGiaoXe").val(),
    CongDoanDongSon: "Chờ SC",
    TrangThaiDongSon: "Chờ SC",
  };
  if ($("#LoaiHinh").val()) {
    json2["TrangThaiSCC"] = "Chờ SC";
  } else {
    json2["TrangThaiSCC"] = "";
  }
  if ($("#LoaiHinhBP").val()) {
    json2["CongDoanDongSon"] = "Chờ SC";
    json2["TrangThaiDongSon"] = "Chờ SC";
  } else {
    json2["CongDoanDongSon"] = "";
    json2["TrangThaiDongSon"] = "";
  }
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}

function GiaoXe(use) {
  try {
    $("#message").html("<div class='alert alert-success'>Đang Cập Nhật</div>");
    var json3 = {
      TDRaKhoicong: TimesClick(),
      TrangThaiXuong: "09 Đã Giao Xe",
    };
    var MaSo = $("#MaSo").val();
    fetch(urlTX + "/" + checkID(MaSo), {
      method: "PATCH", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json3),
    })
      .then((response) => response.json())
      .then((data) => {
        getData(urlTX);
        $("#message").html("<div class='alert alert-success'>Thành Công</div>");
        document.getElementById("NutNhan").innerHTML = "";
        document.getElementById("myForm").reset();

        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbxIfaWmzDpVW3erjRGP6y-da5aEOKaG5tKrQYz-wrqSpHKqPU0zNqsc_BUxZ-bhEnKL/exec",
          method: "GET",
          mode: "no-cors",
          credentials: "omit",
          referrerPolicy: "no-referrer",
          dataType: "json",
          data: data,
        });
        var data2 = data;
        delete data2.id;
        postData(data2, urlDG, "POST");
        deleteData(urlTX + "/" + checkID(data.MaSo));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("Lỗi : " + error);
  }
}

function CapNhat() {
  if ($("#LoaiHinh").val() == "" && $("#LoaiHinhBP").val() == "") {
    alert("chưa Có Loại Hình");
    return false;
  }
  if ($("#NgayGiaoXe").val() == "") {
    alert("chưa Có Ngày Giao Xe");
    return false;
  }
  $("#message").html("<div class='alert alert-success'>Đang Cập Nhật</div>");
  var json2 = {
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    KhachHangDoi: $("#KhachDoi").val(),
    KhachRuaXe: $("#KhachRX").val(),
    TDHenGiaoXe: $("#NgayGiaoXe").val(),
  };
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].BienSoXe == $("#BienSoXe").val()) {
      if (ojb[a].LoaiHinhSuaChua !== "") {
      } else {
        if ($("#LoaiHinh").val()) {
          json2["TrangThaiSCC"] = "Chờ SC";
        }
      }
      if (ojb[a].LoaiHinhDongSon !== "") {
      } else {
        if ($("#LoaiHinhBP").val()) {
          json2["CongDoanDongSon"] = "Chờ SC";
          json2["TrangThaiDongSon"] = "Chờ SC";
        }
      }
    }
  }

  if ($("#LoaiHinhBP").val() == "Đồng Sơn") {
    json2["TDKetThucTiepKhach"] = TimesClick();
  }
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
}
function DangKyCoVan() {
  if ($("#KhachDoi").val() == "") {
    alert("Thông Tin Khách Đợi");
    return false;
  }
  if ($("#KhachRX").val() == "") {
    alert("Thông Tin Rửa Xe");
    return false;
  }
  if ($("#LoaiHinh").val() == "" && $("#LoaiHinhBP").val() == "") {
    alert("chưa Có Loại Hình");
    return false;
  }
  if (
    $("#LoaiHinh").val() == "Báo Giá SCC" ||
    $("#LoaiHinhBP").val() == "Báo Giá BH"
  ) {
    $("#NgayGiaoXe").val("");
  } else {
    if ($("#NgayGiaoXe").val() == "") {
      alert("chưa Có Ngày Giao Xe");
      return false;
    }
  }
  document.getElementById("MaSo").value = TaoMaSo() + $("#BienSoXe").val();
  var json2 = {
    MaSo: $("#MaSo").val(),
    BienSoXe: $("#BienSoXe").val(),
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    TDKetThucTiepKhach: TimesClick(),
    TrangThaiXuong: "04 Đã Tiếp Nhận",
    CoVanDichVu: TenCoVan,
    KhachHangDoi: $("#KhachDoi").val(),
    KhachRuaXe: $("#KhachRX").val(),
    TDHenGiaoXe: $("#NgayGiaoXe").val()
  };
  if (LoaiHinh.value) {
    json2["TrangThaiSCC"] = "Chờ SC";
  } else {
    json2["TrangThaiSCC"] = "";
  }
  if (LoaiHinhBP.value) {
    json2["CongDoanDongSon"] = "Chờ SC";
    json2["TrangThaiDongSon"] = "Chờ SC";
  } else {
    json2["CongDoanDongSon"] = "";
    json2["TrangThaiDongSon"] = "";
  }




  if (checkID($("#MaSo").val())) {
    postData(json2, urlTX + "/" + checkID($("#MaSo").val()), "PATCH");
  } else {
    postData(json2, urlTX, "POST");
  }
}
function changvalue() {
  fetch(urlTX + "?BienSoXe=" + $("#BienSoXe").val())
    .then((response) => response.json())
    .then((data) => {
      data = data[0];
      document.getElementById("NutNhan").innerHTML =
        '<button type="button" class="btn btn-primary" onclick="DangKyCoVan()" >Đăng Ký Dịch Vụ</button>' +
        '<button type="button" class="btn btn-warning" onclick="DKruaXe()" >Đăng Ký Rửa Xe</button>'
      if (data.MaSo) {
        document.getElementById("MaSo").value = data.MaSo;
      }
      if (data.LoaiHinhSuaChua) {
        document.getElementById("LoaiHinh").value = data.LoaiHinhSuaChua;
      }
      if (data.LoaiHinhDongSon) {
        document.getElementById("LoaiHinhBP").value = data.LoaiHinhDongSon;
      }
      if (data.KhachHangDoi) {
        var buttonkd = document.getElementById("KhachDoi");
        if (data.KhachHangDoi == "Khách Đợi") {
          buttonkd.value = "Khách Đợi";
          buttonkd.innerHTML = "Khách Đợi";
          buttonkd.removeAttribute("class", "btn-primary");
          buttonkd.setAttribute("class", " btn btn-danger");
        } else {
          buttonkd.value = "Không Đợi";
          buttonkd.innerHTML = "Không Đợi";
          buttonkd.removeAttribute("class", "btn-danger");
          buttonkd.setAttribute("class", "btn btn-primary");
        }
      }
      if (data.KhachRuaXe) {
        var buttonkd = document.getElementById("KhachRX");
        if (data.KhachRuaXe == "Rửa Xe") {
          buttonkd.value = "Rửa Xe";
          buttonkd.innerHTML = "Rửa Xe";
          //document.getElementById("divruaxe").style.display = "block";
          buttonkd.removeAttribute("class", "btn-primary");
          buttonkd.setAttribute("class", " btn btn-success");
        } else {
          buttonkd.value = "Không Rửa";
          // document.getElementById("divruaxe").style.display = "none";
          buttonkd.innerHTML = "Không Rửa";
          buttonkd.removeAttribute("class", "btn-primary");
          buttonkd.setAttribute("class", "btn btn-success");
        }
      }
      if (data.GhiChu) {
        alert(data.GhiChu);
      }
      if (data.TDHenGiaoXe) {
        document.getElementById("NgayGiaoXe").value = TimesClick(
          DoiNgayDangKy(data.TDHenGiaoXe)
        );
      }
      if (data.TrangThaiXuong == "02 Chờ Tiếp Nhận") {
        document.getElementById("NutNhan").innerHTML =
          '<button type="button" class="btn btn-primary" onclick="TiepNhan()" >Tiếp Nhận</button>';
      }
      if (data.TrangThaiXuong == "02 Chuẩn Bị Tiếp") {
        document.getElementById("NutNhan").innerHTML =
          '<button type="button" class="btn btn-primary" onclick="TiepNhan()" >Tiếp Nhận</button>';
      }
      if (data.TrangThaiXuong == "03 Đang Tiếp Nhận") {
        document.getElementById("NutNhan").innerHTML =
          '<button type="button" class="btn btn-primary" onclick="KetThucTiepNhan()" >Kết Thúc Tiếp Nhận</button>';
      }
      if (data.TrangThaiXuong == "08 Chờ Giao Xe") {

        document.getElementById("NutNhan").innerHTML =
          `<button type="button"id="bnt-DangKyshow" onclick="DKrualai()" class="btn btn-success" >DK Rửa Lại</button>

          <button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button><button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button`
      }
      if (
        data.TrangThaiXuong == "06 Chờ Rửa Xe" ||
        data.TrangThaiXuong == "07 Đang Rửa Xe"
      ) {
        document.getElementById("NutNhan").innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>';
      }
      if (
        data.TrangThaiXuong == "04 Đã Tiếp Nhận" ||
        data.TrangThaiXuong == "05 Dừng Công Việc" ||
        data.TrangThaiXuong == "05 Đang Sửa Chữa"
      ) {
        document.getElementById("NutNhan").innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>';
      }
      if (data.TrangThaiXuong == "00 Có Hẹn") {
        document.getElementById("NutNhan").innerHTML = "";
      }
      if (
        data.LoaiHinhDongSon == "Báo Giá BH" &&
        data.TrangThaiXuong == "04 Đã Tiếp Nhận"
      ) {
        document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-warning" onclick="DKruaXe()" >Đăng Ký Rửa Xe</button>' +
          '<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button> <button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>';
      }
      if (data.LoaiHinhSuaChua == "Báo Giá SCC" && data.TrangThaiXuong == "04 Đã Tiếp Nhận") {
        document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-warning" onclick="DKruaXe()" >Đăng Ký Rửa Xe</button>' +
          '<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button> <button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>';
      }
    });
  //   var ojb =  useCaher
  //   for(var a in ojb){
  //   document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="DangKyXeDongSon()" >Đăng Ký DS</button>'
  //       if(ojb[a].BienSoXe == $("#BienSoXe").val()){
  //   if(ojb[a].MaSo){	document.getElementById("MaSo").value = ojb[a].MaSo}
  //   if(ojb[a].LoaiHinhSuaChua){document.getElementById("LoaiHinh").value = ojb[a].LoaiHinhSuaChua}
  //   if(ojb[a].LoaiHinhDongSon){document.getElementById("LoaiHinhBP").value = ojb[a].LoaiHinhDongSon}
  //   if(ojb[a].KhachHangDoi){document.getElementById("KhachDoi").value = ojb[a].KhachHangDoi }
  //   if(ojb[a].KhachRuaXe){document.getElementById("KhachRX").value = ojb[a].KhachRuaXe }
  //   if(ojb[a].GhiChu){alert(ojb[a].GhiChu)}
  //   if(ojb[a].TDHenGiaoXe){document.getElementById("NgayGiaoXe").value = TimesClick(DoiNgayDangKy( ojb[a].TDHenGiaoXe))}
  //   if( ojb[a].TrangThaiXuong =="02 Chờ Tiếp Nhận"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="TiepNhan()" >Tiếp Nhận</button>'}
  //   if( ojb[a].TrangThaiXuong =="02 Chuẩn Bị Tiếp"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="TiepNhan()" >Tiếp Nhận</button>'}
  //   if( ojb[a].TrangThaiXuong =="03 Đang Tiếp Nhận"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="KetThucTiepNhan()" >Kết Thúc Tiếp Nhận</button>'}
  //   if( ojb[a].TrangThaiXuong =="08 Chờ Giao Xe"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button>'}
  //   if( ojb[a].TrangThaiXuong =="04 Đã Tiếp Nhận"||ojb[a].TrangThaiXuong =="05 Dừng Công Việc"||ojb[a].TrangThaiXuong =="05 Đang Sửa Chữa"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>'}
  //   if( ojb[a].TrangThaiXuong =="00 Có Hẹn"){document.getElementById("NutNhan").innerHTML = ""}
  // if( ojb[a].LoaiHinhDongSon =="Báo Giá BH"&&ojb[a].TrangThaiXuong =="04 Đã Tiếp Nhận"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button> <button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>'}
  // if( ojb[a].LoaiHinhSuaChua =="Báo Giá SCC"&&ojb[a].TrangThaiXuong =="04 Đã Tiếp Nhận"){document.getElementById("NutNhan").innerHTML = '<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button> <button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>'}
  //     return
  //       }
  //   }
}

function clickTableTiepNhan() {
  var table = document.getElementById("data-table");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      document.getElementById("myForm").reset();
      $("#message").html("<div class='alert alert-success'>Hello!!</div>");
      document.getElementById("NutNhan").innerHTML = "";
      $("#BienSoXe").val(this.cells[0].innerHTML);
      var buttonkd = document.getElementById("KhachDoi");
      buttonkd.value = "Khách Đợi";
      buttonkd.innerHTML = "Khách Đợi";
      buttonkd.removeAttribute("class", "btn-success");
      buttonkd.setAttribute("class", " btn btn-primary");
      var buttonkd = document.getElementById("KhachRX");
      buttonkd.value = "Rửa Xe";
      buttonkd.innerHTML = "Rửa Xe";
      buttonkd.removeAttribute("class", "btn-success");
      buttonkd.setAttribute("class", "btn btn-primary");
      changvalue();
      return false;
    };
  }
}

function canhBao(tieude, noidung, canhbao) {

  var AlertS = `<div class="alert alert-${canhbao} alert-dismissible fade show" role="alert">
  <h5 class="alert-heading">${tieude}</h5>
  ${noidung}
  <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
  $("#alert").html($("#alert").html() + AlertS);
}

function DKruaXe() {
  if ($("#LoaiHinh").val() == "" && $("#LoaiHinhBP").val() == "") {
    alert("chưa Có Loại Hình");
    return false;
  }
  if ($("#NgayGiaoXe").val() == "") {
    alert("chưa Có Ngày Giao Xe");
    return false;
  }


  var MaSoNew = TaoMaSo() + $("#BienSoXe").val();
  if (checkBienSo($("#BienSoXe").val())) {
    var json2 = {
      MaSo: MaSoNew,
      CoVanDichVu: localStorage.getItem("Ten"),
      BienSoXe: $("#BienSoXe").val(),
      TDKetThucTiepKhach: TimesClick(),
      LoaiHinhSuaChua: $("#LoaiHinh").val(),
      LoaiHinhDongSon: $("#LoaiHinhBP").val(),
      TrangThaiXuong: "06 Chờ Rửa Xe",
      KhachHangDoi: $("#KhachDoi").val(),
      KhachRuaXe: $("#KhachRX").val(),
      TDHenGiaoXe: $("#NgayGiaoXe").val(),
      TimeEndGJ: TimesClick(),
    };
    postData(json2, urlTX, "POST");
  } else {
    alert("Xe Trong Xưởng");
  }
}

function TaoMaSo() {
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

function DKrualai() {
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].BienSoXe == $("#BienSoXe").val()) {
      if (ojb[a].TrangThaiXuong == "08 Chờ Giao Xe") {
        var json2 = {
          KhachRuaXe: "Rửa Xe",
          TrangThaiXuong: "06 Chờ Rửa Xe",
        };
        postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
      } else {
        alert("khong the dang dy");
      }
    }
  }
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
function DungTN() {
  var result = prompt("Lý do dừng:", "");
  if (result != null) {
    var json2 = {
      TrangThai: "DungTN",
      LyDo: result,
      ThoiGianDung: TimesClick()
    }
    $.ajax({
      url: urlSetting + localStorage.getItem("Ten"),
      type: 'PATCH',
      data: json2
    })
    setTimeout(CheckTrangThaiTN, 2000)

  }
}
function BATDAUTIEPNHAN() {
  let text = "Bạn bắt đầu tiếp nhận lại ?"
  if (confirm(text) == true) {
    var json2 = {
      TrangThai: "DangTN",
      LyDo: "",
      ThoiGianDung: ""
    }
    $.ajax({
      url: urlSetting + localStorage.getItem("Ten"),
      type: 'PATCH',
      data: json2
    })
    hidemodal()
    document.getElementById("checkboxdungTN").checked = false
  }
}
CheckTrangThaiTN()
function CheckTrangThaiTN() {
  $.get(urlSetting + localStorage.getItem("Ten"), function (ketqua) {
    if (ketqua.TrangThai == "DungTN") {
      document.getElementById("checkboxdungTN").checked = true
      $('#exampleModal').modal('show')
      $('#thongtindung').html("Lý Do : " + ketqua.LyDo + "<br> Từ lúc : " + ketqua.ThoiGianDung)
    }

  });
}  