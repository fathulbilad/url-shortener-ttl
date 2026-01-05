"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  Sparkles,
  History,
  ExternalLink,
} from "lucide-react";

export default function Page() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [urlHistory, setUrlHistory] = useState<
    Array<{ original: string; short: string }>
  >([]);

  const generateShortUrl = () => {
    if (!url) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 8);
      const short = `short.link/${randomId}`;
      setShortUrl(short);
      setUrlHistory((prev) => [{ original: url, short }, ...prev.slice(0, 4)]);
      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 mb-4">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold  bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            URL Shortener
          </h1>
          <p className="text-gray-600 text-lg">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateShortUrl()}
                placeholder="https://your-long-url-here.com/very/long/path"
                className="h-14 pl-12 pr-4 text-lg border-2 focus:border-blue-500 transition-colors"
              />
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <Button
              onClick={generateShortUrl}
              disabled={!url || !isValidUrl(url) || isLoading}
              className="w-full h-14 text-lg  bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Shorten URL
                </>
              )}
            </Button>
          </div>

          {/* Result */}
          {shortUrl && (
            <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <Check className="w-5 h-5" />
                Your shortened URL is ready!
              </div>

              <div className="flex gap-2">
                <div className="flex-1 bg-white rounded-lg px-4 py-3 border border-green-200 font-mono text-blue-600 break-all">
                  {shortUrl}
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="h-auto border-green-200 hover:bg-green-100"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {urlHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <History className="w-5 h-5" />
              Recent Links
            </div>

            <div className="space-y-3">
              {urlHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-blue-600 truncate">
                      {item.short}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.original}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(item.short);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/50 rounded-xl transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-blue-600">∞</div>
            <div className="text-sm text-gray-600 mt-1">Unlimited</div>
          </div>
          <div className="p-4 bg-white/50 rounded-xl transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-purple-600">⚡</div>
            <div className="text-sm text-gray-600 mt-1">Instant</div>
          </div>
          <div className="p-4 bg-white/50 rounded-xl transition-transform duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-pink-600">🔒</div>
            <div className="text-sm text-gray-600 mt-1">Secure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
