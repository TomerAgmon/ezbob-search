import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledPopover = styled.div({
  zIndex: 999,
  paddingBottom: "22px",
  borderRadius: "0px 0px 22px 22px",
  boxShadow: "0 2px 6px 0 rgb(23 23 23 / 32%)",
  position: "absolute",
  top: "44px",
  background: "white",
  width: "100%",
});

interface PopoverProps {
  isOpen: boolean;
}

export function Popover({ isOpen, children }: PropsWithChildren<PopoverProps>) {
  return <>{isOpen ? <StyledPopover>{children}</StyledPopover> : null}</>;
}
