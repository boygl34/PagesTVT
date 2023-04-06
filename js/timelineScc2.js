


let rows = []
let tasks = []
let dependencies = []

for (var i; i < KhoangSC.length; i++) {
    rows.push({
        id: KhoangSC[i],
        label: KhoangSC[i],
        DangSC: ""
    })
}

async function LoadTimeLine() {
    console.log("update");
    for (var a = 0; a < rows.length; a++) {
        var XeDangSC = useCaher.filter(function (r) { return r.TrangThaiSCC === "Đang SC" && r.KhoangSuaChua == rows[a].id })
        if (XeDangSC.length > 0) { rows[a]["DangSC"] = XeDangSC[0].BienSoXe }

    }
    gantt.updateRow(rows)
    let XeChoSua = useCaher.filter(function (r) { return (r.LoaiHinhSuaChua === "EM" || r.LoaiHinhSuaChua === "SCC" || r.LoaiHinhSuaChua === "EM60"); });
    $("#XeChoSuaChua").html("")
    $("#XeDungCV").html("")
    await XeChoSua.forEach(async (r) => {
        if (r.TrangThaiSCC == "Chờ SC") {
            await $("#XeChoSuaChua").html(
                $("#XeChoSuaChua").html() + ` <button style="width: 100%" id= ${r.BienSoXe} > ${r.BienSoXe}</button>`);
            addExternal(r.BienSoXe)
        }
        if (r.TrangThaiSCC == "Dừng CV") {
            await $("#XeDungCV").html(
                $("#XeDungCV").html() + ` <button style="width: 100%" id= ${r.BienSoXe} > ${r.BienSoXe}</button>`);
            addExternal(r.BienSoXe)
        }
        if (r.TrangThaiSCC == "Đang SC") {
            gantt.updateTask({
                id: r.BienSoXe,
                label: r.BienSoXe,
                from: new Date(DoiNgayDangKy(r.TimeStartGJ)).valueOf(),
                to: new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf(),
                classes: "red",
                resourceId: r.KhoangSuaChua,
            });
        }
    })

    document.getElementById("loading").style.display = "none"
}
function addExternal(ChipXe) {
    const external = new SvelteGanttExternal(document.getElementById(ChipXe), {
        gantt,
        onsuccess: (row, date, gantt) => {
            const id = ChipXe;
            gantt.updateTask({
                id,
                label: ChipXe,
                from: date,
                to: date + 3 * 60 * 60 * 1000,
                classes: "red",
                resourceId: row.model.id,
            });
        },
        elementContent: () => {
            const element = document.createElement("div");
            element.innerHTML = ChipXe;
            element.className = "sg-external-indicator";
            return element;
        },
    });
}

let currentStart = time("07:00");
let currentEnd = time("18:00");
const timeRanges = [
    {
        id: "Now",
        from: new Date(),
        to: new Date(0, 1),
        classes: "Time-laber",
        label: "now",
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
        function onHover(e) {
            e.preventDefault()
            //  console.log("[task] hover", task);
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
            // console.log("[task] hover", task);
            alert("contes")
        }
        function onDouble(e) {
            e.preventDefault()
            alert("[double] hover");
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
    //taskContent: (task) => `${task.label} ${task.from.format('HH:mm')}`
};
var gantt = new SvelteGantt({
    target: document.getElementById("example-gantt-events"),
    props: options,
});

//gantt.api.tasks.on.move((task) => alert("move"));
//gantt.api.tasks.on.switchRow((task, row, previousRow) => alert("switchRow"));
///gantt.api.tasks.on.select((task) => alert("select"));
//gantt.api.tasks.on.moveEnd((task) => alert("moveend"));
//gantt.api.tasks.on.change(([data]) => alert("change"));
gantt.api.tasks.on.changed((task) => alert("changed"));
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