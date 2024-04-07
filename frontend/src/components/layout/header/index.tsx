import React, { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps, useThemedLayoutContext } from "@refinedev/mui";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { ColorModeContext } from "../../../contexts/color-mode";
import { AccountMenu } from "../accountMenu";
import { PeerPrepIcon } from "../../icons";
import Link from "@mui/material/Link";

type LayoutHeaderProps = { showHamburger?: boolean } & RefineThemedLayoutV2HeaderProps;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

const Logo: React.FC = () => {
  const { siderCollapsed } = useThemedLayoutContext();

  if (!siderCollapsed) {
    return <></>;
  }

  return (
    <Link href="/" color="inherit" underline="none">
      <Stack direction="row">
        <PeerPrepIcon />
        <Typography sx={{ ml: 1 }}>PeerPrep</Typography>
      </Stack>
    </Link>
  );
};

export const Header: React.FC<LayoutHeaderProps> = ({
  sticky = true,
  showHamburger = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center">
          {showHamburger && <HamburgerMenu />}
          <Logo />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
          >
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.avatar || user?.name) && (
              <AccountMenu />
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
