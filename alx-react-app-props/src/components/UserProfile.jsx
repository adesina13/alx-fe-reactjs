// ProfilePage.jsx
import React from 'react';
import UserInfo from './UserInfo';

function ProfilePage() {
  const userData = useContext(UserContext);
  return <UserInfo />;
}

export default ProfilePage;
