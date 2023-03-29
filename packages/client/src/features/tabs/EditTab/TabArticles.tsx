import { UnfoldMore } from "@mui/icons-material";
import { Alert, Button, IconButton, Link, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, useEffect, useRef, useState } from "react";
import { Separator } from "../../../components/separator";
import { useHttp } from "../../../hooks/useHttp";
import { formatDate } from "../../../utils/formatDate";
import { getAllArticles } from "../../articles/api";

const MAX_RETRIES = 3;

interface ITabArticlesProps {
  tabId: number
}

export const TabArticles: FC<ITabArticlesProps> = ({tabId}) => {
  const [data, setData] = useState<ContentNode<FlatContent>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const changedOrder = useRef<boolean>(false);

  const retries = useRef(0);
  const {response, refetch} = useHttp<ContentNode<FlatContent>[]>("articles", async () => getAllArticles({where: {tabId}, orderBy: "order.asc"}));

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

  return <>
    {error ? (
      <>
        <Alert severity="info">
          {error}
        </Alert>
      </>
    ) : (
      <>
        <List sx={{ width: "100%"}} disablePadding>
          {data.map(article => (
            <ListItem sx={{width: "100%"}} key={article.id}>
              <ListItemAvatar>
                <IconButton>
                  <UnfoldMore />
                </IconButton>
              </ListItemAvatar>
              <ListItemText secondary={article.addedOn ? `Добавлено: ${formatDate(article.addedOn)}` : ""}>
                <Link href={`/content/articles/edit?id=${article.id}`}>
                  {article.label}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {changedOrder && (
          <>
            <Separator />
            <Button color="primary" variant="contained">
              Сохранить
            </Button>
          </>
        )}
      </>
    )}
  </>;
};
