import React, { useState } from "react";

interface Candidate {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  status: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Jessie Clarcson",
    initials: "JC",
    avatarColor: "bg-purple-500",
    status: "No CV Found!",
  },
  {
    id: "2",
    name: "Judah Adeniran",
    initials: "JA",
    avatarColor: "bg-red-500",
    status: "No CV Found!",
  },
  {
    id: "3",
    name: "Lebron Wayde",
    initials: "LW",
    avatarColor: "bg-green-500",
    status: "No CV Found!",
  },
  {
    id: "4",
    name: "Judah Adeniran",
    initials: "JD",
    avatarColor: "bg-blue-500",
    status: "No CV Found!",
  },
  {
    id: "5",
    name: "Kevin Leonard",
    initials: "KL",
    avatarColor: "bg-yellow-500",
    status: "No CV Found!",
  },
  {
    id: "6",
    name: "Judah Adeniran",
    initials: "JA",
    avatarColor: "bg-red-500",
    status: "No CV Found!",
  },
  {
    id: "7",
    name: "Natali Goodwin",
    initials: "NG",
    avatarColor: "bg-blue-500",
    status: "No CV Found!",
  },
  {
    id: "8",
    name: "Jessie Clarcson",
    initials: "JC",
    avatarColor: "bg-purple-500",
    status: "No CV Found!",
  },
];

const Index = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleSelectCandidate = (candidateId: string, selected: boolean) => {
    if (selected) {
      setSelectedCandidates((prev) => [...prev, candidateId]);
    } else {
      setSelectedCandidates((prev) => prev.filter((id) => id !== candidateId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCandidates(mockCandidates.map((c) => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleResolve = (candidateId: string) => {
    console.log("Resolving candidate:", candidateId);
  };

  const allSelected = selectedCandidates.length === mockCandidates.length;
  const someSelected =
    selectedCandidates.length > 0 &&
    selectedCandidates.length < mockCandidates.length;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="w-full">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-200 hover:bg-gray-50/70">
                <th className="text-gray-500 font-medium text-sm py-3 px-6 text-left w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="text-gray-500 font-medium text-sm py-3 px-6 text-left">
                  Candidates
                </th>
                <th className="text-gray-500 font-medium text-sm py-3 px-6 text-left w-1/4">
                  Status
                </th>
                <th className="text-gray-500 font-medium text-sm py-3 px-6 text-left w-1/4">
                  Skills
                </th>
                <th className="text-gray-500 font-medium text-sm py-3 px-6 text-left w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-gray-50/50 border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={(e) =>
                        handleSelectCandidate(candidate.id, e.target.checked)
                      }
                      className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${candidate.avatarColor}`}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full text-white font-semibold">
                          {candidate.initials}
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">
                        {candidate.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-red-500 font-medium">
                      {candidate.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleResolve(candidate.id)}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
