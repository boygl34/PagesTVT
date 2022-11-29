var items = new vis.DataSet();
var groups = new vis.DataSet();
var container = document.getElementById("mytimeline");

var chieudaichip;
var kytu1 = "😆";
var kytu2 = "😡";

for (i in KTVDong) {
  groups.add({
    id: KTVDong[i],
    content: KTVDong[i],
  });
}
for (a in NhomSon) {
  groups.add({
    id: NhomSon[a],
    content: "Nhóm " + NhomSon[a],
  });
}
for (b in PhongSon) {
  groups.add({
    id: PhongSon[b],
    content: PhongSon[b],
  });
}
groups.add({
  id: "Pass",
  content: "Pass",
});
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
  timeAxis: { scale: "minute", step: 15 },
  orientation: "top",
  start: new Date(new Date().valueOf()).setHours(7),
  end: new Date(new Date().valueOf()).setHours(18),
  editable: true,
  autoResize: true,
  zoomable: false,
  moveable: false,
  onMove: function (item) {
    capnhatthoigian(item);
  },

  onUpdate: function (item) {
    var BienSo = item.content.slice(0, item.content.indexOf("_"));
    var CongDoan = item.content.slice(
      item.content.indexOf("_") + 1,
      item.content.length - 1
    );
    if (item.content.indexOf(kytu1) > 0) {
      CongDoan = item.content.slice(
        item.content.indexOf("_") + 1,
        item.content.length - 3
      );
    }
    if (item.content.indexOf(kytu2) > 0) {
      CongDoan = item.content.slice(
        item.content.indexOf("_") + 1,
        item.content.length - 3
      );
    }
    //alert(CongDoan)
    $("#buttonSCC").html("");
    document.getElementById("FormDS").reset();
    $("#ModalDongSon").modal("show");
    document.getElementById("BienSoXe").value = BienSo;
    changvalue();
    chieudaichip = item.end - item.start;
    document.getElementById("CongDoanDongSon").value = CongDoan;
    ChangCongDoan(CongDoan);
    var ojb = useCaher;
    for (var a in ojb) {
      if (ojb[a].BienSoXe == BienSoXe.value) {
        CongDoanDongSon(CongDoan, ojb[a].TrangThaiDongSon);
      }
    }
  },
  onRemove: function (item) {
    let text =
      "Bạn Muốn Xóa Chíp " + item.content.slice(item.content.indexOf("_") + 1);
    if (confirm(text) == true) {
    } else {
      LoadTimeLines();
    }
  },

  onAdd: function () { },

  margin: {
    item: 1, // distance between items
    axis: 1, // distance between items and the time axiss
  },
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
  //  visibleFrameTemplate: function(item) {
  //             if (item.visibleFrameTemplate) {return item.visibleFrameTemplate;}
  //               var DivHTLM = "<div'>"
  //               var dataArray =  useCaher.Object
  //               var BienSo = item.content.slice(0,item.content.indexOf("_"))
  //               for(var a=0;a<dataArray.length;a++){
  //                   var r = dataArray[a]
  //                   if(dataArray[a].BienSoXe==BienSo){
  //                   if(r.CongDoanDongSon=="Đồng"){DivHTLM += '<span class="fa fa-star fa-spin fa-1x  BigStar"></span>'}else if(r.HTDong=="Okie"){
  //                   DivHTLM += '<span class="fa fa-star checked"></span>'} else if(r.HTDong=="KH"){ DivHTLM += '<i class="fa fa-star-half-o checked" aria-hidden="true"></i>'}else if(r.HTDong==""){'<span class="fa fa-star unchecked"></span>'}else{ DivHTLM += '<span class="fa fa-star unchecked"></span>'}

  //                   if(r.CongDoanDongSon=="Nền"){DivHTLM += '<span class="fa fa-star fa-spin fa-1x  BigStar"></span>'}else if(r.HTNen=="Okie"){
  //                   DivHTLM += '<span class="fa fa-star checked"></span>'} else if(r.HTNen=="KH"){ DivHTLM += '<i class="fa fa-star-half-o checked" aria-hidden="true"></i>'}else if(r.HTNen==""){'<span class="fa fa-star unchecked"></span>'}else{ DivHTLM += '<span class="fa fa-star unchecked"></span>'}

  //                   if(r.CongDoanDongSon=="Sơn"){DivHTLM += '<span class="fa fa-star fa-spin fa-1x  BigStar"></span>'}else if(r.HTSon=="Okie"){
  //                   DivHTLM += '<span class="fa fa-star checked"></span>'} else if(r.HTSon=="KH"){ DivHTLM += '<i class="fa fa-star-half-o checked" aria-hidden="true"></i>'}else if(r.HTSon==""){'<span class="fa fa-star unchecked"></span>'}else{ DivHTLM += '<span class="fa fa-star unchecked"></span>'}

  //                   if(r.CongDoanDongSon=="Lắp Ráp"){DivHTLM += '<span class="fa fa-star fa-spin fa-1x  BigStar"></span>'}else if(r.HTLap=="Okie"){
  //                   DivHTLM += '<span class="fa fa-star checked"></span>'} else if(r.HTLap=="KH"){ DivHTLM += '<i class="fa fa-star-half-o checked" aria-hidden="true"></i>'}else if(r.HTLap==""){'<span class="fa fa-star unchecked"></span>'}else{ DivHTLM += '<span class="fa fa-star unchecked"></span>'}

  //                   if(r.CongDoanDongSon=="Pass"){DivHTLM += '<span class="fa fa-star fa-spin fa-1x  BigStar"></span>'}else if(r.HTPass=="Okie"){
  //                   DivHTLM += '<span class="fa fa-star checked"></span>'} else if(r.HTPass=="KH"){ DivHTLM += '<i class="fa fa-star-half-o checked" aria-hidden="true"></i>'}else if(r.HTPass==""){'<span class="fa fa-star unchecked"></span>'}else{ DivHTLM += '<span class="fa fa-star unchecked"></span>'}
  //                   }
  //               }
  //               var percentage =Math.round(item.value ) / 100 * 100 + '%';
  //               var classs = "progressTL"
  //               if(item.value >80){classs = "progressTL2"}else{classs = "progressTL"}
  //               return '<div class="progressTL-wrapper"><div class="'+classs+'" style="width:' + percentage  + '"></div><label class="progressTL-label">' +DivHTLM+ percentage + '<label></div></div>';
  //         },
  orientation: "top",
};

