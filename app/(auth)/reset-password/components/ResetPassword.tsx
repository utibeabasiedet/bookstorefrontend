"use client";
import React, { useState } from "react";
import Image from "next/image";
import forgetpassword from "../../../../public/assets/images/auth/forgetpassword.png";
import leftArrow from "../../../../public/assets/images/auth/arrowleft.png";
import Link from "next/link";
import { validate_password_reset_code } from "@/services/api/accountService";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaSpinner } from "react-icons/fa";
import notify, { NotifyType } from "@/services/notification";

import CustomButton from "../../../../components/CustomBotton";
import useStateManager from "@/services/stateManager";

const validationSchema = z.object({
  resetCode: z.string().refine(
    (value) => value.length >= 4, // assuming resetCode should be 6 characters long
    { message: "resetCode is incorrect." }
  ),
});

type formData = z.infer<typeof validationSchema>;

const ResetPassword = () => {
  const { auth, emailAddress } = useStateManager();
  const searchparam = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      const emailParam = searchparam.get("email") ?? "";
      const { data } = await validate_password_reset_code({
        emailOrPhone: emailParam,
        resetCode: account.resetCode,
      });

      emailAddress.set(emailParam);
      auth.resetCode.set(account.resetCode);

      notify(data.message, NotifyType.SUCCESS);
      setTimeout(() => {
        router.push("/set-new-password");
      }, 2000);
    } catch (error: any) {
      notify(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <section className="flex justify-center ">
        <div className="bg-sign w-[50vw] hidden lg:block">
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
          <Link href="/login">
            <span className="w-[343px] sm:w-[404px] text-[#56585C] flex gap-2 text-[16px] font-medium">
              {" "}
              <Image src={leftArrow} alt="img" /> <span>Back to Login</span>
            </span>
          </Link>

          <h2 className="text-primary text-[36px] items-start w-[343px] sm:w-[404px]  font-medium">
            Reset Password
          </h2>
          <p className="items-start w-[343px] sm:w-[404px] text-[#56585C]">
            We've sent you a password reset code. Please check your SMS or email
            and enter the code below..
          </p>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            action=""
            className=" flex flex-col gap-4 mt-[32px]"
          >
            <div className="flex flex-col gap-[6px]">
              <div>
                <label htmlFor="email" className="text-[#808184]">
                  Reset Code
                </label>{" "}
                <br />
                <input
                  className="border w-[343px] sm:w-[404px] h-[48px] focus:outline-primary rounded-lg px-[14px]"
                  type="text"
                  placeholder="Enter reset code"
                  {...register("resetCode")}
                />{" "}
                <br />
                <span className="text-red-500 text-sm font-semibold ">
                  {errors.resetCode && errors.resetCode?.message}
                </span>
              </div>
            </div>

            <CustomButton
              title={
                isLoading ? (
                  <FaSpinner className="animate-spin mr-2 h-6 w-6" />
                ) : (
                  "  Confirm"
                )
              }
              btnType="submit"
              containerStyles="border border-primary h-full rounded-md w-full"
              isDisabled={isLoading}
            />
          </form>
          <div className="w-[343px] sm:w-[404px] h-[144px] bg-[#F6F9FF] mt-10 rounded-lg p-4">
            <div className="flex gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#075DED"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#56585C] text-[16px] font-medium">
                Didn't receive reset code?
              </span>
            </div>
            <div className="mt-[16px] w-[343px] sm:w-[404px] text-[#808184]">
              If you didn’t receive the password reset code in your mail or SMS,
              please click{" "}
              <Link href={"/forgot-password"}>
                <span className="text-primary">Resend</span>
              </Link>{" "}
              and we will send you a new one.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
