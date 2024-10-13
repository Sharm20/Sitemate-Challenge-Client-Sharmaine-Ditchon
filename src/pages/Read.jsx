import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Read = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issues = await axios({
          method: "GET",
          url: "http://localhost:8080/api/issue/get",
        });
        if (issues) {
          console.log("Issues: ", issues.data);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          const status = error.response.statusText;
          const errmessage = error.response.data.message;
          console.log(error.response);
        }
      }
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <h2>Issues</h2>
    </div>
  );
};

export default Read;
