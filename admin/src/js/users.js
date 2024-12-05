document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const totalUsersElement = document.querySelector(".total-users");
  const filterDropdown = document.getElementById("filterDropdown");
  const statusFilters = document.querySelectorAll(
    ".filter-section:nth-child(1) ul li"
  );
  const locationFilters = document.querySelectorAll(
    ".filter-section:nth-child(2) ul li"
  );
  const tableRows = document.querySelectorAll("tbody tr"); // Will be dynamically updated

  let activeFilters = {
    status: null,
    location: null,
  };

  function filterRows() {
    // Get the updated table rows dynamically for the current active tab
    const tableRows = document.querySelectorAll("tbody tr");
    const searchQuery = searchInput.value.toLowerCase();
    let visibleCount = 0;

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowText = Array.from(cells)
        .map((cell) => cell.textContent.toLowerCase())
        .join(" ");

      const status = cells[3]?.textContent.toLowerCase();
      const location = cells[4]?.textContent.toLowerCase();

      // Check if row matches search query and active filters
      const matchesSearch = rowText.includes(searchQuery);
      const matchesStatus = activeFilters.status
        ? status === activeFilters.status
        : true;
      const matchesLocation = activeFilters.location
        ? location === activeFilters.location
        : true;

      // Show or hide row based on matching filters
      if (matchesSearch && matchesStatus && matchesLocation) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    // Update the total count of visible users
    if (totalUsersElement) {
      totalUsersElement.textContent = `Total Users: ${visibleCount}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterRows); // Apply search filter
  }

  // Status filters
  statusFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selectedStatus = filter.textContent.toLowerCase();

      activeFilters.status =
        activeFilters.status === selectedStatus ? null : selectedStatus;

      statusFilters.forEach((f) => f.classList.remove("active"));
      if (activeFilters.status) filter.classList.add("active");

      filterRows(); // Reapply filter after selecting status
    });
  });

  // Location filters
  locationFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selectedLocation = filter.textContent.toLowerCase();

      activeFilters.location =
        activeFilters.location === selectedLocation ? null : selectedLocation;

      locationFilters.forEach((f) => f.classList.remove("active"));
      if (activeFilters.location) filter.classList.add("active");

      filterRows(); // Reapply filter after selecting location
    });
  });

  // Filter dropdown toggle
  if (filterDropdown) {
    const toggleFilterDropdown = () => {
      filterDropdown.classList.toggle("show");
    };

    const filterButton = document.querySelector(".filter-btn");
    if (filterButton) {
      filterButton.addEventListener("click", toggleFilterDropdown);
    }
  }

  // Tab switching logic
  const alumniTab = document.getElementById("alumniTab");
  const managerTab = document.getElementById("managerTab");
  const userPanel = document.getElementById("userPanel");
  const addManagerButtonContainer = document.querySelector(
    ".add-manager-button-container"
  );

  const updateTabUI = (activeTab, inactiveTab) => {
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");

    const activeImg = activeTab.querySelector("img");
    const inactiveImg = inactiveTab.querySelector("img");
    activeImg.src = activeTab.getAttribute("selected-icon");
    inactiveImg.src = inactiveTab.getAttribute("unselected-icon");
  };

  // Handle alumni tab click
  alumniTab.addEventListener("click", () => {
    userPanel.innerHTML = alumniContent; // Show alumni content
    updateTabUI(alumniTab, managerTab);
    addManagerButtonContainer.classList.add("hidden");
    filterDropdown.classList.remove("show"); // Hide the filter dropdown
  });

  // Handle manager tab click
  managerTab.addEventListener("click", () => {
    userPanel.innerHTML = managerContent; // Show manager content
    updateTabUI(managerTab, alumniTab);
    addManagerButtonContainer.classList.remove("hidden");
    filterDropdown.classList.remove("show"); // Hide the filter dropdown
  });
});

//temp
document.addEventListener("DOMContentLoaded", () => {
  const addManagerButton = document.querySelector(".add-manager-button");
  const modal = document.getElementById("addManagerModal");
  const closeBtn = document.querySelector(".close-btn");

  // Show the modal when the Add Manager button is clicked
  if (addManagerButton && modal && closeBtn) {
    addManagerButton.addEventListener("click", () => {
      modal.style.display = "block"; // Show modal
    });

    // Close the modal when the user clicks the close button
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"; // Hide modal
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"; // Hide modal
      }
    });

    // Handle form submission
    const form = document.getElementById("addManagerForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission
      const formData = new FormData(form);

      fetch("add_manager.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Manager added successfully!");
            modal.style.display = "none"; // Hide modal on success
            form.reset(); // Reset the form
          } else {
            alert(data.message || "Failed to add manager.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while adding the manager.");
        });
    });
  } else {
    console.error("Required modal elements not found.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    togglePassword.textContent =
      type === "password" ? "Show Password" : "Hide Password";
  });
});
