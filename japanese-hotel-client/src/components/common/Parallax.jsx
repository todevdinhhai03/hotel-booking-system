import { Container } from "react-bootstrap"

const Parallax = ({ title, subTitle }) => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn">
                    <h1> {title}</h1>
                    <h2>{subTitle}</h2>
                </div>
            </Container>
        </div>
    )
}

export default Parallax