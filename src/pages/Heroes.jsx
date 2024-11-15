import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataProvider";
import ReactLoading from "react-loading";

const Hero = () => {
  const { products, loading, error, fetchData, addToCart, formatMoney } =
    useData();
  const [quantities, setQuantities] = useState({}); // เก็บปริมาณสินค้าแยกตาม id

  const heroData = products.filter((product) => product.category === "Hero");

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
      addToCart(newItem);
      setQuantities({});
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

  return (
    <section id="hero" className="mx-5 lg:mx-20">
      <h2 className="text-4xl font-bold mb-6 text-center mt-10">
        Hero Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heroData.length > 0 ? (
          heroData.map((hero) => (
            <div
              key={hero.id}
              className="border p-6 rounded-lg shadow-md text-center"
            >
              <Link
                to={`/detail/${hero.id}`}
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-auto h-96 object-contain my-4 justify-self-center refer-img"
                />
              </Link>
              <div className="flex justify-between items-center my-4">
                <p className="text-xl text-purple-600">
                  {formatMoney(hero.price)} ฿
                </p>

                <div
                  id="quantity-box"
                  className="w-1/2 flex justify-between self-center bg-gray-50 px-4 py-2 font-medium rounded-full"
                >
                  <button onClick={() => decreQuantity(hero.id)}>-</button>
                  <span>{quantities[hero.id] || 1}</span>{" "}
                  {/* ใช้ quantity ตาม hero.id */}
                  <button onClick={() => increQuantity(hero.id)}>+</button>
                </div>
              </div>

              <div
                id="btn-box"
                className="flex flex-col justify-center gap-y-2"
              >
                <button
                  className="addtocart-btn"
                  onClick={() => addTocart(hero)}
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
  );
};

export default Hero;
