"use client";

import ReactMarkdown from "react-markdown";

type ResultsProps = {
  result: string;
};

export const Results = ({ result }: ResultsProps) => (
  <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
      Results
    </p>
    <div className="mt-4 prose prose-zinc max-w-none">
      <ReactMarkdown>
        {result || "Submit the form to see suggestions here."}
      </ReactMarkdown>
    </div>
  </section>
);
