import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../../../components/productCard';

const InfiniteScroll = () => {
  // //5줄씩 load
  // const [products, setProducts] = useState([
  //   { id: 1, name: '상품 1', price: 10000 },
  //   { id: 2, name: '상품 2', price: 20000 },
  //   // 추가 상품 데이터...
  // ]);

  // return (
  //   <div
  //     style={{
  //       display: 'grid',
  //       gridTemplateColumns: 'repeat(4, 1fr)',
  //       gap: '16px',
  //     }}
  //   >
  //     {products.map((product) => (
  //       <ProductCard
  //         key={product.id}
  //         name={product.name}
  //         price={product.price}
  //       />
  //     ))}
  //   </div>
  // );
  return <h1>힘들다다</h1>;
};

export default InfiniteScroll;
