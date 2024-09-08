"use client";
import React, { useState } from "react";
import Image from "next/image";
import forgetpassword from "../../../../public/assets/images/auth/forgetpassword.png";
import leftArrow from "../../../../public/assets/images/auth/arrowleft.png";
import Link from "next/link";
import { reset_password } from "@/services/api/accountService";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../../../components/CustomBotton";
import useStateManager from "@/services/stateManager";
import notify, { NotifyType } from "@/services/notification";

import { BsFillEyeSlashFill } from "react-icons/bs";
import eye from "../../../../public/assets/images/auth/eye.svg";

const validationSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password should contain at least one capital letter.",
    })
    .refine((value) => /[@$%*~^!]/.test(value), {
      message: "Password should contain at least one of @$%*~^! characters.",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password should contain at least one number.",
    }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password should contain at least one capital letter.",
    })
    .refine((value) => /[@$%*~^!]/.test(value), {
      message: "Password should contain at least one of @$%*~^! characters.",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password should contain at least one number.",
    }),
});

const extendedSchema = validationSchema.extend({
  emailOrPhone: z.string().email({ message: "Email address is invalid." }),
  resetCode: z.string().refine(
    (value) => value.length >= 4, // assuming resetCode should be 6 characters long
    { message: "resetCode is incorrect." }
  ),
});

type formData = z.infer<typeof extendedSchema>;

const NewPassword = () => {
  const { auth, emailAddress } = useStateManager();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShowNew, setPasswordShowNew] = useState(false);
  const [passwordShowConfirm, setPasswordShowConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(validationSchema),
  });

  const togglePasswordNew = () => {
    setPasswordShowNew(!passwordShowNew);
  };
  const togglePasswordConfirm = () => {
    setPasswordShowConfirm(!passwordShowConfirm);
  };
  const onSubmitForm = async (account: formData) => {
    try {
      setIsLoading(true);
      account.resetCode = auth.resetCode.get();
      account.emailOrPhone = emailAddress.get();

      const { data } = await reset_password(account);

      notify(data.message, NotifyType.SUCCESS);

      router.push("/login");
    } catch (error: any) {
      notify(error.response.data.message);

      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center ">
        <div className="bg-sign hidden lg:block w-[50vw]">
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
        <div className="flex sm:w-[50vw]  flex-col sm:items-center mt-[1.56rem] sm:mt-[108px]">
          <span className="sm:w-[404px] text-[#56585C] flex gap-2 text-[16px] font-medium">
            <Link href="/login" className="flex">
              <Image src={leftArrow} alt="img" /> <span>Back to Login</span>
            </Link>
          </span>
          <h2 className="text-primary mt-[2.5rem] text-[1.5rem] sm:text-[36px] items-start sm:w-[404px]  font-medium">
            Create New Password
          </h2>
          <p className="items-start mt-[1rem] w-full sm:w-[404px] text-[#56585C]">
            Reset code confirm successfully.
          </p>
          <form
            action=""
            onSubmit={handleSubmit(onSubmitForm)}
            className=" flex w-[343px] sm:w-[25.25rem] flex-col gap-0 mt-[2rem]"
          >
            <div className="flex flex-col gap-[6px] relative">
              <label htmlFor="email" className="text-[#808184]">
                New Password
              </label>
              <input
                className="border w-full  outline-primary h-[48px]  rounded-lg px-[14px]"
                type={passwordShowNew ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password")}
              />
              <div
                className="absolute top-[43px] right-2"
                onClick={togglePasswordNew}
              >
                {passwordShowNew ? (
                  <BsFillEyeSlashFill className="text-primary-2101 text-[20px]" />
                ) : (
                  <Image src={eye} alt="eye" />
                )}
              </div>
              <span className="text-red-500 text-sm font-semibold ">
                {errors.password && errors.password?.message}
              </span>
              <br />
            </div>
            <div className="flex flex-col  gap-[6px] relative">
              <label htmlFor="email" className="text-[#808184]">
                Confirm New Password
              </label>
              <input
                className="border w-full outline-primary h-[48px] rounded-lg px-[14px]"
                type={passwordShowConfirm ? "text" : "password"}
                placeholder="Enter new password"
                {...register("confirmPassword")}
              />
              <div
                className="absolute top-[43px] right-2"
                onClick={togglePasswordConfirm}
              >
                {passwordShowConfirm ? (
                  <BsFillEyeSlashFill className="text-primary-2101 text-[20px]" />
                ) : (
                  <Image src={eye} alt="eye" />
                )}
              </div>
              <span className="text-red-500 text-sm font-semibold ">
                {errors.confirmPassword && errors.confirmPassword?.message}
              </span>
              <br />
            </div>

            <CustomButton
              title={
                isLoading ? (
                  <FaSpinner className="animate-spin mr-2 h-6 w-6" />
                ) : (
                  " Create"
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

export default NewPassword;
