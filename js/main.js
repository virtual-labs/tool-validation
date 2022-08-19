'use strict';

function display(text) {
    let logs = text.split('\n');
    let output = "";
    logs.forEach(log => {
        output += `<p>${log}\n</p>`;
    });
    document.getElementById('output').innerHTML = output;
}


async function getLog(file) {
    let x = await fetch(file);
    let y = await x.text();
    display(y);
}

await getLog("eslint.log");