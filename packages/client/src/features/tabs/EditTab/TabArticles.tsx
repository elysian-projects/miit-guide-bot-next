import { UnfoldMore } from "@mui/icons-material";
import { Alert, Button, Link, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Separator } from "../../../components/separator";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { formatDate } from "../../../utils/formatDate";
import { getAllArticles } from "../../articles/api";
import { reorderArticles } from "../api";
import { reorderList } from "./scripts";

const MAX_RETRIES = 3;

interface ITabArticlesProps {
  tabId: number
}

export const TabArticles: FC<ITabArticlesProps> = ({tabId}) => {
  const {redirect} = useRedirect();
  const [data, setData] = useState<ContentNode<FlatContent>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const changedOrder = useRef<boolean>(false);

  const retries = useRef(0);
  const {response, refetch} = useHttp<ContentNode<FlatContent>[]>("articles", async () => getAllArticles({where: {tabId}, orderBy: "order.asc"}));

  // TODO: move the retry logic to the `useHttp` hook
  useEffect(() => {
    if(!response?.ok || response.data?.length === 0) {
      if(retries.current < MAX_RETRIES) {
        retries.current++;
        refetch();
        return;
      }

      setError("Статьи не найдены");
    } else {
      setData(response.data ? response.data : []);
    }
  }, [response]);

  const handleReorder = (ctx: DropResult) => {
    changedOrder.current = true;
    setData(reorderList(ctx, data));
  };

  const onReorder = async () => {
    const response = await reorderArticles(tabId, data.map(article => article.id));

    if(response.status === 401) {
      redirect("/auth/logout?redirect=/auth/login");
      return;
    }
  };

  return <>
    {error && (
      <Alert severity="error">
        {error}
      </Alert>
    )}
    <DragDropContext onDragEnd={handleReorder}>
      <List sx={{ width: "100%"}} disablePadding>
        <Droppable droppableId="articles-root">
          {(droppableProvided) => ((
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {data.map((article, index) => (
                <Draggable draggableId={article.id.toString()} index={index} key={article.id}>
                  {(draggableProvided) => (
                    <ListItem
                      sx={{width: "100%"}}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                    >
                      <ListItemAvatar {...draggableProvided.dragHandleProps}>
                        <UnfoldMore />
                      </ListItemAvatar>
                      <ListItemText secondary={article.addedOn ? `Добавлено: ${formatDate(article.addedOn)}` : ""}>
                        <Link href={`/content/articles/edit?id=${article.id}`}>
                          {article.label}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          ))}
        </Droppable>
      </List>
      <Separator />
      <Button
        onClick={onReorder}
        color="primary"
        variant="contained"
        disabled={!changedOrder.current}
      >
        Сохранить
      </Button>
    </DragDropContext>
  </>;
};
