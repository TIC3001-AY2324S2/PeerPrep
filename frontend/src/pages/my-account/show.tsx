import { useGetIdentity, useLogout, useNavigation, useOne } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as utils from "../../utils";
import { Loading } from "../../components/loading";
import { IUser } from "../../components/layout/types";

export const MyAccountShow = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: logout } = useLogout();
  const showParams = user?.email
    ? { resource: "users", id: utils.base64UrlEncode(user.email) }
    : { id: "unknown" };
  const { data, isLoading } = useOne(showParams);
  const { push } = useNavigation();

  const record = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!record?.email) {
    return "Error";
  }

  return (
    <Box>
      <Stack gap={2} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Avatar sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {"Username"}
          </Typography>
          <TextField value={record?.username} />
        </Box>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {"Email"}
          </Typography>
          <TextField value={record?.email} />
        </Box>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {"Admin"}
          </Typography>
          <TextField value={record?.isAdmin?.toString()} />
        </Box>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {"CreatedAt"}
          </Typography>
          <DateField value={record?.createdAt} />
        </Box>
        <Box>
          <Stack direction="row" gap={2}>
            <EditButton
              variant="outlined"
              onClick={() => {
                push("/my-account/edit");
              }}
            />
            <DeleteButton
              variant="outlined"
              resource="users"
              recordItemId={utils.base64UrlEncode(record.email)}
              onSuccess={() => {
                setTimeout(logout);
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