$("#HideChoSC").click(function () {
  groups.update({ id: "Chờ SC", visible: true });
});
$("#HideChoSC").dblclick(function () {
  groups.update({ id: "Chờ SC", visible: false });
});

var timeline = new vis.Timeline(container, items, groups, options);
function clearitem() {
  items.clear();
  LoadTimeLine()
}
function LoadTimeLine() {
  //dataTableTimXe();
  //BaoCao();
  items.clear();
  $("#XeChoSuaChua").html("")
  $("#XeDungCV").html("")
  var dataArray0 = useCaher;
  var dataArray1 = dataArray0.filter(function (r) { return (r.LoaiHinhDongSon === "Đồng Sơn" && r.CongDoanDongSon !== "QC" && r.TrangThaiDongSon !== "Chờ Giao"); });
  var dataArray2 = dataArray0.filter(function (r) { return (r.LoaiHinhDongSon === "Đồng Sơn" && r.TrangThaiXuong !== "00 Có Hẹn" && r.TrangThaiDongSon === "Chờ SC"); });
  dataArray2 = dataArray2.sort(function (r) { return r.TDKetThucTiepKhach; });
  dataArray1.sort(function (a, b) { return a.CongDoanDongSon < b.CongDoanDongSon ? 1 : -1; });
  dataArray1.sort(function (a, b) { return a.TrangThaiDongSon > b.TrangThaiDongSon ? 1 : -1; });
  var hoanthanh = document.getElementById("checkbox-3").checked;

  try {
    for (var a = 0; a < dataArray1.length; a++) {
      r = dataArray1[a];
      if (r.TrangThaiDongSon == "Chờ SC") { additembienso(r.BienSoXe, r.MaSo, "warning", r.CongDoanDongSon, r.TrangThaiDongSon, r.NhomSon, r.KyThuatVienDong); }
      if (r.TrangThaiDongSon == "Đang SC") { additembienso(r.BienSoXe, r.MaSo, "success", r.CongDoanDongSon, r.TrangThaiDongSon, r.NhomSon, r.KyThuatVienDong); }
      if (r.TrangThaiDongSon == "Dừng SC") { additembiensodung(r.BienSoXe, r.MaSo, "danger", r.CongDoanDongSon, r.TrangThaiDongSon, r.NhomSon, r.KyThuatVienDong); }
      var mau, mauDong, mauLap, mauNen, mauSon, mauPass, edit, edit1, edit2, edit3, edit4, edit5, group, edit0 = {
        add: false, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: false, // delete an item by tapping the delete button top right
        overrideItems: true, // allow these options to override item.editable
      };
      mauDong = "orange";
      mauLap = "orange";
      mauNen = "orange";
      mauSon = "orange";
      mauPass = "orange";

      timeNow = new Date();
      var time = ((timeNow - new Date(DoiNgayDangKy(r.TDKetThucTiepKhach))) / (new Date(DoiNgayDangKy(r.TDHenGiaoXe)) - new Date(DoiNgayDangKy(r.TDKetThucTiepKhach)))) * 100;
      if (r.HTDong === "Okie") { mauDong = "orange"; edit1 = false; group = "groupHT"; } else { edit1 = edit0; group = "groupDS"; }
      if (r.HTNen === "Okie") { mauNen = "orange"; edit2 = false; group = "groupHT"; } else { edit3 = edit0; group = "groupDS"; }
      if (r.HTSon === "Okie") { mauSon = "orange"; edit3 = false; group = "groupHT"; } else { edit4 = edit0; group = "groupDS"; }
      if (r.HTLap === "Okie") { mauLap = "orange"; edit4 = false; group = "groupHT"; } else { edit2 = edit0; group = "groupDS"; }
      if (r.HTPass === "Okie") { mauPass = "orange"; edit5 = false; group = "groupHT"; } else { edit5 = edit0; group = "groupDS"; }
      if (r.CongDoanDongSon == "Đồng") {
        if (r.TrangThaiDongSon == "Đang SC") { mauDong = "green"; }
        if (r.TrangThaiDongSon == "Dừng SC") { mauDong = "red"; }
      } else { mauDong = "orange"; }
      if (r.CongDoanDongSon == "Nền") {
        if (r.TrangThaiDongSon == "Đang SC") { mauNen = "green"; }
        if (r.TrangThaiDongSon == "Dừng SC") { mauNen = "red"; }
      } else { mauNen = "orange"; }
      if (r.CongDoanDongSon == "Sơn") {
        if (r.TrangThaiDongSon == "Đang SC") { mauSon = "green"; }
        if (r.TrangThaiDongSon == "Dừng SC") { mauSon = "red"; }
      } else { mauSon = "orange"; }
      if (r.CongDoanDongSon == "Lắp Ráp") {
        if (r.TrangThaiDongSon == "Đang SC") { mauLap = "green"; }
        if (r.TrangThaiDongSon == "Dừng SC") { mauLap = "red"; }
      } else { mauLap = "orange"; }
      if (r.CongDoanDongSon == "Pass") {
        if (r.TrangThaiDongSon == "Đang SC") { mauPass = "green"; }
        if (r.TrangThaiDongSon == "Dừng SC") { mauPass = "red"; }
      } else { mauPass = "orange"; }
      var GiaoTN = "";
      if (r.TrangThaiDongSon !== "Dừng SC") {
        if (r.TimeStartBody && r.TimeEndBody) {
          //if((new Date(DoiNgayDangKy(r.TimeStartBody))).valueOf()<timeNow.valueOf()&&(new Date(DoiNgayDangKy(r.TimeEndBody))).valueOf()>timeNow.valueOf()){mauDong="green"}
          //if((new Date(DoiNgayDangKy(r.TimeEndBody))).valueOf()<timeNow.valueOf()){mauDong="orange"}

          if (new Date(DoiNgayDangKy(r.TDHenGiaoXe)).getDate() == new Date().getDate()) { GiaoTN = kytu1; }
          if (new Date(DoiNgayDangKy(r.TDHenGiaoXe)).valueOf() < new Date().valueOf()) { GiaoTN = kytu2; }
          if (hoanthanh && r.HTDong == "Okie") {
            var starttime = new Date(DoiNgayDangKy(r.TimeStartBody));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndBody));
            if (starttime.getDay() == 0) {
              starttime = new Date(DoiNgayDangKy(r.TimeStartBody) * 1 + 24 * 60 * 60 * 1000);
              endtime = new Date(DoiNgayDangKy(r.TimeEndBody) * 1 + 24 * 60 * 60 * 1000);
            }
            if (endtime.getHours() >= 17) { endtime = new Date(DoiNgayDangKy(r.TimeEndBody) * 1 + 15 * 60 * 60 * 1000); }
            items.update({
              className: "orange",
              id: r.BienSoXe + "_Dong",
              group: r.KyThuatVienDong,
              start: starttime,
              end: endtime,
              editable: edit1,
              value: time,
              subgroup: group,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.NhomSon,
              content: r.BienSoXe + "_Đồng " + GiaoTN,
            });
          }
          if (r.HTDong !== "Okie") {
            var starttime = new Date(DoiNgayDangKy(r.TimeStartBody));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndBody));
            if (starttime.getDay() == 0) {
              starttime = new Date(DoiNgayDangKy(r.TimeStartBody) * 1 + 24 * 60 * 60 * 1000);
              endtime = new Date(DoiNgayDangKy(r.TimeEndBody) * 1 + 24 * 60 * 60 * 1000);
            }
            if (endtime.getHours() >= 17) { endtime = new Date(DoiNgayDangKy(r.TimeEndBody) * 1 + 15 * 60 * 60 * 1000); }
            items.update({
              className: mauDong,
              id: r.BienSoXe + "_Dong",
              group: r.KyThuatVienDong,
              start: starttime,
              end: endtime,
              editable: edit1,
              value: time,
              subgroup: group,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.NhomSon,
              content: r.BienSoXe + "_Đồng " + GiaoTN,
            });
          }
        }
        if (r.TimeStartLap && r.TimeEndLap) {
          //if((new Date(DoiNgayDangKy(r.TimeStartLap))).valueOf()<timeNow.valueOf()&&(new Date(DoiNgayDangKy(r.TimeEndLap))).valueOf()>timeNow.valueOf()){mauLap="green"}
          //if((new Date(r.TimeEndLap)).valueOf()<timeNow.valueOf()){mauLap="orange"}
          if (hoanthanh && r.HTLap == "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndLap));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartLap));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndBody));
            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartLap) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndLap) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndLap) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: "orange",
              id: r.BienSoXe + "_Lap",
              group: r.KyThuatVienLap,
              start: starttime,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.NhomSon,
              end: endtime,
              editable: edit2,
              value: time,
              subgroup: group,
              content: r.BienSoXe + "_Lắp Ráp " + GiaoTN,
            });
          }
          if (r.HTLap !== "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndLap));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartLap));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndLap));

            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartLap) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndLap) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndLap) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: mauLap,
              id: r.BienSoXe + "_Lap",
              group: r.KyThuatVienLap,
              start: starttime,
              // title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.NhomSon,
              end: endtime,
              editable: edit2,
              value: time,
              subgroup: group,
              content: r.BienSoXe + "_Lắp Ráp " + GiaoTN,
            });
          }
        }
        if (r.TimeStartNen && r.TimeEndNen) {
          // if((new Date(DoiNgayDangKy(r.TimeStartNen))).valueOf()<timeNow.valueOf()&&(new Date(DoiNgayDangKy(r.TimeEndNen))).valueOf()>timeNow.valueOf()){mauNen="green"}
          // if((new Date(r.TimeEndNen)).valueOf()<timeNow.valueOf()){mauNen="orange"}
          if (hoanthanh && r.HTNen == "Okie") {
            var starttime = new Date(DoiNgayDangKy(r.TimeStartNen));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndNen));
            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartNen) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndNen) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndNen) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: "orange",
              id: r.BienSoXe + "_Nen",
              group: r.NhomSon,
              start: starttime,
              end: endtime,
              editable: edit3,
              subgroup: group,
              value: time,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienNen,
              content: r.BienSoXe + "_Nền " + GiaoTN,
            });
          }
          if (r.HTNen !== "Okie") {
            var starttime = new Date(DoiNgayDangKy(r.TimeStartNen));
            var endtime = new Date(DoiNgayDangKy(r.TimeEndNen));

            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartNen) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndNen) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndNen) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: mauNen,
              id: r.BienSoXe + "_Nen",
              group: r.NhomSon,
              start: starttime,
              end: endtime,
              editable: edit3,
              subgroup: group,
              value: time,
              // title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienNen,
              content: r.BienSoXe + "_Nền " + GiaoTN,
            });
          }
        }
        if (r.TimeStartPaint && r.TimeEndPaint) {
          //if((new Date(DoiNgayDangKy(r.TimeStartPaint))).valueOf()<timeNow.valueOf()&&(new Date(DoiNgayDangKy(r.TimeEndPaint))).valueOf()>timeNow.valueOf()){mauSon="green"}
          //if((new Date(r.TimeEndPaint)).valueOf()<timeNow.valueOf()){mauSon="orange"}
          if (hoanthanh && r.HTSon == "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndPaint));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartPaint));
            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartPaint) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPaint) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPaint) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: "orange",
              id: r.BienSoXe + "_Paint",
              group: r.PhongSon,
              start: starttime,
              end: endtime,
              editable: edit4,
              subgroup: group,
              value: time,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienSon,
              content: r.BienSoXe + "_Sơn " + GiaoTN,
            });
          }
          if (r.HTSon !== "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndPaint));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartPaint));

            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartPaint) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPaint) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPaint) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: mauSon,
              id: r.BienSoXe + "_Paint",
              group: r.PhongSon,
              start: starttime,
              end: endtime,
              editable: edit4,
              subgroup: group,
              value: time,
              // title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienSon,
              content: r.BienSoXe + "_Sơn " + GiaoTN,
            });
          }
        }
        if (r.TimeStartPass && r.TimeEndPass) {
          //if((new Date(DoiNgayDangKy(r.TimeStartPass))).valueOf()<timeNow.valueOf()&&(new Date(DoiNgayDangKy(r.TimeEndPass))).valueOf()>timeNow.valueOf()){mauPass="green"}
          //if((new Date(DoiNgayDangKy(r.TimeEndPass))).valueOf()<timeNow.valueOf()){mauPass="orange"}
          if (hoanthanh && r.HTPass == "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndPass));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartPass));
            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartPass) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPass) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPass) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: "orange",
              id: r.BienSoXe + "_Pass",
              group: "Pass",
              start: starttime,
              end: endtime,
              editable: edit5,
              subgroup: group,
              value: time,
              //title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienPass,
              content: r.BienSoXe + "_Pass " + GiaoTN,
            });
          }
          if (r.HTPass !== "Okie") {
            var endtime = new Date(DoiNgayDangKy(r.TimeEndPass));
            var starttime = new Date(DoiNgayDangKy(r.TimeStartPass));


            if (starttime.getDay() == 0) {
              starttime = new Date(
                DoiNgayDangKy(r.TimeStartPass) * 1 + 24 * 60 * 60 * 1000
              );
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPass) * 1 + 24 * 60 * 60 * 1000
              );
            }
            if (endtime.getHours() >= 17) {
              endtime = new Date(
                DoiNgayDangKy(r.TimeEndPass) * 1 + 15 * 60 * 60 * 1000
              );
            }
            items.update({
              className: mauPass,
              id: r.BienSoXe + "_Pass",
              group: "Pass",
              start: starttime,
              end: endtime,
              editable: edit5,
              subgroup: group,
              value: time,
              // title:r.BienSoXe+" "+r.CoVanDichVu+" " +r.KyThuatVienPass,
              content: r.BienSoXe + "_Pass " + GiaoTN,
            });
          }
        }
      }
    }
    document.getElementById("loading").style.display = "none"
    //timeline.fit()
  } catch (erros2) {
    alert("Loi " + erros2);
  } finally {
    return;
  }
}

