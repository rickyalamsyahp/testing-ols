import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Dialog from "@mui/material/Dialog";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";

import "../styles/modal.css";
import { useDispatch, useSelector} from "react-redux";
import { getPostTestingById } from "../redux/actions/PostActions";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function SimpleDialog({ open,  value = null }) {

  const navigate = useNavigate()
const dispatch = useDispatch()
  const [data, setValue] = useState(0);
  const handleClose = () => {
    navigate(-1)
  };
const datas = useSelector((state) => state.preSales);
  useEffect(() => {
    dispatch(getPostTestingById(value.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dialog">
      <Dialog onClose={handleClose} open={open}>
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
                {datas.postById.map((a) => (
                  <div
                    key={a.id}
                    className="cardPost"
                    style={{ cursor: "pointer" }}
                  >
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
