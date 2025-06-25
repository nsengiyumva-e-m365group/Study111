import React, { useState, useMemo } from "react";
import { CandidateTable } from "./CandidateTable";
import { Pagination } from "./CandidateComponents";
import { useCandidates } from "../../hooks/useCandidates";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RefreshCw, Search, Filter } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export function CandidateManagement() {
  const {
    candidates,
    selectedCandidates,
    loading,
    handleResolve,
    handleSelectCandidate,
    handleSelectAll,
    refreshCandidates,
  } = useCandidates();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCandidates = useMemo(() => {
    if (!searchQuery) return candidates;

    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [candidates, searchQuery]);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCandidates.slice(startIndex, endIndex);
  }, [filteredCandidates, currentPage]);

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Simple table container */}
        <div className="bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : paginatedCandidates.length > 0 ? (
            <CandidateTable
              candidates={paginatedCandidates}
              selectedCandidates={selectedCandidates}
              onResolve={handleResolve}
              onSelectCandidate={handleSelectCandidate}
              onSelectAll={handleSelectAll}
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No candidates found</p>
            </div>
          )}
        </div>

        {/* Pagination - only show if needed */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCandidates.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
}
