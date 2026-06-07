
const products = [
    {
        id: 1,
        name: "Riz",
        price: 11000,
        category: "Category A",
        stock: 20
    },
    {
        id: 2,
        name: "Huile",
        price: 15000,
        category: "Category B",
        stock: 10
    },
    {
        id: 3,
        name: "Sucre",
        price: 8000,
        category: "Category A",
        stock: 5
    },
    {
        id: 4,
        name: "Viande",
        price: 12000,
        category: "Category C",
        stock: 0
    },
    {
        id: 5,
        name: "Savon",
        price: 2000,
        category: "Category B",
        stock: 15
    },

    {
        id: 6,
        name: "Lait",
        price: 30000,
        category: "Category E",
        stock: 25
    },
    {
        id: 7,
        name: "Poulet",
        price: 7000,
        category: "Category F",
        stock: 12
    }
];

const tbody = document.querySelector("tbody");
const input = document.querySelector("input");
const small = document.querySelector("small");
const main = document.querySelector("#main");
const stock = document.querySelector("#stock");
const prix = document.querySelector("#prix");
const categorie = document.querySelector("#categorie");
const total  = document.querySelector("#total");




small.textContent = `Nombre de produits trouvés : ${products.length}`;


//affichage initial de tous les produits
displayProducts(products);



function displayProducts(productsToDisplay, newId = null) {
    tbody.innerHTML = "";
    let totalStock = 0;
    let totalMontant = 0;
    productsToDisplay.forEach(product => {

        totalStock += product.stock;
        totalMontant += product.price * product.stock;

        tbody.innerHTML += `
            <tr class="product-row ${product.id === newId ? 'adding' : ''}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.stock ? "Dispo" : "Non Dispo"}</td>
                <td>${(product.price * product.stock).toFixed(2)}</td>
                <td><button class="delbtn" style="border-radius: 5px; padding: 5px 10px; cursor: pointer" data-id="${product.id}">Supprimer</button></td>
            </tr>

        `;
        
    });

    tbody.innerHTML += `
        <tr style="background:#ddd;font-weight:bold;">
            <td colspan="3">TOTAL STOCK</td>
            <td>${totalStock}</td>
            <td colspan="2">TOTAL MONTANT </td>
            <td colspan="2">${totalMontant.toFixed(2)}</td>
        </tr>
    `;
    if (newId !== null) {
    const newRow = document.querySelector(".adding");

    if (newRow) {
        setTimeout(() => {
            newRow.classList.remove("adding");
        }, 1000);
    }
}
}


const style = document.createElement('style');
style.textContent = `
    tr.product-row {
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
    }

    tr.product-row.deleting {
        background: red;
        color: white ;
        transform: translateX(150px) scale(0.8);
        opacity: 10;
    }

    tr.product-row.deleting td {
        padding-top: 0;
        padding-bottom: 0;
        transition: all 1s ease;
    }

    tr.product-row.adding {
    background: green;
    opacity: 30;
    transform: translateX(150px) scale(0.8);
}

`;
    
document.head.appendChild(style);



const btnAjouter = document.querySelector("#btnAjouter"); 

btnAjouter.addEventListener("click", () => {
    const nouvelleLigne = document.createElement('tr');
    nouvelleLigne.innerHTML = `
        <td>&nbsp;</td>
        <td><input type="text" placeholder="Nom"></td>
        <td><input type="text" placeholder="Catégorie"></td>
        <td><input type="number" placeholder="Stock"></td>
        <td><input type="number" placeholder="Prix"></td>
        <td><select>
            <option value="">Disponible </option>
            <option value="">Non Disponible</option>
           
        </select></td>
        <td>&nbsp;</td>
        <td><button class="addbtn" style="border-radius: 5px; padding: 5px 10px; cursor: pointer">Ajouter</button>
        <button class="cancelbtn" style="border-radius: 5px; padding: 5px 10px; cursor: pointer; margin-left: 5px;">Annuler</button>
        </td>
    `;
    
    tbody.prepend(nouvelleLigne);

const inputName = nouvelleLigne.querySelector("input[placeholder='Nom']");
const inputCategory = nouvelleLigne.querySelector("input[placeholder='Catégorie']");
const inputStock = nouvelleLigne.querySelector("input[placeholder='Stock']");
const inputPrice = nouvelleLigne.querySelector("input[placeholder='Prix']");
const selectDisponibility = nouvelleLigne.querySelector("select");
const inputTotal = nouvelleLigne.querySelector("input[placeholder='Total']");    

const addbtn = nouvelleLigne.querySelector(".addbtn");
const cancelbtn = nouvelleLigne.querySelector(".cancelbtn"); 

addbtn.addEventListener("click", () => {
    const name = inputName.value.trim();
    const category = inputCategory.value.trim();
    const stock = parseInt(inputStock.value);
    const price = parseFloat(inputPrice.value);
    const disponibility = selectDisponibility.value === "Disponible";

    if (!isNaN(name) || !isNaN(category) || isNaN(stock) || isNaN(price)) {
        alert("Veuillez remplir tous les champs correctement.");
        return;
    }
   

    ajouterProduit(name, category, stock, price, disponibility);

});

cancelbtn.addEventListener("click", () => {
    annulerProduit();
});     
}, { once: true });




document.querySelectorAll(".delbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        deleteProduct(id,e);
    });
});


input.addEventListener("input", () => {
    const searchTerm = input.value.trim().toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.price.toString().includes(searchTerm) ||
        product.stock.toString().includes(searchTerm) ||
        (product.stock ? "dispo" : "non dispo").includes(searchTerm)
    );

    tbody.innerHTML = "";

    small.textContent = `Nombre de produits trouvés : ${filteredProducts.length}`;
    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center">Aucun produit trouvé</td>
            </tr>
        `;
    }
    else {
        displayProducts(filteredProducts);
    }

});


main.addEventListener('click', () => {
    products.sort((a, b) =>
        a.name.localeCompare(b.name));

    displayProducts(products);

});

stock.addEventListener('click', () => {
    products.sort((a, b) =>
        a.stock - b.stock);
    displayProducts(products);
});

prix.addEventListener('click', () => {
    products.sort((a, b) =>
        a.price - b.price);
    displayProducts(products);
});

categorie.addEventListener('click', () => {
    products.sort((a, b) =>
        a.category.localeCompare(b.category));
    displayProducts(products);
}); 

total.addEventListener('click', () => {
    products.sort((a, b) =>
        (a.price * a.stock) - (b.price * b.stock));
    displayProducts(products);
});


function deleteProduct(id,e) {
    const product = products.find(p => p.id === id);
    const confirmed = confirm(`Voulez-vous supprimer "${product?.name}" ?`);

    if (!confirmed) return;

    const row = e.target.closest("tr");   
    row.classList.add("deleting");

    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }

    setTimeout(() => {
        row.remove();
       
        

    const searchTerm = input.value.trim().toLowerCase();
    if (searchTerm) {
        input.dispatchEvent(new Event("input"));
    } else {
        displayProducts(products);
        small.textContent = `Nombre de produits trouvés : ${products.length}`;
    }
      }, 1000); 
}

function ajouterProduit(name, category, stock, price, disponibility) {
    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        category,
        stock,
        price,
        disponibility
    };

    products.push(newProduct);
    displayProducts(products, newProduct.id);
}                                       
function annulerProduit() { 
    const newRow = document.querySelector("tr input").closest("tr");
    if (newRow) {
        newRow.remove();
    }
}





