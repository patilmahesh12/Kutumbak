import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import SignInModal from "./SignIn";
import { Eye, EyeOff } from "lucide-react";

const RegisterUserDialog = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    caste: "",
    aadhar: "",
    email: "",
    password: "",
    familyName: "",
    mobileNo: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      const fieldName = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [fieldName]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post("/api/user/register", {
        user: formData,
      });
      toast.promise(response, {
        loading: "Registering user and family...",
        success: "User and family registered successfully!",
        error: "Failed to register user and family.",
      });
      router.push("/");
    } catch (error) {
      toast.error("Failed to register user and family.");
    }
  };

  const handleClose = () => {
    (document.getElementById("signup") as HTMLDialogElement).close();
  };

  const handleClickHere = () => {
    handleClose();
    (document.getElementById("signin") as HTMLDialogElement).showModal();
  };

  return (
    <dialog id="signup" className="modal">
      <div className="modal-box w-full sm:w-11/12 md:w-8/12 lg:w-6/12 max-w-5xl text-base-content relative">
        <button
          className="absolute top-2 right-2 text-lg font-bold text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          ×
        </button>

        <h3 className="font-bold text-2xl my-4 text-center text-base-content">
          Register New User and Family
        </h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-4 sm:px-6 lg:px-8"
          method="dialog"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              maxLength={10}
              minLength={10}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg"
              required
            >
              <option value="">Select Caste</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="aadhar"
              placeholder="Aadhar (12 characters)"
              minLength={12}
              maxLength={12}
              value={formData.aadhar}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="familyName"
              placeholder="Family Name"
              value={formData.familyName}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <input
              type="text"
              name="address.street"
              placeholder="Street Address"
              value={formData.address.street}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="address.pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-base-content"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div className="modal-action mx-auto w-full flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 w-full text-center">
          <p className="text-base-content text-center text-lg">
            Already have an account?{" "}
            <button
              className="btn btn-link text-lg sm:text-xl md:text-2xl w-full sm:w-auto"
              onClick={handleClickHere}
            >
              Click Here!
            </button>
          </p>
        </div>
      </div>
      <SignInModal />
    </dialog>
  );
};

export default RegisterUserDialog;
