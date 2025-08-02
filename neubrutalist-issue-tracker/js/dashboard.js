// Check if user is logged in
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "user-login.html"
}

// Sample user issues data
const userIssues = [
  {
    id: 1,
    image: "POTHOLE IMAGE",
    category: "ROADS",
    date: "2024-01-15",
    time: "14:30",
    description:
      "Large pothole causing damage to vehicles on Main Street intersection. Multiple cars have reported tire damage.",
    distance: "0.5KM",
    address: "123 Main St, Downtown",
    status: "assigned",
    reporter: localStorage.getItem("username") || "USER",
    isUserIssue: true,
  },
  {
    id: 2,
    image: "BROKEN LIGHT",
    category: "UTILITIES",
    date: "2024-01-14",
    time: "09:15",
    description:
      "Street light has been flickering for weeks, creating safety hazard for pedestrians and drivers during night hours.",
    distance: "1.2KM",
    address: "456 Oak Ave, Midtown",
    status: "progress",
    reporter: localStorage.getItem("username") || "USER",
    isUserIssue: true,
  },
  {
    id: 3,
    image: "GRAFFITI WALL",
    category: "ENVIRONMENT",
    date: "2024-01-13",
    time: "16:45",
    description: "Vandalism on public building wall needs immediate cleanup. Offensive content visible to children.",
    distance: "2.1KM",
    address: "789 Pine Rd, Uptown",
    status: "reported",
    reporter: localStorage.getItem("username") || "USER",
    isUserIssue: true,
  },
  {
    id: 4,
    image: "BROKEN FENCE",
    category: "SAFETY",
    date: "2024-01-12",
    time: "11:20",
    description: "Playground fence damaged, potential safety risk for children. Sharp edges exposed.",
    distance: "0.8KM",
    address: "321 Park Blvd, Westside",
    status: "reported",
    reporter: "Other User",
    isUserIssue: false,
  },
  {
    id: 5,
    image: "WATER LEAK",
    category: "UTILITIES",
    date: "2024-01-11",
    time: "07:30",
    description: "Water main leak causing flooding on residential street. Affecting multiple households.",
    distance: "3.5KM",
    address: "654 Elm St, Eastside",
    status: "resolved",
    reporter: "Other User",
    isUserIssue: false,
  },
]

let filteredIssues = [...userIssues]
let currentIssue = null

// DOM Elements
const issuesGrid = document.getElementById("issuesGrid")
const categoryFilter = document.getElementById("categoryFilter")
const statusFilter = document.getElementById("statusFilter")
const distanceFilter = document.getElementById("distanceFilter")
const searchInput = document.getElementById("searchInput")
const reportBtn = document.getElementById("reportBtn")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderIssues()
  setupEventListeners()
  animateCards()
})

// Setup event listeners
function setupEventListeners() {
  categoryFilter.addEventListener("change", filterIssues)
  statusFilter.addEventListener("change", filterIssues)
  distanceFilter.addEventListener("change", filterIssues)
  searchInput.addEventListener("input", filterIssues)
  reportBtn.addEventListener("click", openReportModal)
}

// Render issues to the grid
function renderIssues() {
  issuesGrid.innerHTML = ""

  filteredIssues.forEach((issue, index) => {
    const issueCard = createIssueCard(issue, index)
    issuesGrid.appendChild(issueCard)
  })

  // Animate cards after rendering
  setTimeout(animateCards, 100)
}

// Create individual issue card
function createIssueCard(issue, index) {
  const card = document.createElement("div")
  card.className = `issue-card ${issue.isUserIssue ? "user-issue" : ""}`
  card.style.animationDelay = `${index * 0.1}s`

  card.innerHTML = `
        <div class="issue-image">${issue.image}</div>
        <div class="issue-content">
            <div class="issue-header">
                <span class="issue-category">${issue.category}</span>
                <span class="issue-date">${formatDate(issue.date)}</span>
            </div>
            <p class="issue-description">${issue.description}</p>
            <div class="issue-footer">
                <span class="issue-distance">${issue.distance}</span>
                <span class="issue-address">${issue.address}</span>
            </div>
        </div>
    `

  // Add click event to open modal
  card.addEventListener("click", () => {
    openIssueModal(issue)
  })

  return card
}

