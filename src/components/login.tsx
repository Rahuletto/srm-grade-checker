import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'utils/cookies';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookie, setCookieLocal] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  useEffect(() => {
    console.log('Username:', username);
    console.log('Password:', password);

    if (loggedIn) {
      try {
        fetch('https://proscrape.vercel.app/api/login', {
          method: 'POST',
          headers: {
            Origin: 'https://proscrape.vercel.app',
            Referer: 'https://proscrape.vercel.app',
            Host: 'proscrape.vercel.app',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: username,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.cookies) {
              setCookie('token', res.cookies);
              console.log(cookie);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [loggedIn, username, password]);

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            console.log(e);
            setPassword(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
