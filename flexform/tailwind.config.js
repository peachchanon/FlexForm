module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.html',
      './src/**/*.vue',
    ],
  },
  prefix: 'tw-',
  darkMode: false,
  theme: {
    fontWeight: {
      'light': '300',
      'medium': '500',
      'semibold': '700'
    },
    borderRadius: {
      '10': '10px',
      '12': '12px'
    },
    extend: {
      colors: {
        'grey10': '#102A43',
        'grey9': '#243B53',
        'grey8': '#334E68',
        'grey7': '#486581',
        'grey6': '#627D98',
        'grey5': '#829AB1',
        'grey4': '#9FB3C8',
        'grey3': '#BCCCDC',
        'grey2': '#D9E2EC',
        'grey1': '#F0F4F8',
        'blue10': '#003E6B',
        'blue9': '#0A558C',
        'blue8': '#0F609B',
        'blue7': '#186FAF',
        'blue6': '#2680C2',
        'blue5': '#4098D7',
        'blue4': '#62B0E8',
        'blue3': '#84C5F4',
        'blue2': '#B6E0FE',
        'blue1': '#DCEEFB',
        'green10': '#004440',
        'green9': '#016457',
        'green8': '#048271',
        'green7': '#079A82',
        'green6': '#17B897',
        'green5': '#2DCCA7',
        'green4': '#5FE3C0',
        'green3': '#8EEDD1',
        'green2': '#C6F7E9',
        'green1': '#F0FCF9',
        'yellow10': '#513C06',
        'yellow9': '#513C06',
        'yellow8': '#513C06',
        'yellow7': '#513C06',
        'yellow6': '#513C06',
        'yellow5': '#513C06',
        'yellow4': '#513C06',
        'yellow3': '#513C06',
        'yellow2': '#513C06',
        'yellow1': '#513C06',
        'red10': '#610404',
        'red9': '#780A0A',
        'red8': '#911111',
        'red7': '#A61B1B',
        'red6': '#BA2525',
        'red5': '#D64545',
        'red4': '#E66A6A',
        'red3': '#F29B9B',
        'red2': '#FACDCD',
        'red1': '#FFEEEE',
      }
    },
  },
  variants: {
  },
  plugins: [
  ],
}