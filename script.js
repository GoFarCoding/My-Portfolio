const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const status = document.getElementById("formStatus");

const rules = {
  name: {
    required: true,
    test: value => /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60}$/.test(value),
    message: "Please enter a valid name."
  },
  email: {
    required: true,
    test: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
    message: "Please enter a valid email address."
  },
  subject: {
    required: true,
    test: value => value.length >= 3 && value.length <= 100,
    message: "Subject must be between 3 and 100 characters."
  },
  message: {
    required: true,
    test: value => value.length >= 20 && value.length <= 1000,
    message: "Message must be between 20 and 1000 characters."
  }
};

function validateField(name) {
  const input = document.getElementById(name);
  const wrapper = input.closest(".field");
  const error = document.getElementById(`${name}Error`);
  const value = input.value.trim();
  const rule = rules[name];

  if (!value && rule.required) {
    wrapper.classList.add("invalid");
    wrapper.classList.remove("valid");
    error.textContent = "This field is required.";
    return false;
  }

  if (!value) {
    wrapper.classList.remove("invalid", "valid");
    error.textContent = "";
    return true;
  }

  if (!rule.test(value)) {
    wrapper.classList.add("invalid");
    wrapper.classList.remove("valid");
    error.textContent = rule.message;
    return false;
  }

  wrapper.classList.add("valid");
  wrapper.classList.remove("invalid");
  error.textContent = "";
  return true;
}

Object.keys(rules).forEach(name => {
  const input = document.getElementById(name);

  input.addEventListener("blur", () => validateField(name));

  input.addEventListener("input", () => {
    if (name === "message") {
      counter.textContent = `${input.value.length} / 1000`;
    }

    if (input.closest(".field").classList.contains("invalid")) {
      validateField(name);
    }
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  status.className = "form-status";
  status.textContent = "";

  const valid = Object.keys(rules).map(validateField).every(Boolean);

  if (!valid) {
    status.classList.add("fail");
    status.textContent = "Please fix the highlighted fields.";
    form.querySelector(".invalid input, .invalid textarea")?.focus();
    return;
  }

  status.classList.add("success");
  status.textContent = "Validation passed. The form is ready to be connected to a mail service or backend.";

  form.reset();
  counter.textContent = "0 / 1000";
  form.querySelectorAll(".field").forEach(field => field.classList.remove("valid", "invalid"));
});
