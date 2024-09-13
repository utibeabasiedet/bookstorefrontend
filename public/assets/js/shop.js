$(document).ready(function() {
    const prices = {
        NGN: {
            "Flashcard Alphabets": 1300,
            "Numbers & Animals": 900,
            "Words of Affirmation": 1700,
            "Colour The Animals": 1100
        },
        EU: {
            "Flashcard Alphabets": 10,
            "Numbers & Animals": 8,
            "Words of Affirmation": 15,
            "Colour The Animals": 12
        },
        UK: {
            "Flashcard Alphabets": 13,
            "Numbers & Animals": 9,
            "Words of Affirmation": 17,
            "Colour The Animals": 11
        },
        US: {
            "Flashcard Alphabets": 13,
            "Numbers & Animals": 9,
            "Words of Affirmation": 17,
            "Colour The Animals": 11
        }
    };

    $('#currency').change(function() {
        const selectedCurrency = $(this).val();
        console.log(selectedCurrency)
        
        $('.shop-box-items').each(function() {
            const productTitle = $(this).data('title');
            const priceData = prices[selectedCurrency][productTitle];
            console.log(priceData)
            
            if (priceData) {
                $(this).find('.price').first().text(formatPrice(priceData, selectedCurrency));
            }
        });
    });

    function formatPrice(price, currency) {
        switch (currency) {
            case 'NGN':
                return `₦${price}`;
            case 'EU':
                return `€${price}`;
            case 'UK':
                return `£${price}`;
            case 'US':
                return `$${price}`;
            default:
                return `$${price}`;
        }
    }
});

