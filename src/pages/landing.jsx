// src/pages/landing.jsx
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Newsletter from "@/components/Newsletter";

const LandingPage = () => {
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const buttonsRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const accordionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll animations for various sections
    gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    gsap.fromTo(buttonsRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "elastic.out(1, 0.5)" });
    gsap.fromTo(carouselRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 1, ease: "power2.out" });

    gsap.to(bannerRef.current, {
      y: "-10px", // Move up by 10px
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse direction every time it completes
      duration: 1, // Duration of one move up/down cycle
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate cards
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, delay: i * 0.2, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } });
    });

    // FAQ Hover and Click Animation
    gsap.utils.toArray(accordionRef.current.querySelectorAll('.accordion-item')).forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');

      // Hover effect
      trigger.addEventListener('mouseenter', () => {
        gsap.to(trigger, {
          scale: 1.05, // Slightly scale up the question on hover
          color: "#4CAF50", // Change text color on hover (optional)
          duration: 0.3,
        });
      });

      trigger.addEventListener('mouseleave', () => {
        gsap.to(trigger, {
          scale: 1, // Revert to normal size
          color: "#fff", // Revert to normal text color
          duration: 0.3,
        });
      });

      // Click effect: Animate content open/close
      trigger.addEventListener('click', () => {
        const isOpen = content.style.maxHeight !== "0px"; // Check if it's already open
        if (isOpen) {
          // Close the accordion with a fade-out and slide-up
          gsap.to(content, {
            maxHeight: "0px",
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        } else {
          // Open the accordion with a fade-in and slide-down
          gsap.to(content, {
            maxHeight: "500px", // Set max height large enough to fit content
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    });
  }, []);

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section ref={headerRef} className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img src="/logo.png" className="h-10 sm:h-16 lg:h-20" alt="Hirrd Logo" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div ref={buttonsRef} className="flex gap-6 justify-center">
        <Link to= "/job">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-jobs">  {/* Corrected route path */}
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <div ref={carouselRef}>
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* banner png */}
      <img ref={bannerRef} src="/banner.png" className="w-full h-[700px] object-contain" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card ref={(el) => (cardsRef.current[i] = el)} key={i}>
            <CardHeader>
              <CardTitle className="font-bold">
                {i === 0 ? "For Job Seekers" : "For Employers"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {i === 0
                ? "Search and apply for jobs, track applications, and more."
                : "Post jobs, manage applications, and find the best candidates."}
            </CardContent>
          </Card>
        ))}
      </section>

      <Accordion ref={accordionRef} type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} className="accordion-item">
            <AccordionTrigger className="accordion-trigger">{faq.question}</AccordionTrigger>
            <AccordionContent className="accordion-content">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Newsletter Section (Smaller and aligned to the right) */}
      <div className="bg-dark-800 text-white p-6 rounded-md flex justify-end mt-10">
        <div className="w-full max-w-xs"> {/* This controls the width of the form */}
          <Newsletter />
        </div>
      </div>

    </main>
  );
};

export default LandingPage;