function additembienso(value, MaSo, chip, CongDoan, trangthai, NhomSon, KTVDong) {
  $("#XeChoSuaChua").html(
    $("#XeChoSuaChua").html() +
    '<button data-toggle="tooltip" data-placement="top" title="' + KTVDong + "_" + NhomSon + '" draggable="true" style="width: 100%" ondrag="showtime(event)" dragstart="teststart(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    chip + " " + CongDoan + '" value="' + MaSo + '" congdoan="' + CongDoan + '" trangthai="' + trangthai + '" ondblclick=clickbienso("' + value + '") nhomson="' + NhomSon + '" ktvdong="' + KTVDong + '">' + value + "</button >"
  );
}
function additembiensodung(value, MaSo, chip, CongDoan, trangthai) {
  $("#XeDungCV").html(
    $("#XeDungCV").html() +
    '<button data-toggle="tooltip" data-placement="top" title="' + KTVDong + "_" + NhomSon + '"draggable="true" tyle="width: 100%" ondrag="showtime(event)" ondragend="handleDragStart(event)" class="btn btn-' + chip
    + " " + CongDoan + '" value="' + MaSo + '"  congdoan="' + CongDoan + '"trangthai="' + trangthai + '" ondblclick=clickbienso("' + value + '") nhomson="' + NhomSon + '" ktvdong="' + KTVDong + '">' + value + "</button>"
  );
}

