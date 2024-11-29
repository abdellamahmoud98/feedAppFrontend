import React, { useEffect, useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Field from "../../components/Field";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import LogoImage from "../../assets/images/logo.png";

import { loginApi } from "../../util/ApiUtil"; // this will call loginAPI which in turn calls the api from the 
import { AppContext } from "../../context/applicationContext"; //we will use the setsession() funct


const Login = () => {

  // declare the variable 
const formikRef = useRef();
const appContext = useContext(AppContext);
const [isFetching, setIsFetching] = useState(false); // the loading status until we get the update from the api then it will be set to true

useEffect(() => {
  document.title = "Login | Feed App";
}, []);


// function that is called when we call click on the login button
const onFormSubmit = async (values) => {
  console.log(values);// just to display it in the consle.log
  if (!isFetching) {
    setIsFetching(true);

    const apiResponse = await loginApi(values.username, values.password);
    const payLoad = apiResponse.payLoad;

    if (apiResponse.status === 1) {
      formikRef.current.setFieldValue("formMessage", "Login Successful");
      appContext.setUserData(payLoad.userData);
      appContext.setSession(payLoad.token);
      console.log(payLoad);
    } else {
      formikRef.current.setFieldValue("formMessage", payLoad);
    }
    setIsFetching(false);
}
 };

//yup validation for the field on the client side 
 const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

  return (
  <div className="bg-white">
    <div className="flex justify-center h-screen">
      <div className="hidden bg-cover lg:block lg:w-2/3 splash-container">
      <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
   <div>
     <h2 className="text-4xl font-bold text-white">Welcome,</h2>

     <p className="max-w-xl mt-3 text-gray-300">
       Let's Connect! Share your memories with the world.
     </p>
   </div>
</div>
      </div>



      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">{/* {#Section2 Header} */}
          <img src={LogoImage} width={120} className="mx-auto mb-2" />

<h2 className="text-4xl font-bold text-center text-gray-700">
    Feed App
</h2>

<p className="mt-3 text-gray-500">Login to access your account</p>
          </div>
          

          <div className="mt-8">
            {/* {#Section2 Form} */}

            <Formik
  innerRef={formikRef}
  initialValues={{
    username: "",
    password: "",
    formMessage: undefined,
  }}
  validationSchema={LoginSchema}
  onSubmit={onFormSubmit}
              >
  {({ values }) => (
    <Form>
      {values.formMessage && (
        <div>
          <Badge text={values.formMessage} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Field
            label="Username"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <Field
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div className="flex justify-end mt-2 mb-2">
        <Link
          to="/user/forgotPassword"
          className="text-sm text-gray-400 focus:text-purple-500 hover:text-purple-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <div className="mt-6">
        <Button text="Login" />
      </div>
    </Form>
  )}
</Formik>

            {/* {Section2 Footer} */}
            <p className="mt-6 text-sm text-center text-gray-400">
  Don&#x27;t have an account yet?{" "}
  <Link
    to="/user/register"
    className="text-purple-500 focus:outline-none focus:underline hover:underline"
  >
    Register
  </Link>
</p>
          </div>
        </div>
      </div>
    </div>
</div>
);
};

export default Login;
