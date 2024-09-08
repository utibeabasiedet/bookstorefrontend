"use client";

import React, { useState } from "react";
import Image from "next/image";
import forgetpassword from "../../../../public/assets/images/auth/login.svg";
import leftArrow from "../../../../public/assets/images/auth/leftarrow.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgot_password } from "@/services/api/accountService";

import notify, { NotifyType } from "@/services/notification";

import { FaSpinner } from "react-icons/fa";
import CustomButton from "../../../../components/CustomBotton";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^\+?[0-9]{1,3}-?[0-9]{3,14}$/;

const validationSchema = z.object({
  emailOrPhone: z.string().refine(
    (value) => {
      return emailRegex.test(value) || phoneRegex.test(value);
    },
    { message: "Email address or Nigerian phone number is invalid." }
  ),
});
type formData = z.infer<typeof validationSchema>;

const ForgetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmitForm = async (account: formData) => {
    try {
      setIsLoading(true);

      const { data } = await forgot_password(account);
      notify(data.message, NotifyType.SUCCESS);

      router.push(`/reset-password?email=${account.emailOrPhone}`);
    } catch (error: any) {
      notify(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center ">
        <div className="bg-sign  w-[50vw] hidden lg:block ">
          <div>
            <Image src={forgetpassword} alt="img" />
          </div>
          <div className="bg-signin pt-12 pb-[98px]">
            <div className="max-w-[366px]   ml-10 ">
              <span className="text-[#F6F9FF] text-[28px]">
                Recharge your meter like never before.
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-[50vw]  flex-col items-center mt-[108px]">
          {/* <span className=" "> */}
          <Link
            href="/login"
            className="text-primary text-[16px] font-medium w-[343px]  sm:w-[404px]  flex gap-2 "
          >
            <Image src={leftArrow} alt="img" /> <span>Back</span>
          </Link>

          {/* </span> */}
          <h2 className="text-primary text-[36px] items-start w-[343px]  sm:w-[404px]  font-medium">
            Forgot Password
          </h2>
          <p className="items-start w-[343px]  sm:w-[404px]  text-[#56585C]">
            Enter your credentials below to reset password.
          </p>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className=" flex flex-col gap-4 mt-[48px]"
          >
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="email" className="text-[#808184]">
                Email Address
              </label>
              <input
                className="border w-[343px]  sm:w-[404px]  focus:outline-primary h-[48px] rounded-lg px-[14px]"
                type="text"
                placeholder="Enter email address"
                {...register("emailOrPhone")}
              />
              <span className="text-red-500 text-sm font-semibold ">
                {errors.emailOrPhone && errors.emailOrPhone?.message}
              </span>
            </div>

            <CustomButton
              title={
                isLoading ? (
                  <FaSpinner className="animate-spin mr-2 h-6 w-6" />
                ) : (
                  "   Send Reset Link"
                )
              }
              btnType="submit"
              containerStyles="border border-primary h-full rounded-md w-full"
              isDisabled={isLoading}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
