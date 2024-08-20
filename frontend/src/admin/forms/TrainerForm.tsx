import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { TrainerValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import ProfileUploader from "@/components/ProfileUploader";

const TrainerForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof TrainerValidation>>({
    resolver: zodResolver(TrainerValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      tech: "",
      file: [],
    },
  });

  const { mutate: addTrainer, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${BACKEND_URL}/trainer/add`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess: (res) => {
      console.log(res);

      navigate("/admin/trainers");
      return toast({
        title: "Added Successfully",
        description: "New trainer have been added to the portal.",
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

  function onSubmit(values: z.infer<typeof TrainerValidation>) {
    addTrainer(values);
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Add Trainer</h2>
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
                        placeholder="Trainer's Full Name"
                        {...field}
                        className="form-input"
                        required={true}
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
                        placeholder="Trainer's Email"
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
                        placeholder="Trainer's Contact Info"
                        {...field}
                        className="form-input"
                        type="number"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Location
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Trainer's Location"
                          {...field}
                          className="form-input mb-2"
                          type="text"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tech"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Tech Stack
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Trainer's Tech Stack"
                          {...field}
                          className="form-input mb-2"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription>
                        Add tech stack seperated by ","
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader fieldChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
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

export default TrainerForm;
