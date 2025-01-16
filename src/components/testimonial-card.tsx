import React from 'react';
import type { Testimonial } from '@/data/testimonials';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="min-h-[140px] max-w-xl overflow-hidden rounded bg-white bg-white/50 p-4 shadow-none">
      <p className="text-sm text-gray-700">{testimonial.comment}</p>
    </div>
  );
};

export default TestimonialCard;
