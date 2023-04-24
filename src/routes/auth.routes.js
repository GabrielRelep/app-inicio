import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Auth" component={Login} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
