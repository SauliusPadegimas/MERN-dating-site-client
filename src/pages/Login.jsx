import React, { useState } from 'react';

function Login() {
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });
  const [loading, setLoading] = useState(true);
  const [registerOn, setRegisterOn] = useState(true);

  return (
    <div className='login-page'>
      <div className='bg-video'>
        <video
          className='bg-video__content'
          autoPlay
          muted
          loop
          onCanPlay={() => setLoading(false)}
        >
          <source src={'http://localhost:4000/images/video.mp4'} type='video/mp4' />
          Your browser is not supported to play this video!
        </video>
      </div>
      <div className='login'>
        <h1 className='login__heading'>Senior Tinder</h1>
        <div className='login__hero'>
          <h2 className='login__sub-heading'>Dating app for senior people</h2>
          <div className='login__tabs'>
            <label
              htmlFor='regForm'
              className='radio-label radio-label--reg'
              style={registerOn ? { zIndex: 1 } : { zIndex: 0 }}
              onClick={() => setRegisterOn(true)}
            >
              Register
            </label>
            <label
              htmlFor='logForm'
              className='radio-label radio-label--log'
              style={registerOn ? { zIndex: 0 } : { zIndex: 1 }}
              onClick={() => setRegisterOn(false)}
            >
              Log In
            </label>
          </div>
          <div className='radio-content'>
            <input
              type='radio'
              name='formSelector'
              id='regForm'
              className='radio-toggle'
              defaultChecked
            />
            <div className='radio-body radio-body--reg'>
              <form className='login-form'>
                <h4 className='login-form__disclaimer login-form__disclaimer--blue'>
                  *All fields required!
                </h4>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regName'
                    className='login-form__input'
                    placeholder='User name'
                  />
                  <label htmlFor='regName' className='login-form__label'>
                    User name
                  </label>
                </div>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regPas1'
                    className='login-form__input'
                    placeholder='Password'
                  />
                  <label htmlFor='regPas1' className='login-form__label'>
                    Password
                  </label>
                </div>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regPas2'
                    className='login-form__input'
                    placeholder='Repeat Password'
                  />
                  <label htmlFor='regPas2' className='login-form__label'>
                    Repeat Password
                  </label>
                </div>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regCity'
                    className='login-form__input'
                    placeholder='City'
                  />
                  <label htmlFor='regCity' className='login-form__label'>
                    City
                  </label>
                </div>
                <div className='login-form__group'>
                  <input
                    type='date'
                    id='regAge'
                    className='login-form__input'
                    placeholder='Birth Date'
                  />
                  <label htmlFor='regAge' className='login-form__label'>
                    Birth Date
                  </label>
                </div>
                <button className='btn btn--blue'>SUBMIT</button>
              </form>
            </div>
          </div>
          <div className='radio-content'>
            <input type='radio' name='formSelector' id='logForm' className='radio-toggle' />
            <div className='radio-body radio-body--log'>
              <form className='login-form'>
                <h4 className='login-form__disclaimer login-form__disclaimer--light'>
                  *All fields required!
                </h4>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regName'
                    className='login-form__input'
                    placeholder='User name'
                  />
                  <label htmlFor='regName' className='login-form__label login-form__label--light'>
                    User name
                  </label>
                </div>
                <div className='login-form__group'>
                  <input
                    type='text'
                    id='regPas1'
                    className='login-form__input'
                    placeholder='Password'
                  />
                  <label htmlFor='regPas1' className='login-form__label login-form__label--light '>
                    Password
                  </label>
                </div>
                <button className='btn btn--light'>SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
