/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
  mode?: "onChange" | "onBlur" | "onSubmit" | "all";
}
interface Props extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  mode?: "onChange" | "onBlur" | "onSubmit" | "all";
}

const InventoryForm = ({
  children,
  resolver,
  defaultValues,
  onSubmit,
}: Props) => {
  const formConfig: IFormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  formConfig["mode"] = "onChange";

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;
  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)} className="space-y-6">
        {children}
      </form>
    </FormProvider>
  );
};

export default InventoryForm;
