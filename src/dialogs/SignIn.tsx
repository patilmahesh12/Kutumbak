import axios from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SignInModal = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post("/api/user/signin", {
        email: formData.email,
        password: formData.password,
      });
      toast.promise(response, {
        loading: "Signing in...",
        success: (data) => {
          sessionStorage.setItem("user", JSON.stringify(data.data.family));
          router.push("/user/dashboard");
          return "Signed in successfully.";
        },
        error: (error) => {
          return error.response.data;
        },
      });
    } catch (_error) {
      toast.error("Failed to sign in.");
    }
  };

  const handleClose = () => {
    (document.getElementById("signin") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="signin" className="modal">
      <div className="modal-box w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-w-5xl text-base-content relative">
        <button
          className="absolute top-2 right-4 text-xl font-bold text-gray-500 hover:text-gray-700 transform scale-150"
          onClick={handleClose}
        >
          ×
        </button>
        <h3 className="font-bold text-xl sm:text-2xl my-2 sm:my-4 text-center text-base-content">
          Sign In
        </h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-4 sm:px-5"
          method="dialog"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-base-content"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="modal-action flex flex-col sm:flex-row sm:justify-end gap-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SignInModal;
