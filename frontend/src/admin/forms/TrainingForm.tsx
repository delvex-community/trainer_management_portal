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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { TrainingValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import TrainerDropdown from "@/components/TrainerDropdown";

const TrainingForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof TrainingValidation>>({
    resolver: zodResolver(TrainingValidation),
    defaultValues: {
      title: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      mode: "Offline",
      trainerId: "",
    },
  });

  const { mutate: addTraining, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${BACKEND_URL}/training/add`, payload);

      return data;
    },
    onSuccess: () => {
      navigate("/admin/trainings");
      return toast({
        title: "Added Successfully",
        description: "New training have been added to the trainer.",
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

  function onSubmit(values: z.infer<typeof TrainingValidation>) {
    addTraining(values);
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Add Training</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title here"
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
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">Mode</FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
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
              name="trainerId"
              render={({ field }) => (
                <FormItem className="shadcn-form-row">
                  <FormLabel className="shadcn-form-label">Trainer</FormLabel>
                  <FormControl>
                    <TrainerDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
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
                    <FormControl>
                      <Input
                        placeholder="Enter Location"
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center border-gray-200 border-[1px] rounded-md px-3 py-2 w-full">
                        <Calendar className="h-4 w-4" />
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      End Date
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center border-gray-200 border-[1px] rounded-md px-3 py-2 w-full">
                        <Calendar className="h-4 w-4" />
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3" disabled={isPending}>
              {isPending ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TrainingForm;
