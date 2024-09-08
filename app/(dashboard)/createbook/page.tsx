"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

// Define the schema using Zod
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  prices: z.object({
    NGN: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "NGN price must be positive." }),
    EU: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "EU price must be positive." }),
    UK: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "UK price must be positive." }),
    US: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "US price must be positive." }),
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image is required.",
    })
    .optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const CreateBook = () => {
  // Initialize the form with useForm and zodResolver
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      prices: {
        NGN: "",
        EU: "",
        UK: "",
        US: "",
      },
      description: "",
      image: undefined,
    },
  })

  // Define the submit handler
  const onSubmit = async (data: FormSchemaType) => {
    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("prices", JSON.stringify(data.prices)); // Serialize prices object
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }
    // 
  
    // Log FormData content for debugging using the spread operator
    [...formData.entries()].forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log(data.image, 'image here')
  
    try {
      const response = await axios.post("http://localhost:5000/api/books", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Book created successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Book Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField control={form.control} name="prices.NGN" render={({ field }) => (
          <FormItem>
            <FormLabel>Price in NGN</FormLabel>
            <FormControl>
              <Input type="number" placeholder="NGN Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="prices.EU" render={({ field }) => (
          <FormItem>
            <FormLabel>Price in EU</FormLabel>
            <FormControl>
              <Input type="number" placeholder="EU Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="prices.UK" render={({ field }) => (
          <FormItem>
            <FormLabel>Price in UK</FormLabel>
            <FormControl>
              <Input type="number" placeholder="UK Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="prices.US" render={({ field }) => (
          <FormItem>
            <FormLabel>Price in US</FormLabel>
            <FormControl>
              <Input type="number" placeholder="US Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Book Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreateBook;
