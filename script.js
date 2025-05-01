document.addEventListener('DOMContentLoaded', () => {
    const partyTrigger = document.getElementById('trigger-party');
    const body = document.body;
    const exchangeValue = document.getElementById('exchange-value');
    
    // Track if this is the first loading
    let isFirstLoading = true;
    
    // Initial loading effect
    simulateLoading();
    
    // Set up recurring loading effect every 60 seconds
    setInterval(resetAndSimulateLoading, 60000);
    
    // Handle the click on the philosophy text
    partyTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        launchConfetti();
        startPartyMode();
    });
    
    // Function to reset the exchange value to spinner and simulate loading again
    function resetAndSimulateLoading() {
        // Reset to spinner
        exchangeValue.classList.remove('loaded-value');
        exchangeValue.innerHTML = '<span class="loading-spinner"></span>';
        
        // Run loading simulation again
        simulateLoading();
    }
    
    // Function to simulate loading and show "1" after delay
    function simulateLoading() {
        // Random delay between 1-2 seconds for more realistic effect
        const loadingTime = Math.random() * 1000 + 1000;
        
        setTimeout(() => {
            // Fade out the spinner
            const spinner = exchangeValue.querySelector('.loading-spinner');
            if (spinner) {
                spinner.style.opacity = '0';
                spinner.style.transition = 'opacity 0.3s ease';
                
                // After fade out, replace with "1"
                setTimeout(() => {
                    // Replace content and add proper styling
                    exchangeValue.innerHTML = '1';
                    exchangeValue.style.opacity = '0';
                    
                    // Add loaded-value class for styling
                    exchangeValue.classList.add('loaded-value');
                    
                    // Fade in the "1" with proper alignment
                    requestAnimationFrame(() => {
                        exchangeValue.style.opacity = '1';
                        exchangeValue.style.transition = 'opacity 0.3s ease';
                        
                        // Show philosophy text after first loading is complete
                        if (isFirstLoading) {
                            setTimeout(() => {
                                partyTrigger.classList.remove('hidden');
                                isFirstLoading = false;
                            }, 500); // Small delay after the number appears
                        }
                    });
                }, 300);
            }
        }, loadingTime);
    }
    
    // Launch confetti explosion
    function launchConfetti() {
        try {
            const dogeColors = [
                '#cb9e26', // Dogecoin yellow
                '#f2a900', // Dogecoin orange
                '#fff',    // White
                '#5c4b37'  // Brown
            ];
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 200,
                    spread: 160,
                    origin: { y: 0.6 },
                    colors: dogeColors
                });
            }
        } catch (error) {
            console.error('Error launching confetti:', error);
        }
    }
    
    // Start the party mode
    function startPartyMode() {
        body.classList.add('party-mode');
        
        // Stop the party after 10 seconds
        setTimeout(() => {
            body.classList.remove('party-mode');
        }, 10000);
    }
}); 