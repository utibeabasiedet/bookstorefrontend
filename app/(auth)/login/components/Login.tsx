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

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      console.log(response)

      toast.success("User registered successfully!");
      router.push("/shop"); // Navigate to shop page
    } catch (error) {
      toast.error("Error Login in User");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-2 md:px-8 flex flex-col mx-auto mt-10 items-center lg:w-[40vw]">
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
