"use client";

import { useState, FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

const API_URL = "https://live-inclusive-api.josh-8b9.workers.dev";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "送信に失敗しました。もう一度お試しください。"
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "通信エラーが発生しました。お手数ですが、お電話にてお問い合わせください。"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/30 p-8 text-center">
        <h3 className="text-xl font-medium mb-4">
          お問い合わせありがとうございます
        </h3>
        <p className="text-white/70 mb-6">
          確認メールをお送りしました。
          <br />
          内容を確認の上、担当者より折り返しご連絡いたします。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2 border border-white/30 hover:border-white transition-colors"
        >
          新しいお問い合わせ
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm text-white/70 mb-2">
          お名前 <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-white/70 mb-2">
          メールアドレス <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-white/70 mb-2">
          お電話番号
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm text-white/70 mb-2">
          お問い合わせ種別 <span className="text-primary">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 [&>option]:bg-neutral-900 [&>option]:text-white"
        >
          <option value="">選択してください</option>
          <option value="ticket">チケットについて</option>
          <option value="wheelchair">車椅子席について</option>
          <option value="sponsorship">協賛・後援について</option>
          <option value="media">取材・メディアについて</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white/70 mb-2">
          お問い合わせ内容 <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-primary focus:outline-none transition-colors resize-none disabled:opacity-50"
        />
      </div>

      <div className="flex justify-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting" || !turnstileToken}
          className="w-full px-8 py-4 bg-primary text-black font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
