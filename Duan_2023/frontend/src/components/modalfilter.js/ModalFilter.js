import React from "react";
import "./ModalFilter.css";
import { AiOutlineClose } from "react-icons/ai";

const ModalFilter = () => {
  return (
    <div className="modal-filter">
      <div className="modal-filter-overlay"></div>
      <div className="modal-filter-body">
        <div className="modal-filter-body__inner">
          <div className="auth-form__form">
            <div>
              <AiOutlineClose className="auth-form__form-icon-close"></AiOutlineClose>
            </div>
            <div className="auth-form__form-title">Lọc Kết Quả</div>
            <button className="auth-form__form-button-close">Bỏ lọc</button>
          </div>
          <div className="header-auth-form__form-tick">
            <div className="header-auth-form__form-tick-text">Sắp xếp theo</div>
          </div>

          <div className="auth-form__form-tick">
            <div class="auth-form__form-tick1">
              <label for="radio1" className="radio-text">
                Tin mới trước
              </label>
              <input type="radio" className="group-radio" />
            </div>
            <div class="auth-form__form-tick2">
              <label for="radio1" className="radio-text">
                Giá thấp trước
              </label>
              <input type="radio" className="group-radio" />
            </div>
          </div>

          <div className="header-auth-form__form-tick">
            <div className="header-auth-form__form-tick-text">Đăng bởi</div>
          </div>
          <div className="auth-form__form-tick">
            <div class="auth-form__form-tick1">
              <label for="radio1" className="radio-text">
                Cá nhân
              </label>
              <input type="radio" className="group-radio" />
            </div>
            <div class="auth-form__form-tick2">
              <label for="radio1" className="radio-text">
                Bán chuyên
              </label>
              <input type="radio" className="group-radio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
