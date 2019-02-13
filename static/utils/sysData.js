export default {
  validate: {
    password: /^[a-zA-Z\d_]{6,16}$/,
    phone: /^((13[0-9]{9})|(14[0-9]{9})|(15[0-35-9][0-9]{8})|(17[0-9]{9})|(18[0-9]{9}))$/,
  },
  storage: {
    user: 'WZQ_history'
  },
};
