"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useContext, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/userDetailsContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
 name: z.string().min(2, {
  message: "Design name must be at least 2 characters.",
 }),
 width: z.number().int().positive({
  message: "Width must be a positive integer.",
 }),
 height: z.number().int().positive({
  message: "Height must be a positive integer.",
 }),
});

export function CreateCanvasDialog({ children }: { children: ReactNode }) {
 const [loading, setLoading] = useState(false);
 const createDesignRecord = useMutation(api.designs.CreateNewDesign);
 const { userDetails } = useContext(UserDetailContext);
 const router = useRouter();
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   width: 1200,
   height: 800,
  },
 });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(userDetails);
  if (!userDetails?._id) {
   console.error("User ID is missing");
   return;
  }

  setLoading(true);

  try {
   const result = await createDesignRecord({
    name: values.name,
    width: values.width,
    height: values.height,
    uid: userDetails._id, // Make sure to pass the user ID
    id: uuidv4(),
   });

   form.reset();

   console.log("Design created:", result);
   router.push("/design/" + result);
   // You can add navigation or success message here
  } catch (error) {
   console.error("Error creating design:", error);
  } finally {
   setLoading(false);
  }
 }

 return (
  <Dialog>
   <DialogTrigger asChild>{children}</DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Create Custom Canvas</DialogTitle>
     <DialogDescription>
      Provide canvas width and height to get started.
     </DialogDescription>
    </DialogHeader>
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
       control={form.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Design Name</FormLabel>
         <FormControl>
          <Input placeholder="My Awesome Design" {...field} />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <div className="grid md:grid-cols-2 gap-6">
       <FormField
        control={form.control}
        name="width"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Width (px)</FormLabel>
          <FormControl>
           <Input
            type="number"
            placeholder="1200"
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Height (px)</FormLabel>
          <FormControl>
           <Input
            type="number"
            placeholder="800"
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
       {loading ? "Creating..." : "Create"}
      </Button>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
}
