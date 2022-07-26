import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Accordion, Container, Navbar, NavDropdown, Nav, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeInfo } from 'components/home';
export default Home;
function Home() {
    const { t } = useTranslation("common");
    const router = useRouter();
    console.log(router);
    return (

        <div className="">
            <Container className=''>
                <Row className='mt-5'>
                    <div className='d-flex flex-column m-auto col-lg-6 col-sm-12'>
                        <h1>صرافی بوستر</h1>
                        <h5>بازار خرید و فروش ارزهای دیجیتال</h5>
                        <div className='col-lg-10'>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="شماره موبایلتان را وارد کنید"
                                    aria-label="Input group example"
                                    aria-describedby="btnGroupAddon"
                                />
                                <Button>شروع</Button>

                            </InputGroup>
                            <div className='form-text2'>در کمتر از ۵ دقیقه ثبت‌نام و اولین معامله خود را شروع کنید.</div>
                        </div>
                    </div>
                    <div className='mt-5 col-lg-6 col-sm-12'>
                        <HomeInfo />
                    </div>

                </Row>
                <div>
                    2
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
                <div>
                    5
                </div>
            </Container>
        </div>
    );
}
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}