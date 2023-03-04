import React from 'react';
import { IconContext } from 'react-icons';
import {
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
  BsGeoAltFill,
} from 'react-icons/bs';
import { FaHotjar, FaTruck } from 'react-icons/fa';
import './footer.css';
function Footer() {
  return (
    <div className="main-footer">
      <div className="footer_container">
        <div className="footet_row">
          {/* Column1 */}
          <div className="col1">
            <li className="TieuDe">
              <p>Liên Hệ</p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <BsGeoAltFill />
                </IconContext.Provider>{' '}
                63b Lê Văn Qưới, hcm
              </p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <BsFillEnvelopeFill />
                </IconContext.Provider>{' '}
                thepuzzleshop@gmail.com
              </p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <BsFillTelephoneFill />
                </IconContext.Provider>{' '}
                0345168298
              </p>
            </li>
          </div>

          {/* Column2 */}
          <div className="col2">
            <li className="TieuDe">
              <p>HỖ TRỢ KHÁCH HÀNG</p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <FaHotjar />
                </IconContext.Provider>{' '}
                Hotline: 1900-6035
              </p>
            </li>
            <li>
              <p>(1000đ/phút , 8-21h kể cả T7, CN)</p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <FaTruck />
                </IconContext.Provider>{' '}
                Vận chuyển và Đổi trả hàng
              </p>
            </li>
          </div>
        </div>
        <hr />
        <div className="footet_row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} thepuzzleshop
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
