fetch('data.txt')
  .then(response => response.text())
  .then(text => console.log(text))


const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

const handleResize = (myChart) => {
  myChart.resize();
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: { display: true },
    scales: {
      yAxes: [{ ticks: { min: yValues.min(), max: yValues.max() } }],
      xAxes: [{ ticks: { min: xValues.min(), max: xValues.max() } }],
      responsive: true,
      onResize: handleResize,
      maintainAspectRatio: false
    }
  }
});