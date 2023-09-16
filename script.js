// Async functions are chained as : Readfile -> PopulateDataInArrays -> createChart

// Read data.txt
async function readFile() {
  //let response = await fetch("https://raw.githubusercontent.com/navkamalrakra/navkamalrakra.github.io/master/data.txt");
  let response = await fetch("data.txt");
  return await response.text();
}

async function PopulateDataInArrays() {
  var text = await readFile();
  var lines = text.split("\n");

  dateArr = [];
  preTaxArr = [];
  postTaxArr = [];

  for (var line = 0; line < lines.length; line++) {
    var date = lines[line].split(",")[0];
    var preTax = lines[line].split(",")[1];
    var postTax = lines[line].split(",")[2];

    dateArr = [...dateArr, date.replace(/ /g, "")];
    preTaxArr = [...preTaxArr, Number(preTax.replace(/ /g, ""))];
    postTaxArr = [...postTaxArr, Number(postTax.replace(/ /g, ""))];
  }
  return [dateArr, preTaxArr, postTaxArr];
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

async function createChart() {
  return await PopulateDataInArrays();
}

createChart().then(function (dataArrs) {
  var dateArr = dataArrs[0];
  var preTaxArr = dataArrs[1];
  var postTaxArr = dataArrs[2];
  new Chart("myChart", {
    type: "line",
    data: {
      labels: dateArr,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: preTaxArr,
        },
      ],
    },
    options: {
      legend: { display: true },
      scales: {
        yAxes: [{ ticks: { min: preTaxArr.min(), max: preTaxArr.max() } }],
        responsive: true,
        onResize: handleResize,
        maintainAspectRatio: false,
      },
    },
  });
});

const handleResize = (myChart) => {
  myChart.resize();
};
