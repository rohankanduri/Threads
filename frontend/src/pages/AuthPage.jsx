import React from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard';
import authScreenAtom from '../atmos/authAtom';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return (
     <>
        <LoginCard />
     </>
  );
};

export default AuthPage;