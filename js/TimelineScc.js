var items = new vis.DataSet();
var container = document.getElementById("mytimeline");
var containerRX = document.getElementById("timelineRX");
var groups = new vis.DataSet();
var groupRX = new vis.DataSet()
var optionsRX = {
  stack: true,
  start: new Date(new Date().valueOf() - 1000 * 60 * 60 * 1),
  editable: false,
  onMove: function (item) {
    document.getElementById("loading").style.display = "block"
    DangKyRuaXeTL(item);
  },
  end: new Date(1000 * 60 * 60 * 2 + new Date().valueOf()),
  margin: {
    item: 0, // distance between items
    axis: 0, // distance between items and the time axis
  },
  timeAxis: { scale: "minute", step: 15 },
  editable: false,
  autoResize: true,
  zoomable: false,
  moveable: true,
};



var options = {
  hiddenDates: [
    {
      start: "2017-03-05 00:00:00",
      end: "2017-03-06 00:00:00",
      repeat: "weekly",
    },
    {
      start: "2017-03-04 17:30:00",
      end: "2017-03-05 07:45:00",
      repeat: "daily",
    },
  ],
  onMove: function (item) {
    document.getElementById("loading").style.display = "block"
    capnhatthoigian(item);
  },
  onAdd: function (item) { },
  onUpdate: function (item) {

    var BienSo = item.content.slice(0, item.content.indexOf(" "));
    $("#buttonSCC").html("");
    document.getElementById("FormSCC").reset();
    $("#ModalSCC").modal("show");
    var chiudaichip = item.end - item.start;
    $("#ChieuDaiChip").val(chiudaichip);
    document.getElementById("BienSoXe").value = BienSo;
    changvalue();
    //timeSuaChua()
    $("#inputThoiGianSCC").val((chiudaichip * 1) / (60 * 60 * 1000));
  },
  timeAxis: { scale: "minute", step: 15 },
  orientation: "top",
  start: new Date(new Date().valueOf()).setHours(7),
  end: new Date(new Date().valueOf()).setHours(18),
  editable: true,
  autoResize: true,
  zoomable: false,
  moveable: false,

  margin: {
    item: 0.5, // distance between items
    axis: 0.5, // distance between items and the time axis
  },
  stack: true,
};

for (i in KhoangSC) {
  hiddenGruop = true
  if (KhoangKoSuDung.indexOf(KhoangSC[i]) > -1) { hiddenGruop = false }
  groups.add({
    id: KhoangSC[i],
    content: KhoangSC[i],
    visible: hiddenGruop,
  });


}
groupRX.add({
  id: "R???a Xe",
  content: "R???a Xe",
});

var timeline = new vis.Timeline(container, items, groups, options);
var timelineRX = new vis.Timeline(containerRX, items, groupRX, optionsRX);
$("#mytimeline").mouseleave(function () {
  document.getElementById("contextMenu2").style.display = "none";
});
timeline.on("mouseOver", function (properties) {
  document.getElementById("contextMenu2").style.display = "none";
});
var timekeo;

timeline.on("mouseMove", function (properties) {
  // if(properties.item!==null){
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = properties.pageX + "px";
  menu.style.top = properties.pageY + 15 + "px";
  var aa = TimesClick(properties.time);
  timekeo = properties.time;
  $("#ThoiGian").html(TimesClick(properties.time).slice(11, 16));
  //}else{document.getElementById("contextMenu2").style.display = 'none'}
});

