import React, { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import CartItem from "../cart/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeItem, removeAllItem, updateQuantity, getItems, token, calculateTotal } =
    useData(); // ดึง calculateTotal
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // เมื่อ checkbox "Select All" ถูกเช็ค, เลือกรายการทั้งหมด
      const selected = Object.keys(cart);  // เก็บ ID ของทุกๆ รายการใน cart
      setSelectedItems(selected);  // อัปเดต selectedItems ให้เลือกทั้งหมด
    } else {
      // เมื่อ checkbox "Select All" ถูกยกเลิก, รีเซ็ต selectedItems
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const isChecked = (id) => selectedItems.includes(id);

  useEffect(() => {
    getItems();
  }, []);

  // คำนวณยอดรวมทั้งหมดใน Cart.js
  const { total } = calculateTotal(); // ดึงข้อมูลยอดรวมจาก calculateTotal

  return (
    <section className="mt-3 antialiased lg:flex lg:justify-center mx-auto ">
      <div className="max-w-screen-xl lg:w-2/4 px-4 2xl:px-0 space-y-2 lg:mr-2 mb-10">
        <div className="w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <h2 className="flex justify-center items-center my-5 lg:my-8 font-bold text-3xl text-shadow">
            MY CART
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center rounded-lg border py-2 px-4 border-gray-200 bg-white shadow-md">
              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className=""
                />
              </div> */}
                <h1 className="font-semibold ml-2">Delete All</h1>
              <i
                className="fa-solid fa-trash hover:text-red-700 text-red-500 cursor-pointer"
                onClick={removeAllItem}
              ></i>
            </div>
            {Object.values(cart).length > 0 ? (
              Object.entries(cart).map(([id, item]) =>
                item ? (
                  <CartItem
                    key={id}
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                    isChecked={isChecked(id)}
                    onSelectItem={() => handleSelectItem(id)}
                    productId={id}
                  />
                ) : null
              )
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-4xl lg:max-w-80 flex-1 space-y-4 lg:mt-[6.25rem] lg:sticky">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 ">
          <p className="text-xl font-semibold text-gray-900">Order summary</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ฿{total && total > 0 ? total.toFixed(2) : "0.00"}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Shipping Fee
                </dt>
                <dd className="text-base font-medium text-gray-900">฿ 0</dd>
              </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-green-600">
                ฿
                {total && !isNaN(total) && total > 0
                  ? total.toFixed(2)
                  : "0.00"}
              </dd>
            </dl>
          </div>
          <Link to="/checkout">
            <button className="w-full rounded-lg bg-[#5BDEE7] px-5 py-2.5 text-lg font-semibold text-white lg:hover:bg-[#3ef2ff]">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
