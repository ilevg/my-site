export function loadSection(url, sectionPlaceholder, errorSection) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${url}`)
                }
                return response.text()
            })
            .then(html => {
                sectionPlaceholder.innerHTML = html
                resolve() // Разрешаем промис после успешного добавления корзины
            })
            .catch(error => {
                console.error(errorSection, error)
                reject(error)
            })
    })
}