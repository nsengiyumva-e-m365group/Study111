import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { CandidateRow } from "./CandidateComponents";
import { Candidate } from "../../types/candidate";

interface CandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onResolve: (candidateId: string) => void;
  onSelectCandidate: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export function CandidateTable({
  candidates,
  selectedCandidates,
  onResolve,
  onSelectCandidate,
  onSelectAll,
}: CandidateTableProps) {
  const allSelected =
    candidates.length > 0 && selectedCandidates.length === candidates.length;
  const someSelected =
    selectedCandidates.length > 0 &&
    selectedCandidates.length < candidates.length;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70 border-b border-gray-200 hover:bg-gray-50/70">
            <TableHead className="text-gray-500 font-medium text-sm py-3 px-6 w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={(checked) => onSelectAll(!!checked)}
                aria-label="Select all candidates"
              />
            </TableHead>
            <TableHead className="text-gray-500 font-medium text-sm py-3 px-6">
              Candidates
            </TableHead>
            <TableHead className="text-gray-500 font-medium text-sm py-3 px-6 w-1/4">
              Status
            </TableHead>
            <TableHead className="text-gray-500 font-medium text-sm py-3 px-6 w-1/4">
              Skills
            </TableHead>
            <TableHead className="text-gray-500 font-medium text-sm py-3 px-6 w-1/6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              selected={selectedCandidates.includes(candidate.id)}
              onResolve={onResolve}
              onSelect={onSelectCandidate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
