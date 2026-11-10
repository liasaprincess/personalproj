const hexInput = document.querySelector("#hex-input");
const previewButton = document.querySelector("#preview-button");
const colorPreview = document.querySelector("#color-preview");
const currentHex = document.querySelector("#current-hex");
const errorMessage = document.querySelector("#error-message");

function previewColor() {
  const value = hexInput.value.trim();
  const normalized = value.startsWith("#") ? value : `#${value}`;

  // The starter app intentionally supports only six-digit HEX values.
  if (!/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    errorMessage.textContent = "Enter a valid six-digit HEX color, such as #6C63FF.";
    errorMessage.hidden = false;
    return;
  }

  errorMessage.hidden = true;
  colorPreview.style.backgroundColor = normalized;
  currentHex.textContent = normalized.toUpperCase();
}

previewButton.addEventListener("click", previewColor);
hexInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") previewColor();
});
