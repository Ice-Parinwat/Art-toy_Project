import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../components/DataProvider";
import ReactLoading from "react-loading";

function Arttoy() {
  const { products, loading, error, fetchData, addToCart, formatMoney } = useData();
  const [quantities, setQuantities] = useState({}); // เก็บปริมาณสินค้าแยกตาม id

  const artToyData = products.filter(
    (product) => product.category === "Art Toy"
  );

  useEffect(() => {
    if (!products.length) {
      fetchData();
    }
  }, [products, fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ReactLoading
          type="spinningBubbles"
          color="black"
          height={"10%"}
          width={"10%"}
        />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  function addTocart(product) {
    const quantity = quantities[product.id] || 1; // ใช้ค่า quantity ตาม id ของสินค้า
    if (quantity > 0) {
      const newItem = {
        ...product,
        quantity: quantity,
      };
      console.log("Adding item to cart:", newItem);
      addToCart(newItem);
    }
  }

  // เพิ่มหรือลดปริมาณสินค้า
  const increQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decreQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) - 1;
      return {
        ...prevQuantities,
        [id]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };
  // function formatMoney(money) {
  //   return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // }

  return (
    <>
      <section id="hero" className="mx-5 lg:mx-20 my-10">
        <h2 className="text-4xl font-bold mb-6 text-center mt-10">
          Art Toy Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artToyData.length > 0 ? (
            artToyData.map((arttoy) => (
              <div
                key={arttoy.id}
                className="border p-5 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold">{arttoy.name}</h3>
                <Link
                  to={`/detail/${arttoy.id}`}
                  className="text-blue-500 mt-4 inline-block hover:underline"
                >
                  <img
                    src={arttoy.image}
                    alt={arttoy.name}
                    className="w-auto h-96 object-contain my-4 justify-self-center refer-img"
                  />
                </Link>
                <p className="text-lg text-purple-600">
                  {formatMoney(arttoy.price)} ฿
                </p>
                {/* <p className="text-sm text-gray-700 mt-2">
                  {arttoy.description}
                </p> */}
                <div
                  id="btn-box"
                  className="flex flex-col justify-center gap-y-2"
                >
                  <div
                    id="quantity-box"
                    className="w-1/2 flex justify-between self-center bg-gray-50 px-4 py-2 font-medium rounded-full"
                  >
                    <button onClick={() => decreQuantity(arttoy.id)}>-</button>
                    <span>{quantities[arttoy.id] || 1}</span>
                    <button onClick={() => increQuantity(arttoy.id)}>+</button>
                  </div>
                  <button
                    className="addtocart-btn"
                    onClick={() => addTocart(arttoy)}
                  >
                    ADD TO CART
                  </button>
                  <button className="buynow-btn">BUY NOW!!</button>
                </div>
              </div>
            ))
          ) : (
            <p>No Hero products available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Arttoy;
