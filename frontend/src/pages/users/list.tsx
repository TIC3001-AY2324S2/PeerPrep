import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import * as utils from "../../utils";

export const UserList = () => {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "client",
    },
    sorters: {
      mode: "off",
    },
    filters: {
      mode: "off",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "username",
        flex: 1,
        headerName: "Username",
        minWidth: 100,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 100,
      },
      {
        field: "isAdmin",
        flex: 1,
        headerName: "Admin",
        minWidth: 50,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={utils.base64UrlEncode(row.email)} />
              <ShowButton hideText recordItemId={utils.base64UrlEncode(row.email)} />
              <DeleteButton hideText recordItemId={utils.base64UrlEncode(row.email)} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        getRowId={(row) => row._id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
