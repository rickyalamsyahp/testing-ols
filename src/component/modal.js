import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import React, { useState, useEffect } from "react";

import "../styles/modal.css";

function SimpleDialog({ open, onClose, value = null }) {
  const [comment, setComment] = useState([]);
  const [loading, SetLoading] = useState(false);
  const handleClose = () => {
    onClose();
  };

  //   const getCommand = async () => {
  //     const data = await axios.get(
  //       `https://jsonplaceholder.typicode.com/comments?postId=${value.id}`
  //     );
  //     setComment(data.data);
  //     SetLoading(false);
  //   };

  //   useEffect(() => {
  //     getCommand();
  //   }, []);

  return loading ? (
    "loading"
  ) : (
    <div className="dialog">
      <Dialog onClose={handleClose} open={open}>
        {/* <DialogTitle>Tetsing</DialogTitle> */}
        {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
        <div className="popup-box-modal">
          <div className="box-modal">
            <p className="title">{value.title}</p>
            <p className="body">{value.body}</p>
            {/* {comment.map((a) => (
              <div key={a.id} className="cardPost">
                <p className="title">{a.name}</p>
                <p className="email">{a.email}</p>
                <p className="body">{a.body}</p>
              </div>
            ))} */}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SimpleDialog;
