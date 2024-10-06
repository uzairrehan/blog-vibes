"use client";

import Cards from "@/components/cards";

import Footer from "@/components/footer";

export default function Home() {
  return (
    // <>

    //   <button classNameName="btn">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       classNameName="h-6 w-6"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    //       />
    //     </svg>
    //     Button
    //   </button>

    //   <button classNameName="btn btn-circle btn-outline">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       classNameName="h-6 w-6"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M6 18L18 6M6 6l12 12"
    //       />
    //     </svg>
    //   </button>

    //   <button classNameName="btn">
    //     <span classNameName="loading loading-spinner"></span>
    //     loading
    //   </button>

    //   <div classNameName="dropdown dropdown-hover">
    //     <div tabIndex={0} role="button" classNameName="btn m-1">
    //       Hover
    //     </div>
    //     <ul
    //       tabIndex={0}
    //       classNameName="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    //     >
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //       <li>
    //         <a>Item 2</a>
    //       </li>
    //     </ul>
    //   </div>
    //   {/* Open the modal using document.getElementById('ID').showModal() method */}
    //   <button
    //     classNameName="btn"
    //     // onClick={() => document.getElementById("my_modal_5").showModal()}
    //   >
    //     open modal
    //   </button>
    //   <dialog id="my_modal_5" classNameName="modal modal-bottom sm:modal-middle">
    //     <div classNameName="modal-box">
    //       <h3 classNameName="font-bold text-lg">Hello!</h3>
    //       <p classNameName="py-4">
    //         Press ESC key or click the button below to close
    //       </p>
    //       <div classNameName="modal-action">
    //         <form method="dialog">
    //           {/* if there is a button in form, it will close the modal */}
    //           <button classNameName="btn">Close</button>
    //         </form>
    //       </div>
    //     </div>
    //   </dialog>

    //   {/* <div classNameName="card card-side bg-base-100 shadow-xl">
    //     <figure>
    //       <img
    //         src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
    //         alt="Movie"
    //       />
    //     </figure>
    //     <div classNameName="card-body">
    //       <h2 classNameName="card-title">New movie is released!</h2>
    //       <p>Click the button to watch on Jetflix app.</p>
    //       <div classNameName="card-actions justify-end">
    //         <button classNameName="btn btn-primary">Watch</button>
    //       </div>
    //     </div>
    //   </div> */}

    //   <label classNameName="form-control w-full max-w-xs">
    //     <div classNameName="label">
    //       <span classNameName="label-text">Pick a file</span>
    //     </div>
    //     <input
    //       type="file"
    //       classNameName="file-input file-input-bordered w-full max-w-xs"
    //     />
    //   </label>

    //   <select classNameName="select select-bordered select-sm w-full max-w-xs">
    //     <option disabled selected>
    //       Small
    //     </option>
    //     <option>Small Apple</option>
    //     <option>Small Orange</option>
    //     <option>Small Tomato</option>
    //   </select>

    //   <label classNameName="input input-bordered flex items-center gap-2">
    //     <input type="text" classNameName="grow" placeholder="Search" />
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 16 16"
    //       fill="currentColor"
    //       classNameName="h-4 w-4 opacity-70"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   </label>
    // </>
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-5 my-5">
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
          <Cards
            imageURL="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading={"Cars"}
            text={
              "lorem ipdiaf fuhfgosidf sdfiohfsd fdsiohfsd fsdiofsd fusdbfnfbsdf df9sd wfidfsndfsdffpsafwqasvfa diafhaf nafofgwq fsaifha wafbbsd af8afwf sakfwnbfsanafasb fanfiafvafb ak"
            }
            tags={["coding", "programming"]}
            slug={"programming-geee-myy"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
