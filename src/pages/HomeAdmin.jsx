/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllLogin, selectLoginList } from "../redux/reducers/loginSlice";

import HeartIcon from "@heroicons/react/solid/HeartIcon";
import HeartIconOutline from "@heroicons/react/outline/HeartIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "../styles/navbar.css";
import "../styles/post.css";
import { getPostTestingByLogin } from "../redux/actions/PostActions";
import axios from "axios";

const options = ["Edit", "Hapus"];
const ITEM_HEIGHT = 48;

const HomeAdmin = ({ title, logic }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const buka = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdd = (posts, option) => {
    if (option === "Edit") {
      navigate(`/admin/post/${posts.id}/edit`, {
        state: {
          value: posts,
          open: true,
          userId: location.state.id,
        },
      });
      // setOpenView(true);
      setAnchorEl(null);
    } else {
      submit(posts);
      setAnchorEl(null);
    }
  };
  const handleTutup = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const userId = useSelector(selectLoginList);
  const posst = useSelector((state) => state.preSales);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const doLogic = () => {
    dispatch(deleteAllLogin);
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
    dispatch(getPostTestingByLogin({ page: page, userId: location.state.id }));
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
      dispatch(
        getPostTestingByLogin({ page: page, userId: location.state.id })
      );
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
        dispatch(
          getPostTestingByLogin({ page: page, userId: location.state.id })
        );
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
          onClick: async () => {
            const res = await axios.delete(
              `https://jsonplaceholder.typicode.com/posts/${posts.id}`
            );
            if (res.status === 200) {
              alert("Data Berhasil Terhapus");
            }
          },
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
            <Link to={`/admin/${userId[0].id}`} className="title">
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
                <div className="button">
                  <div className="button-cancel">
                    <button onClick={togglePopup} className="button_cancel">
                      Cancel
                    </button>
                  </div>
                  <div className="button-login">
                    <Link to={"/"} onClick={doLogic}>
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
        {posst.postId.map((posts, index) => (
          <div key={index} className="cardHome">
            {/* {console.log(lastname.some((a) => a.id === posts.id))} */}
            <Link
              className="left"
              to={`/admin/post/${posts.id}`}
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
            <div key={index}>
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
                    boxShadow: "none",
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
          </div>
        ))}
      </div>

      <div className="fab-container">
        <Link
          className="tambah"
          to={`/admin/create`}
          state={{
            value: null,
            open: true,
            userId: location.state.id,
          }}
        >
          <i className="fas fa-question">+</i>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default HomeAdmin;

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
