
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;

    // Validate that departure and destination are not the same
    if (departure === destination) {
        alert("Departure and destination cannot be the same! Please select different cities.");
        return; // Stop form submission
    }

    // Proceed with form submission (booking logic)
    console.log("Form submitted successfully!");
});
document.getElementById("class").addEventListener("change", function() {
    const flightClass = this.value;
    const snackOptions = document.getElementById("snacks");

    // Clear previous options
    snackOptions.innerHTML = "";

    // Define snack options per class
    let snacksList = [];
    if (flightClass === "economy") {
        snacksList = ["Cookies", "Fresh Fruit"];
    } else if (flightClass === "business") {
        snacksList = ["Mixed Nuts", "Premium Cookies", "Fresh Fruit"];
    } else if (flightClass === "first-class") {
        snacksList = ["Chocolate Bar", "Gourmet Snacks","Mixed Nuts", "Premium Cookies", "Fresh Fruit"];
    }

    // Populate dropdown with correct options
    snacksList.forEach(snack => {
        const option = document.createElement("option");
        option.value = snack.toLowerCase().replace(" ", "-");
        option.textContent = snack;
        snackOptions.appendChild(option);
    });

    const flightClassSelect = document.getElementById("class"); // Flight class selection
const beverageSelect = document.getElementById("beverages"); // Beverage dropdown

// Define drink options for each flight class
const drinkOptions = {
    "economy": ["none", "water", "tea", "juice"],
    "business": ["none", "water", "juice", "soda", "tea"],
    "first-class": ["none", "water", "juice", "soda", "tea", "coffee", "wine"]
};

// Update beverage dropdown dynamically when flight class changes
flightClassSelect.addEventListener("change", function () {
    const selectedClass = flightClassSelect.value;

    // Clear existing options
    beverageSelect.innerHTML = "";

    // Populate dropdown with valid drinks for selected class
    if (selectedClass in drinkOptions) {
        drinkOptions[selectedClass].forEach(drink => {
            const option = document.createElement("option");
            option.value = drink.toLowerCase();
            option.textContent = drink;
            beverageSelect.appendChild(option);
        });
    }
});
});
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;
    const flightClass = document.getElementById("class").value;
    const flightType = document.querySelector('input[name="flight-type"]:checked').value;

    // Validate departure & destination
    if (departure === destination) {
        alert("Departure and destination cannot be the same! Please select different cities.");
        return;
    }

    // Define base prices per class
    let price = 0;
    if (flightClass === "economy") {
        price = 5000;
    } else if (flightClass === "business") {
        price = 12000;
    } else if (flightClass === "first-class") {
        price = 25000;
    }

    // Adjust price for round trip
    if (flightType === "round-trip") {
        price *= 1.8; // Round trips cost 80% more
    }
});
// for totals updating
function calculatePrice() {
    const flightClass = document.getElementById("class").value;
    const flightType = document.querySelector('input[name="flight-type"]:checked').value;
    const meal = document.getElementById("meal-options").value;
    const snack = document.getElementById("snacks").value;
    const beverage = document.getElementById("beverages").value;
    let price = 0;

    // Base flight pricing per class
    if (flightClass === "economy") price = 5000;
    else if (flightClass === "business") price = 12000;
    else if (flightClass === "first-class") price = 25000;

    // Adjust for round trip
    if (flightType === "round-trip") price *= 1.8;

    // Display total price in real-time
    document.getElementById("total-price").textContent = `KES ${price}`;
}

// Attach event listeners for live updates
document.getElementById("class").addEventListener("change", calculatePrice);
document.querySelectorAll('input[name="flight-type"]').forEach(radio => radio.addEventListener("change", calculatePrice));

