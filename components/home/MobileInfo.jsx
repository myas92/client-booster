import { Col } from "react-bootstrap"
import Image from 'next/image';
import phoneImage from '../../assets/mobile_home.png'
import mobileFrame from '../../assets/mobile_frame.png'
function HomeInfo(params) {
    return (
        <div className="mobile-frame">
                <Image src={mobileFrame} alt='...' width="300rem" height="600rem" />
                <div className="mobile-body">
                    aasdasdasd
                </div>

        </div>
    )
}

export { HomeInfo }