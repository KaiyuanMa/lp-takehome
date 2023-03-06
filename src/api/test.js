const axios = require("axios");

const apiGetAllTests = () => {
  return axios.get("/api/test");
};

const apiGetTestByPk = (testId) => {
  return axios.get(`/api/test/${testId}`);
};

export { apiGetAllTests, apiGetTestByPk };
