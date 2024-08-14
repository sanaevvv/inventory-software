'use client';

import { Button } from '../ui/button';
import { logOut } from './_actions';

export const LogoutButton = () => {
  return (
    <form action={logOut}>
      <Button variant={'ghost'} className="w-full justify-start">
        Logout
      </Button>
    </form>
  );
};
