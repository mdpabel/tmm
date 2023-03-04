import Input, { Label, TextArea } from '@/components/Input';
import React, { useState } from 'react';
import { CardWrapper } from '@/components/Card';
import Button from '@/components/Button';
import AppLayout from '@/layouts/AppLayout';

const initialState = {
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [state, setState] = useState({ ...initialState });

  const { email, subject, message } = state;

  return (
    <CardWrapper>
      <div className='max-w-screen-md mx-auto'>
        <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-700 '>
          Contact Us
        </h2>
        <p className='mb-8 font-light text-center text-gray-500 lg:mb-16 sm:text-xl'>
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form className='space-y-3'>
          <div>
            <Label htmlFor='email'>Your email</Label>
            <Input
              placeholder='user@tmmemploy.com'
              id='email'
              onChange={(e) => setState({ ...state, email: e.target.value })}
              value={email}
              required={true}
              type='string'
            />
          </div>
          <div>
            <Label htmlFor='suject'>Subject</Label>
            <Input
              placeholder='Let us know how we can help you'
              id='suject'
              onChange={(e) => setState({ ...state, subject: e.target.value })}
              value={subject}
              required={true}
              type='string'
            />
          </div>
          <div className='sm:col-span-2'>
            <Label htmlFor='subject'>Message</Label>
            <TextArea
              id='subject'
              placeholder='Leave a comment...'
              onChange={(e) => setState({ ...state, message: e.target.value })}
              value={message}
            />
          </div>
          <Button intent='primary' type='submit'>
            Send message
          </Button>
        </form>
      </div>
    </CardWrapper>
  );
};

Contact.layout = AppLayout;

export default Contact;
