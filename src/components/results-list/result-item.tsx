import styled from "styled-components";
import { Result } from "../../types";

interface ResultItemProps {
  resultItem: Result;
}

const ResultContainer = styled.a({
  display: "flex",
  flexDirection: "column",
  padding: "10px 0px",
  color: "black",
  textDecoration: "none",
});

const Title = styled.span({
  fontSize: "1.5rem",
  marginBottom: "5px",
  color: "blue",
  textDecoration: "underline",
});

export function ResultItem({ resultItem }: ResultItemProps) {
  return (
    <ResultContainer href={resultItem.url}>
      <span>{resultItem.url}</span>
      <Title>{resultItem.title}</Title>
      <div>{resultItem.description}</div>
    </ResultContainer>
  );
}
