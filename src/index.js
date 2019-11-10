import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calc from './main/Calc';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <h1>Calculadora</h1>
        <Calc />
    </div>, 
    document.getElementById('root'));

serviceWorker.unregister();
