// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var tuan = document.getElementById("myBarChart");
var url = "https://fresh-shimmering-sorrel.glitch.me/BaoCao/11-2022"

$.get(url, function (ketqua) {
  console.log(ketqua)
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ketqua.data.BaoCaoTiep[0].map(function (r) { return r }),
      datasets: [{
        label: "Revenue",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: ketqua.data.BaoCaoTiep[1].map(function (r) { return r }),
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 6
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 15000,
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
})