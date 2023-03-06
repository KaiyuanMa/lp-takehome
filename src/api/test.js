const axios = require("axios");

const apiGetAllTests = () => {
  return axios.get("/api/test");
};

const apiGetTestsCount = () => {
  return axios.get("/api/test/count");
};

const apiGetTestByPk = (testId) => {
  return axios.get(`/api/test/${testId}`);
};

export { apiGetAllTests, apiGetTestsCount, apiGetTestByPk };
