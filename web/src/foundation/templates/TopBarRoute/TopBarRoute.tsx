import { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  CircularLoader,
  TopBar,
  TopBarProps,
} from "@introist/react-foundation/v2";

type TopBarRouteProps = Pick<
  TopBarProps,
  | "navigationAction"
  | "onNavigationAction"
  | "title"
  | "paths"
  | "actions"
  | "sticky"
> & {
  headers?: ReactNode[];
  loading?: boolean;
  narrow?: boolean;
  medium?: boolean;
  children: ReactNode;
  withoutContentPadding?: boolean;
  background?: "white" | "surface";
};

const StyledTopBarRoute = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  user-select: none;
  background-color: var(--palette-surface-dimmed);
`;

const StyledLoader = styled(CircularLoader)`
  flex: 1;
`;

const Content = styled.div<{
  $narrow?: boolean;
  $medium?: boolean;
}>`
  padding: var(--spacing-xLarge) var(--spacing-xxLarge);
  flex: 1;
  display: flex;
  flex-direction: column;

  ${({ $narrow }) =>
    $narrow &&
    css`
      width: 100%;
      max-width: 50rem;
      margin: 0 auto;
      box-sizing: border-box;
    `}

  ${({ $medium }) =>
    $medium &&
    css`
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      box-sizing: border-box;
    `}
`;

const StyledTobBar = styled(TopBar)`
  border-bottom: 1px solid var(--palette-border-subdued);
`;

export const TopBarRoute = ({
  children,
  loading,
  narrow,
  medium,
  ...props
}: TopBarRouteProps) => {
  return (
    <StyledTopBarRoute>
      <StyledTobBar {...props} />
      <Content $narrow={narrow} $medium={medium}>
        {loading ? <StyledLoader fillParent /> : children}
      </Content>
    </StyledTopBarRoute>
  );
};
