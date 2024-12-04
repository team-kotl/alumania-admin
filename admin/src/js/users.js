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

  // Debugging logs to check if elements are found
  console.log("Add Manager Button:", addManagerButton);
  console.log("Modal:", modal);
  console.log("Close Button:", closeBtn);

  // Ensure elements exist before trying to access them
  if (addManagerButton && modal && closeBtn) {
    // Show the modal when the Add Manager button is clicked
    addManagerButton.addEventListener("click", () => {
      modal.style.display = "block"; // Show modal
    });

    // Close the modal when the user clicks on the close button
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"; // Hide modal
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"; // Hide modal
      }
    });

    // Handle form submission (you can use this to send data to the server)
    const form = document.getElementById("addManagerForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from submitting normally
        const formData = new FormData(form);

        // Send data to the server via AJAX (example)
        fetch("add_manager.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Log the response from the server
            if (data.success) {
              alert("Manager added successfully!");
              modal.style.display = "none"; // Hide modal after success
            } else {
              alert("Failed to add manager.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error adding manager.");
          });
      });
    }
  } else {
    console.error("Required modal elements not found.");
  }
});
