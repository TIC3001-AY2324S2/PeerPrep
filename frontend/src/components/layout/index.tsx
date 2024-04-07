import { ThemedLayoutV2 } from "@refinedev/mui";
import { Header } from "./header";
import { Title } from "./title";
import { Sider } from "./sider";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemedLayoutV2
      Header={() => <Header sticky />}
      Title={Title}
      Sider={Sider}
      initialSiderCollapsed={true}
    >
      {children}
    </ThemedLayoutV2>
  );
};
