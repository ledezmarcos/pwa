if ('serviceWorker' in navigator) {
    console.log('Si podes usar los serviceworker');
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log("service worker cargado correctamente", res))
        .catch(err => console.log("no se pudo registrar che", err));
} else {
    console.log('no lo puedes');
}



$(document).ready(function() {

});