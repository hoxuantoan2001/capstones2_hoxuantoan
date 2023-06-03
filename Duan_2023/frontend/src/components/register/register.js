import { Fragment, useState, useRef } from "react";
import Img from "../../img/dautubatdongsanx.png";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/userSlice/registerSlice";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isEmpty } from "validator";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const error = useSelector((state) => state.registers.error);
  const message = useSelector((state) => state.registers.message);
  const message2 = useSelector((state) => state.registers.message2);
  const [open, setOpen] = useState(false);
  const [ErrorName, setErrorName] = useState(false);
  const [errorPhonenumber, setErrorPhonenumber] = useState(false);
  const dispatch = useDispatch();
  const form = useRef();

  console.log("error", error);
  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("user", userData);
    setIsLoading(true);

    if (userData.name.length === 0) {
      setErrorName(true);
    }
    if (userData.username.length === 0) {
      setErrorPhonenumber(true);
    }

    await dispatch(signup(userData));
    setIsLoading(false);

    setRedirect(true);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log("hsbha.", userData);
  };
  const required = (value) => {
    if (isEmpty(value)) {
      return (
        <small className=" text-red-500 text-sm">
          <br />
          This field is required
        </small>
      );
    }
  };

  const email = (value) => {
    if (!isEmail(value)) {
      return (
        <small className=" text-red-500 text-sm">
          <br />
          Invalid email format
        </small>
      );
    }
  };

  const minLength = (value) => {
    if (value.trim().length < 6) {
      return (
        <small className=" text-red-500 text-sm">
          <br />
          Password must be at least 6 characters long
        </small>
      );
    }
  };

  return (
    <div className="w-1/4 h-100 border border-black content-center bg-neutral-800 inline-block py-2 rounded-lg">
      <a href="/" className="text-amber-600 text-3xl text-center block my-5  ">
        {""}
        Register
      </a>

      <Form onSubmit={handleSignup} ref={form} className="form_container-login">
        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-8 rounded-md bg-neutral-600"
            type="text"
            placeholder=" Name"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />

          {ErrorName && userData.name <= 0 ? (
            <small className=" text-red-500 text-sm">
              <br />
              This field is required
            </small>
          ) : (
            ""
          )}
        </div>

        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-8 rounded-md bg-neutral-600"
            type="text"
            placeholder=" Phone number"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          {errorPhonenumber && userData.username <= 0 ? (
            <small className=" text-red-500 text-sm">
              <br />
              This field is required
            </small>
          ) : (
            ""
          )}
        </div>

        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-8 rounded-md bg-neutral-600"
            type="email"
            placeholder="Email "
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            validations={[required, email]}
          />
        </div>

        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-8 rounded-md bg-neutral-600"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            validations={[required, minLength]}
          />
        </div>
      </Form>

      <a
        onClick={handleSignup}
        href="/"
        className="border border-black inline-block my-4 w-9/12 h-8 rounded-md bg-neutral-600 hover:bg-neutral-400"
      >
        {" "}
        Register
      </a>
      <br />
      {error && <div className="text-red-500">{error}</div>}
      {message === "User was registered successfully!" ? (
        <button className="text-green-500" type="submit">
          {message}
        </button>
      ) : message2 === "valid" && userData.email.length > 0 ? (
        <div className="text-red-500">{message2} email or phone number</div>
      ) : (
        <Fragment></Fragment>
      )}

      <a href="" className="">
        <h3 className="text-white">Do you already have an account?</h3>{" "}
        <h3 className="text-blue-500 underline">
          {" "}
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </h3>
      </a>
    </div>
  );
}
