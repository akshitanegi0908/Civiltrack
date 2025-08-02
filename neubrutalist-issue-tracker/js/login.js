// DOM Elements
const loginForm = document.getElementById("loginForm")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  // Declare the variable before using it
  function addInputAnimations() {
    // Placeholder for input animations
  }
  addInputAnimations()
})

// Setup event listeners
function setupEventListeners() {
  loginForm.addEventListener("submit", handleLogin)

  // Add input focus animations
  usernameInput.addEventListener("focus", handleInputFocus)
  passwordInput.addEventListener("focus", handleInputFocus)

  usernameInput.addEventListener("blur", handleInputBlur)
  passwordInput.addEventListener("blur", handleInputBlur)
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault()

  const username = usernameInput.value.trim()
  const password = passwordInput.value.trim()

  // Animate submit button
  const submitBtn = event.target.querySelector(".login-submit-btn")
  submitBtn.style.transform = "rotate(-1deg) scale(0.95)"
  submitBtn.textContent = "LOGGING IN..."

  // Simulate login process
  setTimeout(() => {
    if (username && password) {
      // Store user session (simple localStorage for demo)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)

      // Success animation
      submitBtn.style.background = "#32CD32"
      submitBtn.textContent = "SUCCESS!"

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "user-dashboard.html"
      }, 1000)
    } else {
      // Error animation
      submitBtn.style.background = "#FF1493"
      submitBtn.textContent = "ERROR!"

      // Shake animation for form
      const loginContainer = document.querySelector(".login-container")
      loginContainer.style.animation = "shake 0.5s ease-in-out"

      setTimeout(() => {
        submitBtn.style.background = "#32CD32"
        submitBtn.textContent = "LOGIN"
        submitBtn.style.transform = "rotate(-1deg) scale(1)"
        loginContainer.style.animation = ""
      }, 1500)
    }
  }, 1000)
}

// Handle input focus
function handleInputFocus(event) {
  const input = event.target
  const label = input.previousElementSibling

  // Animate label
  label.style.transform = "rotate(-1deg) scale(1.1)"
  label.style.color = "#FF1493"

  // Add typing animation
  input.addEventListener("input", handleTyping)
}

// Handle input blur
function handleInputBlur(event) {
  const input = event.target
  const label = input.previousElementSibling

  // Reset label
  label.style.transform = "rotate(-1deg) scale(1)"
  label.style.color = "#000"

  // Remove typing listener
  input.removeEventListener("input", handleTyping)
}

// Handle typing animation
function handleTyping(event) {
  const input = event.target

  // Add subtle bounce on typing
  input.style.transform = "rotate(1deg) scale(1.01)"

  setTimeout(() => {
    input.style.transform = "rotate(1deg) scale(1.02)"
  }, 100)
}

// Add shake animation keyframes
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: rotate(1deg) translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: rotate(1deg) translateX(-5px); }
        20%, 40%, 60%, 80% { transform: rotate(1deg) translateX(5px); }
    }
`

// Inject shake animation
const style = document.createElement("style")
style.textContent = shakeKeyframes
document.head.appendChild(style)

// Add random background color changes
setInterval(() => {
  const colors = ["#FF1493", "#00BFFF", "#32CD32", "#FF4500", "#FFFF00"]
  const currentBg = document.body.style.backgroundColor || "#FF1493"
  let newColor

  do {
    newColor = colors[Math.floor(Math.random() * colors.length)]
  } while (newColor === currentBg)

  document.body.style.transition = "background-color 2s ease"
  document.body.style.backgroundColor = newColor
}, 10000)

// Add interactive cursor effects
document.addEventListener("mousemove", (e) => {
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input) => {
    const rect = input.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance < 50 && !input.matches(":focus")) {
      const intensity = (50 - distance) / 50
      input.style.transform = `rotate(1deg) scale(${1 + intensity * 0.02})`
    } else if (!input.matches(":focus")) {
      input.style.transform = "rotate(1deg) scale(1)"
    }
  })
})
