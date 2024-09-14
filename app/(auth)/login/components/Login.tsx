"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import useCartState from "@/services/stateManager";
import axios from "axios"; // Import axios

// Define the schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cartState = useCartState();

  // Initialize the form with useForm and zodResolver
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Define the submit handler
  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://bookstore-1-ooja.onrender.com/api/users/login",
        data,
        { withCredentials: true } // Ensure cookies are included
      );
      console.log(response);
      cartState.loginState.set(true);

      toast.success("User logged in successfully!");
      router.push("/shop"); // Navigate to shop page
    } catch (error) {
      toast.error("Error logging in user");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-auto py-10 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Your email"
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full flex justify-center items-center ${
                form.formState.isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300"
              } text-white py-2 rounded-lg focus:outline-none`}
              disabled={!form.formState.isValid || loading} // Disable if form is invalid or loading
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" /> // Show loading spinner
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        {/* Sign Up and Forgot Password Links */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
