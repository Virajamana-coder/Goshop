// Change main image when thumbnail is clicked
function changeImage(imgSrc) {
    document.getElementById('mainImage').src = imgSrc;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        // A more robust way to check if the thumbnail image matches the new main image source
        // This compares the full src path
        if (thumb.src === document.getElementById('mainImage').src) {
            thumb.classList.add('active');
        }
    });
}

// Quantity functions
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Size selection
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        sizeBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});