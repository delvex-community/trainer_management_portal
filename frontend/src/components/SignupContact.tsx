import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { GoogleRegisterType } from "@/types";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContactValidation = z.object({
  contact: z
    .string()
    .min(10, { message: "Invalid Number" })
    .max(10, { message: "Invalid Number" }),
});

type SignupContactProps = {
  user: any;
  loadingUser: boolean;
};

const SignupContact = ({ user, loadingUser }: SignupContactProps) => {
  const form = useForm<z.infer<typeof ContactValidation>>({
    resolver: zodResolver(ContactValidation),
    defaultValues: {
      contact: undefined,
    },
  });

  const { mutate: googleRegister, isPending } = useMutation({
    mutationFn: async (payload: GoogleRegisterType) => {
      const { data } = await axios.post(
        `${BACKEND_URL}/user/google-register`,
        payload,
        {
          withCredentials: true,
        }
      );

      return data;
    },
    onSuccess: () => {
      return toast({
        title: "Register Successfull",
        description: "Your account has been created.",
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

  function onSubmit(values: z.infer<typeof ContactValidation>) {
    const payload: GoogleRegisterType = {
      name: user.name,
      contact: Number(values.contact),
      email: user.email,
      avatar: user.picture,
    };

    googleRegister(payload);
  }

  if (loadingUser) return <Loader />;

  return (
    <>
      {user ? (
        <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
          <Link to="/sign-in" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
          </Link>

          <h2 className="h2-bold text-center">Complete Registration</h2>
          <p className="text-center mb-4">
            Enter your contact info as a final step
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center gap-4">
                      <FormLabel className="min-w-[100px] base-medium text-black">
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

              <Button type="submit" className="mt-3" disabled={isPending}>
                {isPending ? <Loader /> : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
          <Link to="/sign-in" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
          </Link>
          <h2 className="h3-bold text-center">
            Something went wrong, please try again later
          </h2>
        </div>
      )}
    </>
  );
};

export default SignupContact;
