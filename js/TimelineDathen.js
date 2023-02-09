var container = document.getElementById("mytimeline");
var container2 = document.getElementById("mytimeline2");
var groups = new vis.DataSet();
var items = new vis.DataSet();
var newitems = new vis.DataSet();

//   for(a in NhomDH){
//     groups.add({id: NhomDH[a],
//       content: NhomDH[a],
//       className: NhomDH[a]
//     })

// }

groups.add({
  id: NhomDH[0],
  content: NhomDH[0],
  className: NhomDH[0],
});
groups.add({
  id: NhomDH[1],
  content: NhomDH[1],
  className: NhomDH[1],
});

groups.add({
  id: NhomDH[2],
  content: NhomDH[2],
  className: NhomDH[2],
});

groups.add({
  id: NhomDH[3],
  content: NhomDH[3],
  className: NhomDH[3],
});

var option2 = {
  start: new Date(new Date().valueOf()).setHours(12),
  end: new Date(new Date().valueOf()).setHours(17),
};
var options = {
  hiddenDates: [
    //{ start: '2017-03-05 00:00:00',end: '2017-03-06 00:00:00',repeat: 'weekly'},
    {
      start: "2017-03-04 17:00:00",
      end: "2017-03-05 08:00:00",
      repeat: "daily",
    },
    {
      start: "2017-03-04 12:00:00",
      end: "2017-03-04 13:00:00",
      repeat: "daily",
    },
  ],
  editable: true,
  autoResize: true,
  zoomable: false,
  moveable: false,
  onAdd: function (item, callback) {
    $("#CoVanDichVu").html("");
    getData(urlTX);
    if (item.start.getMinutes() >= 0 && item.start.getMinutes() < 30) {
      item.start.setMinutes(0);
    } else {
      item.start.setMinutes(30);
    }
    //if(item.group=="SCC"){item.start.setMinutes(0)}
    document.getElementById("FormSCC").reset();
    $("#ModalSCC").modal("show");
    document.getElementById("NguoiDatHen").disabled = true;
    $("#ThoiGianHen").val(TimesClick(item.start));
    document.getElementById("ThoiGianHen").disabled = true;
    DanhSachCoVan2();
    $("#buttonDK").html(
      "<button  type='button' class='btn btn-primary me-2' onclick='DangKyHen()'>Đăng Ký!</button>"
    );
    $("#buttonSCC").html("");
  },

  onMove: function (item, callback) {
    let text = "Thay Đổi Giờ Hen " + item.id;
    if (confirm(text) == true) {
      if (item.start.getMinutes() >= 0 && item.start.getMinutes() < 30) {
        item.start.setMinutes(0);
      } else {
        item.start.setMinutes(30);
      }
      if (item.group == "SCC") {
        item.start.setMinutes(0);
      }
      if (new Date().getTime() > item.start.getTime()) {
        alert("Sai thời Gian");
        loadData();
        return false;
      }
      CapNhatHenKeo(item.id, TimesClick(item.start));
    } else {
      loadData();
    }
  },
  onUpdate: function (item, callback) {
    // getData(urlTX)
    $("#CoVanDichVu").html("");
    $("#ModalSCC").modal("show");
    document.getElementById("FormSCC").reset();
    document.getElementById("NguoiDatHen").disabled = false;
    document.getElementById("ThoiGianHen").disabled = false;
    if (localStorage.getItem("userName") == emailnhanvienhen) {
      document.getElementById("TrangThaiHen").disabled = false;
    }
    $("#MaSo").val(item.id);

    changvalue();
    DanhSachCoVan();
    changvalue();
    if (
      (localStorage.getItem("userName") === $("#NguoiDatHen").val() ||
        localStorage.getItem("PhanQuyen") == "AdminHen" ||
        localStorage.getItem("PhanQuyen") == "admin") && localStorage.getItem("BoPhan") !== "Kinh Doanh"
    ) {
      if ($("#TrangThaiXuong").val() == "00 Có Hẹn") {
        $("#buttonSCC").html(
          "<button  type='button' class='btn btn-danger me-2' onclick='HuyHen()'>Hủy Hẹn!</button>"
        );
        $("#buttonDK").html(
          "<button  type='button' class='btn btn-primary me-2' onclick='CapNhatHen()'>Cập Nhật!</button>"
        );
      } else {
        $("#buttonSCC").html("");
        $("#buttonDK").html("");
      }
      $("#CuocGoi").html(
        "<a href='tel:+84" +
        $("#SoDT").val() +
        "' '>Call</a>"
      );
    } else {
      $("#buttonDK").html("");
      document.getElementById("TrangThaiHen").disabled = true;
    }
  },
  stack: true,
  verticalScroll: true,
  zoomKey: "ctrlKey",
  format: {
    majorLabels: {
      millisecond: "HH:mm:ss",
      second: "DD/MM/YYYY  HH:MM",
      minute: "DD/MM/YYYY ",
      hour: "DD/MM/YYYY ",
      weekday: "DD/MM/YYYY ",
      day: "DD MM YYYY",
      week: "MM YY",
      month: "YY",
      year: "",
    },
  },
  margin: {
    item: 0, // distance between items
    axis: 2, // distance between items and the time axis
  },
  start: new Date(new Date().valueOf()).setHours(6),
  end: new Date(new Date().valueOf()).setHours(12),
  timeAxis: { scale: "minute", step: 30 },
  orientation: "top",
};
var timeline = new vis.Timeline(container, items, groups, options);
var timeline2 = new vis.Timeline(container2, items, groups, options);
timeline2.setOptions(option2);

