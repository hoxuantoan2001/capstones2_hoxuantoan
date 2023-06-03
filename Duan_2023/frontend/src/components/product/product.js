import React, { useEffect, useState } from "react";
import "../product/prduct.css";
import sellerimg from "../../img/seller-img.png";
import {
  BsFillTelephoneFill,
  BsHeadset,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { FiAlertTriangle, FiMap } from "react-icons/fi";
import { TbArrowsMoveHorizontal, TbArrowsMoveVertical } from "react-icons/tb";
import { AiFillCompass, AiOutlineAreaChart } from "react-icons/ai";
import { GiNewspaper } from "react-icons/gi";
import {
  MdChair,
  MdBedroomParent,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import axios from "axios";
import { TiMessages } from "react-icons/ti";
import { FaToilet, FaEquals } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../../services/auth.header";
import { Link } from "react-router-dom";

const Product = () => {
  const id = useSelector((state) => state.post?.post?._id);
  const user = useSelector((state) => state?.auth?.user);
  const [photo, setPhoto] = useState("");
  console.log("user", user);
  const [post, setPost] = useState({});
  console.log("id", id);

  const [percent, setPercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const handlePercentChange = (e) => {
    setPercent(parseFloat(e.target.value));
  };
  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };
  const calculateFinalPrice = () => {
    const discount = (percent / 100) * price;
    const finalPrice = price - discount;
    setFinalPrice(finalPrice.toFixed());
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        const detailPost = res.data;
        console.log("fsb", detailPost);
        setPost(detailPost);
        setPhoto(
          `http://localhost:5000/img/${detailPost?.content?.img_url[0]}`
        );
        // x
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("done", photo);

  return (
    <div className="product">
      <div className="product_infor">
        <div className="image">
          <div className="product-upload-img">
            <img className="image-product" src={photo}></img>

            <div className="product-upload-mini-img">
              {post?.content?.img_url?.map((img) => (
                <div className="size-img">
                  <img
                    className="image-product-mini"
                    src={`http://localhost:5000/img/${img}`}
                    alt=""
                    onClick={() => setPhoto(`http://localhost:5000/img/${img}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="product_features">
          <h2>{post?.content?.name} </h2>

          <div className="product-address">
            <span>
              Địa chỉ:
              <span>{post?.content?.address}</span>
            </span>
          </div>
          <br />
          <div className="product-price">
            <span>
              Giá:
              <span>{post?.content?.price}</span>
              tỷ
            </span>
          </div>
          <div className="product-area">
            <span>
              Diện tích:
              <span>{post?.content?.area}</span>
              m²
            </span>
          </div>
        </div>

        <div className="product_details">
          <h2>Đặc điểm BĐS</h2>
          <div className="product-details-mini">
            <div className="details">
              <FiMap className="icon"></FiMap>
              <span>
                Diện tích BĐS:
                <span className="details-area detail-data">
                  {post?.content?.area}
                </span>
                m²
              </span>
            </div>

            <div className="details">
              <MdOutlineMapsHomeWork className="icon"></MdOutlineMapsHomeWork>
              <span>
                Số tầng:
                <span className="detail-number-of-floors detail-data">
                  {post?.content?.floor}
                </span>
                Tầng
              </span>
            </div>

            <div className="details">
              <AiFillCompass className="icon"></AiFillCompass>
              <span>
                Hường nhà:
                <span className="detail-direction detail-data">
                  {post?.content?.direction}
                </span>
              </span>
            </div>

            <div className="details">
              <TbArrowsMoveVertical className="icon"></TbArrowsMoveVertical>
              <span>
                Chiều dài:
                <span className="detail-length-house detail-data">
                  {post?.content?.length}
                </span>
                m
              </span>
            </div>

            <div className="details">
              <TbArrowsMoveHorizontal className="icon"></TbArrowsMoveHorizontal>
              <span>
                Chiều rộng:
                <span className="detail-wide-house detail-data">
                  {post?.content?.wide}
                </span>
                m
              </span>
            </div>
          </div>

          <div className="product-details-mini">
            <div className="details">
              <MdBedroomParent className="icon"></MdBedroomParent>
              <span>
                Số phòng ngủ:
                <span className="detail-number-of-bedroom detail-data">
                  {post?.content?.bedroom}
                </span>
                Phòng
              </span>
            </div>

            <div className="details">
              <FaToilet className="icon"></FaToilet>
              <span>
                Số phòng toilet:
                <span className="detail-number-of-toilet detail-data">
                  {post?.content?.bathroom}
                </span>
                Phòng
              </span>
            </div>

            <div className="details">
              <GiNewspaper className="icon"></GiNewspaper>
              <span>
                Tình trạng pháp lí:
                <span className="detail-juridical detail-data">
                  {post?.content?.juridical}
                </span>
              </span>
            </div>

            <div className="details">
              <MdChair className="icon"></MdChair>
              <span>
                Trạng thái nội thất:
                <span className="detail-interior detail-data">
                  {post?.content?.interior}
                </span>
              </span>
            </div>

            <div className="details">
              <AiOutlineAreaChart className="icon"></AiOutlineAreaChart>
              <span>
                Diện tích sử dụng:
                <span>{post?.content?.usablearea}</span>
                m²
              </span>
            </div>
          </div>
        </div>
        <div className="product-content">
          <div className="content-product">
            <h2>Mô tả chi tiết:</h2>

            <span className="product-title">{post?.content?.content}</span>
          </div>
          <div className="details">
            <BsFillTelephoneFill className="icon"></BsFillTelephoneFill>
            <span>
              Liên hệ:{post?.content?.user?.phonenumber}
              <span className="product-phonenumber"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="seller_infor">
        <div>
          <img className="seller-img" src={sellerimg}></img>
          <span>
            Được đăng bởi: <br />
            <span className="seller-name">
              {post?.content?.user?.name || user.name}
            </span>
          </span>
          <br />
          <span className="seller-title">Chính chủ/ Môi giới</span>
        </div>

        <div className="seller-contact">
          <h2>Liên hệ với người bán</h2>
          <div className="seller-telephone">
            <div className="details">
              <BsFillTelephoneFill className="icon"></BsFillTelephoneFill>
              <span>
                Phonenumber
                <span className="seller-phonenumber"></span>
              </span>
            </div>
          </div>

          <div className="seller-chat">
            <div className="details">
              <Link to={"../chatbox"}>
                <TiMessages className="icon"></TiMessages>
                <span>
                  Chat với người bán
                  <span className="seller-message"></span>
                </span>
              </Link>
            </div>
          </div>
          <div className="product-deal">
            <div className="product-price-deal">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="Nhập % giá tiền"
                className="box-product-deal"
                value={percent}
                onChange={handlePercentChange}
              ></input>
            </div>
            <div>
              <button onClick={calculateFinalPrice}>
                <FaEquals></FaEquals>
              </button>
            </div>

            <div className="price-want-to-buy">
              Giá muốn mua:
              {finalPrice}
            </div>

            <div>
              <label>
                Giá tiền:
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                />
              </label>
            </div>
          </div>
          <div className="button-buynow">
            <button className="button-buy">
              <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
              <span>Mua Ngay</span>
            </button>
          </div>
        </div>
        <div className="help">
          <div className="details support">
            <BsHeadset className="icon"></BsHeadset>
            <span>Cần trợ giúp</span>
          </div>

          <div className="details report">
            <FiAlertTriangle className="icon"></FiAlertTriangle>
            <span>Báo cáo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
