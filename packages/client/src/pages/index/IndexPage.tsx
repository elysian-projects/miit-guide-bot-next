import { Button, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../../components/separator";
import { SidebarContext } from "../../contexts/sidebar";

export const IndexPage: FC = () => {
  const {toggleSidebar} = useContext(SidebarContext);

  return (
    <div >
      <Typography variant="h3">Добро пожаловать!</Typography>
      <Separator />
      <section>
        <p>
          Админ панель чат-бота MIIT Guide Bot. Здесь вы можете управлять контентом, который будем показан внутри бота.
          Данные обновляются автоматически сразу после сохранения. <b>Отмена изменений невозможна!</b>
        </p>
        <p>
          <Link to="/content/articles">
            <Button color="info">
              Статьи
            </Button>
          </Link>
          <Link to="/content/tabs">
            <Button color="error">
              Вкладки
            </Button>
          </Link>
        </p>
        <p>
          <Button variant="contained" color="error" onClick={toggleSidebar}>Выключить sidebar</Button>
        </p>
        <Separator />
      </section>
    </div>
  )
}
