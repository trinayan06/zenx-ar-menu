import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../utils/animations';

const reviews = [
  {
    text: "ZEN_X completely transformed our Instagram presence. We're seeing real engagement and our follower count has doubled in just a month.",
    name: "Aarav Sharma",
    role: "Cafe Owner",
    initial: "A",
    color: "#5B6AF0"
  },
  {
    text: "The AR Menu is mind-blowing. Our customers love seeing the dishes before ordering, and it's noticeably increased our average order value.",
    name: "Priya Patel",
    role: "Restaurant Manager",
    initial: "P",
    color: "#C8F000"
  },
  {
    text: "They built our website in record time and the quality is outstanding. It looks premium and loads incredibly fast.",
    name: "Rahul Verma",
    role: "Startup Founder",
    initial: "R",
    color: "#FF5F56"
  },
  {
    text: "The WhatsApp bot handles all our initial inquiries now. It saves us hours every day and ensures we never miss a lead.",
    name: "Sneha Gupta",
    role: "Agency Director",
    initial: "S",
    color: "#FFBD2E"
  },
  {
    text: "Working with the founders directly makes a huge difference. They genuinely care about scaling my business.",
    name: "Karan Singh",
    role: "E-Commerce Owner",
    initial: "K",
    color: "#C8F000"
  }
];

export default function Testimonials() {
  const extendedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-[36px] md:text-[48px] font-dm font-extrabold text-black leading-[1.1] tracking-tight">
            Don't just take our word for it.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scrolling row - Continuous slow marquee */}
      <div className="overflow-hidden w-full relative flex">
        <div 
          className="flex gap-6 px-3 whitespace-nowrap animate-marquee" 
          style={{ animationDuration: '60s' }}
        >
          {extendedReviews.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[350px] md:w-[420px] bg-white p-10 flex flex-col justify-between whitespace-normal group hover:shadow-lg transition-shadow duration-300"
              style={{ border: '1px solid #E8E8E8', borderRadius: '20px' }}
            >
              <p className="font-dm text-[#1A1A1A] text-[17px] md:text-[18px] leading-[1.6] mb-10 font-medium">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-dm font-bold text-[18px]"
                  style={{ backgroundColor: review.color, color: review.color === '#C8F000' || review.color === '#FFBD2E' ? '#1A1A1A' : '#FFFFFF' }}
                >
                  {review.initial}
                </div>
                <div>
                  <div className="font-dm font-extrabold text-[16px] text-black tracking-tight">{review.name}</div>
                  <div className="font-dm text-[14px] font-medium text-[#666666]">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
