import Loader from "@/components/Loader";
import ProfileUploader from "@/components/ProfileUploader";
import TrainerTechCheckbox from "@/components/TrainerTechCheckbox";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { TrainerValidation } from "@/lib/validation";
import { useAllTechnologies } from "@/react-query/technology";
import { useTrainerById } from "@/react-query/trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const UpdateTrainer = () => {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const { trainer, isLoading } = useTrainerById(trainerId || "");
  const [technologies, setTechnologies] = useState<String[]>([]);
  const { allTechnologies } = useAllTechnologies();

  useEffect(() => {
    form.reset({
      name: trainer?.name || "",
      email: trainer?.email || "",
      contact: String(trainer?.contact) || "",
      file: trainer?.avatar || [],
      location: trainer?.location || "",
    });
    setTechnologies(trainer?.tech || []);
  }, [trainer]);

  const form = useForm<z.infer<typeof TrainerValidation>>({
    resolver: zodResolver(TrainerValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      file: [],
      location: "",
    },
  });

  const { mutate: updateTrainer, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.patch(
        `${BACKEND_URL}/trainer/update/${trainerId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      navigate(`/admin/trainers/${trainerId}`);
      return toast({
        title: "Updated Successfully",
        description: "Trainer information have been updated.",
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
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof TrainerValidation>) {
    const data = { ...values, tech: technologies };
    updateTrainer(data);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Update Trainer</h2>
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
              render={() => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Tech Stack
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Technologies" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[150px]">
                            <div className="flex flex-col gap-2 overscroll-auto px-3 py-2">
                              {allTechnologies?.data.map(
                                (tech: { name: string }) => (
                                  <TrainerTechCheckbox
                                    key={tech.name}
                                    value={tech.name}
                                    technologies={technologies}
                                    setTechnologies={setTechnologies}
                                  />
                                )
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={trainer.avatar}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-3 mt-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader /> : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTrainer;
