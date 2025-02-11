import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/providers/web3-provider";
import { DisclaimerProvider } from "@/components/providers/disclaimer-provider";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import { LocalIcon, MarketProvider } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vicuna",
  description: "Vicuna Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex flex-col min-h-screen bg-background`}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="fixed"
          toastClassName="backdrop-blur-[25px] font-inter float-right m-[10px]"
          bodyClassName="font-inter"
          toastStyle={{
            background: "#ebfde9",
            color: "black",
            border: "1px solid #1E2022",
            padding: "15px 0px 15px 20px",
            height: "auto",
          }}
          icon={false}
          closeButton={
            <div className="h-[14px] w-[20px] translate-x-[-5px] translate-y-[-5px]">
              <LocalIcon name="times-circle" size={14} />
            </div>
          }
        />

        <Web3Provider>
          <DisclaimerProvider>
            <MarketProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Toaster />
              <Footer />
            </MarketProvider>
          </DisclaimerProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
