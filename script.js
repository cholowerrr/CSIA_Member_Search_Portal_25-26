// ----------------------
// Member Data Loader
// ----------------------
let members = [];

// Try to load members.json (local/private)
// If not found, fallback to public placeholder data
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("No members.json found");
        members = await response.json();
        console.log("✅ Loaded private members.json");
    } catch (err) {
        console.warn("⚠️ Using placeholder members. Real data hidden in production:", err);

        // Placeholder dataset (safe to publish)
        members = [
            { name: "Agent Alpha", codename: "EagleEye", role: "Member" },
            { name: "Agent Beta", codename: "IronWall", role: "Member" }
        ];
    }
}

// ----------------------
// Search Functions
// ----------------------

// Handle Enter key for search
function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchMember();
    }
}

// Perform search
function searchMember() {
    const searchTerm = document.getElementById('codename-input').value.trim().toLowerCase();
    const errorMessageElement = document.getElementById('error-message');
    const resultsContainer = document.getElementById('member-details');

    // Reset
    errorMessageElement.classList.add('hidden');
    errorMessageElement.textContent = '';
    resultsContainer.classList.add('hidden');

    // 🔹 Normalize all member fields before comparison
    const member = members.find(m =>
        m.codename.toLowerCase() === searchTerm ||
        m.name.toLowerCase() === searchTerm
    );

    if (member) {
        displayMemberDetails(member);
    } else {
        displayErrorMessage(searchTerm);
    }
}


// Show member details
function displayMemberDetails(member) {
    const resultsContainer = document.getElementById("member-details");
    resultsContainer.innerHTML = "";

    const searchTerm = document.getElementById("codename-input").value.trim();
    const highlightText = (text) => text.replace(
        new RegExp(searchTerm, "gi"),
        match => `<span class="highlight">${match}</span>`
    );

    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");
    memberCard.innerHTML = `
        <h3>${highlightText(member.name)} 
            <span class="codename">(${highlightText(member.codename)})</span>
        </h3>
        <p class="role">Role: ${member.role}</p>
    `;
    resultsContainer.appendChild(memberCard);

    resultsContainer.style.display = "block";
    resultsContainer.classList.remove("hidden");
    resultsContainer.classList.add("show");
}

// Show error message
function displayErrorMessage(input) {
    console.log("Displaying error message:", input);

    const resultsContainer = document.getElementById("member-details");
    resultsContainer.innerHTML = "";

    const errorCard = document.createElement("div");
    errorCard.classList.add("member-card", "error-card");
    errorCard.innerHTML = `
        <h3 class="error-title">Member Not Found</h3>
        <p class="error-message">"${input}" does not match any registered member.</p>
    `;
    resultsContainer.appendChild(errorCard);

    resultsContainer.style.display = "block";
    resultsContainer.classList.remove("hidden");
    resultsContainer.classList.add("show");
}

// ----------------------
// Hero Slider
// ----------------------
document.addEventListener("DOMContentLoaded", async () => {
    await loadMembers(); // load members when page loads

    const sliderItems = document.querySelectorAll("[data-hero-slider-item]");
    let currentSlide = 0;

    function showSlide(index) {
        sliderItems.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
    }, 5000); // auto slide every 5s
});


// ----------------------
// Mobile Burger Menu Toggle
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }
});
