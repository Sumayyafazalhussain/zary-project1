import React from "react";
import { useCart } from "../components/contexts/CartContext"

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={clearCart}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};
