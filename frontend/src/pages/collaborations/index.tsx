import Grid from "@mui/material/Grid";
import { Editor } from "../../components/editor";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export const Collaboration = () => {
  return (
    <Grid container spacing={2} height="100%">
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ p: 2, height: "100%", maxHeight: "80vh", overflow: "auto" }}>
          <Stack gap={1}>
            <Typography variant="h6">Problem 1. Reverse a String</Typography>
            <Stack direction="row" gap={1}>
              <Chip label="Easy" color="success" />
              <Chip label="Strings" />
              <Chip label="Algorithms" />
            </Stack>
            <Typography variant="body1">
              Write a function that
              reverses a string. The
              input string is given as
              an array of characters
              s.
              You must do this by
              modifying the input
              array in-place with
              O(1) extra memory.
              Example 1:
              Input: s =
              ["h","e","l","l","o"]
              Output:
              ["o","l","l","e","h"]
              Example 2:
              Input: s =
              ["H","a","n","n","a","
              h"]
              Output:
              ["h","a","n","n","a","
              H"]
              Constraints:
              1 = s.length = 105
              s[i] is a printable ascii
              character.
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ p: 2, height: "100%", maxHeight: "80vh", overflowY: "scroll" }}>
        <Editor rootName="default" />
        </Paper>
      </Grid>
    </Grid>
  );
};
