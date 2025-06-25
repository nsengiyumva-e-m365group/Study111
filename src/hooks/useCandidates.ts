import React, { useState, useCallback } from "react";
import { Candidate } from "@/types/candidate";
import { mockCandidates } from "@/data/mockCandidates";

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleResolve = useCallback((candidateId: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, status: "active" as const }
          : candidate,
      ),
    );
  }, []);

  const handleSelectCandidate = useCallback(
    (candidateId: string, selected: boolean) => {
      setSelectedCandidates((prev) => {
        if (selected) {
          return [...prev, candidateId];
        } else {
          return prev.filter((id) => id !== candidateId);
        }
      });
    },
    [],
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        setSelectedCandidates(candidates.map((candidate) => candidate.id));
      } else {
        setSelectedCandidates([]);
      }
    },
    [candidates],
  );

  const refreshCandidates = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCandidates(mockCandidates);
      setSelectedCandidates([]);
      setLoading(false);
    }, 1000);
  }, []);

  return {
    candidates,
    selectedCandidates,
    loading,
    handleResolve,
    handleSelectCandidate,
    handleSelectAll,
    refreshCandidates,
  };
}
