"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div
      className="relative flex min-h-screen text-white flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Left Panel */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-20 py-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <Image src="/logo.png" alt="Logo" width={26} height={26} />
            <span className="text-xl font-bold tracking-tight">aps</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-semibold leading-snug mb-6">
            Expert level Cybersecurity
            <br />
            in <span className="text-[#0e9e9e]">hours</span> not weeks.
          </h1>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-300">
              What's included
            </h3>

            <ul className="space-y-3">
              {[
                "Effortlessly spider and map targets to uncover hidden security flaws",
                "Deliver high-quality, validated findings in hours, not weeks.",
                "Generate professional, enterprise-grade security reports automatically.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                >
                  <Check className="w-4 h-4 text-[#0e9e9e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-16 font-medium text-xs text-gray-400">
          <div className="flex items-center gap-2 text-white mb-1">
            <span className="text-[#0e9e9e] text-base">★</span> Trustpilot
          </div>
          <div>
            Rated 4.5/5.0 <span className="opacity-50">(100k+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white text-black p-6 rounded-xl shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-1">Sign up</h2>
            <p className="text-[13px] text-gray-500">
              Already have an account?{" "}
              <Link href="#" className="text-[#0e9e9e] underline ">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="First name*"
              required
              className="border border-gray-300 placeholder:text-gray-400 focus:border-[#119F9F] focus:ring-0"
            />

            <Input
              type="text"
              placeholder="Last name*"
              required
              className="border-gray-300 placeholder:text-gray-400 focus:border-[#119F9F] focus:ring-0"
            />

            <Input
              type="email"
              placeholder="Email address*"
              required
              className="border-gray-300 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                required
                className="border-gray-300 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="bg-white border-gray-400 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 mt-1 cursor-pointer" />
              <label htmlFor="terms" className="text-[13px] text-gray-500">
                I agree to Aps's{" "}
                <Link href="#" className="underline text-blue-700">
                  Terms & Conditions
                </Link>{" "}
                and acknowledge{" "}
                <Link href="#" className="underline text-blue-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 text-white bg-[#0e9e9e] hover:bg-[#0e9e9e]/80 rounded-full text-sm font-medium"
            >
              Create account
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex gap-3 w-full">
              <Button className="flex-1 h-10 flex items-center justify-center bg-black text-white hover:bg-gray-900 rounded-full">
                <Image src="/apple.svg" alt="Apple" width={16} height={16} />
              </Button>

              <Button className="flex-1 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-black rounded-full">
                <Image src="/google.svg" alt="Google" width={16} height={16} />
              </Button>

              <Button className="flex-1 h-10 flex items-center justify-center bg-[#1877F2] hover:bg-[#1864D9] text-white rounded-full">
                <Image src="/meta.svg" alt="Meta" width={16} height={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}