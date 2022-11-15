// Call the dataTables jQuery plugin


function LoadTimeLine() {

  document.getElementById("loading").style.display = "none"
  var dataArray = useCaher
  var dataArrayhen = dataArray.filter(function (r) { return ((r.TrangThaiXuong !== "00 Có Hẹn" && r.LoaiHinhDongSon !== "Báo Giá BH" && r.LoaiHinhSuaChua !== "Báo Giá SCC")) })
  dataArrayhen.sort(function (a, b) { return (new Date(DoiNgayDangKy(a.TDHenGiaoXe)).valueOf() < new Date(DoiNgayDangKy(b.TDHenGiaoXe)).valueOf() ? 1 : -1); })
  dataArrayhen.sort(function (a, b) { return (a.TrangThaiXuong < b.TrangThaiXuong ? 1 : -1); })
  var tbodyhen = document.getElementById('TbodyBaoCao')
  tbodyhen.innerHTML = ""
  var GXTR = 0, CTN = 0, DTN = 0, CSC = 0, DSC = 0, DCV = 0, CRX = 0, DRX = 0, CGX = 0, XTX = 0
  dataArrayhen.forEach(function (r) {
    XTX = XTX + 1
    var row = document.createElement("tr");
    // var none= document.createElement("tr"); 
    // row.appendChild(none);
    var BienSo = document.createElement("td");
    if (r.KhachHangHen) { BienSo.innerHTML = "[H] " + r.BienSoXe } else { BienSo.innerHTML = r.BienSoXe }

    row.appendChild(BienSo);
    var TrangThai = document.createElement("td");
    if (r.TrangThaiXuong) { TrangThai.innerHTML = r.TrangThaiXuong } else { TrangThai.innerHTML = "" }
    if (r.TrangThaiXuong == "02 Chờ Tiếp Nhận" || r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") { TrangThai.innerHTML = "Chờ TN"; CTN = CTN + 1 }
    if (r.TrangThaiXuong == "03 Đang Tiếp Nhận") { TrangThai.innerHTML = "Đang TN"; DTN = DTN + 1 }
    if (r.TrangThaiXuong == "04 Đã Tiếp Nhận") { TrangThai.innerHTML = "Chờ SC"; CSC = CSC + 1 }
    if (r.TrangThaiXuong == "05 Dừng Công Việc") { TrangThai.innerHTML = "Dừng CV"; DCV = DCV + 1 }
    if (r.TrangThaiXuong == "05 Đang Sửa Chữa") { TrangThai.innerHTML = "Đang SC"; DSC = DSC + 1 }
    if (r.TrangThaiXuong == "06 Chờ Rửa Xe") { TrangThai.innerHTML = "Chờ RX"; CRX = CRX + 1; row.setAttribute('class', 'ChoRuaXe') }
    if (r.TrangThaiXuong == "07 Đang Rửa Xe") { TrangThai.innerHTML = "Đang RX"; DRX = DRX + 1; row.setAttribute('class', 'DangRuaXe') }
    if (r.TrangThaiXuong == "08 Chờ Giao Xe") { TrangThai.innerHTML = "Chờ GX"; CGX = CGX + 1; row.setAttribute('class', 'ChoGiaoXe') }

    row.appendChild(TrangThai);

    var CoVan = document.createElement("td");
    CoVan.innerHTML = r.CoVanDichVu
    row.appendChild(CoVan);
    var khachcho = document.createElement("td");
    if (r.KhachHangDoi == "Khách Đợi") { khachcho.innerHTML = "Có" } else { khachcho.innerHTML = "" }
    row.appendChild(khachcho);

    var LHGJ = document.createElement("td");
    if (r.LoaiHinhSuaChua) {
      if (r.TrangThaiSCC == "Chờ SC") { LHGJ.innerHTML = "[X] " + r.LoaiHinhSuaChua } else {
        LHGJ.innerHTML = r.LoaiHinhSuaChua
      }
    } else { LHGJ.innerHTML = "" }
    row.appendChild(LHGJ);
    var LHBP = document.createElement("td");
    if (r.LoaiHinhDongSon) {
      if (r.TrangThaiDongSon == "Chờ SC" && r.CongDoanDongSon == "Chờ SC") { LHBP.innerHTML = "[X] " + r.LoaiHinhDongSon } else {
        LHBP.innerHTML = r.LoaiHinhDongSon
      }
    } else { LHBP.innerHTML = "" }
    row.appendChild(LHBP);
    var TimeCD = document.createElement("td");
    TimeCD.innerHTML = ""
    if (r.TDHenGiaoXe) {
      TG = Math.round((new Date(DoiNgayDangKy(r.TDHenGiaoXe)).valueOf() - new Date().valueOf()) / (60 * 60 * 1000) * 10) / 10
      if (TG < 0) { TG = "GX Trễ"; GXTR = GXTR + 1 }
      TimeCD.innerHTML = TG
    }


    // var a= (r.NoiDungHen.toUpperCase()).indexOf("VIP")
    //          if(a>0){row.setAttribute('class', 'DangRuaXe')}

    row.appendChild(TimeCD);
    tbodyhen.appendChild(row)
  })

  $("#tieude").html(XTX + " Xe Trong Xưởng " + new Date().toLocaleTimeString().slice(0, 5))
  $("#TongKetTT").html(
    '<button type="button" class="btn btn-secondary">Chờ TN ' + CTN + '</button>' +
    '<button type="button" class="btn btn-primary">Đang TN ' + DTN + '</button>' +
    '<button type="button" class="btn btn-secondary">Chờ TN ' + CSC + '</button>' +
    '<button type="button" class="btn btn-success">Đang SC ' + DSC + '</button>' +
    '<button type="button" class="btn btn-danger">Dừng CV ' + DCV + '</button>' +
    '<button type="button" class="btn btn-secondary">Chờ RX ' + CRX + '</button>' +
    '<button type="button" class="btn btn-success">Đang RX ' + DRX + '</button>' +
    '<button type="button" class="btn btn-warning">Chờ GX ' + CGX + '</button>'


  )


}         