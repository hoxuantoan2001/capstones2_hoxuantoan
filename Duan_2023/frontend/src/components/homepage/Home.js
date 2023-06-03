import { Fragment } from "react";
import React from "react";
import { TbHomeDollar, TbHomeRibbon } from "react-icons/tb";
import { BsCardImage } from "react-icons/bs";
import { FiMap, FiMapPin } from "react-icons/fi";
import { MdPriceCheck } from "react-icons/md";
import Logo from "../../img/zyro-image.png";
import { Link } from "react-router-dom";
import { parsePath, useNavigate } from "react-router-dom";
import bgimg from "../../img/vinhomes-grand-park-1.jpg";
import "../homepage/Home.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authHeader from "../../services/auth.header";
import { useEffect, useState } from "react";
import { updatepost } from "../../redux/userSlice/postSlice";
const Home = () => {
  const id = useSelector((state) => state.post?.post?._id);
  const [posts, setPost] = useState({});
  console.log("id", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/post`, {
          // headers: authHeader(),
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log("fs", data);
          setPost(data);
        })
        .catch((error) => console.log(error));
      console.log("fs", posts);
    };
    fetchData();
  }, []);
  const handlechange = (post) => {
    // e.preventDefault();

    dispatch(updatepost(post));
    navigate("product");
  };
  return (
    <div className="homepage">
      <div
        className="background_img"
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>

      <div className="discover">
        <h2>Khám phá BĐS</h2>
        <div id="menu-discover">
          <ul>
            <li className="discover-edit">
              <a href="">
                <TbHomeDollar className="discover_icon"></TbHomeDollar>
                <span>Mua bán</span>
              </a>
              <ul className="sub-menu-discover">
                <li>
                  <a href="#">Căn hộ/ Chung cư</a>
                </li>
                <li>
                  <a href="#">Nhà ở</a>
                </li>
                <li>
                  <a href="#">Đất</a>
                </li>
                <li>
                  <a href="#">Văn phòng/ Mặt bằng kinh doanh</a>
                </li>
              </ul>
            </li>
            <li className="discover-edit">
              <a href="">
                <TbHomeRibbon className="discover_icon"></TbHomeRibbon>
                <span>Cho thuê</span>
              </a>
              <ul className="sub-menu-discover">
                <li>
                  <a href="#">Căn hộ/ Chung cư</a>
                </li>
                <li>
                  <a href="#">Nhà ở</a>
                </li>
                <li>
                  <a href="#">Đất</a>
                </li>
                <li>
                  <a href="#">Văn phòng/ Mặt bằng kinh doanh</a>
                </li>
                <li>
                  <a href="#">Phòng trọ</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="sell-bds">
        <h2>Mua bán Bất Động Sản</h2>
        {posts?.content?.map((post) => (
          <div className=" product-sell" onClick={() => handlechange(post)}>
            <img
              className="img-bds"
              src={`http://localhost:5000/img/${post?.img_url[0]}`}
            ></img>
            <div className="title-bds">
              <h2>{post?.name} </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">
                Diện tích:
                <span>{post?.area}</span>
                m²
              </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">
                Giá:
                <span>{post?.price}</span>
                tỷ
              </span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:
                <span>{post?.address}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rent-bds">
        <h2>Cho thuê Bất Động Sản</h2>

        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/2023/03/28/20230328085135-6330_wm.jpg"
            ></img>
            <div className="title-bds">
              <h2>
                Cho thuê nhà đẹp gần cầu sông Hàn 2PN khép kín full nội thất
                hiện đại
              </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:100 m² Mặt tiền 5 m </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá:14 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>Địa chỉ:Phường An Hải Bắc, Sơn Trà, Đà Nẵng</span>
            </div>
          </div>
        </a>

        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/resize/1275x717/2023/04/03/20230403094015-bc3a_wm.jpg"
            ></img>
            <div className="title-bds">
              <h2>Cho thuê nhà mới 100% </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:52 m² Mặt tiền 10 m </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá:15 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:Đường Tiểu La, Phường Hòa Cường Bắc, Hải Châu, Đà Nẵng
              </span>
            </div>
          </div>
        </a>

        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/2023/02/24/20230224200953-8769_wm.jpeg"
            ></img>
            <div className="title-bds">
              <h2>Cho thuê villa nơi đáng sống nhất Đà nẵng </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:176 m² Mặt tiền 8 m </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá:26 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>Địa chỉ:Dream Home, Cẩm Lệ, Đà Nẵng</span>
            </div>
          </div>
        </a>

        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/resize/1275x717/2023/03/20/20230320132404-c15b_wm.jpg"
            ></img>
            <div className="title-bds">
              <h2>
                Cho thuê nhanh nhà đẹp 4 tầng, nội thất đầy đủ, nhà mới vào ở
                ngay{" "}
              </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:150 m² </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá: 17 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:Đường Mân Quang 10, Phường Thọ Quang, Sơn Trà, Đà Nẵn
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Home;
