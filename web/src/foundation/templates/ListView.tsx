import {
  ActionMenu,
  Button,
  H4,
  Icon,
  IconName,
  Option,
  Stack,
  Title,
} from "@introist/react-foundation/v2";

import { ReactNode, useMemo, useState } from "react";
import { SearchInput } from "../blocks";

type HeaderProps = {
  title: string;
  iconName?: IconName;
  count?: number;
  create?: ReactNode;
  onCreate?: () => void;
  search?: { search: string; setSearch: (search: string) => void };
  actions?: Option[];
};

const Header = ({
  title,
  iconName,
  count,
  create,
  onCreate,
  search,
  actions,
}: HeaderProps) => {
  return (
    <Stack>
      <Stack>
        {iconName && <Icon name={iconName} dimmed />}
        <H4>{title}</H4>
        {<Title>{count ? count : " "}</Title>}
        {create}
        {!create && onCreate && (
          <Button
            variant="outlined"
            size="small"
            startAdornment={<Icon name="plus" />}
            style={{ marginLeft: "auto" }}
            onClick={onCreate}
          >
            New
          </Button>
        )}
      </Stack>
      <Stack style={{ marginLeft: "auto" }}>
        {actions && <ActionMenu options={actions} />}
        {search && (
          <SearchInput value={search.search} onChange={search.setSearch} />
        )}
      </Stack>
    </Stack>
  );
};

export const ListView = {
  Header,
};
