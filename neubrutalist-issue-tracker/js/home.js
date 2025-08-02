// Sample issue data
const sampleIssues = [
  {
    id: 1,
    image: "POTHOLE IMAGE",
    category: "ROADS",
    date: "2024-01-15",
    description: "Large pothole causing damage to vehicles on Main Street intersection",
    distance: "0.5KM",
    address: "123 Main St, Downtown",
    status: "reported",
  },
  {
    id: 2,
    image: "BROKEN LIGHT",
    category: "UTILITIES",
    date: "2024-01-14",
    description: "Street light has been flickering for weeks, creating safety hazard",
    distance: "1.2KM",
    address: "456 Oak Ave, Midtown",
    status: "assigned",
  },
  {
    id: 3,
    image: "GRAFFITI WALL",
    category: "ENVIRONMENT",
    date: "2024-01-13",
    description: "Vandalism on public building wall needs immediate cleanup",
    distance: "2.1KM",
    address: "789 Pine Rd, Uptown",
    status: "progress",
  },
  {
    id: 4,
    image: "BROKEN FENCE",
    category: "SAFETY",
    date: "2024-01-12",
    description: "Playground fence damaged, potential safety risk for children",
    distance: "0.8KM",
    address: "321 Park Blvd, Westside",
    status: "reported",
  },
  {
    id: 5,
    image: "WATER LEAK",
    category: "UTILITIES",
    date: "2024-01-11",
    description: "Water main leak causing flooding on residential street",
    distance: "3.5KM",
    address: "654 Elm St, Eastside",
    status: "resolved",
  },
  {
    id: 6,
    image: "TRASH PILE",
    category: "ENVIRONMENT",
    date: "2024-01-10",
    description: "Illegal dumping site needs immediate cleanup and investigation",
    distance: "4.2KM",
    address: "987 Cedar Ave, Southside",
    status: "assigned",
  },
]

let filteredIssues = [...sampleIssues]

// DOM Elements
const issuesGrid = document.getElementById("issuesGrid")
const categoryFilter = document.getElementById("categoryFilter")
const statusFilter = document.getElementById("statusFilter")
const distanceFilter = document.getElementById("distanceFilter")
const searchInput = document.getElementById("searchInput")

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
  card.className = "issue-card"
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

  // Add click event for future modal functionality
  card.addEventListener("click", () => {
    handleCardClick(issue)
  })

  return card
}

// Handle card click (placeholder for future modal)
function handleCardClick(issue) {
  // Animate click
  event.currentTarget.style.transform = "rotate(-1deg) scale(0.95)"
  setTimeout(() => {
    event.currentTarget.style.transform = "rotate(-1deg) scale(1.03) translateY(-5px)"
  }, 150)

  // For now, just log the issue (will be replaced with modal)
  console.log("Issue clicked:", issue)
  alert(
    `Issue Details:\n\nCategory: ${issue.category}\nDescription: ${issue.description}\nAddress: ${issue.address}\nStatus: ${issue.status.toUpperCase()}`,
  )
}

// Filter issues based on selected criteria
function filterIssues() {
  const category = categoryFilter.value.toLowerCase()
  const status = statusFilter.value.toLowerCase()
  const distance = distanceFilter.value
  const search = searchInput.value.toLowerCase()

  filteredIssues = sampleIssues.filter((issue) => {
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
    card.style.transform = "translateY(30px) rotate(-1deg)"

    setTimeout(() => {
      card.style.transition = "all 0.6s ease-out"
      card.style.opacity = "1"
      card.style.transform = "translateY(0) rotate(-1deg)"
    }, index * 100)
  })
}

// Add some interactive animations
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".issue-card")
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance < 100) {
      const intensity = (100 - distance) / 100
      card.style.transform = `rotate(-1deg) scale(${1 + intensity * 0.02})`
    }
  })
})
