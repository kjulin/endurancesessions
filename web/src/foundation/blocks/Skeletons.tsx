import { SkeletonLoader, Stack } from "@introist/react-foundation/v2";
import styled from "styled-components";

const GridLayout = styled.div`
  display: grid;
  grid-gap: var(--spacing-small);
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
`;

export const Skeletons = {
  List: ({ rowCount = 5 }: { rowCount?: number }) => (
    <Stack vertical gap="small">
      {[...Array(rowCount - 1)].map((_, i) => (
        <SkeletonLoader key={i} height={48} />
      ))}
      <SkeletonLoader fadeOut height={48} />
    </Stack>
  ),
  Grid: () => (
    <GridLayout>
      <SkeletonLoader height={78} />
      <SkeletonLoader height={78} />
      <SkeletonLoader height={78} />
    </GridLayout>
  )
};
