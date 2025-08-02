// Modal functionality
const userIssues = []
let filteredIssues = []
const currentIssue = null

document.addEventListener("DOMContentLoaded", () => {
  setupModalEventListeners()
})

// Setup modal event listeners
function setupModalEventListeners() {
  // Issue modal close buttons
  const closeModalBtn = document.getElementById("closeModalBtn")
  const issueModal = document.getElementById("issueModal")

  // Report modal close buttons
  const closeReportBtn = document.getElementById("closeReportBtn")
  const reportModal = document.getElementById("reportModal")

  // Report form
  const reportForm = document.getElementById("reportForm")

  // Edit and delete buttons
  const editBtn = document.getElementById("editBtn")
  const deleteBtn = document.getElementById("deleteBtn")

  // Close issue modal
  closeModalBtn.addEventListener("click", closeIssueModal)
  issueModal.addEventListener("click", (e) => {
    if (e.target === issueModal) closeIssueModal()
  })

  // Close report modal
  closeReportBtn.addEventListener("click", closeReportModal)
  reportModal.addEventListener("click", (e) => {
    if (e.target === reportModal) closeReportModal()
  })

  // Handle report form submission
  reportForm.addEventListener("submit", handleReportSubmission)

  // Handle edit and delete
  editBtn.addEventListener("click", handleEditIssue)
  deleteBtn.addEventListener("click", handleDeleteIssue)

  // Map picker interaction
  const mapPicker = document.querySelector(".map-picker")
  const locationInput = document.getElementById("issueLocation")

  mapPicker.addEventListener("click", () => {
    // Simulate location selection
    const locations = [
      "123 Main St, Downtown",
      "456 Oak Ave, Midtown",
      "789 Pine Rd, Uptown",
      "321 Park Blvd, Westside",
      "654 Elm St, Eastside",
    ]

    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    locationInput.value = randomLocation

    // Animate selection
    mapPicker.style.background = "#32CD32"
    mapPicker.textContent = "LOCATION SELECTED!"

    setTimeout(() => {
      mapPicker.style.background = "#FF4500"
      mapPicker.textContent = "MAP LOCATION PICKER"
    }, 1500)
  })

  // File input animation
  const fileInput = document.getElementById("issueImage")
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name
      e.target.style.background = "#32CD32"

      // Create a visual feedback
      const feedback = document.createElement("div")
      feedback.textContent = `SELECTED: ${fileName}`
      feedback.style.cssText = `
                position: absolute;
                background: #FF1493;
                color: #000;
                padding: 5px 10px;
                border: 2px solid #000;
                font-weight: 900;
                font-size: 0.8rem;
                transform: rotate(-2deg);
                z-index: 10;
                animation: fadeInOut 2s ease-out;
            `

      e.target.parentNode.style.position = "relative"
      e.target.parentNode.appendChild(feedback)

      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback)
        }
      }, 2000)
    }
  })
}

// Close issue modal
function closeIssueModal() {
  const modal = document.getElementById("issueModal")
  const modalContainer = modal.querySelector(".modal-container")

  // Animate exit
  modalContainer.style.transition = "all 0.3s ease-in"
  modalContainer.style.transform = "rotate(-1deg) scale(0.8) translateY(-50px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modal.classList.remove("active")
    modalContainer.style.transition = ""
  }, 300)
}

// Close report modal
function closeReportModal() {
  const modal = document.getElementById("reportModal")
  const modalContainer = modal.querySelector(".modal-container")

  // Animate exit
  modalContainer.style.transition = "all 0.3s ease-in"
  modalContainer.style.transform = "rotate(-1deg) scale(0.8) translateY(-50px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modal.classList.remove("active")
    modalContainer.style.transition = ""

    // Reset form
    document.getElementById("reportForm").reset()
    resetFormStyles()
  }, 300)
}

