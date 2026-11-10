import React, { useState } from 'react';
import {
  Lock,
  FileCheck,
  GitCompare,
  AlertTriangle,
  Merge,
  Check,
  X,
  BookOpen,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';

export const AdminPage: React.FC = () => {
  const {
    missingSubmissions,
    approveMissingSubmission,
    rejectMissingSubmission,
    metadataDiffs,
    acceptMetadataDiff,
    rejectMetadataDiff,
    reportedItems,
    resolveReportedItem,
  } = useSocial();

  const [activeQueue, setActiveQueue] = useState<'submissions' | 'diffs' | 'merger' | 'reports'>('submissions');
  const [mergeSelected, setMergeSelected] = useState<string | null>(null);

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-gray-100 flex items-center gap-3">
          <Lock className="w-7 h-7 text-vellora-gold" /> Catalog Curation & Moderation Portal
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review community-submitted book entries, evaluate metadata correction diffs, and moderate reported content.
        </p>
      </div>

      {/* Queue Tabs */}
      <div className="flex border-b border-white/10 gap-6 text-xs font-heading font-semibold">
        {[
          { id: 'submissions', label: `Missing Books (${missingSubmissions.filter((s) => s.status === 'pending').length})`, icon: FileCheck },
          { id: 'diffs', label: `Metadata Diffs (${metadataDiffs.filter((d) => d.status === 'pending').length})`, icon: GitCompare },
          { id: 'merger', label: 'Edition Merger', icon: Merge },
          { id: 'reports', label: `Reported Items (${reportedItems.filter((r) => r.status === 'pending').length})`, icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveQueue(tab.id as any)}
              className={`flex items-center gap-2 pb-3 transition-colors relative ${
                activeQueue === tab.id
                  ? 'text-vellora-gold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {activeQueue === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-vellora-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Queue 1: Missing Book Submissions (Section 27.2) */}
      {activeQueue === 'submissions' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-400">
            User-submitted titles awaiting verification before inclusion in Vellora canonical index:
          </div>

          <div className="space-y-3">
            {missingSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-[#141822]/85 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-gray-100">{sub.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
                      {sub.format}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${
                        sub.status === 'approved'
                          ? 'bg-vellora-emerald/20 text-vellora-emerald'
                          : sub.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-vellora-gold/20 text-vellora-gold'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Author: <span className="text-gray-200">{sub.author}</span> • Submitted by {sub.submittedBy} on {sub.submittedAt}
                  </p>
                  {sub.isbn && <p className="text-gray-500 font-mono">ISBN: {sub.isbn}</p>}
                </div>

                {sub.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveMissingSubmission(sub.id)}
                      className="px-3.5 py-1.5 rounded-full bg-vellora-emerald/20 hover:bg-vellora-emerald/30 text-vellora-emerald border border-vellora-emerald/40 flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => rejectMissingSubmission(sub.id)}
                      className="px-3.5 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 flex items-center gap-1 font-semibold transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue 2: Metadata Correction Queue with Visual Diffs (Section 27.2) */}
      {activeQueue === 'diffs' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-400">
            Side-by-side verification of proposed canonical updates:
          </div>

          <div className="space-y-4">
            {metadataDiffs.map((diff) => (
              <div
                key={diff.id}
                className="p-5 rounded-2xl bg-[#141822]/85 border border-white/10 space-y-4 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-100">
                      {diff.bookTitle}
                    </h3>
                    <p className="text-gray-400 text-[11px]">
                      Correction for field: <strong className="text-vellora-gold">{diff.field}</strong> • By {diff.submittedBy}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      diff.status === 'accepted'
                        ? 'bg-vellora-emerald/20 text-vellora-emerald'
                        : diff.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-vellora-gold/20 text-vellora-gold'
                    }`}
                  >
                    {diff.status}
                  </span>
                </div>

                {/* Side-by-side visual diff container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-red-500/30 space-y-1">
                    <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                      Current Canonical Value
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">
                      {diff.currentValue}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-vellora-emerald/30 space-y-1">
                    <span className="text-[10px] font-semibold text-vellora-emerald uppercase tracking-wider">
                      Proposed Community Value
                    </span>
                    <p className="text-gray-200 leading-relaxed font-sans">
                      {diff.proposedValue}
                    </p>
                  </div>
                </div>

                {diff.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => acceptMetadataDiff(diff.id)}
                      className="px-4 py-1.5 rounded-full bg-vellora-emerald text-[#0A0C0E] font-semibold hover:opacity-90 flex items-center gap-1 transition-opacity"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept & Merge
                    </button>
                    <button
                      onClick={() => rejectMetadataDiff(diff.id)}
                      className="px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Reject Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue 3: Duplicate Detection & Edition Merger (Section 27.2) */}
      {activeQueue === 'merger' && (
        <div className="p-6 rounded-3xl bg-[#141822]/85 border border-white/10 space-y-4 text-xs">
          <h3 className="font-heading font-semibold text-sm text-gray-100 flex items-center gap-2">
            <Merge className="w-4 h-4 text-vellora-gold" /> Canonical Edition Consolidation Engine
          </h3>
          <p className="text-gray-400">
            Per Vellora architecture, translations, reprints, and formats belong consolidated under a single primary book item.
          </p>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-200 font-medium">
                Detected Potential Duplicate: "Harry Potter and the Deathly Hallows (UK Scholastic)"
              </span>
              <button
                onClick={() => setMergeSelected('merged')}
                className="vellora-button-primary text-xs py-1 px-3"
              >
                Merge into Canonical #hp7
              </button>
            </div>
            {mergeSelected && (
              <p className="text-vellora-emerald font-semibold text-[11px]">
                ✓ Editions and review scores consolidated successfully under primary entry.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Queue 4: Reported Items & Moderation (Section 27.2) */}
      {activeQueue === 'reports' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-400">
            Flagged reviews, unmarked spoilers, or guideline violations:
          </div>

          <div className="space-y-3">
            {reportedItems.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl bg-[#141822]/85 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase text-[10px]">
                      {rep.type} flagged
                    </span>
                    <span className="font-semibold text-gray-200">{rep.reason}</span>
                  </div>
                  <p className="text-gray-400 italic">"{rep.contentSnippet}"</p>
                  <p className="text-gray-500 text-[11px]">
                    Reported by {rep.reportedBy} at {rep.reportedAt}
                  </p>
                </div>

                {rep.status === 'pending' ? (
                  <button
                    onClick={() => resolveReportedItem(rep.id)}
                    className="px-4 py-1.5 rounded-full bg-vellora-gold text-[#0A0C0E] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Resolve & Shield Spoiler
                  </button>
                ) : (
                  <span className="text-vellora-emerald font-semibold">Resolved</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

