
import Footer from "@/components/footer";
import Markdown from "@/components/markdown";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

function Add() {
  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home
      </Link>{" "}
      <Markdown />
      <Footer />
    </>
  );
}

export default Add;
