"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
import { useState } from 'react'; // For managing loading state
import { useRouter } from 'next/navigation'; // For navigation
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
import { FaSpinner } from 'react-icons/fa'; // Import loading icon
import axios from "axios";

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
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // For navigation

  // Initialize the form with useForm and zodResolver
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange", // Enable onChange validation to track validity
  });

  // Define the submit handler
  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true); // Start loading
  
    try {
      // Make the POST request using axios
      const response = await axios.post(
        "https://bookstore-1-ooja.onrender.com/api/users/register", 
        data, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies, etc.)
        }
      );
  
      // Handle the response
      if (response.status >= 200 && response.status < 300) {
        toast.success("User registered successfully!");
        console.log("User registered successfully:", response.data);
        router.push("/login"); // Navigate to the login page
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error:any) {
      // Handle the error
      if (error.response && error.response.data) {
        console.error("Error:", JSON.stringify(error.response.data, null, 2));
        toast.error(error.response.data.message || "Error registering user");
      } else {
        console.error("Error:", error.message);
        toast.error("Error registering user");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2 md:px-8 flex flex-col mx-auto mt-10 items-center lg:w-[40vw]">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Name</FormLabel>
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
            <FormItem className="w-[100%]">
              <FormLabel>Email</FormLabel>
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
            <FormItem className="w-[100%]">
              <FormLabel>Password</FormLabel>
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
          className={`w-full flex justify-center items-center ${
            form.formState.isValid ? "bg-blue-700 text-white" : "bg-blue-300"
          }`}
          disabled={!form.formState.isValid || loading} // Disable if form is invalid or loading
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" /> // Show loading spinner
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
