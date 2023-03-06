import React, { useEffect, useState } from "react";
const { apiGetTestsCount } = require("./api/test");
import LineChart from "./Components/LineChart";

function App() {
  const [blobLength, setBlobLength] = useState(0);
  const [currIndex, setCurrIndex] = useState(1);
  const [isPlay, setIsPlay] = useState(true);

  //Get total number of BLOB
  useEffect(() => {
    const getBlobLength = async () => {
      try {
        const { data } = await apiGetTestsCount();
        setBlobLength(data.length);
      } catch (ex) {
        next(ex);
      }
    };
    getBlobLength();
  }, []);

  useEffect(() => {
    //Fetch BLOB with currIndex and increment currIndex
    const fetchDataAndUpdateCount = async () => {
      if (currIndex >= blobLength) {
        setCurrIndex(1);
      } else {
        setCurrIndex((currIndex) => currIndex * 1 + 1);
      }
    };
    let intervalId;
    //Check if want to play, and call fetchDataAndUpdateCount every 1 second
    if (isPlay) intervalId = setInterval(fetchDataAndUpdateCount, 1000);

    //clean up
    return () => {
      clearInterval(intervalId);
    };
  }, [currIndex, blobLength, isPlay]);

  const togglePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  return (
    <div>
      <LineChart bulbId={currIndex} />
      <div className="chart-controls">
        <input
          className="range-input"
          type="range"
          min="0"
          max={blobLength}
          value={currIndex}
          onChange={(e) => setCurrIndex(e.target.value)}
        ></input>
        <button className="pause-btn" onClick={togglePlay}>
          {isPlay ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}

export default App;
