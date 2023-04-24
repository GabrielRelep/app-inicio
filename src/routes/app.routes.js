import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Main" component={Home} />
  </AppStack.Navigator>
);

export default AppRoutes;
