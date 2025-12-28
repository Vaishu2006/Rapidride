// ---------- USER SESSION ----------
const userName = localStorage.getItem("userName");

if (!userName) {
    window.location.href = "index.html";
}

document.getElementById("userName").textContent = `Hello, ${userName}`;
document.getElementById("profileName").textContent = userName;

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userName");
    window.location.href = "index.html";
});

// ---------- SECTION TOGGLE ----------
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    document.querySelectorAll(".sidebar li").forEach(li => {
        li.classList.remove("active");
    });

    document
        .querySelector(`.sidebar li[onclick*="${sectionId}"]`)
        .classList.add("active");
}

// ---------- RIDE DATA ----------
let rides = [];

// Create Ride
document.getElementById("rideForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const ride = {
        source: document.getElementById("source").value,
        destination: document.getElementById("destination").value,
        passengers: document.getElementById("passengers").value,
        driverName: document.getElementById("driverName").value,
        driverPhone: document.getElementById("driverPhone").value,
        driverGender: document.querySelector('input[name="driverGender"]:checked').value
    };

    rides.push(ride);
    updateRideList();
    updateMapImage(ride.source, ride.destination);

    showSection("availableRides");
    this.reset();
});

// ---------- AVAILABLE RIDES ----------
function updateRideList() {
    const rideList = document.getElementById("rideList");
    rideList.innerHTML = "";

    rides.forEach((ride, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${ride.source} → ${ride.destination}</strong><br>
            Driver: ${ride.driverName} (${ride.driverGender})<br>
            Seats: ${ride.passengers}<br>
            <button onclick="viewOnMap(${index})">View Map</button>
        `;
        rideList.appendChild(li);
    });
}

// ---------- MAP IMAGE (OPENSTREETMAP) ----------
function updateMapImage(source, destination) {
    const mapUrl =
        `https://staticmap.openstreetmap.de/staticmap.php` +
        `?center=${encodeURIComponent(source)}` +
        `&zoom=6&size=600x350` +
        `&markers=${encodeURIComponent(source)},red` +
        `|${encodeURIComponent(destination)},blue`;

    document.getElementById("mapImage").src = mapUrl;
}

function viewOnMap(index) {
    const ride = rides[index];
    updateMapImage(ride.source, ride.destination);
    showSection("mapSection");
}

// ---------- INITIAL LOAD ----------
showSection("createRide");
