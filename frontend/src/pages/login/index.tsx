import { AuthPage } from "@refinedev/mui";
import { Title } from "../../components/layout/title";

export const Login = () => {
  return <AuthPage
    type="login"
    title={<Title collapsed={false} />}
    registerLink={false}
    forgotPasswordLink={false}
    rememberMe={false}
  />;
};