function showtime(event) {
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = timelineProperties.pageX + "px";
  menu.style.top = timelineProperties.pageY + 30 + "px";
  $("#ThoiGian").html(
    TimesClick(timelineProperties.time) + "<br>" + timelineProperties.group
  );
}
function handleDragStart(event) {
  var dragSrcEl = event.target;
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var maso = event.target.attributes.value.textContent;
  var congdoan = event.target.attributes.congdoan.textContent;
  var trangthai = event.target.attributes.trangthai.textContent;
  var KTVCDDong = event.target.attributes.ktvdong.textContent
  var NhomCDSon = event.target.attributes.nhomson.textContent
  document.getElementById("contextMenu2").style.display = "none";
  var end = TimesClick(new Date(1000 * 60 * ChipDS + new Date(timelineProperties.time).valueOf()))
  var json2 = {};
  var group = timelineProperties.group
  if (trangthai == "Dừng SC") {
    if (congdoan == "Đồng") {
      if (KTVDong.indexOf(group) >= 0) {
        if (KTVCDDong !== "undefined") { group = KTVDong }
        json2["KyThuatVienDong"] = group;
        json2["HTDong"] = "KH";
        json2["TrangThaiDongSon"] = "Chờ SC";
        json2["TimeStartBody"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndBody"] = end;
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Nền") {
      if (NhomSon.indexOf(group) >= 0) {
        if (NhomCDSon !== "undefined") { group = NhomSon }
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["TrangThaiDongSon"] = "Chờ SC";
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else {
        alert("Lỗi sai công đoạn chạy chip"); return false
      }
    }
    if (congdoan == "Sơn") {
      if (PhongSon.indexOf(group) >= 0) {
        json2["TimeStartPaint"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPaint"] = end;
        json2["TrangThaiDongSon"] = "Chờ SC";
        json2["PhongSon"] = group;
        json2["HTSon"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Lắp Ráp") {
      if (KTVDong.indexOf(group) >= 0) {
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["TrangThaiDongSon"] = "Chờ SC";
        json2["HTLap"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Pass") {
      if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["TrangThaiDongSon"] = "Chờ SC";
        json2["HTPass"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
  }



  if (trangthai == "Đang SC") {
    if (congdoan == "Đồng") {
      if (NhomSon.indexOf(group) >= 0) {
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else if (PhongSon.indexOf(group) >= 0) {
        json2["TimeStartPaint"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPaint"] = end;
        json2["PhongSon"] = group;
        json2["HTSon"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        if (KTVCDDong !== "undefined") { group = KTVDong }
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Nền") {
      if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else if (PhongSon.indexOf(group) >= 0) {
        json2["TimeStartPaint"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPaint"] = end;
        json2["PhongSon"] = group;
        json2["HTSon"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        if (KTVCDDong !== "undefined") { group = KTVDong }
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Sơn") {
      if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else if (NhomSon.indexOf(group) >= 0) {

        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Lắp Ráp") {
      if (NhomSon.indexOf(group) >= 0) {
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }
    if (congdoan == "Pass") {
      if (PhongSon.indexOf(group) >= 0) {
        json2["TimeStartPaint"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPaint"] = end;
        json2["PhongSon"] = group;
        json2["HTSon"] = "KH";
      } else if (NhomSon.indexOf(group) >= 0) {
        if (NhomCDSon !== "undefined") { group = NhomSon }
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip"); return false }
    }

  }




  if (trangthai == "Chờ SC") {
    if (congdoan == "Chờ SC") {
      if (KTVDong.indexOf(group) >= 0) {
        json2["KyThuatVienDong"] = group;
        json2["HTDong"] = "KH";
        json2["TimeStartBody"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndBody"] = end;
      } else if (NhomSon.indexOf(group) >= 0) {
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else { alert("Lỗi sai công đoạn chạy chip cho sc"); return false }

    }


    if (congdoan != "Chờ SC") {
      if (NhomSon.indexOf(group) >= 0) {
        if (NhomCDSon !== 'undefined') { group = NhomCDSon }
        json2["TimeStartNen"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndNen"] = end;
        json2["NhomSon"] = group;
        json2["HTNen"] = "KH";
      } else if (PhongSon.indexOf(group) >= 0) {
        json2["TimeStartPaint"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPaint"] = end;
        json2["PhongSon"] = group;
        json2["HTSon"] = "KH";
      } else if (KTVDong.indexOf(group) >= 0) {
        if (KTVCDDong !== 'undefined') { group = KTVCDDong }
        json2["TimeStartLap"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndLap"] = end;
        json2["KyThuatVienLap"] = group;
        json2["HTLap"] = "KH";
      } else if (group == "Pass") {
        json2["TimeStartPass"] = TimesClick(new Date(timelineProperties.time));
        json2["TimeEndPass"] = end;
        json2["HTPass"] = "KH";
      } else {
        alert("Lỗi sai công đoạn chạy chip"); return false
      }
    }

  }
  postData(json2, urlTX + "/" + checkID(maso), "PATCH");
}
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
  menu.style.top = properties.pageY + 8 + "px";
  var aa = TimesClick(properties.time);
  timekeo = properties.time;
  $("#ThoiGian").html(TimesClick(properties.time).slice(11, 16));
  //}else{document.getElementById("contextMenu2").style.display = 'none'}
});

timeline.on("click", function (props) {
  document.getElementById("contextMenuDS").style.display = "none";
});



timeline.on("contextmenu", function (props) {
  $("#biensomenuDS").html("");
  document.getElementById("FormDS").reset();
  if (props.item) {
    var BienSo = props.item.slice(0, props.item.indexOf("_"))
    console.log(props);
    if (document.getElementById("contextMenuDS").style.display == "block") {
      document.getElementById("contextMenuDS").style.display = "none";
    } else {
      var menu = document.getElementById("contextMenuDS");
      menu.style.display = "block";
      menu.style.left = props.pageX + "px";
      menu.style.top = props.pageY + "px";
    }
    var ojb = useCaher;
    for (var a in ojb) {
      if (ojb[a].BienSoXe == BienSo) {
        document.getElementById("BienSoXe").value = ojb[a].BienSoXe;
        var start = new Date(DoiNgayDangKy(ojb[a].TimeStartGJ));
        var end = new Date(DoiNgayDangKy(ojb[a].TimeEndGJ));

        var chiudaichip = end - start;

        $("#ChieuDaiChip").val(chiudaichip);
        $("#biensomenuDS").html(ojb[a].BienSoXe);
        changvalue();
        timeSuaChua();
      }
    }
    $("#TTHuyChip").val(props.item);
  }
  props.event.preventDefault();
});


function capnhatthoigian(item) {
  var ojb = useCaher;
  var MaSonew;
  var BienSo = item.content.slice(0, item.content.indexOf("_"));
  var CongDoan = item.content.slice(
    item.content.indexOf("_") + 1,
    item.content.length - 1
  );
  if (item.content.indexOf(kytu1) > 0) {
    CongDoan = item.content.slice(
      item.content.indexOf("_") + 1,
      item.content.length - 3
    );
  }
  if (item.content.indexOf(kytu2) > 0) {
    CongDoan = item.content.slice(
      item.content.indexOf("_") + 1,
      item.content.length - 3
    );
  }
  for (var a in ojb) {
    if (ojb[a].BienSoXe == BienSo) {
      MaSonew = ojb[a].MaSo;
      var r = ojb[a];
    }
  }
  var json2 = {};

  if (CongDoan == "Đồng") {
    if (r.TimeStartNen && r.TimeEndNen && r.HTNen == "KH") {
      var startnen = new Date(item.end);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndNen)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartNen)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartNen"] = TimesClick(startnen);
      json2["TimeEndNen"] = TimesClick(endnen);
    }
    if (r.TimeStartPaint && r.TimeEndPaint && r.HTSon == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPaint)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPaint)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartPaint"] = TimesClick(startnen);
      json2["TimeEndPaint"] = TimesClick(endnen);
    }
    if (r.TimeStartLap && r.TimeEndLap && r.HTLap == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndLap)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartLap)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartLap"] = TimesClick(startnen);
      json2["TimeEndLap"] = TimesClick(endnen);
    }
    if (r.TimeStartPass && r.TimeEndPass && r.HTPass == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPass)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPass)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartPass"] = TimesClick(startnen);
      json2["TimeEndPass"] = TimesClick(endnen);
      json2["TDKetThucSX"] = TimesClick(endnen);
    }
    json2["KyThuatVienLap"] = item.group;
    json2["KyThuatVienDong"] = item.group;
    json2["TimeStartBody"] = TimesClick(item.start);
    json2["TimeEndBody"] = TimesClick(item.end);
  }
  if (CongDoan == "Nền") {
    if (r.TimeStartPaint && r.TimeEndPaint && r.HTSon == "KH") {
      var startnen = new Date(item.end);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPaint)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPaint)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartPaint"] = TimesClick(startnen);
      json2["TimeEndPaint"] = TimesClick(endnen);
    }
    if (r.TimeStartLap && r.TimeEndLap && r.HTLap == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndLap)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartLap)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartLap"] = TimesClick(startnen);
      json2["TimeEndLap"] = TimesClick(endnen);
    }
    if (r.TimeStartPass && r.TimeEndPass && r.HTPass == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPass)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPass)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartPass"] = TimesClick(startnen);
      json2["TimeEndPass"] = TimesClick(endnen);
      json2["TDKetThucSX"] = TimesClick(endnen);
    }
    json2["NhomSon"] = item.group;
    json2["TimeStartNen"] = TimesClick(item.start);
    json2["TimeEndNen"] = TimesClick(item.end);
  }
  if (CongDoan == "Sơn") {
    if (r.TimeStartLap && r.TimeEndLap && r.HTLap == "KH") {
      var startnen = new Date(item.end);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndLap)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartLap)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartLap"] = TimesClick(startnen);
      json2["TimeEndLap"] = TimesClick(endnen);
    }
    if (r.TimeStartPass && r.TimeEndPass && r.HTPass == "KH") {
      var startnen = new Date(endnen);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPass)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPass)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      json2["TimeStartPass"] = TimesClick(startnen);
      json2["TimeEndPass"] = TimesClick(endnen);
      json2["TDKetThucSX"] = TimesClick(endnen);
    }
    json2["PhongSon"] = item.group;
    json2["TimeStartPaint"] = TimesClick(item.start);
    json2["TimeEndPaint"] = TimesClick(item.end);
  }
  if (CongDoan == "Lắp Ráp") {
    if (r.TimeStartPass && r.TimeEndPass && r.HTPass == "KH") {
      var startnen = new Date(item.end);
      if (startnen.getHours() > 16) {
        startnen = new Date(1000 * 60 * 60 * 24 + new Date(startnen).valueOf());
        startnen.setHours(8);
      }
      var aa =
        new Date(DoiNgayDangKy(r.TimeEndPass)).valueOf() -
        new Date(DoiNgayDangKy(r.TimeStartPass)).valueOf();
      var endnen = new Date(startnen * 1 + aa);
      //json2["TimeStartPass"]=TimesClick(startnen);
      //json2["TimeEndPass"]=TimesClick(endnen)
    }
    json2["KyThuatVienLap"] = item.group;
    json2["TimeStartLap"] = TimesClick(item.start);
    json2["TimeEndLap"] = TimesClick(item.end);
    json2["TDKetThucSX"] = TimesClick(endnen);
  }
  if (CongDoan == "Pass") {
    json2["TimeStartPass"] = TimesClick(item.start);
    json2["TimeEndPass"] = TimesClick(item.end);
    json2["TDKetThucSX"] = TimesClick(item.end);
  }

  postData(json2, urlTX + "/" + checkID(MaSonew), "PATCH");
}


function BANGTIENDO(BangTD) {
  localStorage.setItem("BangTD", BangTD);
  BangTD = localStorage.getItem("BangTD");
  $("#LOAIBANGTD").val(localStorage.getItem("BangTD"));
  groups.clear();

  if (BangTD == "Xưởng") {
    groups.add({
      id: "Chờ SC",
      content: "Chờ SC",
      visible: false,
    });
    for (i in KTVDong) {
      groups.add({
        id: KTVDong[i],
        content: KTVDong[i],
      });
    }
    for (a in NhomSon) {
      groups.add({
        id: NhomSon[a],
        content: "Nhóm " + NhomSon[a],
      });
    }
    for (b in PhongSon) {
      groups.add({
        id: PhongSon[b],
        content: PhongSon[b],
      });
    }
    groups.add({
      id: "Pass",
      content: "Pass",
    });
  }

  if (BangTD == "Đồng") {
    for (i in KTVDong) {
      groups.add({
        id: KTVDong[i],
        content: KTVDong[i],
      });
    }
  }
  if (BangTD == "Thiên") {
    groups.add({
      id: "Thiên",
      content: "Nhóm Thiên",
    });
    for (b in PhongSon) {
      groups.add({
        id: PhongSon[b],
        content: PhongSon[b],
      });
    }
  }
  if (BangTD == "Đình") {
    groups.add({
      id: "Đình",
      content: "Nhóm Đình",
    });
    for (b in PhongSon) {
      groups.add({
        id: PhongSon[b],
        content: PhongSon[b],
      });
    }
  }
  if (BangTD == "Pass") {
    groups.add({
      id: "Pass",
      content: "Pass",
    });
  }

  timeline.redraw();
}



function huyChip(item) {
  item = $("#TTHuyChip").val();
  var BienSo = item.slice(0, item.indexOf("_"));
  var CongDoan = item.slice(item.indexOf("_") + 1, item.length);
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].BienSoXe == BienSo) {
      if (CongDoan == "Dong") {
        delete ojb[a].TimeStartBody;
        delete ojb[a].TimeEndBody;
        delete ojb[a].KyThuatVienDong;
        delete ojb[a].HTDong;
      }
      if (CongDoan == "Nen") {
        delete ojb[a].TimeStartNen;
        delete ojb[a].TimeEndNen;
        delete ojb[a].KyThuatVienNen;
        delete ojb[a].HTNen;
      }
      if (CongDoan == "Lap") {
        delete ojb[a].TimeStartLap;
        delete ojb[a].TimeEndLap;
        delete ojb[a].KyThuatVienLap;
        delete ojb[a].HTLap;
      }
      if (CongDoan == "Paint") {
        delete ojb[a].TimeEndPaint;
        delete ojb[a].TimeStartPaint;
        delete ojb[a].KyThuatVienSon;
        delete ojb[a].HTSon;
      }
      if (CongDoan == "Pass") {
        delete ojb[a].TimeEndPass;
        delete ojb[a].TimeStartPass;
        delete ojb[a].KyThuatVienPass;
        delete ojb[a].HTPass;
      }

      try {
        let text =
          "Bạn muốn Xóa Chíp Tiếp Độ: " + BienSo + "\n Công Đoạn : " + CongDoan;
        if (
          confirm(text) == true &&
          (localStorage.getItem("PhanQuyen") == "DieuPhoiBP" || localStorage.getItem("PhanQuyen") == "admin")
        ) {

          $.ajax({
            url: urlTX + "/" + ojb[a].id,
            type: "PUT",
            data: ojb[a],
            success: function (data) {
              LoadTimeLine();
            },
          });
        } else {
          alert("Bạn không Thể xóa chíp");
        }
      } catch (eros) {
        alert(eros);
      }
    }
  }
}
function TimXe(item) {
  item = $("#TTHuyChip").val();
  var BienSo = item.slice(0, item.indexOf("_"));
  document.getElementById("selection").value = BienSo;
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
}
