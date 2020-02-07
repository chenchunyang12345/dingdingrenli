import { message } from 'antd';

message.config({
  maxCount: 1,
});

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
