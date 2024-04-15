import { Icon, Input, InputProps } from "@introist/react-foundation/v2";

export const SearchInput = (props: InputProps) => (
  <Input
    size="small"
    placeholder="Search"
    endAdornment={<Icon name="search" dimmed />}
    {...props}
  />
);
