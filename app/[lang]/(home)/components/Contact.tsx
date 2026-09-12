"use client";

import React, { useRef, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Send, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { useAnimationFade } from "../hooks/useAnimationFade";
import { useContactForm } from "../hooks/useContactForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function Contact() {
  const { t, lang } = useLanguage();
  const { sendMessage, isSubmitting, isSent } = useContactForm();

  // Esquema de validación con Zod adaptado al idioma
  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, {
          message:
            lang === "en"
              ? "Name must be at least 2 characters"
              : "El nombre debe tener al menos 2 caracteres",
        }),
        email: z.string().email({
          message:
            lang === "en"
              ? "Please enter a valid email address"
              : "Por favor ingresa un correo válido",
        }),
        message: z.string().min(5, {
          message:
            lang === "en"
              ? "Message must be at least 5 characters"
              : "El mensaje debe tener al menos 5 caracteres",
        }),
      }),
    [lang]
  );

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  const animationElements = useMemo(
    () => [headerRef, [formColRef, infoColRef]],
    []
  );

  useAnimationFade({
    sectionRef,
    elements: animationElements,
    start: "top 80%",
    staggerDelay: "-=0.2",
    duration: 0.7,
  });

  const onSubmit = async (data: ContactFormValues) => {
    const result = await sendMessage(data);
    if (result.success) {
      reset();
    }
  };

  const socialLinks = [
    { name: "GitHub", handle: "@StephenDC-UwU", icon: GithubIcon, href: "https://github.com/StephenDC-UwU" },
    { name: "LinkedIn", handle: "/in/Sixto Uriarte", icon: LinkedinIcon, href: "https://www.linkedin.com/in/sixto-steven-uriarte-moreira-99681b244/" },
    // { name: "X / Twitter", handle: "@artis_everywhere", icon: TwitterIcon, href: "https://twitter.com/x/" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section section-contact relative w-full min-h-dvh flex items-center transition-colors duration-500 bg-bg-primary select-none"
    >
      <div className="section-content w-full relative">
        <div className="section-inner w-full min-h-dvh flex flex-col justify-center py-14 sm:py-20 md:py-24 pb-32 sm:pb-24 px-4 sm:px-8 md:px-14 relative">
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header */}

            <div ref={headerRef} className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="w-8 h-[1px] bg-current opacity-40" />
                <span className="text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
                  {t.contact.tagline}
                </span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl">
                {t.contact.title}
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base opacity-80 font-light max-w-xl font-sans-clean">
                {t.contact.subtitle}
              </p>
            </div>


            {/* 2-Column Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Interactive Contact Form */}
              <div ref={formColRef} className="lg:col-span-7">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 sm:p-8  glass-card space-y-5 shadow-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder={t.contact.namePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-current/5 border ${errors.name ? "border-accent ring-1 ring-accent/30" : "border-current/15"
                          } focus:border-current focus:outline-none transition-colors text-sm`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-cinzel text-accent tracking-wide pt-0.5 animate-in fade-in">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                        {t.contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder={t.contact.emailPlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-current/5 border ${errors.email ? "border-accent ring-1 ring-accent/30" : "border-current/15"
                          } focus:border-current focus:outline-none transition-colors text-sm`}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-cinzel text-accent tracking-wide pt-0.5 animate-in fade-in">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      {...register("message")}
                      placeholder={t.contact.messagePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl bg-current/5 border ${errors.message ? "border-accent ring-1 ring-accent/30" : "border-current/15"
                        } focus:border-current focus:outline-none transition-colors text-sm resize-none`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-cinzel text-accent tracking-wide pt-0.5 animate-in fade-in">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-full text-xs sm:text-sm font-cinzel uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--text-primary)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : isSent ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>{t.contact.success}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Direct Info & Social Cards */}
              <div ref={infoColRef} className="lg:col-span-5 space-y-5 flex flex-col justify-between">

                {/* Social Channels Card */}
                <div className="p-5 sm:p-7 glass-card space-y-3.5 shadow-xl">
                  <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-wider">
                    {t.contact.socialsTitle}
                  </h3>

                  <div className="space-y-2">
                    {socialLinks.map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl border border-current/10 bg-current/5 hover:bg-current/10 transition-all group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={16} className="opacity-70 group-hover:opacity-100" />
                            <span className="text-xs sm:text-sm font-medium">{social.name}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 text-sm">
                            <span>{social.handle}</span>
                            <ArrowUpRight size={13} />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
