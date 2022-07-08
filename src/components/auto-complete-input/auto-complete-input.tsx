import { memo, useCallback, useRef, useState } from "react";
import { Result } from "../../types";
import { Popover } from "./popover/popover";
import * as S from "./styled";

interface AutoCompleteProps {
  onInputChanged: (value: string, updateSearchResults?: boolean) => void;
  autoCompleteResults: Result[];
}

export function AutoCompleteInput({
  autoCompleteResults,
  onInputChanged,
}: AutoCompleteProps) {
  const [isPopoverOpen, setisPopoverOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [historyHashMap, setHistoryHashMap] = useState<{
    [key: string]: boolean;
  }>({});

  const handleInputChanged = (event: any) => {
    setInputText(event.target.value);
    onInputChanged(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onInputChanged(inputText, true);
      inputRef?.current?.blur();
    }
  };

  const handleResultItemClicked = useCallback(
    (item: Result) => {
      setInputText(item.title);
      onInputChanged(item.title, true);

      setHistoryHashMap((oldMap) => ({
        ...oldMap,
        [item.url]: true,
      }));
    },
    [onInputChanged]
  );

  const handleRemoveClick = useCallback((item: Result) => {
    setHistoryHashMap((oldMap) => ({
      ...oldMap,
      [item.url]: false,
    }));
  }, []);

  const PopoverMemo = memo(() => (
    <Popover isOpen={isPopoverOpen}>
      <S.ListContainer>
        {autoCompleteResults.length > 0 ? (
          autoCompleteResults.map((result) => (
            <S.StyledAutoCompleteItem
              autoCompleteInput={inputText}
              isHistory={historyHashMap[result.url]}
              item={result}
              onClick={handleResultItemClicked}
              onRemoveClick={handleRemoveClick}
            />
          ))
        ) : (
          <S.NoResults>No results</S.NoResults>
        )}
      </S.ListContainer>
    </Popover>
  ));

  return (
    <S.Container>
      <S.InputWrapper>
        <S.StyledInput
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
          autoFocus
          onFocus={() => setisPopoverOpen(true)}
          onBlur={() => setisPopoverOpen(false)}
          value={inputText}
          ref={inputRef}
          type="text"
          placeholder="Type to start searching..."
        />
      </S.InputWrapper>
      <PopoverMemo />
    </S.Container>
  );
}
