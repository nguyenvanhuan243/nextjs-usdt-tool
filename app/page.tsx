import UsdtAddressForm from './components/UsdtAddressForm';

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          USDT Address Generator
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <UsdtAddressForm formTitle="User A Form" />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <UsdtAddressForm formTitle="User B Form" />
          </div>
        </div>
      </div>
    </main>
  );
}