timeline.on("click", function (props) {
  document.getElementById("contextMenu").style.display = "none";
});
timeline.on("contextmenu", function (props) {
  $("#biensomenu").html("");
  document.getElementById("FormSCC").reset();
  if (props.item) {
    //console.log(props);
    if (document.getElementById("contextMenu").style.display == "block") {
      document.getElementById("contextMenu").style.display = "none";
    } else {
      var menu = document.getElementById("contextMenu");
      menu.style.display = "block";
      menu.style.left = props.pageX + "px";
      menu.style.top = props.pageY + "px";
    }
    var ojb = useCaher;
    for (var a in ojb) {
      if (ojb[a].MaSo == props.item) {
        document.getElementById("BienSoXe").value = ojb[a].BienSoXe;
        var start = new Date(DoiNgayDangKy(ojb[a].TimeStartGJ));
        var end = new Date(DoiNgayDangKy(ojb[a].TimeEndGJ));

        var chiudaichip = end - start;

        $("#ChieuDaiChip").val(chiudaichip);

        $("#biensomenu").html(ojb[a].BienSoXe);
        changvalue();
        timeSuaChua();
      }
    }
    $("#TTHuyChip").val(props.item);
  }
  props.event.preventDefault();
});
function clearitem() {
  items.clear();
  LoadTimeLine()
}
function LoadTimeLine() {
  items.clear();
  $("#XeChoSuaChua").html("");
  $("#XeDungCV").html("");
  setgiaoxe()
  getDagiao()
  var tongThoiGian = 0

  var dataArray0 = useCaher.concat(useCaher2);
  var dataArray1 = dataArray0.filter(function (r) { return (r.LoaiHinhSuaChua === "EM" || r.LoaiHinhSuaChua === "SCC" || r.LoaiHinhSuaChua === "EM60"); });
  dataArray1.sort(function (a, b) { return a.TrangThaiXuong < b.TrangThaiXuong ? 1 : -1; });
  var option1 = {
    start: new Date(new Date().valueOf() - 1000 * 60 * 60 * 1),
    end: new Date(1000 * 60 * 60 * 2 + new Date().valueOf()),
  };
  timelineRX.setOptions(option1);
  for (var a in dataArray1) {
    r = dataArray1[a];
    var hoanthanh = document.getElementById("checkbox-3").checked;
    var tthen = "";
    var start = new Date(DoiNgayDangKy(r.TimeStartGJ));
    var timeNow = new Date();
    var end = new Date(DoiNgayDangKy(r.TimeEndGJ));
    if (end.getHours() >= 17) { end = new Date(end.valueOf() + 18 * 60 * 60 * 1000); end.setHours(8) }
    var khoang,
      mau = "",
      edit1 = {
        add: false, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: false, // delete an item by tapping the delete button top right
        overrideItems: true, // allow these options to override item.editable
      };

    if (r.TrangThaiSCC == "??ang SC") { mau = "green"; }
    if (r.TrangThaiSCC == "D???ng SC") { mau = "red"; }
    if (r.TrangThaiSCC == "Ch??? SC") { mau = "orange"; }
    if (r.TrangThaiSCC == "???? SC") { mau = "magenta"; }
    if (r.TrangThaiHen == "????ng Gi???") { tthen = "DungGio"; }
    if (r.TrangThaiHen == "?????n S???m") { tthen = "DenSom"; }
    if (r.TrangThaiXuong == "04 ???? Ti???p Nh???n" && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "success Datiepnhan", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "03 ??ang Ti???p Nh???n" && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "success", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "05 ??ang S???a Ch???a" && r.TrangThaiSCC == "Ch??? SC") {
      additembienso(r.BienSoXe, r.MaSo, "success Datiepnhan", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if ((r.TrangThaiXuong == "02 Ch??? Ti???p Nh???n" || r.TrangThaiXuong == "02 Chu???n B??? Ti???p") && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "outline-secondary btn-sm", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "05 D???ng C??ng Vi???c") { additembiensodung(r.BienSoXe, r.MaSo, "danger", r.LoaiHinhSuaChua); }
    if (r.TimeEndGJ) { var endRX = new Date(DoiNgayDangKy(r.TimeEndGJ).valueOf() + 15 * 60 * 1000); }
    if (new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf() < timeNow.valueOf()) { mau = "magenta"; }

    if ((start.getDate() == new Date($("#datefield").val()).getDate()) && (end.getDate() == new Date($("#datefield").val()).getDate())) {
      tongThoiGian = tongThoiGian + end.valueOf() - start.valueOf()
    } else if ((start.getDate() <= new Date($("#datefield").val()).getDate()) && (end.getDate() == new Date($("#datefield").val()).getDate())) {
      tongThoiGian = tongThoiGian + (end.getHours() - 8) * 60 * 60 * 1000
    } else if ((start.getDate() == new Date($("#datefield").val()).getDate()) && (end.getDate() >= new Date($("#datefield").val()).getDate())) {
      tongThoiGian = tongThoiGian + (17 - end.getHours()) * 60 * 60 * 1000
    }


    if (r.TrangThaiSCC !== "D???ng CV") {
      if (hoanthanh && r.TrangThaiSCC == "???? SC" && r.TimeStartGJ) {
        items.update({
          className: mau,
          id: r.MaSo,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,
          //title:r.CoVanDichVu,
          content: r.BienSoXe + " " + r.KyThuatVien1,
        });
      }
      if (r.TrangThaiSCC != "???? SC" && r.TimeStartGJ) {

        items.update({
          className: mau,
          id: r.MaSo,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,

          //title:r.CoVanDichVu,
          content: r.BienSoXe + " " + r.KyThuatVien1,
        });
      }
      if (r.ThoiGianHen && document.getElementById("checkbox-hen").checked) {
        if (r.TimeStartGJ) {
        } else {
          var start = DoiNgayDangKy(r.ThoiGianHen);
          var end;
          if (r.LoaiHinhSuaChua == "EM" || r.LoaiHinhSuaChua == "EM60") { end = new Date(1000 * 60 * 29 + new Date(start).valueOf()); }
          if (r.LoaiHinhSuaChua == "SCC" || r.LoaiHinhSuaChua == "FIR") { end = new Date(1000 * 60 * 59 + new Date(start).valueOf()); }
          if (r.NoiDungHen.toUpperCase().indexOf("BD40K") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          if (r.NoiDungHen.toUpperCase().indexOf("BD80K") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          if (r.NoiDungHen.toUpperCase().indexOf("LEXUS") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          var classnamehen = "blue";
          if (r.TDGapLeTan) {
            classnamehen = "orange";
          }
          items.update({
            className: classnamehen,
            id: r.BienSoXe + "_Hen",
            group: r.KhoangSuaChua,
            start: start,
            end: end,
            editable: edit1,
            content: r.BienSoXe + " [H]",
            title: r.BienSoXe + "<br>" + r.NoiDungHen + "<br>" + r.NguoiDatHen,
          });
        }
      }


    }
  }

  for (b in useCaher) {
    var r = useCaher[b]
    if (r.KhachRuaXe == "R???a Xe" && r.TrangThaiXuong != "08 Ch??? Giao Xe" && r.TimeEndGJ) {
      var startwash = new Date(DoiNgayDangKy(r.TimeEndGJ))
      if (r.TimeStartWash) { startwash = new Date(DoiNgayDangKy(r.TimeStartWash)) }
      var endwwash = new Date(1000 * 60 * 14 + startwash.valueOf())
      var classname2 = "orange";
      if (r.TrangThaiXuong == "07 ??ang R???a Xe") {
        classname2 = "green";
        if (endwwash.valueOf() < new Date().valueOf()) { endwwash = new Date() }
      }
      items.update({
        className: classname2,
        id: r.BienSoXe + "_RuaXe",
        group: "R???a Xe",
        //type: "point",
        start: startwash,
        end: endwwash,
        content: r.BienSoXe + " " + r.CoVanDichVu,
      });
    }
  }




  tongThoiGian = Math.trunc((tongThoiGian / (60 * 1000 * 60))).toFixed(2)
  var phantram = Math.trunc(tongThoiGian * 100 / (11 * 8))
  timeline.redraw();
  $("#progress").html(`
  <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ${phantram}%;font-size: 19px;" aria-valuenow="${phantram}" aria-valuemin="0" aria-valuemax="100">${phantram}%</div>
  `)
  console.log(tongThoiGian, phantram)
  document.getElementById("loading").style.display = "none"
}
function additembienso(value, MaSo, trangthai, tthen, LoaiHinh, covan) {
  $("#XeChoSuaChua").html(
    $("#XeChoSuaChua").html() +
    '<button  draggable="true" style="width: 100%" ondrag="showtime(event)" dragstart="teststart(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    tthen +
    " " +
    LoaiHinh +
    '" value="' +
    MaSo +
    '"  data-toggle="tooltip" data-placement="top" title="' + covan + '" ondblclick=clickbienso("' + value + '") >' +
    value +
    "</button >"
  );
}
function additembiensodung(value, MaSo, trangthai, LoaiHinh) {
  $("#XeDungCV").html(
    $("#XeDungCV").html() +
    '<button draggable="true" tyle="width: 100%" ondrag="showtime(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    LoaiHinh +
    '" value="' +
    MaSo +
    '" ondblclick=clickbienso("' + value + '")  >' +
    value +
    "</button>"
  );
}

function showtime(event) {
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = timelineProperties.pageX + "px";
  menu.style.top = timelineProperties.pageY + 15 + "px";
  $("#ThoiGian").html(
    TimesClick(timelineProperties.time) + "<br>" + timelineProperties.group
  );
}

function handleDragStart(event) {
  var dragSrcEl = event.target;
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var maso = event.target.attributes.value.textContent;
  let text = "Ch???y Chip Ti???n ????? Xe " + dragSrcEl.innerHTML;
  console.log(dragSrcEl.innerHTML)
  CheckBO(dragSrcEl.innerHTML)
  var KTV1 = "None",
    KTV2 = "None",
    NhomSC = "None";
  document.getElementById("contextMenu2").style.display = "none";
  if (timelineProperties.group == "EM 01") {
    NhomSC = "EM";
    KTV1 = "Vinh";
    KTV2 = "H??ng";
  }

  if (timelineProperties.group == "EM 02") {
    NhomSC = "EM";
    KTV1 = "Khoa";
    KTV2 = "C?????ng";
  }
  if (timelineProperties.group == "EM 03") {
    NhomSC = "EM";
    KTV1 = "?? Anh";
    KTV2 = "S??ng 2";
  }
  if (timelineProperties.group == "EM 04") {
    NhomSC = "EM";
    KTV1 = "Tr??";
    KTV2 = "Huy";
  }
  if (timelineProperties.group == "SCC 05") {
    NhomSC = "B???o";
    KTV1 = "Ph?????c";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 06") {
    NhomSC = "B???o";
    KTV1 = "Hi???u";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 07") {
    NhomSC = "B???o";
    KTV1 = "Duy";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 08") {
    NhomSC = "Hoan";
    KTV1 = "L??m";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 09") {
    NhomSC = "Hoan";
    KTV1 = "S??n";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 10") {
    NhomSC = "Hoan";
    KTV1 = "Thi??n";
    KTV2 = "";
  }

  var xedangSc = useCaher.filter(function (r) { return r.KhoangSuaChua == timelineProperties.group })
  var startr = TimesClick(new Date(timelineProperties.time))
  var endr = TimesClick(new Date(1000 * 60 * ChipGJ + new Date(timelineProperties.time).valueOf()))
  var timess = new Date()
  for (i in xedangSc) {
    var r = xedangSc[i]
    if (new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf() > timess.valueOf()) {
      timess = new Date(DoiNgayDangKy(r.TimeEndGJ))
      startr = TimesClick(new Date(1000 * 1 * 60 + new Date(timess).valueOf()))
      endr = TimesClick(new Date(1000 * 60 * ChipGJ + new Date(timess).valueOf()))
    }
  }


  console.log(startr, endr)
  //if (confirm(text) == true) {
  var json2 = {
    TimeStartGJ: startr,
    TrangThaiSCC: "Ch??? SC",
    KhoangSuaChua: timelineProperties.group,
    TimeEndGJ: endr,
    KyThuatVien1: KTV1,
    KyThuatVien2: KTV2,
    NhomKTV: NhomSC,
  };
  postData(json2, urlTX + "/" + checkID(maso), "PATCH");
}

function huyChip(item) {
  item = $("#TTHuyChip").val();
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == item) {
      delete ojb[a].NhomKTV;
      delete ojb[a].KyThuatVien1;
      delete ojb[a].KyThuatVien2;
      delete ojb[a].TimeStartGJ;
      delete ojb[a].TimeEndGJ;
      ojb[a].TrangThaiSCC = "Ch??? SC";
      ojb[a].TrangThaiXuong = "04 ???? Ti???p Nh???n";

      let text = "B???n mu???n X??a Ch??p Ti???p ?????: " + ojb[a].BienSoXe;
      if (
        confirm(text) == true &&
        (localStorage.getItem("PhanQuyen") == "DieuPhoi" ||
          localStorage.getItem("PhanQuyen") == "admin")
      ) {
        $.ajax({
          url: urlTX + "/" + ojb[a].id,
          type: "PUT",
          data: ojb[a],
          success: function (data) {
            getData();
          },
        });
      } else {
        alert("B???n kh??ng Th??? x??a ch??p");
      }
    }
  }
}

function redraw() {
  timeline.redraw();
}
function capnhatthoigian(item) {
  var ojb = useCaher;
  var a = new Date(item.start).valueOf();
  var b = new Date(item.end).valueOf();
  if (item.id && a < b) {
    var json2 = {
      TimeStartGJ: TimesClick(item.start),
      TimeEndGJ: TimesClick(item.end),
      KhoangSuaChua: item.group
    };
    var aa = ojb.filter(function (r) { return r.MaSo == item.id })
    for (var a in aa) {
      if (aa[a].MaSo == item.id) {
        if (aa[a].KhoangSuaChua !== item.group) {
          json2['TrangThaiSCC'] = "Ch??? SC"
        }
      }
    }
    postData(json2, urlTX + "/" + checkID(item.id), "PATCH");
  } else {
    alert(item.id + " loi");
  }
}
function changdate(value) {
  var option1 = {
    start: new Date(new Date(value).valueOf()).setHours(7),
    end: new Date(new Date(value).valueOf()).setHours(18),
  };
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

  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(7),
    end: new Date(new Date(today).valueOf()).setHours(18),
  };
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
  LoadTimeLine()
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

  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(7),
    end: new Date(new Date(today).valueOf()).setHours(18),
  };
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
  LoadTimeLine()
}
function DangKyRuaXeTL(item) {
  var MaSoChip = item.id.slice(0, item.id.lastIndexOf("_"));

  var json2 = {
    TimeStartWash: TimesClick(item.start),
    TimeEndGJ: TimesClick(new Date(1000 * 60 * 14 + new Date(item.start).valueOf())),

  };
  postData(json2, urlTX + "/" + checkID(MaSoChip), "PATCH");
}


getDagiao()
function getDagiao() {
  var max = new Date().valueOf()
  var min = max - 2 * 24 * 60 * 60 * 1000

  $.ajax({
    url: `${urlDG}?createdAt_gte=${min}&createdAt_lte=${max}`,
    type: 'GET',
    success: function (data) {
      useCaher2 = data
    }
  })
}
