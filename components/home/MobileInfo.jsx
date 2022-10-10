import { Col } from "react-bootstrap"
import Image from 'next/image';
import phoneImage from '../../assets/mobile_home.png'
import mobileFrame from '../../assets/mobile_frame.png'
import mobileBody from '../../assets/mobile_body.jpg'
function HomeInfo(params) {
    return (

            <div className="d-flex justify-content-center">
                <div className="mobile-frame-right">
                    <Image src={mobileFrame} alt='...' width="300rem" height="600rem" />
                    <div className="mobile-body-right ">
                        <Image src={mobileBody} alt="trade_image" />
                    </div>
                </div>
                <div className="mobile-frame-left">
                    <Image src={mobileFrame} alt='...' width="300rem" height="600rem" />
                    <div className="mobile-body-left d-flex justify-content-center">
                        <h1>
                            صرافی بوستر
                        </h1>
                    </div>
                </div>
            </div>
    )
}
export { HomeInfo }