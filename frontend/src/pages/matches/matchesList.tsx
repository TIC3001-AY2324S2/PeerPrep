import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";

export const MatchRequestList = () => {
  const { dataGridProps } = useDataGrid({ resource: 'match_request' });

  const dummyMatchRequests = [
    { id: 1, email: 'dummy1@example.com', difficulty: 'Easy', category: 'Math', status: 'Pending' },
    { id: 2, email: 'dummy2@example.com', difficulty: 'Medium', category: 'Science', status: 'Approved' },
    { id: 3, email: 'dummy3@example.com', difficulty: 'Hard', category: 'History', status: 'Rejected' },
  ];

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 90,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
      },
      {
        field: "difficulty",
        headerName: "Difficulty",
        minWidth: 120,
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 150,
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
      },
      // Add more fields as required
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        ),
        align: "center",
        headerAlign: "center",
        minWidth: 130,
      },
    ],
    []
  );

  return (
    <List>
      {/* <DataGrid {...dataGridProps} columns={columns} autoHeight /> */}
      <DataGrid {...dataGridProps} columns={columns} rows={dummyMatchRequests} autoHeight />
    </List>
  );
};
