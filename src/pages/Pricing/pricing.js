import React from "react";
import { assets } from "../../assets/assets";
import Questions from '../../components/sections/questions/questions';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBTypography,
    MDBIcon,
    MDBCardTitle,
} from "mdb-react-ui-kit";

export default function App() {
    return (
        
        <div className='container-fluid  mt-5'>
           {/* hero */}
      <div className="about-us-hero-banner-pricing ">
        <div className="overlay"></div> {/* Add overlay */}
        <div className="text-container">
          <h1>BECOME A DRIVER</h1>
          {/* <p>
            The Nthome Ride aims to address safety and affordability challenges.
          </p> */}
        </div>
      </div>
      {/* endv of hero */}

            {/* Provided code */}
            <div className='container py-5 mt-5 mb-5'>
            

                {/* Additional sections */}
                
      <section className="feature section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ml-auto justify-content-center">
              {/* Feature Mockup */}
              <div className="image-content" data-aos="fade-right">
                <img className="img-fluid" src={assets.img2} alt="iphone" />
              </div>
            </div>
            <div className="col-lg-6 mr-auto align-self-center">
              <div className="feature-content">
                {/* Feature Title */}
                <h2>
                  WHY DRIVE WITH NTHOMERIDEZ?

                </h2>
                {/* Feature Description */}
                <p className="desc">
                  At  NthomeRidez, we value our drivers. We offer fair compensation, flexible subscription plans, and
                  prioritize safety with features like real-time tracking. With enforced working hour limits and a
                  dedicated support team, drivers can expect a balanced and secure environment to thrive in. Plus,
                  they have access to growth opportunities and rewards for their hard work and dedication.
                </p>
              </div>
              {/* Testimonial Quote */}
              <div className="testimonial">
                <p>

                </p>
                <ul className="list-inline meta">
                  <li className="list-inline-item">

                  </li>
                  <li className="list-inline-item"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="feature section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ml-auto align-self-center">
              <div className="feature-content">
                {/* Feature Title */}
                <h2>
                  SECURITY
                </h2>
                {/* Feature Description */}
                <p>
                  NThomeRidez prioritizes safety by offering several robust security features for both drivers and
                  passengers. The app includes an in-app emergency button, allowing drivers to quickly alert
                  emergency services if they encounter a dangerous situation. Real-time GPS tracking ensures that all
                  rides are monitored, enabling the company to respond swiftly to any issues. Both drivers and
                  passengers must verify their identities through the app, adding an extra layer of security. NThome
                  Ridez also provides 24/7 customer support to address any safety concerns or incidents promptly.
                </p>
              </div>
              {/* Testimonial Quote */}

            </div>
            <div className="col-lg-6 mr-auto justify-content-center">
              {/* Feature mockup */}
              <div className="image-content" data-aos="fade-left">
                <img className="img-fluid" src={assets.img3} alt="ipad" />
              </div>
            </div>
          </div>
        </div>
      </section>
         {/* Feature Grid */}
         <section className="feature section pt-0">
        <div className="container">
          <div className="row">
          <div className="col-lg-6 mr-auto justify-content-center">
              {/* Feature mockup */}
              <div className="image-content" data-aos="fade-left">
                <img className="img-fluid" src={assets.img4} alt="ipad" />
              </div>
            </div>
            <div className="col-lg-6 ml-auto align-self-center">
              <div className="feature-content">
                {/* Feature Title */}
                <h2>
                FLEXIBLE WORKING HOUR
                </h2>
                {/* Feature Description */}
                <p>
                For working hour restriction, NthomeRidez ensures driver well-being and road safety by 
                                        implementing a maximum of 12 hours of driving per day. This policy aims to prevent driver fatigue, 
                                        promote better work-life balance, and enhance overall road safety for both drivers and passengers. 
                                        By adhering to this restriction, drivers can maintain optimal performance and deliver a safe and 
                                        reliable service to customers, while also prioritizing their health and well-being. 
                                    </p>
              </div>
              {/* Testimonial Quote */}

            </div>
           
          </div>
        </div>
      </section>
      {/* End of Feature Grid */}
      {/* <section className="section pt-0 position-relative pull-top mt-5">
                    <div className="container">
                        {/* Insert provided code here *
                        <div className="rounded shadow p-5 bg-white">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                    <i className="ti-paint-bucket text-primary h1"></i>
                                    {/* <h3 className="mt-4 text-capitalize h5">For Driver</h3> *
                                </div>
                                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                    <i className="ti-shine text-primary h1"></i>
                                    <h3 className="mt-4 text-capitalize h5">FLEXIBLE WORKING HOUR </h3>
                                    <p className="regular text-muted">
                                        For working hour restriction, NthomeRidez ensures driver well-being and road safety by 
                                        implementing a maximum of 12 hours of driving per day. This policy aims to prevent driver fatigue, 
                                        promote better work-life balance, and enhance overall road safety for both drivers and passengers. 
                                        By adhering to this restriction, drivers can maintain optimal performance and deliver a safe and 
                                        reliable service to customers, while also prioritizing their health and well-being. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
      {/* Services */}
      <section className="service section bg-gray">
        
    <div className="container-fluid p-0">
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title">
                    <h2>READY TO DRIVE WITH US? </h2>
                    <p>Subscription Plan Types:</p>
                </div>
            </div>
        </div>
        <div className="row no-gutters">
            {/* <div className="col-lg-6 align-self-center">
                <div className="service-thumb left" data-aos="fade-right">
                    <img className="img-fluid" src={assets.img2} alt="iphone-ipad" />
                </div>
            </div> */}
            <div className="col-lg-12 mr-auto align-self-center">
                <div className="service-box ">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-xs-12">
                            
                            <div className="service-item">
                                <i className="ti-bookmark icon"></i>
                                <h3>Weekly Plan </h3>
                                <p className="plan-details">Plan Name: Weekly Subscription</p>
                                <p className="plan-details">Duration: 1 week</p>
                                <p className="plan-details">Fee: 400 ZAR per week</p>
                                <p className="plan-description">
                                    Affordable weekly plan for drivers who prefer short-term commitments. Ideal for part-time drivers or those testing the platform.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="service-item">
                                <i className="ti-bar-chart icon"></i>
                                <h3>Monthly Plan </h3>
                                <p className="plan-details">Plan Name: Monthly Subscription</p>
                                <p className="plan-details">Duration: 1 month</p>
                                <p className="plan-details">Fee: 1500 ZAR per month</p>
                                <p className="plan-description">
                                    Cost-effective plan for dedicated drivers. Best suited for full-time drivers looking for a longer-term commitment. Benefits: Full access to the NthomeRidez platform, eligibility for monthly incentives and bonuses, priority support, and access to exclusive features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<MDBContainer className="py-5">
                <div className="text-center">
                    <h2 className="mb-4">
                        <strong>Be one of us!</strong>
                    </h2>
                    <p>Join our exclusive e-hailing subscription service today!</p>
                </div>
                <MDBRow className="justify-content-center">
                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Plan</MDBCardTitle>
                                <p className="text-muted">
                                    Subscription per week for unlimited e-hailing services.
                                </p>
                                <p className="h2 fw-bold">
                                    R400
                                    <small className="text-muted" style={{ fontSize: "18px" }}>
                                        /weekly
                                    </small>
                                </p>
                                <a href="/driverUpload" className="btn btn-primary d-block mb-2 mt-3 text-capitalize">
                                    Go Basic
                                </a>
                            </MDBCardBody>

                            <MDBCardFooter>
                                <p
                                    className="text-uppercase fw-bold"
                                    style={{ fontSize: "12px" }}
                                >
                                    Benefits
                                </p>


                                <MDBTypography listUnStyled className="mb-0 px-4">
                                    <li className="mb-3">
                                        <MDBIcon
                                            fas
                                            icon="check"
                                            className="text-success me-3"
                                        />
                                        <small> Short-term Planning</small>
                                    </li>
                                    <li className="mb-3">
                                        <MDBIcon
                                            fas
                                            icon="check"
                                            className="text-success me-3"
                                        />
                                        <small>Immediate Earnings Stability</small>
                                    </li>

                                    
                                </MDBTypography>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="auto" className="mb-4">
                        <MDBCard>
                            <MDBCardBody className="mx-2">
                                <MDBCardTitle className="my-2">Plan</MDBCardTitle>
                                <p className="text-muted">
                                    Subscription per month for unlimited e-hailing services.
                                </p>
                                <p className="h2 fw-bold">
                                    R1500
                                    <small className="text-muted" style={{ fontSize: "18px" }}>
                                        /monthly
                                    </small>
                                </p>
                                <a href="/driverUpload" className="btn btn-primary d-block mb-2 mt-3 text-capitalize">
                                    Go Premium
                                </a>
                            </MDBCardBody>

                            <MDBCardFooter>
                                <p
                                    className="text-uppercase fw-bold"
                                    style={{ fontSize: "12px" }}
                                >
                                    Benefits
                                </p>

                                <MDBTypography listUnStyled className="mb-0 px-4">
                                    <li className="mb-3">
                                        <MDBIcon
                                            fas
                                            icon="check"
                                            className="text-success me-3"
                                        />
                                        <small>Long-Term Stability</small>
                                    </li>
                                    <li className="mb-3">
                                        <MDBIcon
                                            fas
                                            icon="check"
                                            className="text-success me-3"
                                        />
                                        <small>Predictable Budgeting</small>
                                    </li>
                                </MDBTypography>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
      {/* End of Services */}

     {/* Payment Methods */}
     <section>
                <h2>Accepted Payment Methods</h2>
                <p>We accept a variety of secure payment methods to make subscribing easy and convenient for you. You can pay for your subscription using any major credit or debit card, including Visa, Mastercard, and American Express. Additionally, we support popular digital payment options such as PayPal and Apple Pay, ensuring a seamless checkout experience.</p>
                <p>Rest assured, all transactions are encrypted and processed securely to protect your sensitive payment information. Please note that subscriptions are set to automatically renew unless canceled, providing uninterrupted access to our services. You can manage your payment preferences and update your billing information at any time through your account settings.</p>
            </section>

            {/* Cancellation Policy */}
            <section>
                <h2>Cancellation Policy</h2>
                <p>We understand that circumstances may change, and you may need to cancel your subscription. Our cancellation process is simple and hassle-free. To cancel your subscription, simply log in to your account and navigate to the subscription management section. From there, you can initiate the cancellation process with just a few clicks.</p>
                <p>Please note that cancellations must be made at least 48 hours before your next billing cycle to avoid being charged for the upcoming period. Once canceled, you'll receive a confirmation email, and your access to subscription benefits will continue until the end of the current billing cycle.</p>
                <p>We do not offer refunds for partially used subscription periods, but you'll retain access to your subscription benefits until the end of the prepaid period. If you have any questions or need assistance with the cancellation process, our customer support team is here to help you every step of the way.</p>
            </section>
      {/* <section className="section testimonial" id="testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Testimonial Slider */}
              {/* <div className="testimonial-slider owl-carousel owl-theme"> */}
                {/* Testimonial 01 */}
                {/* <div className="item"> */}
                  {/* <div className="block shadow">
                    {/* Speech *
                    <p>
                      READY TO DRIVE WITH US?
                    </p>
                    <div className="image">
                      <img src={assets.img2} />
                    </div>

                  </div> */}
                {/* </div> *
              </div>
            </div>
          </div>
        </div>
      </section> */}
        <Questions />

            </div>
        </div>
    );
}