// Handle report form submission
function handleReportSubmission(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const submitBtn = event.target.querySelector(".submit-issue-btn")

  // Get form values
  const category = document.getElementById("issueCategory").value
  const description = document.getElementById("issueDescription").value
  const location = document.getElementById("issueLocation").value
  const anonymous = document.getElementById("reportAnonymously").checked

  // Validate form
  if (!category || !description) {
    // Error animation
    submitBtn.style.background = "#FF1493"
    submitBtn.textContent = "PLEASE FILL ALL FIELDS!"

    // Shake form
    const form = event.target
    form.style.animation = "shake 0.5s ease-in-out"

    setTimeout(() => {
      submitBtn.style.background = "#FF4500"
      submitBtn.textContent = "SUBMIT ISSUE"
      form.style.animation = ""
    }, 2000)

    return
  }

  // Animate submission
  submitBtn.style.background = "#FFFF00"
  submitBtn.textContent = "SUBMITTING..."
  submitBtn.style.transform = "rotate(-1deg) scale(0.95)"

  // Simulate submission
  setTimeout(() => {
    // Create new issue
    const newIssue = {
      id: Date.now(),
      image: "NEW ISSUE IMAGE",
      category: category.toUpperCase(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      description: description,
      distance: "0.1KM",
      address: location || "Current Location",
      status: "reported",
      reporter: anonymous ? "Anonymous" : localStorage.getItem("username") || "USER",
      isUserIssue: true,
    }

    // Add to issues array
    userIssues.unshift(newIssue)
    filteredIssues = [...userIssues]

    // Success animation
    submitBtn.style.background = "#32CD32"
    submitBtn.textContent = "ISSUE SUBMITTED!"

    // Celebration effect
    createSuccessConfetti()

    // Close modal and refresh
    setTimeout(() => {
      closeReportModal()
      renderIssues()

      // Show success message
      showSuccessMessage("ISSUE REPORTED SUCCESSFULLY!")
    }, 1500)
  }, 2000)
}

// Handle edit issue
function handleEditIssue() {
  if (!currentIssue || !currentIssue.isUserIssue) return

  const editBtn = document.getElementById("editBtn")
  editBtn.style.background = "#FFFF00"
  editBtn.textContent = "EDITING..."

  // Simulate edit functionality
  setTimeout(() => {
    editBtn.style.background = "#32CD32"
    editBtn.textContent = "EDIT"

    // For demo, just show alert
    alert("EDIT FUNCTIONALITY WOULD OPEN EDIT FORM HERE")
  }, 1000)
}

// Handle delete issue
function handleDeleteIssue() {
  if (!currentIssue || !currentIssue.isUserIssue) return

  const deleteBtn = document.getElementById("deleteBtn")

  // Confirm deletion
  if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS ISSUE?")) {
    deleteBtn.style.background = "#FF1493"
    deleteBtn.textContent = "DELETING..."

    setTimeout(() => {
      // Remove from arrays
      const index = userIssues.findIndex((issue) => issue.id === currentIssue.id)
      if (index > -1) {
        userIssues.splice(index, 1)
        filteredIssues = [...userIssues]
      }

      // Close modal and refresh
      closeIssueModal()
      renderIssues()

      // Show success message
      showSuccessMessage("ISSUE DELETED SUCCESSFULLY!")
    }, 1000)
  }
}

// Reset form styles
function resetFormStyles() {
  const inputs = document.querySelectorAll("#reportForm input, #reportForm select, #reportForm textarea")
  inputs.forEach((input) => {
    input.style.background = "#FFFF00"
    input.style.borderColor = "#000"
  })

  const mapPicker = document.querySelector(".map-picker")
  mapPicker.style.background = "#FF4500"
  mapPicker.textContent = "MAP LOCATION PICKER"
}

// Create success confetti
function createSuccessConfetti() {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${["#FF1493", "#00BFFF", "#32CD32", "#FF4500", "#FFFF00"][Math.floor(Math.random() * 5)]};
                border: 2px solid #000;
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                z-index: 2000;
                transform: rotate(${Math.random() * 360}deg);
            `

      document.body.appendChild(confetti)

      let position = -10
      const fallSpeed = Math.random() * 4 + 2
      const rotation = Math.random() * 8 - 4

      const fall = setInterval(() => {
        position += fallSpeed
        confetti.style.top = position + "px"
        confetti.style.transform = `rotate(${Number.parseFloat(confetti.style.transform.match(/\d+/)[0]) + rotation}deg)`

        if (position > window.innerHeight) {
          clearInterval(fall)
          if (confetti.parentNode) {
            document.body.removeChild(confetti)
          }
        }
      }, 16)
    }, i * 100)
  }
}

// Show success message
function showSuccessMessage(message) {
  const successMsg = document.createElement("div")
  successMsg.textContent = message
  successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-2deg);
        background: #32CD32;
        color: #000;
        padding: 20px 30px;
        font-weight: 900;
        font-size: 1.2rem;
        border: 5px solid #000;
        box-shadow: 8px 8px 0px #000;
        z-index: 2000;
        animation: successPop 0.5s ease-out;
    `

  document.body.appendChild(successMsg)

  setTimeout(() => {
    successMsg.style.transition = "all 0.3s ease-in"
    successMsg.style.opacity = "0"
    successMsg.style.transform = "translate(-50%, -50%) rotate(-2deg) scale(0.8)"

    setTimeout(() => {
      if (successMsg.parentNode) {
        document.body.removeChild(successMsg)
      }
    }, 300)
  }, 2000)
}

// Add success animation keyframes
const successKeyframes = `
    @keyframes successPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-2deg) scale(0.5);
        }
        50% {
            transform: translate(-50%, -50%) rotate(-2deg) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-2deg) scale(1);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(10px); }
        50% { opacity: 1; transform: translateY(0); }
    }
`

// Inject success animations
const style = document.createElement("style")
style.textContent = successKeyframes
document.head.appendChild(style)

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC to close modals
  if (e.key === "Escape") {
    const issueModal = document.getElementById("issueModal")
    const reportModal = document.getElementById("reportModal")

    if (issueModal.classList.contains("active")) {
      closeIssueModal()
    }
    if (reportModal.classList.contains("active")) {
      closeReportModal()
    }
  }

  // Ctrl/Cmd + N to open report modal
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault()
    openReportModal()
  }
})

// Function to open report modal
function openReportModal() {
  const reportModal = document.getElementById("reportModal")
  reportModal.classList.add("active")
}
