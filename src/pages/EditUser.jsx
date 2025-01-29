import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../lib/schema";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../common/apiUrl";
import InputField from "../common/InputField";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      await axios.put(`${API_BASE_URL}/${userId}`, structuredData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
      reset();
      toast.success("User edited successfully!");
    } catch (error) {
      toast.error("Failed to edit user. Please try again.");
      console.error("Error saving user:", error);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(`${API_BASE_URL}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status === 200) {
        const structuredData = {
          name: data.name,
          userName: data.username,
          email: data.email,
          companyName: data.company.name,
        };
        reset(structuredData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId, reset]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="flex items-center justify-center h-80">
          <div className="h-32 w-32 border-t-2 border-gray-900 animate-spin  rounded-full"></div>
        </div>
      )}

      {!loading && (
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
              <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
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
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Edit User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
