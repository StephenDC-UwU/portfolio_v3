"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Send, Mail, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1000);
  };

  const socialLinks = [
    { name: "GitHub", handle: "@creative-dev", icon: GithubIcon, href: "https://github.com" },
    { name: "LinkedIn", handle: "/in/creativedev", icon: LinkedinIcon, href: "https://linkedin.com" },
    { name: "X / Twitter", handle: "@artis_everywhere", icon: TwitterIcon, href: "https://twitter.com" },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-14 border-t border-current/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-current opacity-40" />
            <span className="text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
              {t.contact.tagline}
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg opacity-80 font-light max-w-xl font-sans-clean">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-3xl glass-card space-y-6 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-current/5 border border-current/15 focus:border-current focus:outline-none transition-colors text-sm"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-current/5 border border-current/15 focus:border-current focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-xs font-cinzel tracking-wider uppercase opacity-80 font-semibold block">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-current/5 border border-current/15 focus:border-current focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-cinzel uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--bg-primary)",
                }}
              >
                {isSubmitting ? (
                  <span>{t.contact.sending}</span>
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
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6 shadow-xl">
              <h3 className="font-cinzel text-lg font-semibold tracking-wider">
                Direct Channels
              </h3>
              
              <div className="space-y-4 text-sm font-sans-clean">
                <a
                  href="mailto:contact@artiseverywhere.dev"
                  className="flex items-center gap-3 p-3 rounded-xl bg-current/5 border border-current/10 hover:bg-current/10 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-current/10">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs opacity-60 font-cinzel block">Email</span>
                    <span className="font-medium group-hover:underline">
                      contact@artiseverywhere.dev
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-current/5 border border-current/10">
                  <div className="p-2 rounded-lg bg-current/10">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs opacity-60 font-cinzel block">Location</span>
                    <span className="font-medium">Madrid, Spain / Worldwide Remote</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-4 shadow-xl">
              <h3 className="font-cinzel text-lg font-semibold tracking-wider">
                {t.contact.socialsTitle}
              </h3>

              <div className="space-y-2.5">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-current/10 bg-current/5 hover:bg-current/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="opacity-70 group-hover:opacity-100" />
                        <span className="text-xs sm:text-sm font-medium">{social.name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 text-xs">
                        <span>{social.handle}</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
