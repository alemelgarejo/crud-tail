import * as React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Navbar from "./nav/Navbar";

interface LayoutProps {
  children: React.ReactNode
}


const Layout: React.FunctionComponent<LayoutProps> = ({children}) => {
  return (
    <div className="grid grid-cols-1 gape-4">
      <Navbar/>
      <Container>
        {children}
      </Container>
      <Footer/>
    </div>
  )
};

export default Layout;
