const axios = require("axios");

const apiGetAllTests = () => {
  return axios.get("/test");
};

const apiGetTestByPk = (testId) => {
  return axios.get(`/test/${testId}`);
};

export { apiGetAllTests, apiGetTestByPk };
