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
    id: "",
    title: "",
    desc: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    console.log("detail: ", detail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.id || !detail.title) {
      toast.error("Please fill in the form.");
      return;
    }
    console.log(detail);
    try {
      const newIssue = await axios({
        method: "POST",
        url: "http://localhost:8080/api/issue/create",
        data: {
          id: detail.id,
          title: detail.title,
          desc: detail.desc,
        },
      });

      console.log("Response from server: ", newIssue.data);
      if (newIssue) {
        toast.success(newIssue.data.message);
        console.log("new Issue added: ", newIssue.data);
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
            <FormLabel>ID</FormLabel>
            <Input
              type="text"
              placeholder="ID"
              name="id"
              value={detail.id}
              onChange={handleInput}
              id="id"
            />
            <Input
              type="text"
              placeholder="title"
              name="title"
              value={detail.title}
              onChange={handleInput}
            />

            <Input
              type="text"
              placeholder="desc"
              name="desc"
              value={detail.desc}
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
