import React from 'react'

export default function Loading() {
  return (
    <div className="absolute w-full h-full top-[80%] left-[50%]">
        <div className="loading-container">
          <div className="loading mt-5 "></div>
        </div>
        <div className="loading-container">
          <div className="loading mt-5 "></div>
        </div>
        <div className="loading-container">
          <div className="loading mt-5 "></div>
        </div>
      </div>
  )
}
