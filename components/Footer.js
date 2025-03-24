"use client";

export default function Footer() {
  return (
    <div className="bg-neutral-900/50 text-white text-center py-4 mt-auto">
      Crafted by <span className="text-red-500"> Shriram </span> ©{" "}
      {new Date().getFullYear()}
    </div>
  );
}
