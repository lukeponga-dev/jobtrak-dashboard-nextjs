'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export type SearchFilters = {
  query: string;
  location: string;
  type: 'All' | 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
};

type JobFinderFiltersProps = {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearch: () => void;
};

export function JobFinderFilters({ filters, onFilterChange, onSearch }: JobFinderFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof SearchFilters) => (value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="query">Search Keywords</Label>
        <Input
          id="query"
          name="query"
          placeholder="Job title, company..."
          value={filters.query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="City, state, or remote"
          value={filters.location}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Job Type</Label>
        <Select
          name="type"
          value={filters.type}
          onValueChange={handleSelectChange('type')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSearch} className="w-full">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
}
