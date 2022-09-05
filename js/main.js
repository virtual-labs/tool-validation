'use strict';

function display(text) {
    let logs = text.split('\n');
    let output = "";
    logs.forEach(log => {
        output += `<p>${log}\n</p>`;
    });
    document.getElementById('output').innerHTML = output;
}


async function getLog(file,type) {
    let x = await fetch(file);
    let y = await x.text();
    let output = "";
    if(type === "eslint") {
        output = generateTabs(handleDataEslint(y),type);
        document.getElementById('output-eslint').innerHTML = output;
    }
    else if(type === "https") {
        output = generateTabs(handleDataHttps(y),type);
        document.getElementById('output-https').innerHTML = output;
    }
}


function handleDataEslint(data) {
    let logs = data.split('\n');
    let formatted_data = {};
    let flag = false;
    let last_key = "";
    for(let i = 0; i < logs.length; i++) {
        if(flag==true) {
            if(logs[i].startsWith(" ")) {
            formatted_data[last_key].push(logs[i]);
            } else {
                flag = false;
            }
        }
        else
        {
            if(logs[i].length > 0)
            {
                formatted_data[logs[i]] = [];
                last_key = logs[i];
                flag = true;
            }
        }
    }
    return formatted_data;
}

function handleDataHttps(data) {
    let logs = data.split('\n');
    let formatted_data = {};
    for(let i = 0; i < logs.length; i++) {
        if(logs[i].length == 0)
            continue;
        let log = logs[i].split('     ');
        const key = log[0];
        const value = log[1] || "";
        if(key in formatted_data) {
            formatted_data[key].push(value);
        } else {
            formatted_data[key] = [value];
        }
    }
    console.log(formatted_data);
    return formatted_data;
}






function generateTab(filename,data,index,type) {
    const tabulated_data = generateTable(data,type);
    const tab = `
    <div class="tab">
        <input class="cb" type="checkbox" id="chck${index}">
        <label class="tab-label" for="chck${index}">${filename}</label>
        <div class="tab-content" align="left">
            ${tabulated_data}
        </div>
    </div>`;
    return tab;
}


// data is a dictionary with key as filename and value as array of data strings
function generateTabs(data,type) {
    let tabs = "";
    let index = 0;
    for (let filename in data) {
        index++;
        tabs += generateTab(filename,data[filename],`-${type}${index}`,type);
    }
    return `
    <div class="tabs is-flex is-flex-direction-column">
        ${tabs}
    </div>`;
}

function generateTable(data,type) {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        table += generateRow(data[i]);
    }
    const headers = generateHeaders(type);
    return `
    <table class="data-table">
        <thead>
            ${headers}
        </thead>
        <tbody>
            ${table}
        </tbody>
    </table>`;
}

function generateHeaders(type) {
    let headers = "";
    if (type === "eslint") {
        headers = `
        <th>Position</th>
        <th>Severity</th>
        <th>Message</th>
        <th>Rule</th>`;
    }
    else if(type === "https") {
        headers = `<th>Link</th>`;
    }
    return `<tr>${headers}</tr>`;
}

function generateRow(data) {
    let row = "";
    // split with tab
    let split_data = data.split('  ');
    // remove all empty strings
    split_data = split_data.filter(function (el) {
        return el != "";
    });
    for (let i = 0; i < split_data.length; i++) {
        row += `<td>${split_data[i]}</td>`;
    }
    return `<tr>${row}</tr>`;
}








await getLog("eslint.log","eslint");
await getLog("links.log","https");