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
              <p>Contact</p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <BsGeoAltFill />
                </IconContext.Provider>{' '}
                63b Le Van Quy District, Ho Chi Minh
              </p>
            </li>
            <li>
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <BsFillEnvelopeFill />
                </IconContext.Provider>{' '}
                petshop@gmail.com
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
              <p>Customer Service</p>
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
              <p>
                <IconContext.Provider
                  value={{ color: 'gray', className: 'global-class-name' }}
                >
                  <FaTruck />
                </IconContext.Provider>{' '}
                Order Tracking
              </p>
            </li>
          </div>
        </div>
        <hr />
        <div className="footet_row">
          <p className="col-sm">&copy;{new Date().getFullYear()} Petshop</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
