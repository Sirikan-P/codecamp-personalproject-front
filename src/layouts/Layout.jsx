import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Layout() {
  return (
    <div>
        <Navbar />        
        {/*  // <outlet/> render child node */}
        <Outlet />

        <Footer />
    </div>
  )
}

export default Layout