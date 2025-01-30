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
import Button from "../common/Button";
import { useStateContext } from "../context/User";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, setUsers } = useStateContext();
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
      id: Number(userId),
    };
    const existingUser = users.find((user) => user.id === Number(userId));
    if (existingUser?.local) {
      setUsers(
        users.map((user) =>
          user.id === Number(userId) ? structuredData : user
        )
      );

      reset();
      toast.success("User edited successfully!");
      return navigate("/");
    }
    try {
      await axios.put(`${API_BASE_URL}/${userId}`, structuredData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers(
        users.map((user) =>
          user.id === Number(userId) ? structuredData : user
        )
      );
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
    const existingUser = users.find((user) => user.id === Number(userId));

    if (existingUser?.local) {
      reset({
        name: existingUser.name,
        userName: existingUser.username,
        email: existingUser.email,
        companyName: existingUser.company.name,
      });
    } else {
      fetchUser();
    }
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
              className="hover:cursor-pointer flex items-center text-gray-600 hover:text-gray-900"
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
                <Button
                  type="button"
                  buttonText={"Cancel"}
                  navigate={navigate}
                  isIcon={false}
                />

                <Button
                  type={"submit"}
                  disabled={isSubmitting}
                  isIcon={true}
                  buttonText={isSubmitting ? "Saving..." : "Edit User"}
                  navigate={navigate}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
