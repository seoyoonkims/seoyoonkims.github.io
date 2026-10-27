document.querySelectorAll("[data-animated-src]").forEach((image) => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const updateSource = () => {
    image.src = reducedMotion.matches
      ? image.dataset.stillSrc
      : image.dataset.animatedSrc
  }
  updateSource()
  reducedMotion.addEventListener("change", updateSource)
})

if (navigator.clipboard && window.isSecureContext) {
  document.querySelectorAll(".document-content pre > code").forEach((code) => {
    const pre = code.parentElement
    const wrapper = document.createElement("div")
    wrapper.className = "code-block"
    pre.before(wrapper)
    wrapper.append(pre)
    const button = document.createElement("button")
    button.type = "button"
    button.className = "copy-code"
    button.textContent = "Copy"
    button.setAttribute("aria-label", "Copy code")
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent)
        button.textContent = "Copied"
      } catch {
        button.textContent = "Select to copy"
      }
      window.setTimeout(() => {
        button.textContent = "Copy"
      }, 1800)
    })
    wrapper.prepend(button)
  })
}
