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
import { SigninValidation } from "@/lib/validation";
import { useCurrentUser } from "@/react-query/user";
import { LoginUserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const SigninForm = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const { mutate: googleLoginApi } = useMutation({
  //   mutationFn: async (email: string) => {
  //     const { data } = await axios.post(
  //       `${BACKEND_URL}/user/google-login`,
  //       { email },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["user"] });
  //     navigate("/");
  //     return toast({
  //       title: "Login Successfull",
  //       description: "Welcome back to delvex training portal.",
  //     });
  //   },
  //   onError: (err) => {
  //     if (axios.isAxiosError(err)) {
  //       return toast({
  //         title: "Something went wrong",
  //         description: err.response?.data.message,
  //         variant: "destructive",
  //       });
  //     }
  //     return toast({
  //       title: "Something went wrong, please try again later",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${codeResponse.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       googleLoginApi(data.email);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Something went wrong",
  //       description: "Please try to register later",
  //       variant: "destructive",
  //     });
  //   },
  // });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (payload: LoginUserType) => {
      const { data } = await axios.post(`${BACKEND_URL}/user/login`, payload, {
        withCredentials: true,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      return toast({
        title: "Login Successfull",
        description: "Welcome back to delvex training portal.",
      });
      // navigate("/");
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

  function onSubmit(values: z.infer<typeof SigninValidation>) {
    const payload: LoginUserType = {
      email: values.email,
      password: values.password,
    };
    loginUser(payload);
  }

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="flex flex-col items-center bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full mx-4">
          <img src="/images/delvex-logo.png" alt="logo" className="h-10 w-10" />
          <h2 className="h2-bold text-center text-blue-500">Welcome back</h2>
          <p className="text-center mb-4 text-blue-400">
            Log in to continue using delvex trainer portal
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="shadcn-form-row">
                      <FormLabel className="shadcn-form-label text-blue-500 text-lg font-[600]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                          className="form-input rounded-lg border-[1px] border-blue-300 bg-blue-100/30 max-w-4xl placeholder:text-zinc-700 text-zinc-900"
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
                      <FormLabel className="shadcn-form-label text-blue-500 text-lg font-[600]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          className="form-input rounded-lg border-[1px] border-blue-300 bg-blue-100/30 max-w-4xl placeholder:text-zinc-700 text-zinc-900"
                          type="password"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-start" />
                  </FormItem>
                )}
              />
              {/* <p className="text-center font-semibold">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-600">
                  Sign up
                </Link>
              </p> */}
              <Button
                type="submit"
                className="mt-3 text-lg font-[500] bg-[#027efe] hover:bg-blue-500/90"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "Login"}
              </Button>
              {/* 
              <p className="text-gray-800 font-semibold text-sm text-center">
                OR
              </p>
              <div className="w-full flex justify-center">
                <Button
                  onClick={() => googleLogin()}
                  type="button"
                  className="flex items-center gap-3"
                >
                  <img
                    src="/images/google-icon.png"
                    alt="google-icon"
                    className="w-6"
                  />
                  Sign in with Google
                </Button>
              </div> */}
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default SigninForm;
