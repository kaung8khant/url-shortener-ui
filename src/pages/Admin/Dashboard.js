import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getAllUrl, deleteUrl } from "../../api/url";
import {
  Button,
  TextField,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("");
  const [redirect, setRedirect] = useState(false);

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "code", headerName: "Short Code", width: 130 },
    {
      field: "hit",
      headerName: "Number of Hit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    { field: "link", headerName: "Full Url", width: 200 },
    {
      field: "expired_at",
      headerName: "Expiry",
      type: "number",
      width: 150,
    },
    {
      field: "",
      headerName: "Action",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          deleteUrl(params.row.id).then((response) => {
            if (response.status === 200) {
              getData();
            }
          });
        };
        return (
          <Button onClick={onClick} color="secondary" variant="contained">
            Delete
          </Button>
        );
      },
    },
  ];

  const getData = useCallback(() => {
    getAllUrl(filter)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e && e.response.status === 401) {
          localStorage.removeItem("access_token");
          setRedirect(true);
        }
      });
  }, [filter]);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  if (redirect) {
    return <Redirect to="/admin/login" />;
  }

  return (
    <div style={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Url Shortener Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("access_token");
              setRedirect(true);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TextField
        style={{ height: "20px", margin: "10px" }}
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button
        color="primary"
        onClick={() => getData()}
        style={{ marginTop: "20px" }}
      >
        Filter
      </Button>

      <div style={{ height: "400px", marginTop: "40px" }}>
        <DataGrid
          rows={data ? data : []}
          columns={columns}
          pageSize={data ? (data.length > 10 ? 10 : data.length) : 0}
          onPageChange={(page) => {
            console.log(page);
          }}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};
export default Dashboard;
