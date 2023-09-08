import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>RKSTORE - {title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "RKSTORE",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "RahulKumar",
};

export default Layout;
