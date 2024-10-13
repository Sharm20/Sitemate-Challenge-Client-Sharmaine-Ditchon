import "../App.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const Main = () => {
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    employment_status: "",
    sex: "",
    address: "",
    contact_num: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    console.log("detail: ", detail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.firstName || !detail.lastName) {
      toast.error("Please fill in the form.");
      return;
    }
    console.log(detail);
    try {
      const newEmp = await axios({
        method: "POST",
        url: "http://localhost:8080/api/employee/create",
        data: {
          firstName: detail.firstName,
          lastName: detail.lastName,
          dob: detail.dob,
          employment_status: detail.employment_status,
          sex: detail.sex,
          address: detail.address,
          contact_num: detail.contact_num,
        },
      });
      // const newEmp = await axios.post(
      //   "http://localhost:8080/api/employee/create",
      //   detail
      // );
      console.log("Response from server: ", newEmp.data);
      if (newEmp) {
        toast.success(newEmp.data.message);
        console.log("new employee added: ", newEmp.data);
        return;
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        const status = error.response.statusText;
        const errmessage = error.response.data.message;
        toast.error(status + ". " + errmessage);
        console.log(error.response);
      }
    }
  };

  return (
    <div className="container">
      <Toaster />
      <div className="form-container">
        <div className="box">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={detail.firstName}
              onChange={handleInput}
              id="name"
            />
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={detail.lastName}
              onChange={handleInput}
            />
          </FormControl>
          <button onClick={handleSubmit}>save</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
