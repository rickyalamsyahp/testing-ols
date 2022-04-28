/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/navbar.css";
import "../styles/post.css";

const options = ["Edit", "Hapus"];
const ITEM_HEIGHT = 48;

const Home = ({ title, logic }) => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null || token !== undefined) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
     setLoading(true);
    const url = "http://119.8.167.126:90/api/BranchReps";
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      });
  };
  const logout = () => {
    localStorage.removeItem('token')
    let path = `/`;
    navigate(path);
  };
  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="left">
            <p className="title">Halaman</p>
          </div>
          <div className="right">
            <div className="logic" onClick={logout}>
              <p className="text">Logout</p>
            </div>
          </div>
        </div>
      </div>
      {/* Conten post */}

      <div className="home">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>BranchID</TableCell>
                    <TableCell align="right">BranchName</TableCell>
                    <TableCell align="right">BranchNb</TableCell>
                    <TableCell align="right">ScreenNo</TableCell>
                    <TableCell align="right">AccessRole</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">LegalName</TableCell>
                    <TableCell align="right">TaxRegistrationID</TableCell>
                    <TableCell align="right">Attention</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.BranchID}
                      </TableCell>
                      <TableCell align="right">{row.BranchName}</TableCell>
                      <TableCell align="right">{row.BranchNbr}</TableCell>
                      <TableCell align="right">{row.ScreenNo}</TableCell>

                      <TableCell align="right">
                        {row.BranchDetails?.AccessRole}
                      </TableCell>
                      <TableCell align="right">
                        {row.BranchDetails?.AddressLine1}
                      </TableCell>
                      <TableCell align="right">
                        {row.BranchDetails?.State}
                      </TableCell>
                      <TableCell align="right">
                        {row.BranchDetails?.LegalName}
                      </TableCell>
                      <TableCell align="right">
                        {row.BranchDetails?.TaxRegistrationID}
                      </TableCell>
                      <TableCell align="right">
                        {row.BranchDetails?.Attention}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {data.map((e, i) => (
              <div key={i}></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
