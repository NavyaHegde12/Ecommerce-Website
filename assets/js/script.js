let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
};

updateCart();

let btns = document.querySelectorAll(".add-to-cart-btn");

for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener("click", addItem);
}

function addItem(event) {
    let cart = {}
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    let price = Number(event.target.dataset.price);
    let title = event.target.dataset.title;
    let id = event.target.dataset.id;
    let qty = event.target.dataset.qty;
    let image = event.target.dataset.image;

    if (!qty) {
        qty = 1;
    }

    if (id in cart) {
        cart[id].qty = qty;
    } else {
        let cartItem = {
            title: title,
            price: price,
            qty: qty,
            image: image
        };
        cart[id] = cartItem
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    location.href = 'cart.html';
}

function deleteItem(productId){
    let cart = {}
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        if (productId in cart) {
            delete cart[productId]
            localStorage.setItem("cart", JSON.stringify(cart));
            location.href = 'cart.html';
        }
    }
}

function updateCart() {
    let count = 0;
    let sum = 0;
    let cart = {}

    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        for (id in cart) {
            let item = cart[id];

            count += parseInt(item.qty)
            sum += parseFloat(item.price) * parseFloat(item.qty)
        }
    }


    if (document.getElementById("sum")) {
        document.getElementById("sum").textContent = sum;
    }

    if (document.getElementById("item-count")) {
        document.getElementById("item-count").textContent = count;
    }

    localStorage.setItem("sum", sum);
    localStorage.setItem("count", count);
}

function updateCount(sourceElement, targretElementId) {
    ele = document.getElementById(targretElementId)

    if (ele) {
        ele.dataset.qty = sourceElement.value
    }
}

function editCartItem(sourceElement, productId) {
    let cart = {}
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        if (productId in cart) {
            cart[productId].qty = sourceElement.value;

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        }
    }
}

function populateCart() {
    let cart = {};
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    let tbody = document.getElementById("cart-items-table-body");

    if (cart && Object.keys(cart).length > 0) {
        for (let id in cart) {
            let item = cart[id];

            let tr = document.createElement('tr')

            let html_row_values = `<td class="cart-product-img center-text"><img src="assets/images/${item.image}"
                                    class="small-img" alt=""></td>
                            <td class="cart-product-title">${item.title}</td>
                            <td class="cart-product-quantity center-text"><input type="number" id="product-count" name="product-count" step="1" value="${item.qty}" min="1"
                                max="100" onchange="editCartItem(this, '${id}')"></td>
                            <td class="cart-product-price center-text">₹${item.price}</td>
                            <td class="cart-product-action center-text">
                                <button onClick="deleteItem('${id}')"><i class="bx bx-trash delete-icon"></i></button>
                            </td>`
            tr.innerHTML = html_row_values;

            tbody.appendChild(tr)

            let cc = document.getElementById("cart-container")
            cc.classList.remove("d-none")

            let ec = document.getElementById("empty-cart")
            ec.classList.add("d-none")
        }

    } else {
        let cc = document.getElementById("cart-container")
        cc.classList.add("d-none")

        let ec = document.getElementById("empty-cart")
        ec.classList.remove("d-none")
    }
}