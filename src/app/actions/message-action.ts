'use server';

export const sendMessage = async (data: FormData) => {
  let message = data.get('message')?.valueOf();

  // validation
  if (typeof message !== 'string' || message.length === 0) {
    throw new Error('Invalid message');
  }

  // if first message or no connection create connect
  // send message and update database
  return message;
};
