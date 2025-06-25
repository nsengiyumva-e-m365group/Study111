import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TableRow, TableCell } from "../ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Candidate, CandidateStatus, statusMap } from "../../types/candidate";

// Avatar Component
interface CandidateAvatarProps {
  initials: string;
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function CandidateAvatar({
  initials,
  name,
  color,
  size = "md",
}: CandidateAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size])}>
      <AvatarFallback
        className={cn(color, "text-white font-semibold")}
        title={name}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: CandidateStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusInfo = statusMap[status];

  return (
    <div className={cn("text-sm", className)}>
      {status === "no-cv-found" ? (
        <span className="text-red-500 font-medium">{statusInfo.label}</span>
      ) : (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          {statusInfo.label}
        </div>
      )}
    </div>
  );
}

// Candidate Row Component
interface CandidateRowProps {
  candidate: Candidate;
  selected: boolean;
  onResolve: (candidateId: string) => void;
  onSelect: (candidateId: string, selected: boolean) => void;
}

export function CandidateRow({
  candidate,
  selected,
  onResolve,
  onSelect,
}: CandidateRowProps) {
  return (
    <TableRow className="hover:bg-gray-50/50 border-b border-gray-100 last:border-b-0">
      <TableCell className="py-4 px-6">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelect(candidate.id, !!checked)}
          aria-label={`Select ${candidate.name}`}
        />
      </TableCell>
      <TableCell className="py-4 px-6">
        <div className="flex items-center gap-3">
          <CandidateAvatar
            initials={candidate.initials}
            name={candidate.name}
            color={candidate.avatarColor}
          />
          <span className="font-medium text-gray-900">{candidate.name}</span>
        </div>
      </TableCell>
      <TableCell className="py-4 px-6">
        <StatusBadge status={candidate.status} />
      </TableCell>
      <TableCell className="py-4 px-6">
        {candidate.skills.length > 0 ? (
          <div className="flex gap-1 flex-wrap">
            {candidate.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </TableCell>
      <TableCell className="py-4 px-6">
        <Button
          onClick={() => onResolve(candidate.id)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
          size="sm"
        >
          Resolve
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
