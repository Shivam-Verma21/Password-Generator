// LEARN useEffect, useRef, useCallback with this project

import { useState, useCallback, useEffect,useRef } from "react";
import "./App.css"

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str = str + "0123456789";
    if (character) str = str + "!@#$%^&*-_=+|:'.?.,";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(index);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  // passwordGenerator();     // TOO MANY RE-RENDERS

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  function passwordCopy(){
    // navigator.clipboard.writeText(password);

    passwordRef.current?.select();  //selects the password while copying
    // passwordRef.current?.setSelectionRange(0, 20);

    window.navigator.clipboard.writeText(password).then(()=>{
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    })

    // if (Notification.permission === 'granted') {
    //   new Notification("Password copied to clipboard!!");
    // } else if (Notification.permission !== 'denied') {
    //   Notification.requestPermission().then(permission => {
    //     if (permission === 'granted') {
    //       new Notification("Password copied to clipboard!!");
    //     }
    //   });
    // }
    
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20 bg-gray-800 text-white">
      <h1 className="text-white text-center my-3 text-2xl">
        Password Generator
      </h1>

      {/* Notification message */}
      {isCopied && (
        <div className="text-center mb-4 text-green-500">
          Password copied to clipboard!
        </div>
      )}

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 copy-button"
          onClick={passwordCopy}
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1 ml-2">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            className="cursor-pointer"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="cursor-pointer">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-x-1 ml-2">
          <input
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            className="cursor-pointer"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="cursor-pointer">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
