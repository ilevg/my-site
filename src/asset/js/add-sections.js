function loadSections(url, errMessage, callback){
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
            // add section
            document.body.insertAdjacentHTML('beforeend', section);

                callback();
            
        })
        .catch((error) => {
            console.error(errMessage, error);
        });
}

export default loadSections;
