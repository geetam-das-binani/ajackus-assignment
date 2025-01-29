import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../lib/schema";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../common/apiUrl";
import InputField from "../common/InputField";

const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      companyName: "",
    },
  });

  const onSubmit = async (data) => {
    const structuredData = {
      name: data.name.trim(),
      username: data.userName.trim(),
      email: data.email.trim(),
      company: {
        name: data.companyName.trim(),
      },
    };

    try {
      const { data: newUser, status } = await axios.post(
        API_BASE_URL,
        structuredData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status === 201) {
        console.log("User added:", newUser);
        navigate("/");
        reset();
        toast.success("User added successfully!");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Users
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New User
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <InputField
                  register={register}
                  errors={errors}
                  name="name"
                  labelText="Name"
                  type="text"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <InputField
                  register={register}
                  errors={errors}
                  name="userName"
                  labelText="UserName"
                  type="text"
                  placeholder="Enter user name"
                />
              </div>

              <div className="sm:col-span-2">
                <InputField
                  register={register}
                  errors={errors}
                  name="email"
                  labelText="Email"
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div className="sm:col-span-2">
                <InputField
                  register={register}
                  errors={errors}
                  name="companyName"
                  labelText="Company Name"
                  type="text"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
