export async function importPageStyles(pageName) {
    if(!pageName) return

    try {
      const module = await import(`../css/pages-scss/${pageName}.scss`);
      console.log(module)
    } catch (error) {
      console.error('error', error);
    }
}
const pageNameEl = document.querySelector('[data-page]');
if (pageNameEl) {
  const pageName = pageNameEl.getAttribute('data-page');
  importPageStyles(pageName);
}