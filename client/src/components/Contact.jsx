import React from "react";
import "./contact.css"

function Contact() {
  const onSubmit = () =>{
    alert("Thanx for your response")
  }
  return (
    <section>
      <div className="listing-hero">
        <div className="hero-heading">
          <div className="hero-large">Contact Us</div>
        </div>
      </div>

      <div className="container-contact">
        <div className="wrap-contact">
          <form name="contact" className="contact-form validate-form">
            <div
              className="wrap-input validate-input"
              data-validate="Please enter your name"
            >
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
            </div>

            <div
              className="wrap-input validate-input"
              data-validate="Please enter your email"
            >
              <input
                className="input"
                type="text"
                name="email"
                placeholder="E-mail"
                required
              />
            </div>

            <div
              className="wrap-input validate-input"
              data-validate="Please enter your message"
            >
              <textarea
                className="input"
                type="text"
                name="message"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="container-contact-form-btn">
              <button className="contact-form-btn" onClick={() => onSubmit()}>
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
