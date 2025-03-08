'use client';

import { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UsdtAddressFormProps {
  formTitle: string;
}

const TABS = {
  VIEW: 'view',
  SEND: 'send',
  RECEIVE: 'receive',
  NULL: 'null',
} as const;

type TabType = typeof TABS[keyof typeof TABS];

export default function UsdtAddressForm({ formTitle }: UsdtAddressFormProps) {
  const [error, setError]           = useState<string>('');
  const [copied, setCopied]         = useState<boolean>(false);
  const [address, setAddress]       = useState<string>('');
  const [loading, setLoading]       = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabType>(TABS.NULL);

  const renderUsdtLogo = () => {
    return (
      <img
        src="https://cryptologos.cc/logos/tether-usdt-logo.png"
        alt="USDT"
        width="32"
        height="32"
      />
    );
  };

  const viewUSDTAddress = () => {
    return (
      <>
        {/* Balance Display */}
        <Form.Group className="mb-4">
          <Form.Label>Current Balance</Form.Label>
          <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0">0.00 USDT</h3>
                <small className="text-muted">≈ $0.00 USD</small>
              </div>
              <div className="bg-light rounded-circle p-2">
                {renderUsdtLogo()}
              </div>
            </div>
          </div>
        </Form.Group>

        {/* Address Display */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex justify-content-between">
            <span>Your USDT Address</span>
            <span className="text-muted">BSC Network</span>
          </Form.Label>
          <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-break text-monospace">{address}</div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleCopyAddress}
                className="ms-2 d-flex align-items-center"
              >
                <i className="bi bi-clipboard me-1"></i>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </Form.Group>

        {/* QR Code with better styling */}
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            <div className="border rounded p-4 bg-light">
              <QRCodeSVG
                value={address}
                size={192}
                level="H"
                includeMargin={true}
                className="bg-white p-2"
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="bg-white rounded-circle p-2 shadow-sm">
                  {renderUsdtLogo()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex justify-content-between">
            <span>Recent Transactions</span>
            <Button variant="link" className="p-0 text-primary">View All</Button>
          </Form.Label>
          <div className="border rounded">
            <div className="p-3 text-center text-muted">
              <i className="bi bi-clock-history d-block mb-2 fs-4"></i>
              No transactions yet
            </div>
          </div>
        </Form.Group>

        {/* Network Information */}
        <Alert variant="info" className="mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-info-circle me-2"></i>
            <div>
              <strong>Network Information</strong>
              <p className="mb-0 small">
                This address is on the BSC (BNB Smart Chain) network. Only send USDT (BEP20) to this address.
              </p>
            </div>
          </div>
        </Alert>

        {/* Warning Notice */}
        <Alert variant="warning">
          <div className="d-flex align-items-start">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <div>
              <strong>Important Notice</strong>
              <ul className="mb-0 mt-1 small">
                <li>Only send USDT (BEP20) to this address</li>
                <li>Minimum deposit amount is <strong>0.1 USDT</strong></li>
                <li>Deposits below minimum amount cannot be refunded</li>
                <li>Make sure you&apos;re on the correct network (BSC)</li>
              </ul>
            </div>
          </div>
        </Alert>
      </>
    );
  };

  const renderReceiveUSDTAddress = () => {
    return (
      <>
        {/* Address Display */}
        < Form.Group className="mb-4" >
          <Form.Label>
            Deposit Address <span className="text-danger">*</span>
          </Form.Label>
          <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-break">{address}</div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleCopyAddress}
                className="ms-2"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </Form.Group >

        {/* QR Code */}
        < div className="text-center mb-4" >
          <div className="position-relative d-inline-block">
            <QRCodeSVG
              value={address}
              size={192}
              level="L"
              includeMargin={false}
            />
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="bg-white rounded-circle p-2 shadow-sm">
                {renderUsdtLogo()}
              </div>
            </div>
          </div>
        </div >

        {/* Minimum Deposit */}
        < div className="d-flex justify-content-between mb-4" >
          <span className="text-muted">Minimum Deposit</span>
          <strong>0.1 USDT</strong>
        </div >

        {/* Notice */}
        < Alert variant="warning" >
          <strong>Notice</strong>
          <ul className="mb-0 mt-2">
            <li>
              Minimum deposit amount is <strong>0.1 USDT</strong>. Deposits below
              this amount will not be credited and cannot be refunded.
            </li>
          </ul>
        </Alert >
      </>
    );
  }

  const renderSendUSDTAddress = () => {
    return (
      <>
        {/* Available Balance */}
        <Form.Group className="mb-4">
          <Form.Label>Available Balance</Form.Label>
          <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0">0.00 USDT</h3>
                <small className="text-muted">≈ $0.00 USD</small>
              </div>
              <div className="bg-light rounded-circle p-2">
                {renderUsdtLogo()}
              </div>
            </div>
          </div>
        </Form.Group>

        {/* Recipient Address */}
        <Form.Group className="mb-4">
          <Form.Label>
            Recipient Address <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter USDT (BEP20) address"
            className="mb-2"
          />
          <Form.Text className="text-muted">
            Make sure the address is on BSC (BNB Smart Chain) network
          </Form.Text>
        </Form.Group>

        {/* Amount */}
        <Form.Group className="mb-4">
          <Form.Label>
            Amount <span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative">
            <Form.Control
              type="number"
              placeholder="0.00"
              min="0.1"
              step="0.1"
            />
            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
              USDT
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <Form.Text className="text-muted">
              ≈ $0.00 USD
            </Form.Text>
            <Form.Text>
              Available: 0.00 USDT
            </Form.Text>
          </div>
        </Form.Group>

        {/* Network Fee */}
        <Form.Group className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">Network Fee</Form.Label>
            <span className="text-muted">0.001 BNB</span>
          </div>
          <Form.Text className="text-muted d-block">
            Transaction fee on BSC network
          </Form.Text>
        </Form.Group>

        {/* Summary */}
        <div className="border rounded p-3 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Amount</span>
            <span>0.00 USDT</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Network Fee</span>
            <span>0.001 BNB</span>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between">
            <span>Total</span>
            <strong>0.00 USDT + 0.001 BNB</strong>
          </div>
        </div>

        {/* Send Button */}
        <Button
          variant="primary"
          className="w-100 mb-4"
          disabled={true} // Enable when form is valid
        >
          Send USDT
        </Button>

        {/* Notices */}
        <Alert variant="warning">
          <div className="d-flex align-items-start">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <div>
              <strong>Important</strong>
              <ul className="mb-0 mt-1 small">
                <li>Minimum send amount is <strong>0.1 USDT</strong></li>
                <li>Make sure the recipient address is correct</li>
                <li>Transactions cannot be reversed</li>
                <li>You need BNB in your wallet for network fees</li>
              </ul>
            </div>
          </div>
        </Alert>
      </>
    );
  };
  
  const renderTabButtons = () => {
    if (address === '') {
      return null;
    }
    return (
      < Row className="gx-2 mb-4" >
        <Col xs={4}>
          <Button
            variant={currentTab === TABS.VIEW ? 'primary' : 'light'}
            onClick={() => setCurrentTab(TABS.VIEW)}
            disabled={loading}
            className="w-100"
          >
            View Address
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant={currentTab === TABS.SEND ? 'primary' : 'light'}
            onClick={() => setCurrentTab(TABS.SEND)}
            disabled={loading}
            className="w-100"
          >
            Send USDT
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant={currentTab === TABS.RECEIVE ? 'primary' : 'light'}
            onClick={() => setCurrentTab(TABS.RECEIVE)}
            disabled={loading}
            className="w-100"
          >
            Receive USDT
          </Button>
        </Col>
      </Row >
    )
  }

  const renderCurrentForm = () => {
    switch (currentTab) {
      case TABS.VIEW:
        return viewUSDTAddress();
      case TABS.SEND:
        return renderSendUSDTAddress();
      case TABS.RECEIVE:
        return renderReceiveUSDTAddress();
      default:
        return null;
    }
  };

  const handleCreateAddress = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blockchain/getNewWallet`);
      setAddress(response.data.address);
      toast.success('New address generated successfully!');
    } catch (err) {
      setError('Failed to generate address. Please try again.');
      console.error('Error generating address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">{formTitle}</h5>
      </Card.Header>
      <Card.Body>
        {/* Network Selection */}
        <Form.Group className="mb-4">
          <Form.Label>Network</Form.Label>
          <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>BSC</strong>
                <span className="text-muted ms-2">BNB Smart Chain (BEP20)</span>
              </div>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </Form.Group>

        {
          renderTabButtons()
        }

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {address ? (
          <>
            {
              renderCurrentForm()
            }
          </>
        ) : <Button
          variant="light"
          onClick={handleCreateAddress}
          disabled={loading}
          className="w-100"
        >
          Create New Address
        </Button>}
      </Card.Body>
      <ToastContainer position="top-right" autoClose={3000} />
    </Card>
  );
} 