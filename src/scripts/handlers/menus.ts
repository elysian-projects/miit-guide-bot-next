import { initMenuButtons } from "@/components/reply-markup";
import { LocationsController } from "@/external/locations";
import { TabsController } from "@/external/tabs";
import { Menu } from "@grammyjs/menu";

/**
 * Root menu is shown in the main hub, it lists available tabs
 * `id="root"`
 */
export const rootMenu = initMenuButtons(new Menu("root"), TabsController.getImages(), "tabs");

/**
 * Excursion menu is shown in the excursion hub, it lists available locations
 * `id="excursion"`
 */
export const excursionMenu = initMenuButtons(new Menu("excursion"), LocationsController.getImages(), "locations");
