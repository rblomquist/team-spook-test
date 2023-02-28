import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../../../apolloClient";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    graphql?:string;
  }>({});

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onError: (error: any) => {
      setErrors({
        graphql: error.message,
      });
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    const newFormData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    if (!newFormData.email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "This field is required",
      }));
    }
    if (!newFormData.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "This field is required",
      }));
    }
    if (newFormData.password !== newFormData.confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords must match",
      }));
    }
    if (Object.keys(errors).length === 0) {
      registerUser({
        variables: {
          email: email,
          password: password,
        },
      })
        .then((result) => console.log(result))
        .catch((error: Error) => {
          setErrors((prevState) => ({ ...prevState, graphql: error.message }));
          console.error(error);
        });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <FaUser className="icon" />
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Email or username"
          value={email}
          onChange={handleInputChange}
        />
        {errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
      <div className="input-container">
        <FaLock className="icon" />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
      <div className="input-container">
        <FaLock className="icon" />
        <input
          className="input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>
      <button className="button" type="submit">
        Sign up
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {errors.graphql && <p>Error: {errors.graphql}</p>}
    </form>
  );
};
