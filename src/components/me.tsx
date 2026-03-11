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
  return (
    <div className="flex items-center justify-center border border-border rounded-lg w-full h-full p-12">
      <div className="flex flex-col md:flex-row items-start w-full h-full justify-start gap-18">
        <div className="flex flex-col gap-4">
          <div className="w-36 h-36 rounded-full overflow-hidden border border-border">
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

          <div className="flex flex-col items-center justify-start gap-4 mt-10">
            <Link
              href="https://github.com/EralKeskinkurt"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Github
                size={25}
                className="group-hover:text-foreground text-foreground/70 transition"
              />
            </Link>
            <Link
              href="https://www.instagram.com/eral_web_dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Instagram
                size={25}
                className="group-hover:text-purple-600 text-purple-600/70 transition"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eral-keskinkurt-255b27255/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Linkedin
                size={25}
                className="group-hover:text-blue-600 text-blue-600/70 transition"
              />
            </Link>
            <Link
              href="https://buymeacoffee.com/eralkeskin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Coffee
                size={25}
                className="group-hover:text-amber-600 text-amber-600/70 transition"
              />
            </Link>
            <Link
              href="https://www.facebook.com/eral.keskinkurt.94/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Facebook
                size={25}
                className="group-hover:text-sky-600 text-sky-600/70 transition"
              />
            </Link>
            <Link
              href="mailto:eralkeskinkurt@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <Mail
                size={25}
                className="group-hover:text-accent text-accent/70 transition"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 max-w-xl">
          <div>
            <h1 className="text-3xl font-bold">Eral Keskinkurt</h1>
            <p className="text-foreground/70 mt-1">
              Building modern web applications and scalable backend systems.
            </p>
          </div>

          <p className="text-foreground/80">
            I’m a full-stack developer focused on creating clean, scalable and
            maintainable software. I enjoy designing backend architectures, APIs
            and modern frontend interfaces using modern web technologies.
          </p>

          <p className="text-foreground/70">
            Currently working with <b>Next.js</b>, <b>NestJS</b>,{" "}
            <b>TypeScript</b> and <b>MySQL</b>. I enjoy building complete
            systems from database design to UI.
          </p>

          <div className="flex flex-wrap gap-2 text-sm mt-2">
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
