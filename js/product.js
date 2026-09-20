const API_URL = "http://127.0.0.1:5000/api/products";

let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch products");
        }

        allProducts = data;

        displayProducts(allProducts);
        loadCategories(allProducts);

    } catch (error) {
        console.error("Error fetching products:", error);

        document.getElementById("product-container").innerHTML =
            `<p>Unable to load products. Please check backend.</p>`;
    }
}

function displayProducts(products) {

    const productContainer =
        document.getElementById("product-container");

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML =
            "<p>No products found.</p>";
        return;
    }

    products.forEach((product) => {

        const productCard = document.createElement("div");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <p>₹${product.price}</p>

            <p>Category: ${product.category}</p>

            <button onclick="viewProduct('${product._id}')">
                View Product
            </button>
        `;

        productContainer.appendChild(productCard);
    });
}

function loadCategories(products) {

    const categoryFilter =
        document.getElementById("category-filter");

    if (!categoryFilter) return;

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}

function filterProducts() {

    const searchText =
        document.getElementById("search-input").value.toLowerCase();

    const selectedCategory =
        document.getElementById("category-filter").value;

    const filteredProducts = allProducts.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

document.getElementById("search-input")
    ?.addEventListener("input", filterProducts);

document.getElementById("category-filter")
    ?.addEventListener("change", filterProducts);

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

loadProducts();