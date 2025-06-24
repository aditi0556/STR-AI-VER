import Navbar from "./Navbar.jsx";
import Footer from "./Home Page/Footer.jsx";
export default function Privacy(){
    return (
      <>
        <Navbar />
        <div className="flex flex-col max-h-full items-center dark:bg-white dark:text-black bg-gray-800 text-white">
          <div className="h-20 my-25 flex flex-row">
            <h1 className=" text-6xl">STR-AI-VER&nbsp;&nbsp;</h1>
            <h1 className="font-bold text-6xl"> Privacy Policy</h1>
          </div>
          <div className="px-20 text-xl">
            <p>
              Welcome to STR-AI-VER ("we", "us", "our"). We respect your privacy
              and are committed to protecting your personal data. This policy
              explains what information we collect, how we use it, with whom we
              share it, and how you can manage it.
            </p>
          </div>
          <div className="self-start ml-20 font-bold text-3xl my-4">
            <h1>Information We Collect</h1>
            <p className="font-normal text-xl mt-2.5">
              We only collect the following when users sign up or log in: <br />{" "}
              Name <br />
              Email <br /> Hashed password <br /> Stored in our secure database.
            </p>
          </div>
          <div className="self-start ml-20 font-bold text-3xl my-4">
            <h1>Purpose Of Collection</h1>
            <p className="font-normal text-xl mt-2.5 mb-2.5">
              We process your data to: <br /> Enable account creation and secure
              access to our DSA content. <br /> Maintain and protect your
              account. <br /> Monitor for suspicious activity and enhance
              service stability .
            </p>
          </div>
        </div>
        <Footer className="fixed bottom-0 overflow-hidden " />
      </>
    );
}