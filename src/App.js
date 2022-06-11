import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { app, database } from "./firebaseConfig";

//for add and access db

import { collection, addDoc, getDocs } from "firebase/firestore";

//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App() {
  const [data, setData] = useState({});
  const collectionRef = collection(database, "users");

  //Authentication
  let auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    // signInWithEmailAndPassword(auth, data.email, data.password)
    //   .then((res) => {
    //     console.log(res.user);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
    //using google sign in
    /*signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });*/
    //
    //database connection

    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        alert("data added");
      })
      .catch((err) => alert(err.message));
  };

  //read data from db
  const getData = () => {
    getDocs(collectionRef).then((res) => {
      console.log(
        res.docs.map((item) => {
          return item.data();
        })
      );
    });
  };
  return (
    <div className="App">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        onChange={(e) => handleInput(e)}
      />
      <br />
      <button onClick={getData}>Submit </button>
    </div>
  );
}

export default App;
