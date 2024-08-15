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
import { SignupValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { CreateUserType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import SignupContact from "../../components/SignupContact";

const SignupForm = () => {
  const [stage, setStage] = useState(1);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
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

  const googleRegister = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setStage(2);
      setLoadingUser(true);

      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: "application/json",
          },
        }
      );

      setUser(data);
      setLoadingUser(false);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try to register later",
        variant: "destructive",
      });
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
      navigate("/");
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
    <>
      {stage === 1 && (
        <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full m-4">
          <h2 className="h2-bold text-center">Create your account</h2>
          <p className="text-center mb-4">
            Sign up to use delvex trainer portal
          </p>
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
              <p className="text-center font-semibold">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-blue-600">
                  Sign in
                </Link>
              </p>
              <Button type="submit" className="mt-3" disabled={isPending}>
                {isPending ? <Loader /> : "Register"}
              </Button>

              <p className="text-gray-800 font-semibold text-sm text-center">
                OR
              </p>

              <div className="w-full flex justify-center">
                <Button
                  onClick={() => googleRegister()}
                  type="button"
                  className="flex items-center gap-3"
                >
                  <img
                    src="/images/google-icon.png"
                    alt="google-icon"
                    className="w-6"
                  />
                  Sign up with Google
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      {stage === 2 && <SignupContact user={user} loadingUser={loadingUser} />}
    </>
  );
};

export default SignupForm;
