/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveLogin } from "../redux/reducers/loginSlice";

import HeartIcon from "@heroicons/react/solid/HeartIcon";
import HeartIconOutline from "@heroicons/react/outline/HeartIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ModalTambah from "../component/modal-input";

import "../styles/navbar.css";
import "../styles/post.css";
import { getPostTesting } from "../redux/actions/PostActions";

const options = ["Edit", "Hapus"];
const ITEM_HEIGHT = 48;

const Home = ({ title, logic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const [openView, setOpenView] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const [page, setPage] = useState(1);

  const buka = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdd = (posts, option) => {
    if (option === "Edit") {
      setSelectedItemEdit(posts);
      setOpenView(true);
      setAnchorEl(null);
    } else {
      submit(posts);
      setAnchorEl(null);
    }
  };
  const handleTutup = () => {
    setAnchorEl(null);
  };

  const closeModalView = () => {
    setOpenView(false);
  };

  const dispatch = useDispatch();
  const posst = useSelector((state) => state.preSales);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const doLogic = () => {
    dispatch(
      saveLogin({
        id: id,
        mail: mail,
      })
    );
  };

  let lastname = JSON.parse(localStorage.getItem("testiing"));

  const scrollEnd = () => {
    setPage(page + 1);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollEnd();
    }
  };

  useEffect(() => {
    if (logic === "Login") {
      dispatch(getPostTesting(page));
    } else {
    }
  }, [page]);

  // useEffect(() => {
  //   getPost();
  // }, [lastname]);

  var items = [];

  const test = (post) => {
    if (lastname && lastname.some((a) => a.id === post.id)) {
      console.log("masuk sini");
      lastname.splice(
        lastname.findIndex(function (i) {
          return i.id === post.id;
        }),
        1
      );
      localStorage.setItem("testiing", JSON.stringify(lastname));
      dispatch(getPostTesting(page));
    } else {
      if (lastname) {
        items.push(post, ...lastname);
        let unique = [];
        items.forEach((element) => {
          if (!unique.includes(element)) {
            unique.push(element);
          }
        });
        localStorage.setItem("testiing", JSON.stringify(unique));
        dispatch(getPostTesting(page));
      } else {
        items.push(post);
        localStorage.setItem("testiing", JSON.stringify(items));
      }
    }
  };

  const submit = (posts) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Yakin hapus post ini ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert(`post dengan id ${posts.id} terhapus`),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="left">
            <Link to="/" className="title">
              <p className="title">{title}</p>
            </Link>
          </div>
          <div className="right">
            <div className="logic" onClick={togglePopup}>
              <p className="text">{logic}</p>
            </div>
          </div>
        </div>
        {isOpen && (
          <Popup
            content={
              <div>
                <b>{logic}</b>
                <div className="textfield">
                  <div className="userId">
                    <p>User Id</p>
                    <input
                      className="input"
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="user id"
                    />
                  </div>
                  <div className="email">
                    <p>Email</p>
                    <input
                      className="input"
                      type="text"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      placeholder="email"
                    />
                  </div>
                </div>

                <div className="button">
                  <div className="button-cancel">
                    <button onClick={togglePopup} className="button_cancel">
                      Cancel
                    </button>
                  </div>
                  <div className="button-login">
                    <Link
                      to={`/admin`}
                      state={{
                        id: id,
                      }}
                      onClick={doLogic}
                    >
                      <button onClick={doLogic} className="button_login">
                        {logic}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            }
            handleclose={togglePopup}
            logic={logic}
          />
        )}
      </div>
      {/* Conten post */}
      <div className="home">
        {posst.post.map((posts, index) => (
          <div key={index} className="cardHome">
            <Link
              className="left"
              to={`/post/${posts.id}`}
              state={{
                value: posts,
                open: true,
              }}
            >
              <p className="title">{posts.title}</p>
              <p className="body">{posts.body}</p>
            </Link>

            <div className="right">
              <button onClick={() => test(posts)} style={{ cursor: "pointer" }}>
                {lastname === null ? (
                  <HeartIconOutline className="icon" />
                ) : lastname.some((a) => a.id === posts.id) ? (
                  <HeartIcon className="icon" />
                ) : (
                  <HeartIconOutline className="icon" />
                )}
              </button>
            </div>
            {logic === "Logout" && (
              <div key={posts.id}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={buka ? "long-menu" : undefined}
                  aria-expanded={buka ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={buka}
                  onClose={handleTutup}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === "Edit"}
                      onClick={() => {
                        handleAdd(posts, option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}
          </div>
        ))}
      </div>

      <Outlet />
      <ModalTambah
        open={openView}
        onClose={closeModalView}
        value={selectedItemEdit}
      />
    </>
  );
};

export default Home;

const Popup = (props) => {
  return (
    <>
      {props.logic === "Login" ? (
        <div className="popup-box">
          <div className="box">{props.content}</div>
        </div>
      ) : (
        <div className="popup-box">
          <div className="box-logout">{props.content}</div>
        </div>
      )}
    </>
  );
};
