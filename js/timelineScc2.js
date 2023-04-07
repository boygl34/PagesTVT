


let rows = []
let tasks = []
let dependencies = []
let Data = new vis.DataSet(useCaher)
for (var i = 0; i < KhoangSC.length; i++) {
    rows.push({
        id: KhoangSC[i],
        label: KhoangSC[i],
        DangSC: ""
    })
}

async function LoadTimeLine() {
    Data.update(useCaher)
    tasks = []
    for (var a = 0; a < rows.length; a++) {
        var XeDangSC = useCaher.filter(function (r) { return r.TrangThaiSCC === "Đang SC" && r.KhoangSuaChua == rows[a].id })
        if (XeDangSC.length > 0) { rows[a]["DangSC"] = XeDangSC[0].BienSoXe } else { rows[a]["DangSC"] = "" }

    }
    timeRanges = [{
        id: "Now",
        from: new Date(),
        to: new Date(0, 1),
        classes: "Time-laber",
        label: new Date().toLocaleTimeString().slice(0, 5)
    }];

    let XeChoSua = useCaher.filter(function (r) { return (r.LoaiHinhSuaChua === "EM" || r.LoaiHinhSuaChua === "SCC" || r.LoaiHinhSuaChua === "EM60"); });
    $("#XeChoSuaChua").html("")
    $("#XeDungCV").html("")
    await XeChoSua.forEach(async (r) => {

        if (r.TrangThaiXuong == "04 Đã Tiếp Nhận" && r.TimeStartGJ == null) {
            await $("#XeChoSuaChua").html(
                $("#XeChoSuaChua").html() + ` <button style="width: 100%" id= ${r.id} > ${r.BienSoXe}</button>`);
            addExternal(r.id, r.BienSoXe)
        }
        if (r.TrangThaiXuong == "03 Đang Tiếp Nhận" && r.TimeStartGJ == null) {
            await $("#XeChoSuaChua").html(
                $("#XeChoSuaChua").html() + ` <button style="width: 100%" id= ${r.id} > ${r.BienSoXe}</button>`);
            addExternal(r.id, r.BienSoXe)
        }
        if (r.TrangThaiXuong == "05 Đang Sửa Chữa" && r.TrangThaiSCC == "Chờ SC") {
            await $("#XeChoSuaChua").html(
                $("#XeChoSuaChua").html() + ` <button style="width: 100%" id= ${r.id} > ${r.BienSoXe}</button>`);
            addExternal(r.id, r.BienSoXe)
        }
        if ((r.TrangThaiXuong == "02 Chờ Tiếp Nhận" || r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") && r.TimeStartGJ == null) {
            await $("#XeChoSuaChua").html(
                $("#XeChoSuaChua").html() + ` <button style="width: 100%" id= ${r.id} > ${r.BienSoXe}</button>`);
            addExternal(r.id, r.BienSoXe)
        }
        if (r.TrangThaiXuong == "05 Dừng Công Việc") {
            await $("#XeDungCV").html(
                $("#XeDungCV").html() + ` <button style="width: 100%" id= ${r.id} > ${r.BienSoXe}</button>`);
            addExternal(r.id, r.BienSoXe)
        }

        if (r.TimeStartGJ) {
            tasks.push({
                id: r.id,
                label: r.BienSoXe,
                from: new Date(DoiNgayDangKy(r.TimeStartGJ)).valueOf(),
                to: new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf(),
                classes: "red",
                resourceId: r.KhoangSuaChua,
            });
        }
    })
    gantt.updateTasks(tasks)
    gantt.$set({ timeRanges: timeRanges })
    gantt.updateRow(rows)
    document.getElementById("loading").style.display = "none"
}
function addExternal(ID, BienSo) {
    const external = new SvelteGanttExternal(document.getElementById(ID), {
        gantt,
        onsuccess: (row, date, gantt) => {
            var xedangSc = useCaher.filter(function (r) { return r.KhoangSuaChua == row.model.id })
            var timess = new Date().valueOf()
            var startr = date
            const id = ID;

            xedangSc.forEach(r => {
                var timeend = new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf()
                if (timeend > date) { date = timeend + 5 * 60 * 1000 }
            })
            if (date < timess) { date = timess }
            gantt.updateTask({
                id,
                label: BienSo,
                from: date,
                to: date + 30 * 60 * 1000,
                classes: "red",
                resourceId: row.model.id,
            }
            );
            var json = {
                TimeStartGJ: TimesClick(date),
                TrangThaiSCC: "Chờ SC",
                KhoangSuaChua: row.model.id,
                TimeEndGJ: TimesClick(date + 30 * 60 * 1000),
            }

            postData(json, urlTX + "/" + id, "PATCH");
        },
        elementContent: () => {
            const element = document.createElement("div");
            element.innerHTML = BienSo;
            element.className = "sg-external-indicator";
            return element;
        },
    });
}

let currentStart = time("07:00");
let currentEnd = time("18:00");
let timeRanges = [
    {
        id: "Now",
        from: new Date(),
        to: new Date(0, 1),
        classes: "Time-laber",
        label: new Date().toLocaleTimeString().slice(0, 5),
    },
];
let options = {
    dateAdapter: new MomentSvelteGanttDateAdapter(moment),
    rows: rows,
    tasks: tasks,
    dependencies: dependencies,
    timeRanges: timeRanges,
    columnOffset: 5,
    magnetOffset: 5,
    rowHeight: 52,
    rowPadding: 6,
    headers: [
        { unit: "day", format: "DD/MM/YYYY" },
        { unit: "hour", format: "H:mm" },
    ],
    fitWidth: true,
    minWidth: 800,
    from: currentStart,
    to: currentEnd,
    tableHeaders: [
        { title: "Khoang", property: "label", width: "120px", type: "tree" },
        { title: "Dang SC", property: "DangSC", width: "120px", type: "tree" },
    ],
    tableWidth: 200,
    ganttTableModules: [SvelteGanttTable],
    ganttBodyModules: [SvelteGanttDependencies],
    taskElementHook: (node, task) => {
        let popup;
        let Menu
        function onHover(e) {
            e.preventDefault()
            popup = createPopup(task, node, e);
        }

        function onLeave(e) {
            e.preventDefault()
            if (popup) {
                popup.remove();
            }

        }
        function conTestmenu(e) {
            e.preventDefault()
            if (document.getElementById("contextMenu").style.display == "block") {
                document.getElementById("contextMenu").style.display = "none";
            } else {
                var menu = document.getElementById("contextMenu");
                console.log(task);
                $("#biensomenu").html(task.label);
                menu.style.display = "block";
                menu.style.left = e.pageX + "px";
                menu.style.top = e.pageY + "px";
            }
        }
        function onDouble(e) {
            e.preventDefault()
            $("#buttonSCC").html("");

            document.getElementById("FormSCC").reset();
            document.getElementById("BienSoXe").value = task.label;
            changvalue();
            $("#ModalSCC").modal("show");

        }
        node.addEventListener("dblclick", onDouble);
        node.addEventListener("mouseenter", onHover);
        node.addEventListener("mouseleave", onLeave);
        node.addEventListener("contextmenu", conTestmenu);
        return {
            destroy() {
                console.log("[task] destroy");
                node.removeEventListener("mouseenter", onHover);
                node.removeEventListener("mouseleave", onLeave);
                node.removeEventListener("contextmenu", conTestmenu);
                node.removeEventListener("doubleclick", onDouble);
            },
        };
    },
};
var gantt = new SvelteGantt({
    target: document.getElementById("example-gantt-events"),
    props: options,
});

//gantt.api.tasks.on.move((task) => alert("move"));
//gantt.api.tasks.on.switchRow((task, row, previousRow) => alert("switchRow"));
gantt.api.tasks.on.select((task) => {


});
//gantt.api.tasks.on.moveEnd((task) => alert("moveend"));
//gantt.api.tasks.on.change(([data]) => alert("change"));
gantt.api.tasks.on.changed((task) => {
    console.log(task);
    var TTXe = Data.get(task[0].task.model.id)
    var json = {
        TimeStartGJ: TimesClick(task[0].task.model.from),
        TimeEndGJ: TimesClick(task[0].task.model.to),
        KhoangSuaChua: task[0].targetRow.model.id
    }
    var res = axios.patch(urlTX + "/" + task[0].task.model.id, json)
    console.log(res);
});
//gantt.api.tasks.on.dblclicked((task) => alert("double"));

function createPopup(task, node, event) {
    const rect = node.getBoundingClientRect();
    const div = document.createElement("div");
    div.className = "sg-popup";
    div.innerHTML = `
        <div class="sg-popup-title">${task.label}</div>
        <div class="sg-popup-item">
            <div class="sg-popup-item-label">Từ :</div>
            <div class="sg-popup-item-value">${new Date(task.from).toLocaleTimeString()}</div>
        </div>
        <div class="sg-popup-item">
            <div class="sg-popup-item-label">Đến :</div>
            <div class="sg-popup-item-value">${new Date(task.to).toLocaleTimeString()}</div>
        </div>
    `;
    div.style.position = "absolute";
    div.style.top = `${event.pageY + rect.height}px`;
    div.style.left = `${event.pageX}px`;
    document.body.appendChild(div);
    return div;
}


function onChangeOptions(event) {
    const opts = event.detail;
    Object.assign(options, opts);
    gantt.$set(options);
}

function time(input) {
    return moment(input, 'HH:mm');
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
            ojb[a].TrangThaiSCC = "Chờ SC";
            ojb[a].TrangThaiXuong = "04 Đã Tiếp Nhận";

            let text = "Bạn muốn Xóa Chíp Tiếp Độ: " + ojb[a].BienSoXe;
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
                alert("Bạn không Thể xóa chíp");
            }
        }
    }
}