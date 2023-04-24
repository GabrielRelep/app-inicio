import { useContext } from "react";
import AuthContext from "../contexts/auth";
import AppRoutes from "../routes/app.routes";
import AuthRoutes from "../routes/auth.routes";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  return <>{signed ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default Routes;
