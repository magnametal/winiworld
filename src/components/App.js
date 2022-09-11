import React, { useEffect, useState } from 'react'
import '../assets/css/App.css'
const { ipcRenderer } = require("electron");
import { Routes, Route, HashRouter, Link } from 'react-router-dom';
import { MainProvider, useMainContext } from "./context/mainContext";
import Home from "./Home"
const styles = {
  main:{
    margin: 0,
    padding: 0,
  }
}
function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
function externalApp() {
  return (
    <MainProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </MainProvider>
  );
}
function App() {
  const contexto = useMainContext();
  const { theme, profile } = contexto;
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default externalApp;
