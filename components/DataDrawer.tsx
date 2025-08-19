import type React from "react";
import { X } from "lucide-react";
import { movieData, type MovieData } from "@/lib/data";

interface DataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataDrawer({ isOpen, onClose }: DataDrawerProps) {
  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 drawer-overlay z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 glassmorphism shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-[rgba(255,255,255,0.2)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Movie Data</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {movieData.map((item: MovieData, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer group"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
