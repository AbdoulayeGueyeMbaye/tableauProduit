const products = [
    { id: 1, name: "Riz", price: 10.99, category: "Category A", stock: 20 },
    { id: 2, name: "Huile", price: 15000, category: "Category B", stock: 10 },
    { id: 3, name: "Sucre", price: 8.99, category: "Category A", stock: 5 },
    { id: 4, name: "Viande", price: 12.99, category: "Category C", stock: 0 },
    { id: 5, name: "Savon", price: 20.99, category: "Category B", stock: 15 }
];

const tbody = document.querySelector("tbody");
const input = document.querySelector("input");
const small = document.querySelector("small");
const main = document.querySelector("#main");

let sortAsc = true; // Pour le toggle ascendant/descendant

small.textContent = `Nombre de produits trouvés : ${products.length}`;
displayProducts(products);

function displayProducts(productsToDisplay) {
    // Utilisation de map + join pour de meilleures performances
    tbody.innerHTML = productsToDisplay.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.stock ? "Dispo" : "Non Dispo"}</td>
            <td>${(product.price * product.stock).toFixed(2)}</td>
            <td>
                <button class="delbtn" data-id="${product.id}" style="border-radius: 5px; padding: 5px 10px; cursor: pointer">
                    Supprimer
                </button>
            </td>
        </tr>
    `).join("");

    // Attacher les événements aux boutons de suppression
    document.querySelectorAll(".delbtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            deleteProduct(id);
        });
    });
}

function getFilteredProducts() {
    const searchTerm = input.value.trim().toLowerCase();
    if (!searchTerm) return products;

    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.price.toString().includes(searchTerm) ||
        product.stock.toString().includes(searchTerm) ||
        (product.stock ? "dispo" : "non dispo").includes(searchTerm)
    );
}

input.addEventListener("input", () => {
    const filteredProducts = getFilteredProducts();

    small.textContent = `Nombre de produits trouvés : ${filteredProducts.length}`;

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center">Aucun produit trouvé</td>
            </tr>
        `;
    } else {
        displayProducts(filteredProducts);
    }
});

main.addEventListener("click", () => {
    const filteredProducts = getFilteredProducts();
    
    filteredProducts.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortAsc ? comparison : -comparison;
    });

    sortAsc = !sortAsc; // Toggle pour la prochaine fois
    main.textContent = sortAsc ? "NOM ⬍" : "NOM ⬆";

    displayProducts(filteredProducts);
});

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer "${product?.name}" ?`);
    
    if (!confirmed) return;

    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }

    // Rafraîchir l'affichage en gardant le filtre actif
    const filteredProducts = getFilteredProducts();
    small.textContent = `Nombre de produits trouvés : ${filteredProducts.length}`;

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center">Aucun produit trouvé</td>
            </tr>
        `;
    } else {
        displayProducts(filteredProducts);
    }
}