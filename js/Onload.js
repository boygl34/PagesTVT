

$.ajax({
  url: "https://deciduous-pentagonal-powder.glitch.me/ThongSo/",
  type: 'GET',
  success: function (data) {
    localStorage.setItem("ThongSo", JSON.stringify(data))

  }
})
startWorker()

// getData();

// var timerRunner = 0
// setInterval(function () {
//   timerRunner++
//   if (timerRunner >= 30) {
//     timerRunner = 0
//     getData();
//   }
// }, 3000);


function getData() {
  document.getElementById("loading").style.display = "block"
  $.ajax({
    url: urlTX,
    type: "GET",
    success: function (data) {
      useCaher = data;
      LoadTimeLine()

    },
  });
}

var w;

function startWorker() {
  if (typeof (Worker) !== "undefined") {
    if (typeof (w) == "undefined") {
      w = new Worker("worker/SCC.js");
    }
    w.onmessage = function (event) {
      useCaher = event.data;
      document.getElementById("loading").style.display = "block"
      LoadTimeLine()
    };
  }
}

var r;

function startWorker2() {
  if (typeof (Worker) !== "undefined") {
    if (typeof (r) == "undefined") {
      r = new Worker("worker/worker2.js");
    }
    r.onmessage = function (event) {
      MasterData = event.data

    };
  }
}


