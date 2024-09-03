import Loader from "@/components/Loader";
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
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { SignupValidation } from "@/lib/validation";
import { CreateUserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const AddUserForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: undefined,
      password: "",
    },
  });

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: async (payload: CreateUserType) => {
      const { data } = await axios.post(`${BACKEND_URL}/user/create`, payload, {
        withCredentials: true,
      });

      return data;
    },
    onSuccess: () => {
      navigate("/admin/users");
      return toast({
        title: "Register Successfull",
        description: "User's account has been created.",
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        return toast({
          title: "Something went wrong",
          description: err.response?.data.message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof SignupValidation>) {
    const payload: CreateUserType = {
      name: values.name,
      email: values.email,
      contact: Number(values.contact),
      password: values.password,
    };
    console.log(values);
    createUser(payload);
  }

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full mx-auto">
        <h2 className="h2-bold text-center">Create user account</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Full Name"
                        {...field}
                        className="form-input"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        type="email"
                        className="form-input"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Mobile No.
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Contact Info"
                        {...field}
                        className="form-input"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Password"
                        {...field}
                        className="form-input"
                        type="password"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3" disabled={isPending}>
              {isPending ? <Loader /> : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddUserForm;
