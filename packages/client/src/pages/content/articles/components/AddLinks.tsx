import { isValidURL } from "common/src";
import { FC } from "react";
import { Tags } from "../../../../components/tags/Tags";

interface IAddLinksProps {
  values: string[],
  onUpdate: (values: string[]) => void
}

export const AddLinks: FC<IAddLinksProps> = ({
  values,
  onUpdate
}) => {
  return (
    <Tags
      values={values}
      onUpdate={onUpdate}
      maxValues={3}
      maps={[isValidURL]}
      placeholder="Добавить ссылки"
    />
  )
}
