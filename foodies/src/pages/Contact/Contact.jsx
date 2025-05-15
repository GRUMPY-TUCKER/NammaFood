import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
  <>
    <div className="container contact-container py-5">
      <h1 className="text-center mb-4">Get In Touch<i class="bi bi-arrow-down-circle-fill"></i></h1>
      <p className="text-center mb-5">
        If you have any questions or feedback, feel free to reach out! We'd love to hear from you<i class="bi bi-balloon-heart-fill"></i>.
      </p>
      <div className="row">
        {/* Map Section */}
        <div className="col-md-6 mb-4">
          <div className="map-container shadow rounded">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d230.43981191831438!2d88.37787393517019!3d22.465244200686755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1745736468264!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 2 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-md-6">
          <form className="contact-form shadow p-4 rounded">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
    <div class="card mt-4 border-0 mb-4">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <div class="card-body d-flex align-items-center c-detail pl-0">
            <div class="mr-3 align-self-center">
              <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"/>
            </div>
            <div class="">
              <h6 class="font-weight-medium">Address</h6>
              <p class="">130B Raja SC Mullick Road Garia, Kolkata 700047
                <br/>Sonar Bangla Market Complex</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="card-body d-flex align-items-center c-detail">
            <div class="mr-3 align-self-center">
              <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"/>
            </div>
            <div class="">
              <h6 class="font-weight-medium">Phone</h6>
              <p class="">8335974336
                <br/>8013881472</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="card-body d-flex align-items-center c-detail">
            <div class="mr-3 align-self-center">
              <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"/>
            </div>
            <div class="">
              <h6 class="font-weight-medium">Email</h6>
              <p class="">
                nammafoodgariakolkata@gmail.com
                <br/> rsadhukhan859@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
};

export default Contact;