import { FC, useEffect, useState } from "react";
import { AddTag } from "./AddTag";
import { Tag } from "./Tag";
import { TagsStyled } from "./Tags.styles";

type MapFunction = {
  (data: string): boolean
}

interface ITagsProps {
  onUpdate: (tags: string[]) => void,
  maxValues?: number,
  values?: string[],
  maps?: MapFunction[],
  placeholder?: string
}

export const Tags: FC<ITagsProps> = ({values, onUpdate, maps = [], maxValues = 100, placeholder}) => {
  const [tags, setTags] = useState<string[]>(values || []);

  const addTag = (tag: string): void => {
    if(shouldAddTags(tag, maps) && !tags.includes(tag) && tags.length < maxValues) {
      setTags([...tags, tag]);
    }
  }

  const removeTag = (tag: string): void => {
    setTags(tags.filter(existingTag => existingTag !== tag));
  }

  useEffect(() => {
    onUpdate(tags);

  // Giving `onUpdate` as a dependency here results in endless invokes of `onUpdate`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  return (
    <div>
      <TagsStyled>
        {tags.map(tag => (
          <Tag value={tag} handlerRemove={removeTag} key={tag} />
          ))}
      </TagsStyled>
      <AddTag placeholder={placeholder} handler={addTag} />
    </div>
  )
}

const shouldAddTags = (tag: string, maps: MapFunction[]): boolean => {
  for(const map of maps) {
    if(map(tag) === false) {
      return false;
    }
  }

  return true;
}
