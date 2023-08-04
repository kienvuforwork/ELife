"use client";
import Modal from "./modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Inputs/input";
import Button from "../button";
import { onClose as onCloseLoginModal } from "@/app/store/loginModalSlice";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
const LoginModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.loginModalSlice.isOpen
  );
  const dispatch: AppDispatch = useDispatch();

  const dummy = () => {
    return;
  };
  const onClose = () => {
    dispatch(onCloseLoginModal());
  };

  const switchToRegister = () => {
    onClose();
    dispatch(onOpenRegisterModal());
  };

  const onSubmit = () => {
    return;
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
  const title = <div className="text-elife-500 text-lg">Log in</div>;
  const body = (
    <div className="flex flex-col justify-center items-start w-full gap-4 my-4 mb-10">
      <div className="text-elife-400 text-xl">Welcome Back !</div>
      <Input
        id="userName"
        label="User name"
        errors={errors}
        register={register}
        required
      ></Input>
      <Input
        id="password"
        label="Password"
        errors={errors}
        register={register}
        required
      ></Input>
    </div>
  );
  const footer = (
    <div>
      {" "}
      <Button onClick={dummy} label="Register" full={true}></Button>
      <div className="mt-5">
        Do not have account?{" "}
        <span
          className="hover:text-blue-600 cursor-pointer text-blue-500"
          onClick={switchToRegister}
        >
          Join us!
        </span>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={title}
      body={body}
      footer={footer}
    ></Modal>
  );
};

export default LoginModal;
