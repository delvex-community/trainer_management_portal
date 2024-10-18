import ProfileUploader from "@/components/ProfileUploader";
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
import { UpdateUserValidation } from "@/lib/validation";
import { useUserById } from "@/react-query/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, loadingUser } = useUserById(userId || "");

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      contact: String(user?.contact) || "",
      file: user?.avatar || "",
    });
  }, [user]);

  const form = useForm<z.infer<typeof UpdateUserValidation>>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: undefined,
      // password: "",
      file: "",
    },
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.patch(
        `${BACKEND_URL}/user/update/${userId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      return data;
    },
    onSuccess: () => {
      navigate("/admin/users");
      return toast({
        title: "Update Successfull",
        description: "User's account has been updated.",
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

  function onSubmit(values: z.infer<typeof UpdateUserValidation>) {
    updateUser(values);
  }

  if (loadingUser)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="relative flex flex-col bg-gradient-to-br sm:from-gray-50 sm:to-gray-100/90 sm:border-[1px] sm:border-gray-300 rounded-md p-6 shadow-md gap-3 max-w-md w-full mx-auto">
        <div className="absolute left-0 -top-[3rem]">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
            Back
          </Button>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-4">
          Update User Details
        </h2>
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
            {/* <FormField
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
                        type="text"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={user.avatar}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3" disabled={isPending}>
              {isPending ? <Loader /> : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
