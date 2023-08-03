"use client";
import Modal from "./modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Inputs/input";
import Button from "../button";
const RegisterModal = () => {
  const isOpen = false;
  const dummy = () => {
    return;
  };
  const onClose = () => {
    return;
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
  const footer = <Button onClick={dummy} label="Register" full={true}></Button>;
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

export default RegisterModal;
