import React, { useEffect, useState } from "react";
const { apiGetTestsCount } = require("./api/test");
import LineChart from "./Components/LineChart";

function App() {
  const [blobCount, setBlobCount] = useState(0);
  const [count, setCount] = useState(1);
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    const getBloBCount = async () => {
      try {
        const { data } = await apiGetTestsCount();
        setBlobCount(data.length);
      } catch (ex) {
        next(ex);
      }
    };
    getBloBCount();
  }, []);

  useEffect(() => {
    const fetchDataAndUpdateCount = async () => {
      if (count >= blobCount) {
        setCount(1);
      } else {
        setCount((count) => count * 1 + 1);
      }
    };
    let intervalId;
    if (isPlay) intervalId = setInterval(fetchDataAndUpdateCount, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count, blobCount, isPlay]);

  const togglePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  console.log(count, blobCount);

  return (
    <div>
      <LineChart bulbId={count} />
      <input
        type="range"
        min="0"
        max={blobCount}
        value={count}
        onChange={(e) => setCount(e.target.value)}
      ></input>
      <button onClick={togglePlay}>{isPlay ? "Pause" : "Play"}</button>
    </div>
  );
}

export default App;
