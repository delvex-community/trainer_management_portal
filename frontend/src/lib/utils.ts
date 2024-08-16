import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const calculateRating = (ratings: any) => {
  let overallRating =
    (ratings?.rating1 +
      ratings?.rating2 +
      ratings?.rating3 +
      ratings?.rating4 +
      ratings?.rating5) /
    5;

  return overallRating;
};
