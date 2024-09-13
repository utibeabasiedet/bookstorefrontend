const prices = {
    NGN: {
        "Alphabet flash cards": 3000,
        "Colour the animals": 2000,
        "Our stories": 4000,
        "Book set": 4500,
        "Greetings in Ibibio": 1000,
        "Family in Ibibio": 1000,
        "Flashcards set": 11000,
        "Numbers and animals": 1500,
        "Parts of the body in Ibibio": 1000,
        "Inem's extraordinary journey": 4000,
        "Animals flashcards": 4000,
        "Words of affirmation flashcard": 4000
    },
    EU: {
        "Alphabet flash cards": 11,
        "Colour the animals": 9,
        "Our stories": 17,
        "Book set": 26,
        "Greetings in Ibibio": 6,
        "Family in Ibibio": 6,
        "Flashcards set": 42,
        "Numbers and animals": 8,
        "Parts of the body in Ibibio": 6,
        "Inem's extraordinary journey": 11,
        "Animals flashcards": 15,
        "Words of affirmation flashcard": 15
    },
    UK: {
        "Alphabet flash cards": 10,
        "Colour the animals": 8,
        "Our stories": 15,
        "Book set": 22,
        "Greetings in Ibibio": 5,
        "Family in Ibibio": 5,
        "Flashcards set": 36,
        "Numbers and animals": 7,
        "Parts of the body in Ibibio": 5,
        "Inem's extraordinary journey": 10,
        "Animals flashcards": 13,
        "Words of affirmation flashcard": 13
    },
    US: {
        "Alphabet flash cards": 13,
        "Colour the animals": 11,
        "Our stories": 18,
        "Book set": 30,
        "Greetings in Ibibio": 7,
        "Family in Ibibio": 7,
        "Flashcards set": 47,
        "Numbers and animals": 9,
        "Parts of the body in Ibibio": 7,
        "Inem's extraordinary journey": 13,
        "Animals flashcards": 17,
        "Words of affirmation flashcard": 17
    }
};

// Product Data
const products = [
    { title: "Alphabet flash cards", img: "alphabet-flash-cards.png" },
    { title: "Colour the animals", img: "colour-the-animals.png" },
    { title: "Our stories", img: "our-stories.png" },
    { title: "Book set", img: "book-set.png" },
    { title: "Greetings in Ibibio", img: "greetings-in-ibibio.png" },
    { title: "Family in Ibibio", img: "family-in-ibibio.png" },
    { title: "Flashcards set", img: "flashcards-set.png" },
    { title: "Numbers and animals", img: "numbers-and-animals.png" },
    { title: "Parts of the body in Ibibio", img: "parts-of-the-body-in-ibibio.png" },
    { title: "Inem's extraordinary journey", img: "inems-extraordinary-journey.png" },
    { title: "Animals flashcards", img: "animals-flashcards.png" },
    { title: "Words of affirmation flashcard", img: "words-of-affirmation-flashcard.png" }
];

// Populate products into the store
$(document).ready(function () {
    const currency = $('#currency').val();

    products.forEach(product => {
        const productHtml = `
            <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp shop-item" data-wow-delay=".8s" data-title="${product.title}">
                <div class="shop-box-items">
                    <div class="book-thumb center">
                        <a href="shop-details-2.html"><img src="assets/img/book/${product.img}" alt="${product.title}"></a>
                        <ul class="shop-icon d-grid justify-content-center align-items-center">
                            <li><a href="shop-cart.html"><i class="far fa-heart"></i></a></li>
                            <li><a href="shop-cart.html"><img class="icon" src="assets/img/icon/shuffle.svg" alt="svg-icon"></a></li>
                            <li><a href="shop-details.html"><i class="far fa-eye"></i></a></li>
                        </ul>
                    </div>
                    <div class="shop-content">
                        <h3><a href="shop-details.html" class="product-title">${product.title}</a></h3>
                        <ul class="price-list">
                            <li class="price">${formatPrice(prices[currency][product.title], currency)}</li>
                            <li><i class="fa-solid fa-star"></i> 3.4 (25)</li>
                        </ul>
                        <div class="shop-button">
                            <a href="shop-details.html" class="theme-btn"><i class="fa-solid fa-basket-shopping"></i> Add To Cart</a>
                        </div>
                    </div>
                </div>
            </div>`;
        
        $('#product-container').append(productHtml);
    });

    // Change prices based on selected currency
    $('#currency').change(function () {
        const selectedCurrency = $(this).val();

        $('.shop-box-items').each(function () {
            const productTitle = $(this).closest('.shop-item').data('title');
            const priceData = prices[selectedCurrency][productTitle];
            console.log(productTitle, priceData);  // Debugging line to check values

            if (priceData) {
                $(this).find('.price').first().text(formatPrice(priceData, selectedCurrency));
            }
        });
    });

    function formatPrice(price, currency) {
        switch (currency) {
            case 'NGN': return `₦${price}`;
            case 'EU': return `€${price}`;
            case 'UK': return `£${price}`;
            case 'US': return `$${price}`;
            default: return `$${price}`;
        }
    }
});
