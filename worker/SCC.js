

var urlTX = "https://deciduous-pentagonal-powder.glitch.me/XeTrongXuong";
getData()
setInterval(getData, 60000)
function getData() {
    fetch(urlTX, {
        method: "GET", // or 'PUT'
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            postMessage(data)
        })
}