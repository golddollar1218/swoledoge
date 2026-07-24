const CA = "0x9ade17e508b7ec82b57db5f21cf5aca81aa50116";

const GALLERY = [
  "img/gallery/1.jpg",
  "img/gallery/2.jpg",
  "img/gallery/3.jpg",
  "img/gallery/4.jpg",
  "img/gallery/5.jpg",
  "img/gallery/6.jpg",
  "img/gallery/7.jpg",
  "img/gallery/8.jpg",
  "img/gallery/9.jpg",
  "img/gallery/10.jpg",
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  }
}

function wireCopyButtons() {
  document.querySelectorAll("[data-ca]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-ca") || CA;
      const ok = await copyText(value);
      const original = btn.textContent;
      btn.textContent = ok ? "Copied" : "Failed";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1400);
    });
  });
}

function buildGallery() {
  const track = document.getElementById("marquee-track");
  if (!track) return;

  const frag = document.createDocumentFragment();
  [...GALLERY, ...GALLERY].forEach((src, index) => {
    const figure = document.createElement("figure");
    figure.className = "marquee-item";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `SWOGE gallery ${(index % GALLERY.length) + 1}`;
    img.loading = "lazy";
    img.decoding = "async";
    figure.appendChild(img);
    frag.appendChild(figure);
  });
  track.appendChild(frag);
}

function revealOnScroll() {
  const nodes = document.querySelectorAll(
    ".about-timeline, .lore-card, .buy-heading, .buy-steps, .rep, .ca-box, .chart-shell, .gallery-head, .token-meta"
  );
  if (!("IntersectionObserver" in window)) return;

  nodes.forEach((n) => {
    n.style.opacity = "0";
    n.style.transform = "translateY(20px)";
    n.style.transition =
      "opacity 0.65s cubic-bezier(0.2,0.9,0.2,1), transform 0.65s cubic-bezier(0.2,0.9,0.2,1)";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  nodes.forEach((n) => io.observe(n));
}

document.addEventListener("DOMContentLoaded", () => {
  wireCopyButtons();
  buildGallery();
  revealOnScroll();
});