// updaated
function calculatePrice() {
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;
    const flightClass = document.getElementById("class").value;
    const flightType = document.querySelector('input[name="flight-type"]:checked').value;

    // Get base price based on selected cities
    basePrice = cityPricing[departure][destination];

    // Adjust price based on flight class
    if (flightClass === "economy") basePrice *= 1;
    else if (flightClass === "business") basePrice *= 1.5;
    else if (flightClass === "first-class") basePrice *= 2.5;

    // Adjust price for round trip
    if (flightType === "round-trip") basePrice *= 1.8;

    // Display total price
    document.getElementById("total-price").textContent = `KES ${basePrice}`;
}

// Attach event listeners for real-time updates
document.getElementById("class").addEventListener("change", calculatePrice);
document.querySelectorAll('input[name="flight-type"]').forEach(radio => radio.addEventListener("change", calculatePrice));
document.getElementById("departure").addEventListener("change", calculatePrice);
document.getElementById("destination").addEventListener("change", calculatePrice);

// updated to factor in passenger count
function calculatePrice() {
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;
    const flightClass = document.getElementById("class").value;
    const flightType = document.querySelector('input[name="flight-type"]:checked')?.value;
    const passengerCount = parseInt(document.getElementById("passenger-count").value);
    
    let basePrice = 0;

    // Define city-based pricing
    const cityPricing = {
        nairobi: { mombasa: 8000, kisumu: 6000, eldoret: 5500, Nakuru: 7800 },
        mombasa: { nairobi: 8000, kisumu: 9500, eldoret: 9000, Nakuru:10400},
        kisumu: { nairobi: 6000, mombasa: 9500, eldoret: 4000, Nakuru:2000},
        eldoret: { nairobi: 5500, mombasa: 9000, kisumu: 4000, Nakuru: 4700},
         Nakuru: { nairobi: 5500, mombasa: 9000, kisumu: 4000, eldoret:7400}
    };

    // Validate departure & destination
    if (departure === destination) {
        document.getElementById("total-price").textContent = `⚠️ Choose different cities`;
        return;
    }

    // Get base price from city-based pricing
    basePrice = cityPricing[departure]?.[destination] || 0;

    // Adjust base price by flight class
    if (flightClass === "economy") basePrice *= 1;
    else if (flightClass === "business") basePrice *= 1.5;
    else if (flightClass === "first-class") basePrice *= 2.5;

    // Adjust for round trip
    if (flightType === "round-trip") basePrice *= 1.8;

    // Multiply total price by passenger count
    let totalPrice = (basePrice) * passengerCount;

    // Display total price dynamically
    document.getElementById("total-price").textContent = `KES ${totalPrice}`;
}
// making sure all sections update price
["departure", "destination", "class", "meal-options", "snacks", "beverages", "passenger-count"].forEach(id => {
    document.getElementById(id).addEventListener("change", calculatePrice);
});
document.querySelectorAll('input[name="flight-type"]').forEach(radio => radio.addEventListener("change", calculatePrice));
document.getElementById("increase-passenger").addEventListener("click", function() {
    let count = parseInt(document.getElementById("passenger-count").value);
    document.getElementById("passenger-count").value = count + 1;
    calculatePrice();
});
document.getElementById("decrease-passenger").addEventListener("click", function() {
    let count = parseInt(document.getElementById("passenger-count").value);
    if (count > 1) {
        document.getElementById("passenger-count").value = count - 1;
        calculatePrice();
    }
});

// to activate active uderline of menu links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function() {
        // Remove 'active' class from all links
        document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
        
        // Add 'active' class to clicked link
        this.classList.add("active");
    });
});


// To restrict and control travel dates
// Get the necessary DOM elements:
const travelDateInput = document.getElementById("travel-date");
const returnDateInput = document.getElementById("return-date");
const flightTypeRadios = document.querySelectorAll('input[name="flight-type"]');
const confirmBookingButton = document.getElementById("confirmBooking");

