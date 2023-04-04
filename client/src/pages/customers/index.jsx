import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "@/state/api";
import Header from "@/components/Header";
import { DataGrid } from "@mui/x-data-grid";
const Customers = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "phone Number",
      flex: 0.5,
      rederCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"CUSTOMERS"} subtitle={"List Of Customers"} />
      <Box
        mt={"40px"}
        height={"80vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: palette.background.alt,
            color: palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: palette.primary.alt,
            color: palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          isLoading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
