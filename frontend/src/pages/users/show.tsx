import { useShow } from "@refinedev/core";
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const UserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={2}>
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
      </Stack>
    </Show>
  );
};
