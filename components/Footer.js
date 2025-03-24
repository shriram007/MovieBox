"use client";

export default function Footer() {
  return (
    <div className="bg-[#121212] text-white text-center py-4 mt-auto">
      Crafted by <span className="text-red-500"> Shriram </span> ©{" "}
      {new Date().getFullYear()}
    </div>
  );
}
