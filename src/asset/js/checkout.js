// function for checkout drop-downs

const paymentItems = document.querySelectorAll('.checkout__blik-input, .checkout__card-input');

paymentItems.forEach(item => {
    item.addEventListener('change', function() {
        const descriptionId = this.getAttribute('data-description');
        
        const descriptionElement = document.getElementById(descriptionId);
        
        const allDescriptionElements = document.querySelectorAll('.checkout__payment-description');
        allDescriptionElements.forEach(desc => {
            desc.style.height = '0';
            desc.style.opacity = '0';
        });
        
        if (descriptionElement) {
            descriptionElement.style.height = 'calc(var(--index) * 1)';
            descriptionElement.style.opacity = '1';
        }
    });
});