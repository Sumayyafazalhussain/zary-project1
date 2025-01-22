import Footer from "../components/footer";
import Header from "../components/header";
import Image from "next/image";
import React from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

interface BlogItemProps {
  img: string;
  title: string;
  description: string;
}

const BlogItem: React.FC<BlogItemProps> = ({ img, title, description }) => (
  <article className="mt-8">
    <Image
      src={img}
      width={1440}
      height={800}
      className="rounded-xl w-full object-cover"
      alt={title}
    />
    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#333] mt-3">
      {title}
    </h3>
    <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-2 text-justify">
      {description}
    </p>
    <a
      href="#"
      className="inline-block mt-4 text-[#B88E2F] hover:text-[#8A6A24] underline"
    >
      Read More
    </a>
  </article>
);

const BlogPage: React.FC = () => {
  const blogs = [
    {
      id: "1",
      img: "/images/b2 (1).jpg",
      title: "Latest Trends in Design",
      description:
        "Explore the hottest trends in modern design and how they are shaping the world of interiors and aesthetics.",
    },
    {
      id: "2",
      img: "/images/b2 (2).jpg",
      title: "Decorating Made Simple",
      description:
        "Discover how to decorate your spaces effortlessly with tips and tricks that blend functionality and style.",
    },
    {
      id: "3",
      img: "/images/b2 (3).jpg",
      title: "Tips for a Modern Home",
      description:
        "Transform your home into a modern masterpiece with expert advice on interior styling and design.",
    },
  ];

  return (
    <div>
      <Header />

      <section className="relative h-[40vh] sm:h-[50vh]">
        <Image
          src="/shopbanner.png"
          layout="fill"
          className="object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-30">
          <h1 className="text-white text-2xl sm:text-4xl font-bold">Blog</h1>
          <div className="flex items-center text-white mt-2">
            <span className="text-xs sm:text-sm">Home</span>
            <IoChevronForwardSharp />
            <span className="text-xs sm:text-sm">Blog</span>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-20 mt-10">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              img={blog.img}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </section>

      {/* Pagination Section */}
      <div className="flex justify-center mt-10 mb-8">
        <ul className="flex space-x-4">
          {["1", "2", "3"].map((page, index) => (
            <li
              key={index}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-md ${
                page === "1"
                  ? "bg-[#B88E2F] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {page}
            </li>
          ))}
          <li className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-600 rounded-md">
            Next
          </li>
        </ul>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      <Footer />
    </div>
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
  <div className="flex gap-10 px-20 py-24 w-full bg-yellow-50 max-md:px-5 max-md:flex-col max-md:py-16">
    {features.map((feature, index) => (
      <FeatureComponent key={index} feature={feature} />
    ))}
  </div>
);

export default BlogPage;
