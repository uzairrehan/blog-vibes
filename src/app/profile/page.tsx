"use client";
function Profile() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <form className=" px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2 form-control w-full  label"
            >
              <span className="label-text ">Upload Image : </span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full file-input file-input-bordered rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="Name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 1:
              </label>
              <input
                type="text"
                id="Name"
                className="w-full py-2 px-3 border rounded-lg "
              />
            </div>
            <div>
              <label
                htmlFor="field2"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 2:
              </label>
              <input
                type="text"
                id="field2"
                className="w-full py-2 px-3 border rounded-lg  "
              />
            </div>
            <div>
              <label
                htmlFor="field3"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 3:
              </label>
              <input
                type="text"
                id="field3"
                className="w-full py-2 px-3 border rounded-lg "
              />
            </div>
            <div>
              <label
                htmlFor="field4"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 4:
              </label>
              <input
                type="text"
                id="field4"
                className="w-full py-2 px-3 border rounded-lg "
              />
            </div>
            <div>
              <label
                htmlFor="field5"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 5:
              </label>
              <input
                type="text"
                id="field5"
                className="w-full py-2 px-3 border rounded-lg "
              />
            </div>
            <div>
              <label
                htmlFor="field6"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Field 6:
              </label>
              <input
                type="text"
                id="field6"
                className="w-full py-2 px-3 border rounded-lg "
              />
            </div>
 
            
          </div>

          <div className="mt-6">
            <button className="btn btn-active btn-neutral w-full">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
