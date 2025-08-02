// DOM Elements
const registerForm = document.getElementById("registerForm")
const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  addInputAnimations()
  startBackgroundAnimation()
})

// Setup event listeners
function setupEventListeners() {
  registerForm.addEventListener("submit", handleRegister)

  // Add input focus animations
  const inputs = [usernameInput, emailInput, phoneInput, passwordInput]
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus)
    input.addEventListener("blur", handleInputBlur)
    input.addEventListener("input", handleInputValidation)
  })
}

// Handle registration form submission
function handleRegister(event) {
  event.preventDefault()

  const username = usernameInput.value.trim()
  const email = emailInput.value.trim()
  const phone = phoneInput.value.trim()
  const password = passwordInput.value.trim()

  // Animate submit button
  const submitBtn = event.target.querySelector(".register-submit-btn")
  submitBtn.style.transform = "rotate(1deg) scale(0.95)"
  submitBtn.textContent = "REGISTERING..."
  submitBtn.style.background = "#FFFF00"

  // Validate inputs
  const isValid = validateForm(username, email, phone, password)

  // Simulate registration process
  setTimeout(() => {
    if (isValid) {
      // Store user data (simple localStorage for demo)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)
      localStorage.setItem("email", email)
      localStorage.setItem("phone", phone)

      // Success animation
      submitBtn.style.background = "#32CD32"
      submitBtn.textContent = "SUCCESS!"

      // Celebrate animation
      celebrateRegistration()

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "user-dashboard.html"
      }, 2000)
    } else {
      // Error animation
      submitBtn.style.background = "#FF1493"
      submitBtn.textContent = "PLEASE CHECK INPUTS!"

      // Shake animation for form
      const registerContainer = document.querySelector(".register-container")
      registerContainer.style.animation = "shake 0.5s ease-in-out"

      setTimeout(() => {
        submitBtn.style.background = "#FF4500"
        submitBtn.textContent = "REGISTER"
        submitBtn.style.transform = "rotate(1deg) scale(1)"
        registerContainer.style.animation = ""
      }, 2000)
    }
  }, 1500)
}

// Validate form inputs
function validateForm(username, email, phone, password) {
  let isValid = true

  // Reset input styles
  const inputs = [usernameInput, emailInput, phoneInput, passwordInput]
  inputs.forEach((input) => {
    input.style.borderColor = "#000"
    input.style.background = input.matches(":focus") ? "#FF1493" : "#FFFF00"
  })

  // Username validation
  if (username.length < 3) {
    usernameInput.style.borderColor = "#FF1493"
    usernameInput.style.background = "#FF4500"
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    emailInput.style.borderColor = "#FF1493"
    emailInput.style.background = "#FF4500"
    isValid = false
  }

  // Phone validation
  const phoneRegex = /^\d{10,}$/
  if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
    phoneInput.style.borderColor = "#FF1493"
    phoneInput.style.background = "#FF4500"
    isValid = false
  }

  // Password validation
  if (password.length < 6) {
    passwordInput.style.borderColor = "#FF1493"
    passwordInput.style.background = "#FF4500"
    isValid = false
  }

  return isValid
}

// Handle input focus
function handleInputFocus(event) {
  const input = event.target
  const label = input.previousElementSibling

  // Animate label
  label.style.transform = "rotate(1deg) scale(1.1)"
  label.style.color = "#FF1493"

  // Add glow effect
  input.style.boxShadow = "0 0 15px #FF1493"
}

// Handle input blur
function handleInputBlur(event) {
  const input = event.target
  const label = input.previousElementSibling

  // Reset label
  label.style.transform = "rotate(1deg) scale(1)"
  label.style.color = "#000"

  // Remove glow
  input.style.boxShadow = "3px 3px 0px #000"
}

// Handle input validation on typing
function handleInputValidation(event) {
  const input = event.target

  // Add typing animation
  input.style.transform = "rotate(-1deg) scale(1.01)"

  setTimeout(() => {
    input.style.transform = "rotate(-1deg) scale(1.02)"
  }, 100)

  // Real-time validation feedback
  setTimeout(() => {
    const value = input.value.trim()
    let isValid = true

    switch (input.type) {
      case "text": // username
        isValid = value.length >= 3
        break
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        break
      case "tel":
        isValid = /^\d{10,}$/.test(value.replace(/\D/g, ""))
        break
      case "password":
        isValid = value.length >= 6
        break
    }

    if (value && !isValid) {
      input.style.borderColor = "#FF1493"
    } else if (value && isValid) {
      input.style.borderColor = "#32CD32"
    } else {
      input.style.borderColor = "#000"
    }
  }, 500)
}

// Add input animations
function addInputAnimations() {
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input, index) => {
    input.style.animationDelay = `${index * 0.1}s`
  })
}

// Celebration animation
function celebrateRegistration() {
  const container = document.querySelector(".register-container")

  // Create confetti effect
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createConfetti()
    }, i * 100)
  }

  // Bounce the container
  container.style.animation = "celebrate 1s ease-in-out"
}

// Create confetti particles
function createConfetti() {
  const confetti = document.createElement("div")
  confetti.style.position = "fixed"
  confetti.style.width = "10px"
  confetti.style.height = "10px"
  confetti.style.backgroundColor = ["#FF1493", "#00BFFF", "#32CD32", "#FF4500", "#FFFF00"][
    Math.floor(Math.random() * 5)
  ]
  confetti.style.left = Math.random() * window.innerWidth + "px"
  confetti.style.top = "-10px"
  confetti.style.zIndex = "1000"
  confetti.style.border = "2px solid #000"
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`

  document.body.appendChild(confetti)

  // Animate confetti falling
  let position = -10
  const fallSpeed = Math.random() * 5 + 2
  const rotation = Math.random() * 10 - 5

  const fall = setInterval(() => {
    position += fallSpeed
    confetti.style.top = position + "px"
    confetti.style.transform = `rotate(${Number.parseFloat(confetti.style.transform.match(/\d+/)[0]) + rotation}deg)`

    if (position > window.innerHeight) {
      clearInterval(fall)
      document.body.removeChild(confetti)
    }
  }, 16)
}

// Start background animation
function startBackgroundAnimation() {
  const colors = ["#00BFFF", "#32CD32", "#FF4500", "#FF1493", "#FFFF00"]
  let colorIndex = 0

  setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length
    document.body.style.transition = "background-color 3s ease"
    document.body.style.backgroundColor = colors[colorIndex]
  }, 8000)
}

// Add shake animation keyframes
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: rotate(-1deg) translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: rotate(-1deg) translateX(-8px); }
        20%, 40%, 60%, 80% { transform: rotate(-1deg) translateX(8px); }
    }
    
    @keyframes celebrate {
        0%, 100% { transform: rotate(-1deg) scale(1); }
        25% { transform: rotate(-1deg) scale(1.05) translateY(-10px); }
        50% { transform: rotate(-1deg) scale(1.1) translateY(-20px); }
        75% { transform: rotate(-1deg) scale(1.05) translateY(-10px); }
    }
`

// Inject animations
const style = document.createElement("style")
style.textContent = shakeKeyframes
document.head.appendChild(style)

// Add interactive cursor effects
document.addEventListener("mousemove", (e) => {
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input) => {
    const rect = input.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance < 60 && !input.matches(":focus")) {
      const intensity = (60 - distance) / 60
      input.style.transform = `rotate(-1deg) scale(${1 + intensity * 0.03})`
    } else if (!input.matches(":focus")) {
      input.style.transform = "rotate(-1deg) scale(1)"
    }
  })
})
