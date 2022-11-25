// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var databc
var url = "https://fresh-shimmering-sorrel.glitch.me/BaoCao/"
var ctx = document.getElementById("myAreaChart");

$("#TheoNam").val(`${new Date().getMonth() + 1}-${new Date().getFullYear()}`)
$("#TheoNgay").val(`${new Date().getDate() - 1}`)
console.log(new Date());
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],//ketqua.data.BaoCaoTiep[0].map(function (r) { return r }),
    datasets: [{
      label: "Gặp LT",
      lineTension: 0.3,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: "rgba(2,17,216,1)",
      pointRadius: 4,
      pointBackgroundColor: "'rgba(54, 162, 235, 0.2)'",
      pointBorderColor: "'rgba(54, 162, 235, 0.2)'45",
      pointHoverRadius: 4,
      pointHoverBackgroundColor: "rgba(2,17,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [3] //ketqua.data.BaoCaoTiep[2].map(function (r) { return r }),
    },
    {
      label: "Xe Hẹn",
      lineTension: 0.3,
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 4,
      pointBackgroundColor: "rgba(153, 102, 255, 0.2)",
      pointBorderColor: "rgba(153, 102, 255, 0.2)",
      pointHoverRadius: 4,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [2]//ketqua.data.BaoCaoHen[1].map(function (r) { return r }),
    },
    {
      label: "Hẹn Có Vào",
      lineTension: 0.3,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(2,50,216,1)",
      pointRadius: 4,
      pointBackgroundColor: "rgba(255, 99, 132, 0.2)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 4,
      pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [1]//ketqua.data.BaoCaoHen[4].map(function (r) { return r }),
    }
    ],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          //max: auto,
          //maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: true
    }
  }
});

var pie = document.getElementById("myPieChart");
var myPieChart2 = new Chart(pie, {
  type: 'pie',
  data: {
    labels: ["Bão Dưỡng", "SCC", "Dồng Sơn", "BGSCC", "BGBH"],
    datasets: [{
      data: [],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#26a145'],
    }],
  },
})
console.log(myLineChart)

function TaoBaoCao() {

  $.get(url + $("#TheoNam").val(), function (ketqua) {
    databc = ketqua.data
    // Area Chart Example
    myLineChart.data.labels = ketqua.data.BaoCaoTiep[0].map(function (r) { return r })
    myLineChart.data.datasets[0].data = ketqua.data.BaoCaoTiep[2].map(function (r) { return r })
    myLineChart.data.datasets[1].data = ketqua.data.BaoCaoHen[1].map(function (r) { return r })
    myLineChart.data.datasets[2].data = ketqua.data.BaoCaoHen[4].map(function (r) { return r })
    //ketqua.data.BaoCaoHen[4].map(function (r) { return r })

    myLineChart.update()


    getpiedata()


  });

}


function getpiedata() {
  r = $("#TheoNgay").val()
  var data2 = databc.BaoCaoTiep
  var s = [data2[6][r], data2[7][r], data2[8][r], data2[9][r], data2[10][r]]
  myPieChart2.data.datasets[0].data = s
  myPieChart2.update();
}


$.get(url + $("#TheoNam").val(), function (ketqua) {
  databc = ketqua.data
  myLineChart.data.labels = ketqua.data.BaoCaoTiep[0].map(function (r) { return r })
  myLineChart.data.datasets[0].data = ketqua.data.BaoCaoTiep[2].map(function (r) { return r })
  myLineChart.data.datasets[1].data = ketqua.data.BaoCaoHen[1].map(function (r) { return r })
  myLineChart.data.datasets[2].data = ketqua.data.BaoCaoHen[4].map(function (r) { return r })
  myLineChart.update()
  getpiedata()
});