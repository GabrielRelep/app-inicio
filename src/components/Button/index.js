import React from "react";
import { ActivityIndicator, View } from "react-native";

import { Container, Label } from "./styles";

const Button = ({
  label,
  color,
  isLoading = false,
  disabled = false,
  loaderColor = "#fff",
  ...rest }) => {
  return (
    <Container color={color} disabled={isLoading || disabled} {...rest} >
      {isLoading
        ? <ActivityIndicator size="small" color={loaderColor} />
        : <Label>{label}</Label>
      }
    </Container>
  );
};

export default Button;
