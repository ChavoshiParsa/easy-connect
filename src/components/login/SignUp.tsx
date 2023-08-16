import Input from '&/UI/Input';

export default function SignUp() {
  return (
    <>
      <Input type='email' name='email' label='Email' />
      <Input type='password' name='password' label='Password' />
    </>
  );
}
