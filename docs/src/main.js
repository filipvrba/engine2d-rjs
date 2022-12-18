const engineList = document.getElementById('eng-list');
const _location = window.location.href.slice(0, -1);
const p_engine = "public/engine";

async function getEngineLog(callback) {
    const url = `${_location}/${p_engine}/log.txt`;
    let response = await fetch( url );

    if ( response.status === 200 ) {
        const content = await response.text();
        callback(content.trim().split('\n'));
    } else if ( response.status === 404 ) {
        callback(null);
    }
}

function h_addLi(arr, exten = "js") {
    if (arr === null) return;

    let list = "";
    arr.forEach((e) => {
        const url = `${_location}/${p_engine}/${exten}/${e}.${exten}`;
        list += `<li><a href="${url}">${e}</a></li>\n`;
    })
    engineList.innerHTML = list.trim();
}

getEngineLog(h_addLi);
