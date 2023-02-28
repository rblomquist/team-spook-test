import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

type LoginFormInputs = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormInputs>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.username) {
      setErrors((prevState) => ({ ...prevState, username: 'This field is required' }));
    }
    if (!formData.password) {
      setErrors((prevState) => ({ ...prevState, password: 'This field is required' }));
    }
    console.log(formData);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className="input-container">
        <FaUser style={{}} className="icon" />
        <input
        style={{}}
        className='input'
          type="text"
          name="username"
          placeholder="Email or Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>
      <div className="input-container">
        <FaLock className="icon" />
        <input
           className='input'
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <button className="button" type="submit">Login</button>
    </form>
  );
};
