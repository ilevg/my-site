
export function loadSection(url, sectionPlaceholder, errorSection, callback = null) {
    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${url}`);
        }
        return response.text();
    })
    .then(html => {
        sectionPlaceholder.innerHTML = html;
        if (callback) {
            callback();
        }   
        
    })
    .catch(error => {
        console.error(errorSection, error);
    });
}