import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import logo from './mayflower-react-logo.png';

const theme = create({
    base: 'light',

    colorSecondary: '#14558F',

    appBg: '#F2F2F2',
    appBorderColor: '#DCDCDC',
    appBorderRadius: 6,

    barTextColor: '#707070',
    barSelectedColor: '#14558F',
    barBg: '#F2F2F2',

    inputBg: 'white',
    inputBorder: '#DCDCDC',
    inputTextColor: '#141414',
    inputBorderRadius: 4,

    brandImage: logo,
    brandTitle: 'Mayflower React',
    brandUrl: 'https://github.com/massgov/mayflower'
});

const storyKindOrder = [
    'about', // storyKindOrder.indexOf -1 follow alphabetical order
    'brand', // storyKindOrder.indexOf -1 follow alphabetical order
    'dataviz', // storyKindOrder.indexOf -1 follow alphabetical order
    'forms|atoms',
    'forms|molecules',
    'forms|organisms',
    'forms|context',
    'atoms',
    'molecules',
    'organisms',
    'templates',
    'pages'
];

addons.setConfig({
    showNav: true,
    showPanel: true, // show the code panel by default,
    storySort: (a, b) => {
        const aKind = a[1].kind.split('/')[0];
        const bKind = b[1].kind.split('/')[0];
        return (storyKindOrder.indexOf(aKind) - storyKindOrder.indexOf(bKind)) || a[1].id.toLowerCase().localeCompare(b[1].id.toLowerCase(), undefined, { numeric: true });
    },
    theme,
});