import React, { useContext, useState, useRef } from "react";

import { GlobalContext } from "../App";
import { motion } from "framer-motion";
import { variantsPages } from "../Variants/variantsPages";

import { useFetchImageCB, useFetchCB } from "../hooks/useFetcher";

const Inicio = () => {
  const data = useContext(GlobalContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const imageInput = useRef(null);

  const bodyFetch = useRef(undefined);

  const [conditionalCreatePost, setConditionalCreatePost] = useState(false);
  const [conditionalGetPosts, setConditionalGetPosts] = useState(true);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  // const imagePrevisualizacion = useRef(null);

  useFetchImageCB(
    `${process.env.REACT_APP_API_URL}/posts/create-post`,
    "POST",
    conditionalCreatePost,
    (data) => {
      setConditionalCreatePost(false);
      callbackCreatePost(data);
    },
    setLoading,
    bodyFetch.current
  );

  useFetchCB(
    `${process.env.REACT_APP_API_URL}/posts/get-posts`,
    "GET",
    conditionalGetPosts,
    (data) => {
      setConditionalGetPosts(false);
      callbackGetPosts(data);
    },
    setLoading
  );

  const callbackCreatePost = (data) => {
    console.log(data);
    setConditionalGetPosts(true);
  };

  const callbackGetPosts = (data) => {
    setPosts(data.posts);
  };

  const crearPost = () => {
    var formData = new FormData();
    formData.append("image", imageInput.current.files[0]);
    formData.append("title", titulo);
    formData.append("description", descripcion);

    bodyFetch.current = formData;
    setConditionalCreatePost(true);
  };

  return (
    <motion.div
      className="home"
      variants={variantsPages}
      exit="exit"
      animate="visible"
      initial="hidden"
    >
      <h1>HyperText</h1>
      <span>
        {data.globalData?.auth ? (
          <div style={{ textAlign: "center" }}>
            Bienvenid@, {data.globalData?.user.username}
            <div>Titulo del post</div>
            <input
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
              style={{ border: "1px solid #000" }}
              type="text"
            />
            <div>Descripción</div>
            <input
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              style={{ border: "1px solid #000" }}
              type="text"
            />
            <div>Imagen</div>
            <input ref={imageInput} type="file" name="image" id="" />
            <br />
            <button onClick={crearPost}>Crear post</button>
            <h2 style={{ marginTop: "50px", marginBottom: "50px" }}>POSTS</h2>
            <div className="home__posts">
            {posts.map((post, index) => {
              return (
                <div key={index} className="home__post">
                  <h4>{post.username}</h4>
                  <h5>{post.title}</h5>
                  <p>{post.description}</p>
                  <br />
                  <img src={post.image} alt="" />
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            Inicia sesión para usar HyperText
          </div>
        )}
      </span>
    </motion.div>
  );
};
export default Inicio;
