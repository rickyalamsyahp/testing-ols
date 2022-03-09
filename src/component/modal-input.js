import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";

import "../styles/modal-input.css";

function ModalInput({ open, onClose, value = null }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => {
    onClose();
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
                <button oclassName="button_login_input">Sumbit</button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalInput;
