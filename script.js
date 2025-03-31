document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos DOM
    const tabButtons = document.querySelectorAll(".tab-btn")
    const forms = document.querySelectorAll(".form")
    const switchFormLinks = document.querySelectorAll(".switch-form")
    const passwordToggles = document.querySelectorAll(".password-toggle")
    const registerPasswordInput = document.getElementById("register-password")
    const registerConfirmPasswordInput = document.getElementById("register-confirm-password")
    const strengthSegments = document.querySelectorAll(".strength-segment")
    const strengthText = document.querySelector(".strength-text")
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
    const terminalText = document.getElementById("terminal-text")
    const registerTerminalText = document.getElementById("register-terminal-text")
    const termsCheckbox = document.getElementById("terms-checkbox")
  
    // Inicializar efectos de terminal
    initTerminalEffect(terminalText, [
      "Iniciando secuencia de autenticación...",
      "Verificando protocolos de seguridad...",
      "Sistema listo para autenticación de usuario.",
    ])
  
    initTerminalEffect(registerTerminalText, [
      "Iniciando secuencia de registro...",
      "Preparando protocolos de seguridad...",
      "Sistema listo para registro de nuevo usuario.",
    ])
  
    // Cambiar pestaña al hacer clic
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabName = this.dataset.tab
  
        // Actualizar botones activos
        tabButtons.forEach((btn) => {
          btn.classList.remove("active")
          btn.setAttribute("aria-pressed", "false")
        })
        this.classList.add("active")
        this.setAttribute("aria-pressed", "true")
  
        // Mostrar el formulario correspondiente
        if (tabName === "login") {
          document.getElementById("login-form").classList.remove("slide-left", "slide-right")
          document.getElementById("register-form").classList.add("slide-right")
        } else {
          document.getElementById("register-form").classList.remove("slide-left", "slide-right")
          document.getElementById("login-form").classList.add("slide-left")
        }
      })
    })
  
    // Cambiar formulario desde los enlaces
    switchFormLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const formName = this.dataset.form
        const activeTab = document.querySelector(`.tab-btn[data-tab="${formName}"]`)
        activeTab.click()
      })
    })
  
    // Toggle de visibilidad de contraseña
    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const targetId = this.dataset.target
        const passwordInput = document.getElementById(targetId)
        const eyeIcon = this.querySelector(".eye-icon")
        const eyeOffIcon = this.querySelector(".eye-off-icon")
  
        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          eyeIcon.classList.add("hidden")
          eyeOffIcon.classList.remove("hidden")
        } else {
          passwordInput.type = "password"
          eyeIcon.classList.remove("hidden")
          eyeOffIcon.classList.add("hidden")
        }
      })
    })
  
    // Validación de formulario de login
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const username = document.getElementById("login-username")
      const password = document.getElementById("login-password")
      const usernameError = document.getElementById("login-username-error")
      const passwordError = document.getElementById("login-password-error")
  
      let isValid = true
  
      // Validar usuario
      if (!username.value.trim()) {
        username.classList.add("error")
        usernameError.textContent = "El usuario es obligatorio"
        isValid = false
      } else {
        username.classList.remove("error")
        usernameError.textContent = ""
      }
  
      // Validar contraseña
      if (!password.value) {
        password.classList.add("error")
        passwordError.textContent = "La contraseña es obligatoria"
        isValid = false
      } else {
        password.classList.remove("error")
        passwordError.textContent = ""
      }
  
      if (isValid) {
        // Simulación de login exitoso
        showSuccessAnimation(loginForm)
  
        // En un caso real, aquí iría la llamada al servidor
        console.log("Login exitoso", {
          username: username.value,
          password: password.value,
        })
      }
    })
  
    // Validación de formulario de registro
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const name = document.getElementById("register-name")
      const username = document.getElementById("register-username")
      const email = document.getElementById("register-email")
      const password = document.getElementById("register-password")
  
      const nameError = document.getElementById("register-name-error")
      const usernameError = document.getElementById("register-username-error")
      const emailError = document.getElementById("register-email-error")
      const passwordError = document.getElementById("register-password-error")
      const termsError = document.getElementById("terms-error")
  
      let isValid = true
  
      // Validar nombre
      if (!name.value.trim()) {
        name.classList.add("error")
        nameError.textContent = "El nombre es obligatorio"
        isValid = false
      } else {
        name.classList.remove("error")
        nameError.textContent = ""
      }
  
      // Validar nombre de usuario
      if (!username.value.trim()) {
        username.classList.add("error")
        usernameError.textContent = "El nombre de usuario es obligatorio"
        isValid = false
      } else if (username.value.trim().length < 4) {
        username.classList.add("error")
        usernameError.textContent = "El nombre de usuario debe tener al menos 4 caracteres"
        isValid = false
      } else {
        username.classList.remove("error")
        usernameError.textContent = ""
      }
  
      // Validar email
      if (!email.value.trim()) {
        email.classList.add("error")
        emailError.textContent = "El correo electrónico es obligatorio"
        isValid = false
      } else if (!isValidEmail(email.value)) {
        email.classList.add("error")
        emailError.textContent = "Introduce un correo electrónico válido"
        isValid = false
      } else {
        email.classList.remove("error")
        emailError.textContent = ""
      }
  
      // Validar contraseña
      if (!password.value) {
        password.classList.add("error")
        passwordError.textContent = "La contraseña es obligatoria"
        isValid = false
      } else if (password.value.length < 8) {
        password.classList.add("error")
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres"
        isValid = false
      } else {
        password.classList.remove("error")
        passwordError.textContent = ""
      }
  
      // Validar términos y condiciones
      if (!termsCheckbox.checked) {
        termsError.textContent = "Debes aceptar los términos y condiciones"
        isValid = false
      } else {
        termsError.textContent = ""
      }
  
      if (isValid) {
        // Simulación de registro exitoso
        showSuccessAnimation(registerForm)
  
        // En un caso real, aquí iría la llamada al servidor
        console.log("Registro exitoso", {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
          termsAccepted: termsCheckbox.checked,
        })
      }
    })
  
    // Medidor de seguridad de contraseña
    if (registerPasswordInput) {
      registerPasswordInput.addEventListener("input", function () {
        const password = this.value
        const strength = calculatePasswordStrength(password)
        updatePasswordStrengthIndicator(strength)
      })
    }
  
    // Crear partículas flotantes
    const particlesContainer = document.getElementById("particles")
  
    for (let i = 0; i < 50; i++) {
      createParticle()
    }
  
    // Funciones auxiliares
    function createParticle() {
      const particle = document.createElement("div")
      particle.classList.add("particle")
  
      // Posición aleatoria
      const posX = Math.random() * 100
      const delay = Math.random() * 20
  
      particle.style.left = `${posX}%`
      particle.style.bottom = "-5px"
      particle.style.width = `${Math.random() * 3 + 1}px`
      particle.style.height = particle.style.width
  
      // Color aleatorio entre azul, morado y rosa
      const colors = ["rgba(0, 243, 255, 0.7)", "rgba(157, 0, 255, 0.7)", "rgba(255, 0, 200, 0.7)"]
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  
      // Animación
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`
      particle.style.animationDelay = `${delay}s`
  
      particlesContainer.appendChild(particle)
  
      // Volver a crear partícula cuando termine la animación
      setTimeout(
        () => {
          particle.remove()
          createParticle()
        },
        (10 + delay) * 1000,
      )
    }
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    function calculatePasswordStrength(password) {
      if (!password) return 0
  
      let strength = 0
  
      // Longitud
      if (password.length >= 8) strength += 1
      if (password.length >= 12) strength += 1
  
      // Complejidad
      if (/[A-Z]/.test(password)) strength += 1
      if (/[0-9]/.test(password)) strength += 1
      if (/[^A-Za-z0-9]/.test(password)) strength += 1
  
      return Math.min(strength, 4)
    }
  
    function updatePasswordStrengthIndicator(strength) {
      // Actualizar segmentos
      strengthSegments.forEach((segment, index) => {
        segment.classList.remove("weak", "medium", "strong")
  
        if (index < strength) {
          if (strength === 1) {
            segment.classList.add("weak")
          } else if (strength === 2 || strength === 3) {
            segment.classList.add("medium")
          } else {
            segment.classList.add("strong")
          }
        }
      })
  
      // Actualizar texto
      if (strength === 0) {
        strengthText.textContent = "Seguridad: Débil"
        strengthText.style.color = "var(--error-color)"
      } else if (strength === 1) {
        strengthText.textContent = "Seguridad: Débil"
        strengthText.style.color = "var(--error-color)"
      } else if (strength === 2) {
        strengthText.textContent = "Seguridad: Media"
        strengthText.style.color = "var(--warning-color)"
      } else if (strength === 3) {
        strengthText.textContent = "Seguridad: Buena"
        strengthText.style.color = "var(--success-color)"
      } else {
        strengthText.textContent = "Seguridad: Excelente"
        strengthText.style.color = "var(--success-color)"
      }
    }
  
    function showSuccessAnimation(form) {
      const btn = form.querySelector(".btn")
      const originalText = btn.querySelector(".btn-text").textContent
  
      btn.querySelector(".btn-text").textContent = "¡Éxito!"
      btn.style.background = "linear-gradient(90deg, var(--neon-green), var(--neon-blue))"
      btn.style.boxShadow = "0 0 20px var(--neon-green)"
  
      setTimeout(() => {
        btn.querySelector(".btn-text").textContent = originalText
        btn.style.background = "linear-gradient(90deg, var(--neon-blue), var(--neon-purple))"
        btn.style.boxShadow = ""
      }, 2000)
    }
  
    function initTerminalEffect(element, messages) {
      let currentIndex = 0
      let currentChar = 0
      let isDeleting = false
      let typingSpeed = 50
  
      function type() {
        const currentMessage = messages[currentIndex]
  
        if (isDeleting) {
          element.textContent = currentMessage.substring(0, currentChar - 1)
          currentChar--
          typingSpeed = 30
        } else {
          element.textContent = currentMessage.substring(0, currentChar + 1)
          currentChar++
          typingSpeed = 50
        }
  
        if (!isDeleting && currentChar === currentMessage.length) {
          // Completó el mensaje actual
          isDeleting = true
          typingSpeed = 1500 // Pausa antes de borrar
        } else if (isDeleting && currentChar === 0) {
          // Terminó de borrar
          isDeleting = false
          currentIndex = (currentIndex + 1) % messages.length
          typingSpeed = 500 // Pausa antes del siguiente mensaje
        }
  
        setTimeout(type, typingSpeed)
      }
  
      type()
    }
  })
  
  