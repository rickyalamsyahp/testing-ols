import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";

import "../styles/modal.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function SimpleDialog({ open, onClose, value = null }) {
  const [comment, setComment] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [data, setValue] = useState(0);
  const handleClose = () => {
    onClose();
  };

  const getCommand = async () => {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${value.id}`
    );
    setComment(data.data);
    SetLoading(false);
  };

  useEffect(() => {
    getCommand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Tabs
              value={data}
              textColor="primary"
              indicatorColor="primary"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab label="Comment" value={data} />
            </Tabs>
            <TabPanel value={data} index={0}>
              <div className="box-modal-kecil">
                {comment.map((a) => (
                  <div key={a.id} className="cardPost">
                    <p className="title">{a.name}</p>
                    <p className="body">{a.body}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
            <div className="div-btn-modal">
              <button onClick={handleClose} className="btn-modal">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SimpleDialog;
