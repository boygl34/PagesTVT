


let rows = []
let tasks = []
let dependencies = []

for (i in KhoangSC) {
    rows.push({
        id: KhoangSC[i],
        label: KhoangSC[i],
    })
}
async function LoadTimeLine() {
    let XeChoSua = useCaher.filter((r) => { return (r.TimeStartGJ == null); });
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
    })

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
        { unit: "day", format: "MMMM Do" },
        { unit: "hour", format: "H:mm" },
    ],
    fitWidth: true,
    minWidth: 800,
    from: currentStart,
    to: currentEnd,
    tableHeaders: [
        { title: "Label", property: "label", width: "140px", type: "tree" },
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
        function onDouble() {
            console.log("[double] hover", task);
        }
        node.addEventListener("doubleclick", onDouble);
        node.addEventListener("mouseenter", onHover);
        node.addEventListener("mouseleave", onLeave);

        return {
            destroy() {
                console.log("[task] destroy");
                node.removeEventListener("mouseenter", onHover);
                node.removeEventListener("mouseleave", onLeave);
            },
        };
    },
    // taskContent: (task) => `${task.label} ${task.from.format('HH:mm')}`
};
var gantt = new SvelteGantt({
    target: document.getElementById("example-gantt-events"),
    props: options,
});
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