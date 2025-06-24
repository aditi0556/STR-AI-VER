import Navbar from "./Navbar.jsx";
import Footer from "./Home Page/Footer.jsx";
export default function Terms(){
    return (
      <>
        <Navbar />
        <div className="flex flex-col h-screen items-center dark:bg-white dark:text-black bg-gray-800 text-white">
          <div className="h-20 my-25 flex flex-row">
            <h1 className=" text-6xl ">STR-AI-VER&nbsp;&nbsp;</h1>
            <h1 className="font-bold text-6xl"> Terms Of Service</h1>
          </div>
          <div className="px-20 text-xl">
            <p>
              These terms of service are entered into between you and
              STR-AI-VER(&quot;us&quot;,&quot;we&quot; or &quot;our&quot; ) for
              the use of our application in relation to our training tools. By
              accessing our websites (the "Services"), you acknowledge that you
              have read, understood, and agree to the most recent version of
              these Terms of Service ("Terms"). <br />
              <br />
              We reserve the right to revise these Terms at any time. If we do,
              we will post the modified Terms on this page and indicate the date
              of most the recent change above. You agree to read all
              notifications we send you and to periodically check this page for
              updates to these Terms. Your continued use of the Services
              constitutes acceptance of these Terms and any modifications
              thereto. If you object to any changes, your sole recourse is to
              cease use of the Services.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
}