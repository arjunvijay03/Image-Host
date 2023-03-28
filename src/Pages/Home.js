import React, { useContext, useEffect, useRef, useState } from 'react'
import ImageCard from '../Components/ImageCard/ImageCard'
import NavBar from '../Components/Nav-bar/NavBar'
import { authContext } from '../Contexts/AuthContext'
import { firebaseContext } from '../Contexts/FirebaseContext'
import { arrayUnion} from "firebase/firestore";
import { imageContext } from '../Contexts/ImageContext'
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Components/Footer/Footer'
function Home() {
  // const [images, setImages] = useState()
  const [file, setFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState()
  const [imgContainerShow, setImageContainerShow] = useState(false)
  const inputRef = useRef()
  const {firebase} = useContext(firebaseContext)
  const [thumbnail, setThumbnail] = useState('')
  const {user} = useContext(authContext)
  // let docRef =  firebase.firestore().collection('users')
  // useEffect(()=>{
  //   docRef.doc(user?.uid).onSnapshot((doc) => {
  //     doc.exists && setImages(doc.data().images);
      
  //   });
  // },[user])

  const {images} = useContext(imageContext)
  const handleChange = (event)=>{
    setFile(event.target.files[0])
    let file = event.target.files[0];
              let reader = new FileReader();
              reader.onload = function () {
                setSelectedImage(reader.result);
              };
              reader.readAsDataURL(file);
  }

  // user && console.log(user.uid);
  

  function handleRemoveImage() {
    setImageContainerShow(false)
    inputRef.current.value = '';
    setSelectedImage(null)
    setFile(null);
    setThumbnail('')
  }

  const addImageHandler = ()=>{
    if (!thumbnail) {
      alert('Add thumbnail')
    }
    if (!selectedImage) {
      alert( "Select an image")
      
    }
    if (thumbnail && selectedImage) {
      console.log('hiii');
      firebase
          .storage()
          .ref(`/image/${Date.now()}`)
          .put(file)
          .then((res) => {
            res.ref.getDownloadURL().then((url)=>{
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .update({
                  images:arrayUnion({
                    URL:url,
                    tumbnail : thumbnail,
                    id:uuidv4()
                  })
                })
            })
          })
      
          handleRemoveImage()

    }
  }
  
  
    return (
    <div className='homeContainer'>
      <NavBar></NavBar>
      <div className="imageWrapper">
       {images?.map((image)=>{
       return <ImageCard image={image}></ImageCard>
       }) }
        
      </div>


      <Footer></Footer>
     {imgContainerShow && <div className="addImageWrapper">
        <div className="addImageContainer">
          <h4>Add Image</h4>
          <div className='imageShow'>
          {selectedImage &&  <img width={100} height={100} src={selectedImage} alt="" />}
          </div>
          <form className='addImageForm' action="">
            <label className='imageInputLabel' htmlFor="imgFileInput"><i className="fa-solid fa-cloud-arrow-up"></i> Add image</label>
            <input onChange={handleChange} ref={inputRef} id='imgFileInput' style={{display:'none'}} type="file" />
            <div className='addImageForm'>
            <label htmlFor="">Add thumbnail</label>
            <textarea onChange={(event)=>{
              setThumbnail(event.target.value)
            }} value={thumbnail} cols="30" rows="5" placeholder='Add thumbnail'> </textarea>
            </div>
          </form>
          <div className="addImgBtns">
            <button onClick={handleRemoveImage} className="cancelBtn"> cancel</button>
            <button onClick={addImageHandler} className="addBtn">Add Image</button>
          </div>

        </div>
      </div>}


      <div className="addimageButton" onClick={()=>setImageContainerShow(true)}>
        <i className="fa-solid fa-plus"></i> Add
      </div>

    </div>
  )
}

export default Home
