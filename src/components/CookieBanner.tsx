"use client";

import { useEffect, useState } from "react";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
};

const DEFAULT_CONSENT: Consent = {
  necessary: true,
  analytics: false,
  advertising: false,
};

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("cookie_consent");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConsent(parsed);
      } catch {
        setShow(true);
      }
    } else {
      setShow(true);
    }
  }, []);

  const saveConsent = (newConsent: Consent) => {
    setConsent(newConsent);
    localStorage.setItem("cookie_consent", JSON.stringify(newConsent));
    setShow(false);
    // Dispara evento para GA4 / AdSense
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newConsent.analytics ? "granted" : "denied",
        ad_storage: newConsent.advertising ? "granted" : "denied",
      });
    }
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, advertising: true });
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, advertising: false });
  const saveCustom = () => saveConsent({ ...consent, necessary: true });

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        onClick={() => setShow(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out lg:fixed lg:bottom-4 lg:right-4 lg:w-96 lg:rounded-xl lg:shadow-2xl ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-label="Preferências de cookies"
      >
        <div className="bg-white rounded-t-xl lg:rounded-xl shadow-xl p-4 lg:p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Preferências de Cookies</h2>
              <p className="mt-1 text-sm text-slate-600">
                Usamos cookies para melhorar sua experiência, analisar tráfego e personalizar anúncios.
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-slate-400 hover:text-slate-600 lg:hidden"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {expanded ? (
            <>
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Necessários</p>
                    <p className="text-xs text-slate-500">Essenciais para o funcionamento do site</p>
                  </div>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Analytics</p>
                    <p className="text-xs text-slate-500">Google Analytics (anonimizado) — medir audiência e melhorar conteúdo</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => setConsent({ ...consent, analytics: !consent.analytics })}
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Publicidade</p>
                    <p className="text-xs text-slate-500">Google AdSense/Ads — anúncios personalizados e medição de conversão</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.advertising}
                    onChange={() => setConsent({ ...consent, advertising: !consent.advertising })}
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Rejeitar opcionais
                </button>
                <button
                  onClick={saveCustom}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Salvar preferências
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Ao clicar em "Aceitar todos", você concorda com o uso de cookies de analytics e publicidade
                conforme nossa <a href="/politica-de-privacidade" className="underline text-emerald-700">Política de Privacidade</a>.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Rejeitar opcionais
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Aceitar todos
                </button>
              </div>
              <button
                onClick={() => setExpanded(true)}
                className="w-full text-center text-sm text-emerald-700 hover:underline"
              >
                Gerenciar preferências
              </button>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-400 text-center">
            Pode alterar suas preferências a qualquer momento no rodapé do site.
            <a href="/politica-de-privacidade" className="underline text-emerald-700">Política de Privacidade completa</a>
          </p>
        </div>
      </aside>
    </>
  );
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}