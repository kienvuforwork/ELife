"use client";
import Modal from "./modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Inputs/input";
import Button from "../button";
import { onClose as onCloseLoginModal } from "@/app/store/loginModalSlice";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { postData } from "../helpers/fetchData";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.loginModalSlice.isOpen
  );
  const dispatch: AppDispatch = useDispatch();

  const onClose = () => {
    dispatch(onCloseLoginModal());
  };

  const switchToRegister = () => {
    onClose();
    dispatch(onOpenRegisterModal());
  };
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await postData("http://localhost:8080/auth/login", {
      ...data,
    });

    if (res.status === "success") {
      document.cookie = `token=${res.token}`;
      router.push("");
      dispatch(onCloseLoginModal());
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  register("username", {
    required: { value: true, message: "You should have an username!" },
    minLength: {
      value: 6,
      message: "Username should be at least 6 characters long",
    },
  });

  register("password", {
    required: { value: true, message: "You should have a password!" },
    minLength: {
      value: 8,
      message: "Password should be at least 6 characters long",
    },
  });

  const title = <div className="text-elife-500 text-lg">Log in</div>;
  const body = (
    <div className="flex flex-col justify-center items-start w-full gap-4 my-4 mb-10">
      <div className="text-elife-400 text-xl">Welcome Back !</div>
      <Input
        id="username"
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
        required
        type="password"
      ></Input>
    </div>
  );
  const footer = (
    <div>
      {" "}
      <Button
        onClick={handleSubmit(onSubmit)}
        label="Login"
        full={true}
      ></Button>
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
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      body={body}
      footer={footer}
    ></Modal>
  );
};

export default LoginModal;
