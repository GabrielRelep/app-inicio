const { default: axios } = require("axios");
import { API_KEY, API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: `${API_URL}/apps`,
  headers: {
    "X-Chevette-Key": `${API_KEY}`,
  },
});

const adminApi = axios.create({
  baseURL: `${API_URL}/admin/apps`,
  headers: {
    "X-Chevette-Key": `${API_KEY}`,
  },
});


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

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
      console.log(error);
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

export async function getAppInfo(appId) {
  try {
    const response = await adminApi.get(`/${appId}`);
    return response.data
  } catch (error) {
    console.error('getAppInfo ERROR', error)
  }
}

export async function updateDriver(appId, driver) {
  const { id } = driver
  try {
    const response = await api.put(`/${appId}/driver/${id}`, driver);
    return response.data
  } catch (error) {
    console.error(error)
  }
}
