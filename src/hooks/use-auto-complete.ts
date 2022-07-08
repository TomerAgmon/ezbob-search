import { useCallback, useState } from "react";
import { Result } from "../types";

export function useAutoComplete(mockData: Result[], maxResults = 10) {
  const [autoCompleteResults, setAutoCompleteResults] = useState<Result[]>([]);
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  const handleAutoCompleteInputChanged = useCallback(
    (value: string) => {
      setAutoCompleteResults(
        value === ""
          ? []
          : mockData
              .filter((result) =>
                result.title
                  .toLowerCase()
                  .startsWith(value.toLowerCase().trim())
              )
              .slice(0, maxResults)
      );
    },
    [maxResults, mockData]
  );

  const handleDisplayResults = useCallback(() => {
    setSearchResults(autoCompleteResults);
  }, [autoCompleteResults]);

  return {
    handleAutoCompleteInputChanged,
    handleDisplayResults,
    autoCompleteResults,
    searchResults,
  };
}
