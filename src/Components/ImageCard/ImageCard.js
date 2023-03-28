import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './ImageCard.css'
function ImageCard({image}) {
  const navigate = useNavigate()
  console.log(image);
  return (
    <Link to={`/imageview/${image.id}`}>
    <div className='imageContainer'  >
      <img className='image' src={image.URL} alt="" />
    </div>
    </Link>
    
  )
//   style={{background:`url(https://images.unsplash.com/photo-1679896230078-b99bd7305d3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=393&q=80) no-repeat center center/cover`}}
}

export default ImageCard
