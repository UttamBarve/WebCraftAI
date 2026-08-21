import React from "react";

const Footer = () => {
  return (
    <footer className='border-t border-white/10 py-5 text-center text-sm text-zinc-500'>
      <p>Devloped by Uttam Barve</p>
      <div>&copy;WebCraft AI {new Date().getFullYear()} </div>
    </footer>
  );
};

export default Footer;
