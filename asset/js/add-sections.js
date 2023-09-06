function loadSections(url, section, errMessage){
    function load() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.send();
        });
    }
    load()
        .then((section) => {
            // Вставляем хедер в документ
            document.body.insertAdjacentHTML('beforeend', section);
        })
        .catch((error) => {
            console.error(errMessage, error);
        });
}
// loadSections(url, section, errMessage);

export default loadSections;
