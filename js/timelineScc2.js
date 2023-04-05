


let rows = []
let tasks = []
let dependencies = []

for (i in KhoangSC) {
    rows.push({
        id: KhoangSC[i],
        label: KhoangSC[i]
    })
}
async function LoadTimeLine() {
    console.log("update");
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

let currentStart = time("06:00");
let currentEnd = time("18:00");
const timeRanges = [
    {
        id: 3,
        from: new Date(),
        to: new Date(0, 3),
        classes: "red",
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
        { title: "Khoang", property: "label", width: "140px", type: "tree" }
    ],
    tableWidth: 140,
    ganttTableModules: [SvelteGanttTable],
    ganttBodyModules: [SvelteGanttDependencies],
    taskElementHook: (node, task) => {
        let popup;
        function onHover() {
            //  console.log("[task] hover", task);
            popup = createPopup(task, node);
        }

        function onLeave() {
            // console.log("[task] hover", task);
            if (popup) {
                popup.remove();
            }
        }
        function conTestmenu() {
            // console.log("[task] hover", task);
           alert("contes")
        }
        function onDouble() {
            alert("[double] hover");
        }
        node.addEventListener("doubleclick", onDouble);
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
    // taskContent: (task) => `${task.label} ${task.from.format('HH:mm')}`
};
var gantt = new SvelteGantt({
    target: document.getElementById("example-gantt-events"),
    props: options,
});

gantt.api.tasks.on.move((task) => alert("move"));
gantt.api.tasks.on.switchRow((task, row, previousRow) => alert("switchRow"));
///gantt.api.tasks.on.select((task) => alert("select"));
gantt.api.tasks.on.moveEnd((task) => alert("moveend"));
gantt.api.tasks.on.change(([data]) => alert("change"));
gantt.api.tasks.on.changed((task) => alert("changed"));
//gantt.api.tasks.on.dblclicked((task) => alert("double"));

function createPopup(task, node) {
    const rect = node.getBoundingClientRect();
    const div = document.createElement("div");
    div.className = "sg-popup";
    div.innerHTML = `
        <div class="sg-popup-title">${task.label}</div>
        <div class="sg-popup-item">
            <div class="sg-popup-item-label">From:</div>
            <div class="sg-popup-item-value">${new Date(
        task.from
    ).toLocaleTimeString()}</div>
        </div>
        <div class="sg-popup-item">
            <div class="sg-popup-item-label">To:</div>
            <div class="sg-popup-item-value">${new Date(
        task.to
    ).toLocaleTimeString()}</div>
        </div>
    `;
    div.style.position = "absolute";
    div.style.top = `${rect.bottom}px`;
    div.style.left = `${rect.left + rect.width / 2}px`;
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