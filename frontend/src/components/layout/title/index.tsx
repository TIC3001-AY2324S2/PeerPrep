import { RefineLayoutThemedTitleProps, ThemedTitleV2 } from "@refinedev/mui";
import { PeerPrepIcon } from "../../icons";

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  return (
    <ThemedTitleV2
      collapsed={collapsed}
      wrapperStyles={wrapperStyles}
      text="PeerPrep"
      icon={<PeerPrepIcon />}
    />
  );
};