// Open issue details modal
function openIssueModal(issue) {
  currentIssue = issue
  const modal = document.getElementById("issueModal")

  // Populate modal content
  document.getElementById("modalImage").textContent = issue.image
  document.getElementById("modalDateTime").textContent = `${formatDate(issue.date)} AT ${issue.time}`
  document.getElementById("modalDescription").textContent = issue.description
  document.getElementById("modalStatus").textContent = issue.status.toUpperCase()
  document.getElementById("modalReporter").textContent = issue.reporter
  document.getElementById("modalAddress").textContent = issue.address

  // Update status badge color
  const statusBadge = document.getElementById("modalStatus")
  statusBadge.className = "status-badge"
  switch (issue.status) {
    case "reported":
      statusBadge.style.background = "#FF4500"
      break
    case "assigned":
      statusBadge.style.background = "#FFFF00"
      break
    case "progress":
      statusBadge.style.background = "#00BFFF"
      break
    case "resolved":
      statusBadge.style.background = "#32CD32"
      break
  }

  // Update timeline
  updateTimeline(issue.status)

  // Show/hide edit and delete buttons based on ownership
  const editBtn = document.getElementById("editBtn")
  const deleteBtn = document.getElementById("deleteBtn")

  if (issue.isUserIssue) {
    editBtn.style.display = "block"
    deleteBtn.style.display = "block"
  } else {
    editBtn.style.display = "none"
    deleteBtn.style.display = "none"
  }

  // Show modal
  modal.classList.add("active")

  // Animate modal entrance
  const modalContainer = modal.querySelector(".modal-container")
  modalContainer.style.transform = "rotate(-1deg) scale(0.8) translateY(-50px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modalContainer.style.transition = "all 0.4s ease-out"
    modalContainer.style.transform = "rotate(-1deg) scale(1) translateY(0)"
    modalContainer.style.opacity = "1"
  }, 50)
}

// Update timeline based on status
function updateTimeline(status) {
  const assignedTimeline = document.getElementById("assignedTimeline")
  const progressTimeline = document.getElementById("progressTimeline")

  // Reset timeline
  assignedTimeline.classList.remove("active")
  progressTimeline.classList.remove("active")

  // Activate based on status
  if (status === "assigned" || status === "progress" || status === "resolved") {
    assignedTimeline.classList.add("active")
  }
  if (status === "progress" || status === "resolved") {
    progressTimeline.classList.add("active")
  }
}

// Open report modal
function openReportModal() {
  const modal = document.getElementById("reportModal")
  modal.classList.add("active")

  // Animate modal entrance
  const modalContainer = modal.querySelector(".modal-container")
  modalContainer.style.transform = "rotate(-1deg) scale(0.8) translateY(-50px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modalContainer.style.transition = "all 0.4s ease-out"
    modalContainer.style.transform = "rotate(-1deg) scale(1) translateY(0)"
    modalContainer.style.opacity = "1"
  }, 50)
}

// Filter issues based on selected criteria
function filterIssues() {
  const category = categoryFilter.value.toLowerCase()
  const status = statusFilter.value.toLowerCase()
  const distance = distanceFilter.value
  const search = searchInput.value.toLowerCase()

  filteredIssues = userIssues.filter((issue) => {
    const matchesCategory = !category || issue.category.toLowerCase() === category
    const matchesStatus = !status || issue.status.toLowerCase() === status
    const matchesDistance = !distance || checkDistanceMatch(issue.distance, distance)
    const matchesSearch =
      !search ||
      issue.description.toLowerCase().includes(search) ||
      issue.address.toLowerCase().includes(search) ||
      issue.category.toLowerCase().includes(search)

    return matchesCategory && matchesStatus && matchesDistance && matchesSearch
  })

  renderIssues()
}

// Check if distance matches filter
function checkDistanceMatch(issueDistance, filterDistance) {
  const issueValue = Number.parseFloat(issueDistance)
  const filterValue = Number.parseFloat(filterDistance)
  return issueValue <= filterValue
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    .toUpperCase()
}

// Animate cards on load
function animateCards() {
  const cards = document.querySelectorAll(".issue-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px) rotate(1deg)"

    setTimeout(() => {
      card.style.transition = "all 0.6s ease-out"
      card.style.opacity = "1"
      card.style.transform = "translateY(0) rotate(1deg)"
    }, index * 100)
  })
}

// Add interactive animations
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".issue-card")
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance < 100) {
      const intensity = (100 - distance) / 100
      card.style.transform = `rotate(1deg) scale(${1 + intensity * 0.02})`
    }
  })
})

// Background color animation
let colorIndex = 0
const colors = ["#32CD32", "#FF4500", "#00BFFF", "#FF1493", "#FFFF00"]

setInterval(() => {
  colorIndex = (colorIndex + 1) % colors.length
  document.body.style.transition = "background-color 3s ease"
  document.body.style.backgroundColor = colors[colorIndex]
}, 12000)
