import React, { Fragment, useState } from "react";
import "./header.css";
import {
  BiHelpCircle,
  BiDownload,
  BiBell,
  BiSearch,
  BiLogOut,
} from "react-icons/bi";
import {
  BsFillPersonLinesFill,
  BsFillCaretDownFill,
  BsChatDots,
} from "react-icons/bs";
import { AiOutlineWallet
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaRegRegistered } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdManageAccounts, MdOutlineEventNote } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Logoheader from "../../img/zyro-image.png";
import { logout } from "../../redux/userSlice/authSlice";
import { getlistpost } from "../../redux/userSlice/listPosts";
import axios from "axios";
export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const [inputSearch, setInputSearch] = useState("");
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout");
    await dispatch(logout());

    <Link to={"/homepage"} className="nav-link"></Link>;
  };
  const handlechage = (e) => {
    setInputSearch(e.target.value);
  };
  const handleonClick = async () => {
    const listPosts = await axios.get(
      `http://localhost:5000/search/${inputSearch}`
    );
    console.log("sjdgsaghdsa", listPosts);
    await dispatch(getlistpost(listPosts));
  };

  if (!user) {
    <Link to={"/"} className="nav-link"></Link>;
  }

  return (
    <div>
      {" "}
      <div className="header">
        <div className="grid">
          <div className="header__navbar"></div>
          <div className="header__navbar header__navbar--manager">
            <ul>
              <Link to={"/homepage"} className="nav-link">
                <img
                  className="logo-header"
                  src={Logoheader}
                  alt={Logoheader}
                ></img>
              </Link>
            </ul>
            <ul className="header__navbar-list">
              {user ? (
                <Link to={"/productuser"} className="nav-link">
                  <li className="header__navbar--manager--item">
                    <RiAdminLine className="header__navbar--manager--item-icon"></RiAdminLine>
                    Quản lý tin
                  </li>
                </Link>
              ) : (
                <Fragment></Fragment>
              )}

              <li className="header__navbar--manager--item">
                <Link
                  to={"../chatbox"}
                  className="header__navbar--manager--item"
                >
                  <BsChatDots className="header__navbar--manager--item-icon"></BsChatDots>
                  Chat
                </Link>
              </li>

              <li className="header__navbar--manager--item">
                <BiBell className="header__navbar--manager--item-icon"></BiBell>
                Thông báo
              </li>

              <li className="header__navbar--manager--item">
                <div id="menu-discover-item">
                  <ul>
                    <li className="discover-edit">
                      <a href="">
                        <div className="discover-edit-item">
                        <BsFillPersonLinesFill className="icon-item"></BsFillPersonLinesFill>
                        {!user ? (
                          <span>Tài khoản </span>
                        ) : (
                          <span>{user?.username} </span>
                        )}
                        <BsFillCaretDownFill className="icon-item"></BsFillCaretDownFill>
                        </div>
                      </a>
                      {!user ? (
                        <ul className="sub-menu-discover-item">
                          <li>
                            <a href="#">
                              <Link to={"/login"} className="nav-link">
                                <FiLogIn className="icon-item"></FiLogIn>Đăng
                                Nhập{" "}
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <Link to={"/register"} className="nav-link">
                                <FaRegRegistered className="icon-item"></FaRegRegistered>
                                Đăng kí
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <MdManageAccounts className="icon-item"></MdManageAccounts>{" "}
                              Thông tin tài khoản
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <RiShoppingCart2Fill className="icon-item"></RiShoppingCart2Fill>
                              Quản lí đơn hàng
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="sub-menu-discover-item">
                          <li>
                            <a href="#">
                              <MdManageAccounts className="icon-item"></MdManageAccounts>{" "}
                              Thông tin tài khoản
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <RiShoppingCart2Fill className="icon-item"></RiShoppingCart2Fill>
                              Quản lí đơn hàng
                            </a>
                          </li>
                          <li>
                            
                            <a href="#">
                            <button className="wallet">
                              <AiOutlineWallet className="icon-item"></AiOutlineWallet>{" "}
                              Ví tiền của bạn
                              </button>
                            </a>
                            
                          </li>
                          <li>
                            <a href="#" onClick={handleLogout}>
                              <Link to={"/homepage"} className="nav-link">
                                <BiLogOut className="icon-item"></BiLogOut> Đăng
                                xuất
                              </Link>
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="header__navbar header__navbar--operation">
            <div className="header__navbar--input">
              <input
                type="text"
                placeholder="   Tìm kiếm"
                className="input-search"
                name="inputSearch"
                onChange={handlechage}
              />
              <Link to={"/search"} className="nav-link">
                <div
                  className="input-search-label--icon"
                  onClick={handleonClick}
                >
                  <BiSearch className="input-search--icon"></BiSearch>
                </div>
              </Link>
              <span></span>
            </div>
            <button type="button" className="input-button-label--icon">
              <TfiWrite className="input-button--icon"></TfiWrite>
              {user ? (
                <Link to={"/postsell"} className="nav-link">
                  <p className="input-button--name">ĐĂNG TIN</p>
                </Link>
              ) : (
                <Link to={"/login"} className="nav-link">
                  <p className="input-button--name">ĐĂNG TIN</p>
                </Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
