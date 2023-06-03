import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import "./Post.css";
import "./Base.css";
import Header from "../../header/header";
import { BsImages, BsCameraVideo } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../redux/userSlice/postSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authHeader from "../../../services/auth.header";
const Post = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [Imgs, setImgs] = useState([]);
  const [dataPost, setDataPost] = useState({});
  const [userData, setUserData] = useState({
    user: user.id,
    price: "",
    area: "",
    length: "",
    wide: "",
    status: "",
    content: "",
    address: "",
    name: "",
    floor: "",
    juridical: "",
    interior: "",
    bedroom: "",
    bathroom: "",
    direction: "",
    usablearea: "",
  });

  const [photo, setPhoto] = useState();
  useEffect(() => {
    return () => {
      photo && URL.revokeObjectURL(photo);
    };
  }, [photo]);
  console.log("ddfd", user.id);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < Imgs.length; i++) {
      formData.append("img_url", Imgs[i]);
    }
    formData.append("user", user.id);
    formData.append("name", userData.name);
    formData.append("direction", userData.direction);
    formData.append("price", userData.price);
    formData.append("area", userData.area);
    formData.append("length", userData.length);
    formData.append("wide", userData.wide);
    formData.append("status", userData.status);
    formData.append("address", userData.address);
    formData.append("floor", userData.floor);
    formData.append("juridical", userData.juridical);
    formData.append("interior", userData.interior);
    formData.append("bedroom", userData.bedroom);
    formData.append("direction", userData.direction);
    formData.append("usablearea", userData.usablearea);

    try {
      await dispatch(addPost(formData)).then((post) => {
        if (post.payload.content) {
          navigate("product");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    setImgs([...Imgs, e.target.files[0]]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const hanhleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div class="container">
        <div class="item item1">
          <h3>Ảnh tổng quan bất động sản</h3>

          <div className="upload">
            {photo ? (
              <img className="upload-image" src={photo} alt="" />
            ) : (
              <BsImages className="upload-icon"></BsImages>
            )}
            {Imgs?.map((img) => (
              <div className="mini-img">
                <div>
                  <img
                    className="upload-mini-img"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
              </div>
            ))}

            <div>
              <input
                type="file"
                name="img_url"
                multiple
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
        <div class="item item2">
          <div className="select-item">
            <label className="title-item">Danh Mục Tin Đăng:</label>
            <select name="lang" className="option-item">
              <option value="">--Hãy chọn một danh mục--</option>
              <option value="BDS">Nhà riêng</option>
              <option value="Text">Chung cư</option>
              <option value="Text">Biệt thự</option>
              <option value="Text">Shophouse</option>
              <option value="Text">Đất nền</option>
            </select>
          </div>

          <div className="info">
            <div className="address">
              <div className="title-address">Địa chỉ BDS</div>
              <div className="input-address">

                <input
                  type="text"
                  placeholder="  Địa chỉ"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="input-address-position"
                />
              </div>
            </div>



            <div className="details">
              <div className="title-details">Thông tin chi tiết</div>
              <div className="input-details">
                
                <input
                  type="text"
                  placeholder="  Số phòng ngủ"
                  name="bedroom"
                  value={userData.bedroom}
                  onChange={handleChange}
                  className="input-details-num-bedroom"
                />

                <input
                  type="text"
                  placeholder="  Số phòng vệ sinh(Không bắt buộc)"
                  name="bathroom"
                  value={userData.bathroom}
                  onChange={handleChange}
                  className="input-details-num-bathroom"
                />
                <br></br>
                <input
                  type="text"
                  placeholder="  Hướng cửa chính (không bắt buộc)"
                  name="direction"
                  value={userData.direction}
                  onChange={handleChange}
                  className="input-details-num-trend"
                />

                <input
                  type="text"
                  placeholder="  Tổng số tầng"
                  name="floor"
                  value={userData.floor}
                  onChange={handleChange}
                  className="input-details-num-floor"
                />
              </div>
            </div>

            <div className="info-more">
              <div className="title-info-more">Thông tin khác</div>
              <div className="input--more">
                <input
                  type="text"
                  placeholder="  Giấy tờ pháp lý (không bắt buộc)"
                  name="juridical"
                  value={userData.juridical}
                  onChange={handleChange}
                  className="input-paper"
                />

                <input
                  type="text"
                  placeholder="  Trình trạng nội thất(không bắt buộc)"
                  name="interior"
                  value={userData.interior}
                  onChange={handleChange}
                  className="input-furniture"
                />

              </div>
            </div>

            <div className="area-price">
              <div className="title-area-price">Diện tích & giá</div>
              <div className="input-area-price">
                <input
                  type="text"
                  placeholder="  Diện tích đất"
                  name="area"
                  value={userData.area}
                  onChange={handleChange}
                  className="input-area"
                />

                <input
                  type="text"
                  placeholder="  Diện tích sử dụng"
                  name="usablearea"
                  value={userData.usablearea}
                  onChange={handleChange}
                  className="input-area-use"
                />
                <br></br>
                <input
                  type="text"
                  placeholder="  Chiều rộng"
                  name="wide"
                  value={userData.wide}
                  onChange={handleChange}
                  className="input-width"
                />

                <input
                  type="text"
                  placeholder="  Chiều dài"
                  name="length"
                  value={userData.length}
                  onChange={handleChange}
                  className="input-height"
                />
                <br></br>

                <input
                  type="text"
                  placeholder="  Giá"
                  name="price"
                  value={userData.price}
                  onChange={handleChange}
                  className="input-price"
                />
              </div>
            </div>

            <div className="post">
              <div className="title-post">
                Tiêu đề tin đăng và Mô tả chi tiết
              </div>
              <div className="input-post">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="  Tiêu đề tin đăng"
                  className="input-post-status"
                />
                <br></br>
                <textarea
                  className="post-detail-product"
                  placeholder="  Mô tả chi tiết"
                
                  
                    type="text"
                    name="content"
                    value={userData.content}
                    onChange={handleChange}
                   
                  >
                </textarea>
              </div>
            </div>

            <div className="button-submit">
              <button className="button-submit-prev">XEM TRƯỚC</button>

              <button className="button-submit-post" onClick={onSubmit}>
                ĐĂNG TIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
