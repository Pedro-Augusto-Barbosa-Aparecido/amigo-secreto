/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'just-me': ['Just Me Again Down Here', 'cursive', 'sans-serif'],
        'istok-web': ['Istok Web', 'sans-serif'],
        'quick-sand': ['Quicksand', 'sans-serif']
      },
      colors: {
        'dark-blue': {
          600: '#024DA1'
        },
        'blue-hv': {
          100: 'rgba(2, 77, 161, 0.17)',
          200: 'rgba(66,119,178,255)'
        },
        'dark-orange': {
          600: '#F05321',
          700: '#ED673D'
        },
        'gray-back': {
          100: "hsla(234, 45%, 15%, 0.16)",
          200: "rgba(0, 0, 0, 0.25)",
          400: '#D9D9D926',
          500: '#F0F0F0',
          600: '#D9D9D9'
        }
      },
      borderRadius: {
        'nl': '10px'
      },
      backgroundImage: {
        'login-img': "url(/imgs/img-background.png)"
      },
      height: {
        'img-back': 'calc(100vh - 112px - 48px)',
        'in': '62px',
        'log': '66px',
        'register': 'calc(100vh - 112px)',
        'with-nav': 'calc(100vh - 112px)',
        'tab': '35rem',
        'item': '80px'
      },
      width: {
        'form-login': '482px'
      },
      fontSize: {
        'default': '28px'
      },
      borderWidth: {
        'sm': '1px',
        'error': '3px',
        'st': '10px'
      },
      margin: {
        '0-5': '1px'
      },
      top: {
        'pass': '90%'
      },
    },
  },
  plugins: [],
}
