import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__signature">Developed by Drew Woods</p>
      <p className="footer__copyright">{currentYear}</p>
    </footer>
  );
}

export default Footer;
