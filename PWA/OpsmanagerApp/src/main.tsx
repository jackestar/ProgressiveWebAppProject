import 'mdui/mdui.css';
import '@material-design-icons/font/filled.css';
import 'mdui';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

setColorScheme('#b59a6e');

import { render } from 'preact';
import App from './App';

render(<App />, document.getElementById("root")!);