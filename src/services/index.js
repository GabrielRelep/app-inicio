const { default: axios } = require("axios");
import { API_KEY, API_URL } from "@env";

const api = axios.create({
  baseURL: `${API_URL}/apps`,
  headers: {
    "X-Chevette-Key": `${API_KEY}`,
  },
});

module.exports.login = async (data) => {
  var response;

  await api
    .post("/" + data.appId + "/auth/login", {
      phone: data.phone,
      password: data.password,
    })
    .then((res) => {
      response = {
        code: res.status,
        data: res.data,
      };
    })
    .catch((error) => {
      if (error.response.status === 401) {
        response = {
          code: 401,
          message: "Telefone e/ou senha incorretos.",
        };
      } else {
        response = {
          code: error.response.status,
          message: "Houve um erro ao realizar login, tente novamente.",
        };
      }
    });

  return response;
};
