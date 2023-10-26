const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const url = link.getAttribute("href");
                Router.go(url);
            });
        });
        // Event Handler for URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false);
        });

        // Check the initial URL of the browser
        console.log(`Current URL: ${location.pathname}`)
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, null, route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Menu";
                break;

            case "/order":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Your Order";
                break;
            default:
            if (route.startsWith("/product-")) {
                pageElement = document.createElement("h1");
                pageElement.textContent = "Details";
                const paramId = route.substring(route.lastIndexOf("-") + 1);
                pageElement.dataset.id = paramId;
            }
        }

        const cache = document.querySelector("main");
        cache.innerHTML = "";
        cache.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
    },
}

export default Router;