import {
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from "@expo-google-fonts/comfortaa";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AuthContext from "./src/contexts/auth";
import PopupContext from "./src/contexts/popup";
import Routes from "./src/routes/index";

export default function App() {
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(false);

  const [loaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ signed: !!user, user, setUser }}>
        <PopupContext.Provider value={{ popup, setPopup }}>
          <Routes />
        </PopupContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
