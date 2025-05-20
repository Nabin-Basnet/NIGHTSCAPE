import React from 'react'
import { useParams } from 'react-router-dom'

const SinglePageProduct = () => {
    // const { id } = useParams(); destructuring
    const params = useParams();
    console.log(params);
  return (
    <div>
      Single page Product for product id: {params.id}
    </div>
  )
}

export default SinglePageProduct
