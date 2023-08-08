"use client";
import Modal from "./modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Inputs/input";
import Button from "../button";
import { onClose as onCloseRegisterModal } from "@/app/store/registerModalSlice";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
const RegisterModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.registerModalSlice.isOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const validateEmail = (value: string) => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    return isValid || "Invalid email address";
  };
  const onClose = () => {
    dispatch(onCloseRegisterModal());
  };
  const switchToLogin = () => {
    onClose();
    dispatch(onOpenLoginModal());
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  register("email", {
    required: { value: true, message: "You should have an email!" },
    minLength: 5,
    validate: { validateEmail },
  });
  register("userName", {
    required: { value: true, message: "You should have an username!" },
    minLength: 5,
  });

  register("password", {
    required: { value: true, message: "You should have a password!" },
    minLength: 5,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  const title = <div className="text-elife-500 text-lg">Register</div>;
  const body = (
    <div className="flex flex-col justify-center items-start w-full gap-4 my-4 mb-10">
      <div className="text-elife-400 text-xl">Welcome to Elife !</div>

      <Input
        id="email"
        label="Email"
        errors={errors}
        register={register}
        required
      ></Input>
      <Input
        id="userName"
        label="Username"
        errors={errors}
        register={register}
        required
      ></Input>
      <Input
        id="password"
        label="Password"
        errors={errors}
        register={register}
        type="password"
        required
      ></Input>
    </div>
  );
  const footer = (
    <div>
      {" "}
      <Button
        onClick={handleSubmit(onSubmit)}
        label="Register"
        full={true}
      ></Button>
      <div className="mt-5">
        Already have an account?{" "}
        <span
          className="hover:text-blue-600 cursor-pointer text-blue-500"
          onClick={switchToLogin}
        >
          Login now!
        </span>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      body={body}
      footer={footer}
    ></Modal>
  );
};

export default RegisterModal;
