import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div>
        <Navbar></Navbar>
        <div>{children}</div>
        <Footer></Footer>
    </div>
  );
}