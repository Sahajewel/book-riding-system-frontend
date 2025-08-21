import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode
}
export default function ComponentLayout({children}: IProps) {
  return (
    <div className="min-h-screen  flex flex-col">
     <div className="container mx-auto"> <Navbar></Navbar></div>
      <div className="container px-8 mx-auto grow-1">{children}</div>
      <Footer></Footer>
      </div>
  )
}
