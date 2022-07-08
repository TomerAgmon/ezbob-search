import { useMemo } from "react";
import styled from "styled-components";
import { Result } from "../../types";

export interface AutoCompleteItemProps {
  item: Result;
  isHistory: boolean;
  onClick: (item: Result) => void;
  onRemoveClick: (item: Result) => void;
  className?: string;
  autoCompleteInput: string;
}

const StyledItem = styled.div`
  display: flex;
  padding: 7px 7px 7px 22px;
  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

const Title = styled.span`
  flex: 1;
`;

const RemoveButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "grey",
});

export function AutoCompleteItem({
  className,
  item,
  onClick,
  onRemoveClick,
  autoCompleteInput,
  isHistory = false,
}: AutoCompleteItemProps) {
  const handleRemove = (event: any) => {
    event.stopPropagation();
    onRemoveClick(item);
  };

  const { boldedText, unboldedText } = useMemo(() => {
    const boldedText = item.title.slice(0, autoCompleteInput.length);
    const unboldedText = item.title.slice(
      autoCompleteInput.length,
      item.title.length
    );

    return { boldedText, unboldedText };
  }, [autoCompleteInput.length, item.title]);

  return (
    <StyledItem
      className={className}
      onMouseDown={() => onClick(item)}
      key={item.url}
    >
      <Title>
        <b>{boldedText}</b>
        {unboldedText}
      </Title>
      {isHistory ? (
        <RemoveButton onMouseDown={handleRemove}>Remove</RemoveButton>
      ) : null}
    </StyledItem>
  );
}
