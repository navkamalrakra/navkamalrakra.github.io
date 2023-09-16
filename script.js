// read data.txt
dateArr = []
preTaxArr = []
postTaxArr = []

// Read data.txt
async function ReadData() {
  const response = await fetch("data.txt");
  const data = await response.text();
  return data;
}

async function PopulateDataInArrays()
{
    var text = await ReadData();
    var lines = text.split('\n');

    for (var line = 0; line < lines.length; line++) {
      var date = lines[line].split(',')[0];
      var preTax = lines[line].split(',')[1];
      var postTax = lines[line].split(',')[2];

      dateArr = [...dateArr, date.replace(/ /g,'')];
      preTaxArr = [...preTaxArr, preTax.replace(/ /g,'')];
      postTaxArr = [...postTaxArr, postTax.replace(/ /g,'')];
    }
  }

function CreateChart()
{
  return new Chart("myChart", {
    type: "line",
    data: {
      labels: dateArr,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: preTaxArr
      }]
    },
    options: {
      legend: { display: true },
      scales: {
        yAxes: [{ ticks: { min: preTaxArr.min(), max: preTaxArr.max() } }],
        responsive: true,
        onResize: handleResize,
        maintainAspectRatio: false
      }
    }
  });

}

const handleResize = (myChart) => {
  myChart.resize();
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

PopulateDataInArrays().then(() => {});
CreateChart();