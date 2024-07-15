import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 bottom-0  w-100 text-center">
      <div className="container px-5">
        <div className="text-white-50 small">
          <div className="mb-2">&copy; Your Website 2023. All Rights Reserved.</div>
          <a href="#!" className="text-white">Privacy</a>
          <span className="mx-1 text-white">&middot;</span>
          <a href="#!" className="text-white">Terms</a>
          <span className="mx-1 text-white">&middot;</span>
          <a href="#!" className="text-white">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
