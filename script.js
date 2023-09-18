// Async functions are chained as : Readfile -> PopulateDataInArrays -> createChart
// https://stackoverflow.com/questions/59582780/javascript-async-await-and-fetch-return-the-value-not-the-promise

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

    dateArr = [...dateArr, date];
    preTaxArr = [...preTaxArr, preTax];
    postTaxArr = [...postTaxArr, postTax];
  }
  return [dateArr, preTaxArr, postTaxArr];
}

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
          fill: true,
          data: preTaxArr,
          label: "Pre Tax and misc charges",
          borderColor: "rgb(60,186,159)",
          backgroundColor: "rgb(60,186,159,0.1)",
        },
        {
          fill: true,
          borderColor: "rgb(255,165,0)",
          backgroundColor: "rgb(255,165,0,0.1)",
          data: postTaxArr,
          label: "Post Tax and misc charges",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        // title: {
        //   display: true,
        //   position: "bottom",
        //   autoPadding: true,
        //   text: "Algorithmic Trading Performance Tracker",
        //   font: {
        //     size: 20,
        //   },
        // },
      },
      layout: {
        autoPadding: true,
      },

      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
            font: {
              size: 16,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Percentage change",
            font: {
              size: 16,
            },
          },
        },
      },
    },
  });
});

// Helper callbacks or functions
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};
