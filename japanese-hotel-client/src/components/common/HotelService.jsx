import { Card, Col, Row } from "react-bootstrap"
import Header from "./Header"
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa"

const HotelService = () => {
    return (
        <>
            <div className="mb-2">
                <Header title={"当社のサービス"} />

                <Row className="mt-4">
                    <h4 className="text-center">
                        <span className="hotel-color">ジャパンホテル </span>
                        <span className="gap-2">
                            <FaClock className="ml-5" /> 24時間サービス
                        </span>
                    </h4>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> WiFi
                                </Card.Title>
                                <Card.Text>Free 4G/5G インターネットアクセス</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaUtensils /> 朝食
                                </Card.Title>
                                <Card.Text>おいしい朝食ビュッフェ</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt /> ランドリー
                                </Card.Title>
                                <Card.Text>ドライクリーニング ・ クリーン</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail /> ミニバー
                                </Card.Title>
                                <Card.Text>ミニバーでドリンクや軽食をお楽しみください</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking /> 駐車場
                                </Card.Title>
                                <Card.Text>ホテル敷地内の駐車場をご利用いただけます</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaSnowflake /> エアコン
                                </Card.Title>
                                <Card.Text>いつも涼しく快適</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <hr />
        </>
    )
}

export default HotelService