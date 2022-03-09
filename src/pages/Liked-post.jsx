import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteAllLogin,
  saveLogin,
  selectLoginList,
} from "../store/loginSlice";
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import HeartIconOutline from "@heroicons/react/outline/HeartIcon";

import PageDetail from "./pageDetailPost";

import "../styles/navbar.css";
import "../styles/post.css";

const LikedPost = ({ title, logic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const [post, setPost] = useState([]);
  const [postDetail, setPostDetail] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (post) => {
    setOpen(true);
    setSelectedItem(post);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const userId = useSelector(selectLoginList);

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

    {
      logic === "Log Out" && dispatch(deleteAllLogin);
    }
  };

  const getPost = async () => {
    const getData = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPost(getData.data);
  };
  let lastname = JSON.parse(localStorage.getItem("testiing"));
  var items = [];

  const test = (post) => {
    if (lastname && lastname.some((a) => a.id === post.id)) {
      lastname.splice(
        lastname.findIndex(function (i) {
          return i.id === post.id;
        }),
        1
      );
      localStorage.setItem("testiing", JSON.stringify(lastname));
    } else {
      if (lastname) {
        // const a = Object.assign({}, ...lastname);
        items.push(post, ...lastname);
        let unique = [];
        items.forEach((element) => {
          if (!unique.includes(element)) {
            unique.push(element);
          }
        });
        localStorage.setItem("testiing", JSON.stringify(unique));
      } else {
        items.push(post);
        localStorage.setItem("testiing", JSON.stringify(items));
      }
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="left">
            {logic === "Login" ? (
              <>
                <Link to="/" className="title">
                  <p className="title">{title}</p>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/admin/${userId[0].id}`} className="title">
                  <p className="title">{title}</p>
                </Link>
              </>
            )}
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
                {logic === "Login" && (
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
                )}
                <div className="button">
                  <div className="button-cancel">
                    <button onClick={togglePopup} className="button_cancel">
                      Cancel
                    </button>
                  </div>
                  <div className="button-login">
                    <Link
                      to={logic === "Login" ? `/admin/${id}` : "/"}
                      handleclose={togglePopup}
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
        {/* {console.log(lastname)} */}
        {lastname.map((posts, index) => (
          <div key={posts.id} className="cardHome">
            {/* {console.log(lastname.some((a) => a.id === posts.id))} */}
            <div
              className="left"
              onClick={() => {
                openModal(posts);
              }}
            >
              <p className="title">{posts.title}</p>
              <p className="body">{posts.body}</p>
            </div>

            <div className="right">
              <button onClick={() => test(posts)}>
                {lastname === null ? (
                  <HeartIconOutline className="icon" />
                ) : lastname.some((a) => a.id === posts.id) ? (
                  <HeartIcon className="icon" />
                ) : (
                  <HeartIconOutline className="icon" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedItem === null ? (
        ""
      ) : (
        <PageDetail open={open} onClose={closeModal} value={selectedItem} />
      )}
    </>
  );
};

export default LikedPost;

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
