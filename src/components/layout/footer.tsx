"use client";

export function Footer() {
  return (
    <footer className="w-full absolute bottom-0 py-0.5">
      <div className="container flex justify-center">
        <p className="text-[10px] text-muted-foreground">
          Built with ❤️ by{" "}
          <span className="hover:text-foreground transition-colors">
            Haris, Shahmeer & Shepher
          </span>{" "}
          • BUKC
        </p>
      </div>
    </footer>
  );
}
