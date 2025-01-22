'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';

interface CartItem {
  _id: number; // Changed id to _id
  name: string;
  description: string;
  price: number; // Price is now assumed to be in USD
  quantity: number;
  image: string;
}

const Checkout = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    city: '',
    province: '',
    zip: '',
    phone: '',
    email: '',
    additionalInfo: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);  // State to track if the order was placed

  useEffect(() => {
    // Retrieve the cart data from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      // Calculate the total price dynamically (in USD)
      const totalAmount = parsedCart.reduce((acc: number, item: CartItem) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotal(totalAmount);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform validation here if needed
    console.log(formData);
    setOrderPlaced(true);  // Set orderPlaced to true when the form is submitted
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white">
      <Header />
      
      <div className="text-center">
        <Image
          src="/checkout.png"
          alt="Checkout"
          width={1440}
          height={316}
          className="w-full"
        />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-6 text-center">Billing Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Bank Transfer Details (conditionally rendered) */}
          {paymentMethod === 'bankTransfer' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">Bank Details</h3>
              <div className="mt-4">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">Routing Number</label>
                <input
                  id="routingNumber"
                  name="routingNumber"
                  type="text"
                  className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  value={formData.routingNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
            <select
              id="country"
              name="country"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="UAE">UAE</option>
              <option value="Sudan">Sudan</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
              <option value="Germany">Germany</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
              <option value="South Africa">South Africa</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Egypt">Egypt</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="Russia">Russia</option>
              <option value="Brazil">Brazil</option>
              <option value="Mexico">Mexico</option>
              <option value="Turkey">Turkey</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="South Korea">South Korea</option>
              <option value="Argentina">Argentina</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
            </select>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Town / City</label>
            <input
              id="city"
              name="city"
              type="text"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
            <input
              id="province"
              name="province"
              type="text"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.province}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              id="zip"
              name="zip"
              type="text"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={formData.additionalInfo}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Select Payment Method</h3>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bankTransfer"
                  className="form-radio text-indigo-600"
                  onChange={() => setPaymentMethod('bankTransfer')}
                />
                <span className="ml-2">Bank Transfer</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  className="form-radio text-indigo-600"
                  onChange={() => setPaymentMethod('cashOnDelivery')}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button type="submit" className="mt-8 bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-500">Place Order</button>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>

          <div>
            <h4 className="font-medium text-gray-700">Items:</h4>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span> {/* Price in USD */}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span> {/* Total Price in USD */}
          </div>
        </div>
      </div>

      {/* Show notification when the order is placed */}
      {orderPlaced && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Order has been placed successfully!
        </div>
      )}

      {/* Features Section (optional) */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 text-center">Features</h3>
        <div className="flex justify-center space-x-8 mt-6">
          {[
            { title: 'Secure Payment', desc: 'Your payment information is securely processed.', src: '/secure-payment.png' },
            { title: 'Fast Shipping', desc: 'We ship your order quickly and efficiently.', src: '/fast-shipping.png' },
            { title: '24/7 Support', desc: 'We offer customer support around the clock.', src: '/support.png' },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center w-60">
              <Image src={feature.src} alt={feature.title} width={50} height={50} />
              <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
              <p className="text-sm mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
