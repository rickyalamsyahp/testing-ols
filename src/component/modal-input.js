import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import React, { useState, useEffect } from "react";

import "../styles/modal-input.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ModalInput({ open, value = null, userid }) {
  const [title, setTitle] = useState(value ? value.title : "");
  const [body, setBody] = useState(value ? value.body : "");
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    setTitle(value ? value.title : "");
    setBody(value ? value.body : "");
  }, [value]);
  const tambahData = async () => {
    if (value != null) {
      if (body === "") {
        alert("Body Harus diisi");
      }
      if (title === "") {
        alert("Title Harus diisi");
      }
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${value.id}`,
        {
          id: value.id,
          title: title,
          body: body,
          userId: userid,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (res.status === 200) {
        alert("Data Berhasil diedit");
        setBody("");
        setTitle("");
        navigate(-1);
      }
    } else {
      if (body === "") {
        alert("Body Harus diisi");
      }
      if (title === "") {
        alert("Title Harus diisi");
      }
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: userid,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (res.status === 201) {
        alert("Data Berhasil ditambahkan");
        setBody("");
        setTitle("");
        navigate(-1);
      }
    }
  };
  return (
    <div className="dialog">
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create Post</DialogTitle>
        <div className="popup-box-modal-input">
          <div className="box-modal-input">
            <div className="textfield-input">
              <div className="userId-input">
                <p>Title</p>
                <input
                  className="input-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div className="email">
                <p>Body</p>
                <input
                  className="input-input"
                  type="text"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Body"
                />
              </div>
            </div>
            <div className="button-input">
              <div className="button-cancel-input">
                <button onClick={handleClose} className="button_cancel_iput">
                  Cancel
                </button>
              </div>
              <div className="button-login-input">
                <button className="button_login_input" onClick={tambahData}>
                  Sumbit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalInput;