// Function to update the state of the return date field:
function updateReturnDateState() {
  // Get the selected flight type:
  const selectedFlightType = document.querySelector('input[name="flight-type"]:checked')?.value;

  if (selectedFlightType === "round-trip") {
    // For round trips, the travel date must be set to enable return date.
    if (travelDateInput.value) {
      returnDateInput.disabled = false;
      // Set the minimum selectable return date to the travel date.
      returnDateInput.min = travelDateInput.value;
    } else {
      // No travel date: disable and clear the return date.
      returnDateInput.value = "";
      returnDateInput.disabled = true;
    }
  } else {
    // For one-way trips, always disable the return date.
    returnDateInput.value = "";
    returnDateInput.disabled = true;
  }
}

// Attach event listeners to radio buttons so that when the flight type changes...
flightTypeRadios.forEach(radio => {
  radio.addEventListener("change", updateReturnDateState);
});

// Attach an event listener to the travel date input. When it changes, update the return date state.
travelDateInput.addEventListener("change", updateReturnDateState);

// Validate dates on clicking the "Confirm Booking" button:
confirmBookingButton.addEventListener("click", function (e) {
  const selectedFlightType = document.querySelector('input[name="flight-type"]:checked')?.value;
  
  // For round trips, validate both dates:
  if (selectedFlightType === "round-trip") {
    if (!travelDateInput.value) {
      alert("⚠️ Please select a travel date for your round trip.");
      return;
    }
    if (!returnDateInput.value) {
      alert("⚠️ Please select a return date for your round trip.");
      return;
    }
    // Convert values into Date objects for comparison:
    const travelDate = new Date(travelDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    
    // Ensure the return date is the same as or after the travel date:
    if (returnDate < travelDate) {
      alert("⚠️ The return date cannot be before the travel date.");
      return;
    }
  }
  
  // If all validations pass for the selected flight type, proceed with confirming the booking.
  alert("✅ Booking confirmed!");
});

// Utility function to generate a unique flight reference code.
function generateFlightReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = '';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

document.getElementById("nextButton").addEventListener("click", function(e){
  e.preventDefault();
  
  // Validate form and gather booking data
  const departure   = document.getElementById("departure").value;
  const destination = document.getElementById("destination").value;
  const travelDate  = document.getElementById("travel-date").value;
  const returnDate  = document.getElementById("return-date").value;
  const flightClass = document.getElementById("class").value;
  const flightType  = document.querySelector('input[name="flight-type"]:checked')?.value;
  const passengerCount = parseInt(document.getElementById("passenger-count").value);
  const totalPrice  = document.getElementById("total-price").textContent; // (e.g., "KES 35000")
  const flightReference = generateFlightReference();

  // Build an object to store booking details
  const bookingData = {
    departure,
    destination,
    travelDate,
    returnDate,
    flightClass,
    flightType,
    passengerCount,
    totalPrice,
    flightReference
  };

  // Save the data to localStorage (or you can send it via query parameters)
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  // Navigate to the booking summary page in a new tab
  // Using an anchor element approach may help ensure a new tab is used
  const a = document.createElement("a");
  a.href = "booking.html";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

//admin
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
  // Event listener for Admin button to show the modal
  const adminBtn = document.getElementById("adminBtn");
  if (adminBtn) {
    adminBtn.addEventListener("click", function() {
      // Show the admin modal using Bootstrap's modal API
      const adminModalEl = document.getElementById('adminModal');
      const adminModal = new bootstrap.Modal(adminModalEl);
      adminModal.show();
    });
  } else {
    console.error("Admin button not found.");
  }

  // Event listener for Admin Login Form submission
  const adminLoginForm = document.getElementById("adminLoginForm");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const password = document.getElementById("adminPassword").value;
      
      // Validate the admin password – adjust this for production use
      if (password === "admin123") {
        // Redirect to admin dashboard (admin.html)
        window.location.href = "admin.html";
      } else {
        alert("Incorrect admin password!");
      }
    });
  } else {
    console.error("Admin login form not found.");
  }
});
