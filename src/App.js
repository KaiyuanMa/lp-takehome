import React, { useEffect, useState } from "react";
const { apiGetTestByPk } = require("./api/test");
const utf8 = require("utf8");

function App() {
  const [dataPoints, setDataPoints] = useState([]);

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
    setDataPoints(convertData(data.trace_data.data));
  };

  useEffect(() => {
    fetchData();
    console.log(dataPoints);
  }, []);
  console.log(dataPoints);
  return <div>App</div>;
}

export default App;
