"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaSpinner } from 'react-icons/fa';
import axios from "axios";
import Link from "next/link";

// Define the schema using Zod
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://bookstore-1-ooja.onrender.com/api/users/register", 
        data, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("User registered successfully!");
        router.push("/login");
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error registering user");
      } else {
        toast.error("Error registering user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                form.formState.isValid ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-300"
              }`}
              disabled={!form.formState.isValid || loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Register"
              )}
            </Button>

            {/* Sign In and Forgot Password Links */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-700 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
              <Link className="text-sm text-blue-700 hover:underline" href="#">
               Forgot Password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
