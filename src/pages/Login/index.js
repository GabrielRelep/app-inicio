import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Text,
  View,
} from "react-native";
import { Masks } from "react-native-mask-input";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import AuthContext from "../../contexts/auth";
import { login } from "../../services";
import {
  AppIdFieldInput,
  Container,
  FieldInput,
  FieldMaskedInput,
  Imagem,
} from "./styles";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    appId: Yup.string().required("Por favor, insira seu ID de motorista."),
    phone: Yup.string()
      .required("Por favor, insira seu número de telefone.")
      .min(15, "Número de telefone inválido."),
    password: Yup.string().required("Por favor, insira sua senha."),
  });

  useEffect(() => {
    async function loadUser() {
      const userData = await AsyncStorage.getItem("@user");

      if (userData) {
        setUser(userData);
      }
    }

    loadUser();
  }, []);

  return (
    <Container>
      <View style={{ flexDirection: "row" }}>
        <Imagem source={logo} />
      </View>

      <Formik
        initialValues={{ phone: "", password: "", appId: "" }}
        onSubmit={async (values, { setErrors }) => {
          Keyboard.dismiss();
          // setLoading(true);

          const res = await login({
            appId: values.appId,
            phone: `55${values.phone.replace(/\D/g, "")}`,
            password: values.password,
          });

          if (res.data) {
            const driverData = res.data.find(
              (item) => item.accountType === "driver"
            );

            await AsyncStorage.setItem("@user", JSON.stringify(driverData));
            await AsyncStorage.setItem("accessToken", driverData.accessToken);
            setUser(driverData);
          } else {
            if (res.code === 404) {
              setErrors({
                appId: "Dados incorretos.",
                phone: "Dados incorretos.",
                password: "Dados incorretos.",
              });
            } else {
              setErrors({
                appId: res.messsage,
                phone: res.message,
                password: res.message,
              });
            }
          }

        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {loading && (
              <View
                style={{
                  flex: 1,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 100,
                }}
              >
                <ActivityIndicator size="large" color="#ba68c8" />
              </View>
            )}

            <View
              style={{
                alignSelf: "stretch",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppIdFieldInput
                onChangeText={handleChange("appId")}
                onBlur={handleBlur("appId")}
                value={values.appId}
                placeholderTextColor="#4d4d4d"
                placeholder="Cole o seu ID de motorista aqui:"
              />
              <Text
                style={{
                  alignSelf: "stretch",
                  color: "red",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 40,
                  height: 20,
                }}
              >
                {errors.appId}
              </Text>
            </View>

            <View
              style={{
                alignSelf: "stretch",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FieldMaskedInput
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                placeholderTextColor="white"
                placeholder="Digite seu telefone"
                mask={Masks.BRL_PHONE}
              />
              <Text
                style={{
                  alignSelf: "stretch",
                  color: "red",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 40,
                  height: 20,
                }}
              >
                {errors.phone}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "stretch",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FieldInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor="white"
                placeholder="Digite sua senha"
                secureTextEntry
              />
              <Text
                style={{
                  alignSelf: "stretch",
                  color: "red",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 40,
                  height: 20,
                }}
              >
                {errors.password}
              </Text>
            </View>

            <Button
              onPress={handleSubmit}
              label="Entrar"
              color="#ba68c8"
              style={{ marginTop: 30 }}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
