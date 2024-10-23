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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginUserType } from "@/types";
import { SigninValidation } from "@/lib/validation";

const SigninForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: admin } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/admin`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["user"],
    retry: false,
  });

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginAdmin, isPending } = useMutation({
    mutationFn: async (payload: LoginUserType) => {
      const { data } = await axios.post(`${BACKEND_URL}/admin/login`, payload, {
        withCredentials: true,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      navigate("/admin");
      return toast({
        title: "Login Successfull",
        description: "Welcome back to delvex training portal.",
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

  function onSubmit(values: z.infer<typeof SigninValidation>) {
    const payload: LoginUserType = {
      email: values.email,
      password: values.password,
    };
    loginAdmin(payload);
  }

  return (
    <>
      {admin ? (
        <Navigate to="/admin" />
      ) : (
        <div className="flex flex-col items-center bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full mx-4">
          <img src="/images/delvex-logo.png" alt="logo" className="h-10 w-10" />
          <h2 className="h2-bold text-center text-blue-500">Admin Login</h2>
          <p className="text-center mb-4 text-blue-400">
            Log in to admin account of delvex portal
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
                          placeholder="Your Email"
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
                          placeholder="Your Password"
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

              <Button
                type="submit"
                className="mt-3 text-lg font-[500] bg-[#027efe] hover:bg-blue-500/90"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default SigninForm;