function redraw() {
  timeline.redraw();
  timeline2.redraw();
}

function LoadTimeLine() {
  //Load du lieu cho time line co
  var dataArray1 = useCaher;
  items.clear();
  var dataArrayhen = dataArray1.filter(function (r) {
    return r.ThoiGianHen;
  });
  jQuery.each(dataArrayhen, function (dataArrayhen, r) {
    datadathen(r);
  });
  redraw();
  console.log("Cập Nhật");
}

function datadathen(r) {
  try {
    var start = DoiNgayDangKy(r.ThoiGianHen);
    var edit = false;
    var mau1 = "green";
    var end = new Date(1000 * 60 * 29 + new Date(start).valueOf());
    var TimeTreHen = (new Date().getTime() - start.getTime()) / (60 * 1000);
    if ($("#Email").val() == emailnhanvienhen) {
      edit = true;
    } else {
      edit = false;
    }
    if (r.TrangThaiXuong == "00 Có Hẹn") {
      edit = true;
      mau1 = "orange";
    }
    var PhanLoai = "[H] " + Doingay(DoiNgayDangKy(r.TDXacNhanHen));
    var Kytu = "Ⓗ ";
    if (r.TrangThaiHen == "Xác Nhận Hẹn") {
      Kytu = "✌";
    }
    if (r.TrangThaiHen == "Xác Nhận 30P") {
      Kytu = "🆗";
    }
    if (r.TrangThaiHen == "Hủy Hẹn") {
      Kytu = "⛔";
    }
    if (r.LoaiHinhSuaChua == "FIR") {
      r.LoaiHinhSuaChua = "SCC";
    }
    if (r.LoaiHinhSuaChua == "EM60") {
      r.LoaiHinhSuaChua = "EM";
    }
    if (r.LoaiHinhSuaChua == "SCC") {
      end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
    }
    if (r.NoiDungHen.toUpperCase().indexOf("VIP") >= 0) {
      Kytu = "💶";
    }
    if (r.NoiDungHen.toUpperCase().indexOf("BD40K") >= 0) {
      end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
    }

    if (r.NoiDungHen.toUpperCase().indexOf("BD80K") >= 0) {
      end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
    }
    if (r.NoiDungHen.toUpperCase().indexOf("LEXUS") >= 0) {
      end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
    }
    if (r.KhachHangHen == "Hẹn Vãn Lai" && r.TrangThaiXuong == "00 Có Hẹn") {
      PhanLoai = "[VL] " + Doingay(DoiNgayDangKy(r.TDXacNhanHen));
    }
    if (r.KhachHangHen == "Hẹn Vãn Lai" && r.TrangThaiXuong != "00 Có Hẹn") {
      PhanLoai = "[VL] " + r.TrangThaiHen;
    }
    if (r.KhachHangHen == "Khách Hẹn" && r.TrangThaiXuong != "00 Có Hẹn") {
      PhanLoai = "[H] " + r.TrangThaiHen;
    }
    if (
      TimeTreHen < 10 &&
      TimeTreHen > 0 &&
      (r.TrangThaiXuong == "00 Có Hẹn" ||
        r.TrangThaiXuong == "02 Chờ Tiếp Nhận")
    ) {
      mau1 = "red";
    }
    if (r.LoaiHinhDongSon) {
      items.add({
        className: mau1,
        editable: edit,
        id: r.MaSo,
        group: r.LoaiHinhDongSon,
        start: start,
        end: new Date(1000 * 60 * 29 + new Date(start).valueOf()),
        title: r.NoiDungHen + "<br>" + r.NguoiDatHen,
        content: Kytu + r.BienSoXe + "<br>" + r.CoVanDichVu + "<br>" + PhanLoai,
      });
    } else if (r.LoaiHinhSuaChua) {
      items.add({
        className: mau1,
        id: r.MaSo,
        group: r.LoaiHinhSuaChua,
        start: start,
        editable: edit,
        end: end,
        title: r.NoiDungHen + "<br>" + r.NguoiDatHen,
        content: Kytu + r.BienSoXe + "<br>" + r.CoVanDichVu + "<br>" + PhanLoai,
      });
    }
    document.getElementById("loading").style.display = "none"
  } catch (error) {
    alert("Lỗi : " + error);
  }
}
function changdate(value) {
  var option2 = {
    start: new Date(new Date(value).valueOf()).setHours(12),
    end: new Date(new Date(value).valueOf()).setHours(17),
  };
  var option1 = {
    start: new Date(new Date(value).valueOf()).setHours(8),
    end: new Date(new Date(value).valueOf()).setHours(12),
  };
  timeline2.setOptions(option2);
  timeline.setOptions(option1);
}
function backwardtime() {
  Ngay = document.getElementById("datefield").value;
  var today = new Date(new Date(Ngay).valueOf() - 24 * 60 * 60 * 1000);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  var option2 = {
    start: new Date(new Date(today).valueOf()).setHours(12),
    end: new Date(new Date(today).valueOf()).setHours(17),
  };
  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(8),
    end: new Date(new Date(today).valueOf()).setHours(12),
  };
  timeline2.setOptions(option2);
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
}
function forwardtime() {
  Ngay = document.getElementById("datefield").value;
  var today = new Date(new Date(Ngay).valueOf() + 24 * 60 * 60 * 1000);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  var option2 = {
    start: new Date(new Date(today).valueOf()).setHours(12),
    end: new Date(new Date(today).valueOf()).setHours(17),
  };
  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(8),
    end: new Date(new Date(today).valueOf()).setHours(12),
  };
  timeline2.setOptions(option2);
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
}
