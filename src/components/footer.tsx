"use client";
function Footer() {
  return (
    <footer className="footer footer-center bg-neutral text-base-100 p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved{" "}
          <a
            href="https://linkedin.com/in/uzairrehan"
            className="link"
            target="_blank"
          >
            Syed Uzair Rehan
          </a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
