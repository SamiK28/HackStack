import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
class Layout extends React.Component {
  render(){
    return (
      <>
        <Navbar />
        <main>{this.props.children}</main>
        {/* <Footer /> */}
      </>
    )
  }
}
export default Layout;