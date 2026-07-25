import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { RatingStars } from "@/components/ui/RatingStars";

const testimonials = [
  {
    text: "I found a swimming instructor 2km from my building and booked my first lesson the same evening. My kids now swim confidently — FitNear made it effortless.",
    author: "Reem Al Suwaidi",
    role: "Parent · Dubai Marina",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
  },
  {
    text: "As a trainer, the free sign-up and only paying commission on real bookings was the deciding factor. I filled half my week with local clients in a month.",
    author: "Omar Al Rashid",
    role: "Strength coach · Dubai Marina",
    avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=100&q=80",
    rating: 5,
  },
  {
    text: "The distance filter is genuinely useful. No more scrolling through trainers on the other side of the city. Booking and the price breakdown were crystal clear.",
    author: "James Whitfield",
    role: "Client · Business Bay",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    text: "The verified badge gave me confidence to book someone new. She turned out to be exactly what my postnatal recovery needed. Highly recommend.",
    author: "Hana Malik",
    role: "Client · JVC",
    avatar: "https://i.pravatar.cc/100?img=48",
    rating: 5,
  },
  {
    text: "I coach tennis and used to rely on word of mouth. Now I have a proper profile with reviews and a steady flow of enquiries from my own area.",
    author: "Carlos Núñez",
    role: "Tennis coach · Business Bay",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&q=80",
    rating: 5,
  },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="mx-3 flex w-[22rem] shrink-0 flex-col rounded-3xl border border-ink-900/8 bg-white p-6">
      <Quote className="h-7 w-7 text-lime-400" />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={t.avatar} alt={t.author} fill sizes="40px" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold">{t.author}</p>
          <p className="text-xs text-fg-muted">{t.role}</p>
        </div>
        <div className="ml-auto">
          <RatingStars rating={t.rating} size={12} />
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section id="reviews" className="overflow-hidden bg-mist py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Loved by clients &amp; trainers</Eyebrow>
            <h2 className="display-2 font-display mx-auto mt-3 max-w-2xl font-bold text-balance">
              Real people, real results
            </h2>
          </Reveal>
        </div>
      </Container>

      <div className="group relative mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
