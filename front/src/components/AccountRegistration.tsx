import { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function AccountRegistration() {
  const [password, setPassword] = useState('');
  const { user_id }: { user_id: string } = useParams();
  const history = useHistory();

  var submit = () => {
    axios
      .put('http://localhost:3001/api/user/register/' + user_id, {
        password: password,
      })
      .then((res) => {
        if (res.data.saved) history.replace('/');
      });
  };
  return (
    <div>
      <h1>Register</h1>
      <input
        type='password'
        placeholder='Your Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Register</button>
    </div>
  );
}

export default AccountRegistration;
