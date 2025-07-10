import axios from "axios";
import api from "../../api.js";
import { RedirectToSignIn,RedirectToSignUp, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import Ask from "./Ask.jsx"
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [redirect,setRedirect]=useState(false);
  const { getToken } = useAuth();
  const [data, setData] = useState({
    title: "",
    q_desc: "",
  });
  const addQs = async () => {
    const token = await getToken();
    console.log(token);
    console.log(data.title);
   try{
    if (data.title != "" || data.q_desc != "") {
      const res = await api.post("/questions/add", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      navigate("/discuss");
    }
   }catch(err){
    console.log("User not signed in");
    setRedirect(true);
   }
  };
  function handleSubmit(event) {
    event.preventDefault();
    addQs();
  }
  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  return (
    <>
    
      <div className="flex flex-col justify-center items-center">
        <StyledWrapper>
          <form className="form " onSubmit={handleSubmit}>
            <p className="title">Ask A Question</p>
            <p className="message">Get a Solution for all your questions. </p>
            <label>
              <input
                name="title"
                required
                type="text"
                className="input "
                onChange={handleInput}
              />
              <span>Title</span>
            </label>
            <label>
              <textarea
                name="q_desc"
                required
                type="text"
                className="input resize-none"
                onChange={handleInput}
              ></textarea>
              <span>Question Description</span>
            </label>

            <button className="submit" >
              Submit
            </button>
          </form>
        </StyledWrapper>
        {redirect && <RedirectToSignIn/>}
       
      </div>
    </>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    justify-content-center;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 46px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input+ span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Add;
