'use client';

import { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

interface UsdtAddressFormProps {
  formTitle: string;
}

export default function UsdtAddressForm({ formTitle }: UsdtAddressFormProps) {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCreateAddress = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://demo-wallet-exchange.fiotech.org/blockchain/getNewWallet');
      setAddress(response.data.address);
    } catch (err) {
      setError('Failed to generate address. Please try again.');
      console.error('Error generating address:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">{formTitle}</h2>

      <div className="space-y-4">
        <button
          onClick={handleCreateAddress}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Generating...' : 'Create New USDT Address'}
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {address && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Your USDT Address:</p>
              <p className="text-sm font-mono break-all">{address}</p>
            </div>

            <div className="flex justify-center">
              <QRCodeSVG value={address} size={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 