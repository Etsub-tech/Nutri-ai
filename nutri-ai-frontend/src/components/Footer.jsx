import "../style/page.css"; 
function Footer() {
  return (
    <footer>
      <div className="very-bottom">
        <div>
          <img
            className="saladImg"
            src="/pics/Screenshot 2025-11-16 004429.png"
            alt="NutriAI Logo"
          />
          <h2>NutriAI</h2>
          <p>
            Your personal AI nutrition assistant helping you achieve your goals
            with smart meal planning.
          </p>
        </div>

        <div>
          <h2>Contact Us</h2>
          <p>etsubamha4@gmail.com</p>
          <p>+251-910-287-10</p>
        </div>
      </div>

      <hr
        style={{
          height: "1px",
          border: "none",
          backgroundColor: "white",
          margin: "50px 0",
        }}
      />

      <div style={{ textAlign: "center" }}>
        © 2025 NutriAI. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
}

export default Footer;
