import { Fragment, react } from "react";
import { 
    BsFillTelephoneForwardFill,
    BsPersonFillExclamation,
    BsHeadphones } from "react-icons/bs";
import Logoft from "../../img/zyro-image.png";
import "../footer/footer.css"


const Footer =() => {
    return(
        <div>
            <div className='footer'>
                <div className='footer-img'>
                    <img className='logo-footer' src={Logoft} alt={Logoft}></img>
                </div>
                <div className='footer-infor'>
                <BsFillTelephoneForwardFill className='footer-icon'></BsFillTelephoneForwardFill>
                <span className='footer-span'>Liên hệ</span>

                <BsPersonFillExclamation className='footer-icon'></BsPersonFillExclamation>
                <span className='footer-span'>Hỗ trợ khách hàng</span>

                <BsHeadphones className='footer-icon'></BsHeadphones>
                <span className='footer-span'>Chăm sóc khách hàng</span>
                </div>

            </div>
        </div>
    )
}

export default Footer