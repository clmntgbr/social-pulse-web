"use client";

import { ToastFail } from "@/components/library/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentLocale } from "@/locales/client";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Page() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}api`);
  console.log(`${process.env.PUBLIC_API_URL}api`);
  const locale = useCurrentLocale();

  const formik = useFormik({
    initialValues: {
      email: "clement@gmail.com",
      password: "clement",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: async (values) => {
      axios
        .post("/api/signin", values)
        .then(() => {
          window.location.href = `/${locale}`;
        })
        .catch(() => {
          ToastFail("Something went wrong.", "There was a problem with your request.");
        });
    },
  });

  return (
    <>
      <form className="sign-in" onSubmit={formik.handleSubmit}>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={`${formik.touched.email && formik.errors.email ? "text-red-800" : ""}`}>
              Email*
            </Label>
            <Input
              className={`${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="email"
            />

            <Label htmlFor="password" className={`${formik.touched.password && formik.errors.password ? "text-red-800" : ""}`}>
              Password*
            </Label>
            <Input
              className={`${formik.touched.password && formik.errors.password ? "border-red-500" : ""}`}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="password"
            />
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
