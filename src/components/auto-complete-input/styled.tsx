import styled from "styled-components";
import { AutoCompleteItem } from "./auto-complete-item";

export const StyledInput = styled.input({
  width: "100%",
  border: 0,
  outline: "none",
  fontSize: "1.3rem",
});

export const InputWrapper = styled.div({
  display: "flex",
  height: "44px",
  borderRadius: "22px",
  paddingInline: "22px",
  boxShadow: "0 2px 6px 0 rgb(23 23 23 / 32%)",
  "&:focus-within": {
    borderRadius: "22px 22px 0px 0px",
  },
});

export const Container = styled.div({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const ListContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

export const NoResults = styled.span({
  fontSize: "1rem",
  color: "grey",
  textAlign: "center",
  marginTop: "20px",
});

export const StyledAutoCompleteItem = styled(AutoCompleteItem)((props) => ({
  color: props.isHistory ? "purple" : "unset",
}));
