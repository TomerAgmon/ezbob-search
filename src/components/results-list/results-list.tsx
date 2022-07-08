import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { Result } from "../../types";
import { ResultItem } from "./result-item";

interface ResultsListProps {
  results: Result[];
  pageSize?: number;
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "200px",
  alignSelf: "flex-start",
});

const TotalResults = styled.div({
  color: "grey",
  marginTop: "10px",
  marginBottom: "20px",
});

const PaginationButton = styled.span({
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer",
  fontWeight: "bold",
});

export function ResultsList({ results, pageSize = 3 }: ResultsListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedResults = useMemo(() => {
    return results.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    );
  }, [results, pageSize, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(results.length / pageSize);
  }, [pageSize, results.length]);

  const ResultItemsMemo = memo(() => (
    <Container>
      <TotalResults>{`${results.length} results (took 0ms)`}</TotalResults>
      {paginatedResults.map((resultItem) => (
        <ResultItem key={resultItem.url} resultItem={resultItem} />
      ))}
      <div>
        {currentPage > 0 ? (
          <PaginationButton onClick={() => setCurrentPage((curr) => curr - 1)}>
            Previous{" "}
          </PaginationButton>
        ) : null}
        {`Page ${currentPage + 1} of ${totalPages}`}
        {currentPage < totalPages - 1 ? (
          <PaginationButton onClick={() => setCurrentPage((curr) => curr + 1)}>
            {" "}
            Next
          </PaginationButton>
        ) : null}
      </div>
    </Container>
  ));

  return <ResultItemsMemo />;
}
