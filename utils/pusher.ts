import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1561559',
  key: 'cf8f11bbb6123bc7ac78',
  secret: '2dbea7608395ed642c00',
  cluster: 'us2',
  useTLS: true,
});

export { pusher };
