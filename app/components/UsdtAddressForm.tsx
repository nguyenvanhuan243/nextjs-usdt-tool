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

export default function UsdtAddressForm({ formTitle }: UsdtAddressFormProps) {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('');

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

  const renderCurrentForm = () => {
    if (currentTab === 'create') {
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
    if (currentTab === 'send') {
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
    if (currentTab === 'receive') {
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

        {/* Create Address Button */}
        <Row className="gx-2 mb-4">
          <Col xs={4}>
            <Button
              variant={currentTab === 'create' ? 'primary' : 'light'}
              onClick={() => setCurrentTab('create')}
              disabled={loading}
              className="w-100"
            >
              {loading ? 'Generating...' : 'View Address'}
            </Button>
          </Col>
          <Col xs={4}>
            <Button
              variant={currentTab === 'send' ? 'primary' : 'light'}
              onClick={() => setCurrentTab('send')}
              disabled={loading}
              className="w-100"
            >
              Send USDT
            </Button>
          </Col>
          <Col xs={4}>
            <Button
              variant={currentTab === 'receive' ? 'primary' : 'light'}
              onClick={() => setCurrentTab('receive')}
              disabled={loading}
              className="w-100"
            >
              Receive USDT
            </Button>
          </Col>
        </Row>

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
          variant={currentTab === 'send' ? 'primary' : 'light'}
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