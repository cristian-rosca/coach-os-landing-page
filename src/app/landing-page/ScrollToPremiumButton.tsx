"use client";

export default function ScrollToPremiumButton() {
  const handleScrollToPremium = () => {
    const element = document.querySelector('[data-section="premium-features"]');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToPremium}
      className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
    >
      See Premium Tier <span aria-hidden="true">→</span>
    </button>
  );
}