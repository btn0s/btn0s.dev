import React from "react";

import { TextArea, Stack, Label } from "@sanity/ui";
import { set, unset } from "sanity";

const MarkdownEditor = React.forwardRef((props: any, ref) => {
  const { type, value, onChange } = props;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.currentTarget.value;
      onChange(inputValue ? set(inputValue) : unset());
    },
    [onChange],
  );

  return (
    <Stack space={3}>
      <Label>{type.title}</Label>
      <TextArea value={value} onChange={handleChange} rows={10} />
    </Stack>
  );
});

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
