"use client";
import {
  Instagram,
  Linkedin,
  Coffee,
  Facebook,
  Github,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Me() {
  const techStack = [
    {
      name: "Next.js",
      text: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      name: "NestJS",
      text: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      name: "TypeScript",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      name: "Prisma",
      text: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      name: "MySQL",
      text: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      name: "Tailwind",
      text: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      name: "Node.js",
      text: "text-green-600",
      bg: "bg-green-600/10",
      border: "border-green-600/20",
    },
    {
      name: "REST API",
      text: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
  ];

  const socials = [
    {
      icon: Github,
      link: "https://github.com/EralKeskinkurt",
      color: "text-foreground",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/eral_web_dev/",
      color: "text-pink-500",
    },
    {
      icon: Linkedin,
      link: "https://www.linkedin.com/in/eral-keskinkurt-255b27255/",
      color: "text-blue-500",
    },
    {
      icon: Coffee,
      link: "https://buymeacoffee.com/eralkeskin",
      color: "text-yellow-500",
    },
    {
      icon: Facebook,
      link: "https://www.facebook.com/eral.keskinkurt.94/",
      color: "text-blue-600",
    },
    {
      icon: Mail,
      link: "mailto:eralkeskinkurt@gmail.com",
      color: "text-red-500",
    },
  ];

  return (
    <div className="flex items-start justify-center border border-border rounded-lg w-full h-full p-6 md:p-12">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full justify-start gap-8 md:gap-16 overflow-hidden">
        {/* Left side */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-border">
            <Image
              src="/eralkeskinkurt.png"
              width={500}
              height={500}
              alt="Eral Keskinkurt"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-sm text-foreground/70 text-center">
            <p>Full Stack Developer</p>
            <p>Turkey</p>
          </div>

          {/* Socials */}
          <div className="flex md:flex-col items-center gap-5 md:gap-4 mt-4 md:mt-10 flex-wrap justify-center">
            {socials.map((social, i) => {
              const Icon = social.icon;

              return (
                <Link
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} hover:scale-110 transition`}
                >
                  <Icon size={24} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Eral Keskinkurt
            </h1>
            <p className="text-sm md:text-base text-foreground/70 mt-1">
              Building modern web applications and scalable backend systems.
            </p>
          </div>

          <p className="text-sm md:text-base text-foreground/70 mt-1">
            I’m a full-stack developer focused on creating clean, scalable and
            maintainable software. I enjoy designing backend architectures, APIs
            and modern frontend interfaces using modern web technologies.
          </p>

          <p className="text-sm md:text-base text-foreground/70 mt-1">
            Currently working with <b>Next.js</b>, <b>NestJS</b>,{" "}
            <b>TypeScript</b> and <b>MySQL</b>. I enjoy building complete
            systems from database design to UI.
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm mt-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1 rounded-md border transition hover:scale-105 ${tech.border} ${tech.bg} ${tech.text}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
