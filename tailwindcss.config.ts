import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'blue-01': '#D6F2FA',
        'blue-02': '#9FD8F0',
        'blue-03': '#0095CC',
        'red-01': '#FFEDED',
        'red-02': '#FFA59B',
        'red-03': '#FE7152',
        'dark': '#4C4C4C',
        'text': '#404040',
      },
    },
  },
};
