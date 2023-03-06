import React, { useEffect, useState } from "react";
const { apiGetTestByPk } = require("./api/test");
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

function App() {
  const [chartData, setChartData] = useState({});
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale
  );
  const convertData = (data) => {
    const convertHexToInteger = (dataArray) => {
      const bytes = new Uint8Array(dataArray.reverse());
      const dataView = new DataView(bytes.buffer);
      const signedInt = dataView.getInt32(0, true);
      const result = signedInt / 1000;
      return result;
    };

    const truncatedLength = data.length - (data.length % 4);
    const truncatedData = data.slice(0, truncatedLength);
    const dataPoints = [];
    for (let i = 0; i < truncatedData.length; i += 4) {
      const chunk = truncatedData.slice(i, i + 4);
      dataPoints.push(convertHexToInteger(chunk));
    }
    return dataPoints;
  };

  const fetchData = async () => {
    const { data } = await apiGetTestByPk(1);
    const dataArray = convertData(data.trace_data.data);
    console.log(dataArray);
    setChartData({
      labels: dataArray.map((_, index) => index),
      datasets: [
        {
          label: "My Data",
          data: dataArray,
          fill: true,
          borderColor: "rgb(255,255,0)",
          tension: 0.1,
        },
      ],
    });
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          callback: function (value, index, values) {
            return value + " em";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chartData.labels ? <Line data={chartData} options={options} /> : null}
    </div>
  );
}

export default App;
