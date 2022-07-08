import { useCallback, useState } from "react";
import { Result } from "../types";

export function useAutoComplete(mockData: Result[], maxResults = 10) {
  const [autoCompleteResults, setAutoCompleteResults] = useState<Result[]>([]);
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  const handleAutoCompleteInputChanged = useCallback(
    (value: string, updateSearchResults = false) => {
      const updatedAutoCompleteResults =
        value === ""
          ? []
          : mockData
              .filter((result) =>
                result.title
                  .toLowerCase()
                  .startsWith(value.toLowerCase().trim())
              )
              .slice(0, maxResults);

      setAutoCompleteResults(updatedAutoCompleteResults);

      if (updateSearchResults) {
        setSearchResults(updatedAutoCompleteResults);
      }
    },
    [maxResults, mockData]
  );

  return {
    handleAutoCompleteInputChanged,
    autoCompleteResults,
    searchResults,
  };
}
