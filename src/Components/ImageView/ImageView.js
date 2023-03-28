import React, { useContext, useEffect, useState } from "react";
import "./ImageView.css";
import { useParams } from "react-router-dom";
import { imageContext } from "../../Contexts/ImageContext";
function ImageView() {
  const { imageId } = useParams();
  const { images } = useContext(imageContext);
  const [image, setImage] = useState();
  useEffect(() => {
    setImage(() => images?.find((item) => item.id == imageId));
  }, [images, imageId]);
  return (
    <div className="imageViewwapper">
      <div className="imgviewcontainer">
        <img src={image?.URL} alt="" />
      </div>
      <div className="imagDiscriptionContainer">
        <p>{image?.tumbnail}</p>
      </div>
    </div>
  );
}

export default ImageView;
