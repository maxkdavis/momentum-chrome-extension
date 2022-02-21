const author = document.querySelector(".author");

//Unsplash photo API: https://api.unsplash.com/photos/random?orientation=landscape&query=space
//in the ap above I added a landscape parameter and a query to filter for only photos that match my key search term, 'space'
//on page load, use fetch to get data from API
window.addEventListener("load", () => {
    fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=fS9s65Lm6Mqo6gjSIxDGGFn5LhAfrPJwZUROKUxN4oQ")
        .then((response) => response.json())
        .then((data) => {
            document.body.style.backgroundImage = `
            url(${data.urls.regular})
            `;

            author.children[0].textContent = `Credit: ${data.user.name}`;
        });
});
