import UsdtAddressForm from './components/UsdtAddressForm';
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <main className="min-h-screen bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h1 className="display-5 fw-bold text-primary">USDT Blockchain Wallet BSC</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="mb-4">
            <UsdtAddressForm formTitle="Your usdt address" />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
