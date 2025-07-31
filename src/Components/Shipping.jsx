import React from 'react'

const Shipping = () => {

  const data = JSON.parse(localStorage.getItem("details"))


  return (
    <div>
      {data.email}
    </div>
  )
}

export default Shipping