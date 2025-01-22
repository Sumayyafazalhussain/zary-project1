import Footer from "../components/footer";
import Header from "../components/header";
import Image from "next/image";
import React from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

// Contact Us Component
const ContactUs = () => {
  return (
    <>
      <div>
        <Header />
        {/* Hero Section with Banner */}
        <div className="h-[313px] w-full relative">
          <Image
            src="/shopbanner.png"
            width={1440}
            height={100}
            className="absolute w-full h-full object-cover"
            alt="Shop Banner"
          />
          <div className="flex justify-center items-center flex-col h-full z-50 relative">
            <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-poppins font-semibold text-center">
              Contact Us
            </h2>
            <div className="flex text-sm md:text-base">
              <p className="font-poppins font-semibold flex items-center">
                Home
                <IoChevronForwardSharp />
              </p>
              <span>Contact</span>
            </div>
          </div>
        </div>

        {/* Contact Information Block */}
        <div className="w-full max-w-[1183px] px-5 sm:px-10 lg:px-0 mx-auto my-10">
          <div className="text-center font-poppins mb-10 mt-8">
            <h5 className="font-bold text-[24px] sm:text-[28px] md:text-[36px]">
              Reach Out to Us
            </h5>
            <p className="text-[#9F9F9F] text-[14px] sm:text-[16px] md:text-[18px]">
              Have any questions about our products or services? Feel free to
              send us an email. Our team is here to assist you with anything you
              need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            {/* Left Section - Address, Phone, Working Hours */}
            <div className="w-full sm:w-[45%] lg:w-[399px]">
              <div className="flex gap-2 mb-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    Our Address
                  </h3>
                  <p className="text-sm sm:text-base">
                    236 5th SE Avenue, New York NY10000, United States
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                <FaPhoneAlt className="text-lg" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    Call Us
                  </h3>
                  <p className="text-sm sm:text-base">
                    Mobile: +(84) 546-6789
                    <br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <MdAccessTimeFilled className="text-lg" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    Operating Hours
                  </h3>
                  <p className="text-sm sm:text-base">
                    Monday-Friday: 9:00 - 22:00
                    <br />
                    Saturday-Sunday: 9:00 - 21:00
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="w-full sm:w-[55%]">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm sm:text-base"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border rounded-md h-12 sm:h-16 md:h-16 border-[#9F9F9F] px-4"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm sm:text-base"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded-md h-12 sm:h-16 md:h-16 border-[#9F9F9F] px-4"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm sm:text-base"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border rounded-md h-12 sm:h-16 md:h-16 border-[#9F9F9F] px-4"
                  placeholder="Subject (Optional)"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm sm:text-base"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="w-full border rounded-md h-24 sm:h-32 md:h-32 border-[#9F9F9F] px-4 py-2"
                  placeholder="Please type your message here..."
                ></textarea>
              </div>
              <button className="mt-3 w-full sm:w-[222px] py-3 font-poppins font-bold bg-[#B88E2F] text-white">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Features Section */}
      <FeaturesSection />
    </>
  );
};

// Features Component
const features = [
  {
    title: "Free Delivery",
    description: "For all orders over Rs. 50,000, consectetur adipiscing elit.",
  },
  {
    title: "90 Days Return",
    description: "If goods have problems, consectetur adipiscing elit.",
  },
  {
    title: "Secure Payment",
    description: "100% secure payment, consectetur adipiscing elit.",
  },
];

const FeatureComponent = ({ feature }: { feature: any }) => (
  <div className="flex flex-col grow text-center max-md:mt-10">
    <div className="self-center text-3xl font-medium text-black">
      {feature.title}
    </div>
    <div className="text-xl text-neutral-400">{feature.description}</div>
  </div>
);

const FeaturesSection = () => (
  <><div className="flex gap-10 px-20 py-24 w-full bg-yellow-50 max-md:px-5 max-md:flex-col max-md:py-16">
    {features.map((feature, index) => (
      <FeatureComponent key={index} feature={feature} />
    ))}
  </div><Footer /></>
);

export default ContactUs;
