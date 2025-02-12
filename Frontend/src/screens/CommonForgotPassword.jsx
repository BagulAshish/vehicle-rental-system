import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../service/customer';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();

    
    if (!email || !securityQuestion || !securityQuestionAnswer || !newPassword || !confirmPassword) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }

    try {
      
      const result = await resetPassword(email, securityQuestion, securityQuestionAnswer, newPassword);
      if (result.status === 201) {
        toast.success('Password successfully reset');
        navigate('/login')
      } else {
        toast.error(result.error || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center vh-100'>
        <div className='col-md-6'>
          <div className='card shadow-lg'>
            <div className='card-body'>
              <h2 className='text-center mb-4 text-primary'>Forgot Password</h2>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                
                <div className='mb-3'>
                  <label htmlFor='securityQuestion' className='form-label'>
                    Select a Security Question
                  </label>
                  <select
                    id='securityQuestion'
                    className='form-select'
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    required
                  >
                    <option value=''>--Select a Security Question--</option>
                    <option value="PET">What is your pet's name?</option>
                    <option value="MAIDEN">What is your mother's maiden name?</option>
                    <option value="SCHOOL">What was the name of your elementary school?</option>
                    <option value="COLOUR">What is your favorite color?</option>
                    <option value="NICKNAME">What is your childhood nickname?</option>
                  </select>
                </div>

               
                <div className='mb-3'>
                  <label htmlFor='securityQuestionAnswer' className='form-label'>
                    Answer to Security Question
                  </label>
                  <input
                    type='text'
                    id='securityQuestionAnswer'
                    className='form-control'
                    value={securityQuestionAnswer}
                    onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='newPassword' className='form-label'>
                    New Password
                  </label>
                  <input
                    type='password'
                    id='newPassword'
                    className='form-control'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Confirm New Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    className='form-control'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='d-grid gap-2'>
                  <button type='submit' className='btn btn-primary btn-lg'>
                    Reset Password
                  </button>
                </div>

                <div className='text-center mt-3'>
                  <Link to='/login' className='btn btn-link'>
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
