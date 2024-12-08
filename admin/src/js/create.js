const originalEventImageSrc = "../../res/event.png";
const originalJobImageSrc = "../../res/job-listing.png";
const fileUploadSection = document.getElementById("fileUploadSection");
const inputSectionEvent = document.getElementById("inputSectionEvent");
const inputSectionJob = document.getElementById("inputSectionJob");
const fileInput = document.getElementById("file");
const imagePreview = document.getElementById("imagePreview");

document.getElementById("eventImage").addEventListener("click", function () {
  fileUploadSection.style.display = "flex";
  inputSectionEvent.style.display = "flex";

  document.getElementById("rightPanel").innerHTML = "";
  document.getElementById("rightPanel").appendChild(fileUploadSection);
  document.getElementById("rightPanel").appendChild(inputSectionEvent);

  this.src = "../../res/event-blue.png";
  document.getElementById("jobImage").src = originalJobImageSrc;
});

document.getElementById("jobImage").addEventListener("click", function () {
  inputSectionJob.style.display = "flex";

  document.getElementById("rightPanel").innerHTML = "";
  document.getElementById("rightPanel").appendChild(inputSectionJob);

  this.src = "../../res/job-listing-blue.png";
  document.getElementById("eventImage").src = originalEventImageSrc;
});

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file");
  const fileUploadSection = document.getElementById("fileUploadSection");
  const previewContainer = document.getElementById("imagePreview");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeInBytes = 64 * 1024; // 64 KB

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 300;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob.size > maxSizeInBytes) {
                alert(
                  "Image size exceeds 64 KB. Please upload a smaller image."
                );
                return;
              }

              previewContainer.style.backgroundImage = `url(${URL.createObjectURL(
                blob
              )})`;
              fileUploadSection.classList.add("has-preview");
            },
            file.type,
            0.7
          );
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");

  const messageText = document.createElement("span");
  messageText.textContent = message;

  notification.appendChild(messageText);

  document.getElementById("notificationContainer").appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function showFieldNotification(field, message) {
  // Locate the parent container of the input
  let parentContainer = field.closest(".input-container");

  if (!parentContainer) {
    console.error("No parent container found for:", field);
    return;
  }

  let notification = parentContainer.querySelector(".field-notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.classList.add("field-notification");
    notification.style.color = "red";
    notification.style.fontSize = "0.9em";
    notification.style.marginTop = "5px";
    parentContainer.appendChild(notification);
  }

  notification.textContent = message;
}

function clearFieldNotifications() {
  const notifications = document.querySelectorAll(".field-notification");
  notifications.forEach((notification) => notification.remove());
}

function validateForm() {
  clearFieldNotifications();

  const eventTitle = document.querySelector('input[name="eventTitle"]');
  const description = document.querySelector('textarea[name="description"]');
  const location = document.querySelector('input[name="location"]');
  const category = document.querySelector('select[name="category"]');
  const fileInput = document.querySelector('input[name="file"]');
  const scheduleInput = document.querySelector('input[name="schedule"]');

  let isValid = true;

  if (!eventTitle.value.trim()) {
    showFieldNotification(eventTitle, "Event Title cannot be empty.");
    isValid = false;
  }

  if (!description.value.trim()) {
    showFieldNotification(description, "Description cannot be empty.");
    isValid = false;
  }

  if (!location.value.trim()) {
    showFieldNotification(location, "Location cannot be empty.");
    isValid = false;
  }

  if (!category.value) {
    showFieldNotification(category, "Please select a Category.");
    isValid = false;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    showFieldNotification(fileInput, "Please upload an image.");
    isValid = false;
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const file = fileInput.files[0];
    if (!allowedTypes.includes(file.type)) {
      showFieldNotification(
        fileInput,
        "Invalid file type. Please upload a JPEG, PNG, or GIF image."
      );
      isValid = false;
    }
  }

  if (scheduleInput.value) {
    const selectedDate = new Date(scheduleInput.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      showFieldNotification(
        scheduleInput,
        "The event date cannot be in the past."
      );
      isValid = false;
    }
  } else {
    showFieldNotification(scheduleInput, "Please select a valid date.");
    isValid = false;
  }

  return isValid;
}

function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const form = document.getElementById("eventForm");
  const formData = new FormData(form);

  const fileInput = document.getElementById("file");
  if (fileInput.files.length > 0) {
    formData.append("eventPhoto", fileInput.files[0]);
  } else {
    showNotification("Please upload an image for the event.");
    return;
  }

  fetch("submit_event.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      showNotification(data);

      setTimeout(() => {
        window.location.href = "create.php";
      }, 3500);
    })
    .catch((error) => {
      showNotification("An error occurred: " + error.message);
    });
}

document.getElementById("jobpostForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearFieldNotifications();

  const jobTitleField = document.querySelector('input[name="jobTitle"]');
  const descriptionField = document.querySelector(
    'textarea[name="description"]'
  );
  const locationField = document.querySelector('input[name="location"]');
  const companyField = document.querySelector('input[name="category"]');

  let isValid = true;

  if (!jobTitleField.value.trim()) {
    showFieldNotification(jobTitleField, "Job Title cannot be empty.");
    isValid = false;
  }

  if (!descriptionField.value.trim()) {
    showFieldNotification(descriptionField, "Description cannot be empty.");
    isValid = false;
  }

  if (!locationField.value.trim()) {
    showFieldNotification(locationField, "Location cannot be empty.");
    isValid = false;
  }

  if (!companyField.value.trim()) {
    showFieldNotification(companyField, "Company name cannot be empty.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const formData = new FormData(document.getElementById("jobpostForm"));

  fetch("submit_jobpost.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      showNotification(data);
      setTimeout(() => {
        window.location.href = "create.php";
      }, 3000);
    })
    .catch((error) => {
      console.error("Error:", error);
      showNotification("An error occurred: " + error.message);
    });
});
