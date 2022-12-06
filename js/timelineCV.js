var containerCV = document.getElementById("LichCoVan");
var groupsCV = new vis.DataSet();
var itemsCV = new vis.DataSet();
groupsCV.add({
  id: localStorage.getItem("Ten"),
  content: localStorage.getItem("Ten"),
});
groupsCV.add({
  id: "Rửa Xe",
  content: "Rửa Xe",
});
var optionsCV = {
  hiddenDates: [
    //{start: '2017-03-05 00:00:00',end: '2017-03-06 00:00:00',repeat: 'weekly'},
    {
      start: "2017-03-04 17:30:00",
      end: "2017-03-05 07:30:00",
      repeat: "daily",
    },
  ],
  stack: true,
  start: new Date(),
  editable: false,
  autoResize: true,
  zoomable: false,
  end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
  margin: {
    item: 0, // distance between items
    axis: 0, // distance between items and the time axis
  },
  orientation: "top",
  start: new Date(new Date().valueOf() - 1000 * 60 * 60 * 1),
  end: new Date(1000 * 60 * 60 * 2 + new Date().valueOf()),
  timeAxis: { scale: "minute", step: 30 },
  orientation: "top",
};

var timelineCV = new vis.Timeline(containerCV, itemsCV, groupsCV, optionsCV);
loadDataCV();
function loadDataCV() {
  var xechorua = 0
  itemsCV.clear();
  var option1 = {
    start: new Date(new Date().valueOf() - 1000 * 60 * 60 * 1),
    end: new Date(1000 * 60 * 60 * 2 + new Date().valueOf()),
  };
  timelineCV.setOptions(option1);
  var dataArray0 = useCaher;
  for (var a in dataArray0) {
    r = dataArray0[a];
    if (r.ThoiGianHen) {
      var start = new Date(DoiNgayDangKy(r.ThoiGianHen));
      itemsCV.add({
        id: r.BienSoXe + "_Hen" + a,
        className: "green",
        group: r.CoVanDichVu,
        start: start,
        end: new Date(1000 * 60 * 29 + start.valueOf()),
        content: r.BienSoXe,
      });
    }
    if (r.TDHenGiaoXe) {
      itemsCV.add({
        id: r.BienSoXe + "_Giao" + a,
        group: r.CoVanDichVu,
        className: "blue Giao",
        start: new Date(DoiNgayDangKy(r.TDHenGiaoXe)),
        end: new Date(
          1000 * 60 * 29 + new Date(DoiNgayDangKy(r.TDHenGiaoXe)).valueOf()
        ),
        content: r.BienSoXe,
      });
    }

    if (r.KhachRuaXe == "Rửa Xe" && r.TrangThaiXuong != "08 Chờ Giao Xe" && r.TimeEndGJ) {
      var startwash = new Date(DoiNgayDangKy(r.TimeEndGJ))

      if (r.TimeStartWash) { startwash = new Date(DoiNgayDangKy(r.TimeStartWash)) }
      var endwwash = new Date(1000 * 60 * 14 + startwash.valueOf())
      var classname2 = "orange";
      if (r.TrangThaiXuong == "07 Đang Rửa Xe") {
        xechorua++
        classname2 = "green";
        if (endwwash.valueOf() < new Date().valueOf()) { endwwash = new Date() }
      }
      if (r.TrangThaiXuong == "06 Chờ Rửa Xe") {
        xechorua++

      }
      itemsCV.add({
        className: classname2,
        id: r.BienSoXe + "_RuaXe",
        group: "Rửa Xe",
        //type: "point",
        start: startwash,
        end: endwwash,
        content: r.BienSoXe + " " + r.CoVanDichVu,
      });
    }
  }
  if (xechorua > 5) {
    $("#XeChoRua").modal("show");
  } else { $("#XeChoRua").modal("hide") }

  document.getElementById("loading").style.display = "none"
}
