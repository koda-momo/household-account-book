import { FC, memo, useState, useCallback, MouseEvent } from "react";
import Link from "next/link";

//MUI
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

//components
import { menuItemType } from "../../types/OtherType";

type Props = {
  menuItem: Array<menuItemType>; //メニューの項目
};

/**
 * スマホ用メニューバー.
 */
export const HamburgerMenu: FC<Props> = memo(({ menuItem }) => {
  //メニューバーの開閉
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * メニューバーを開く.
   */
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /**
   * パスに飛んでメニューバーを閉じる.
   */
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label="メニューを開く"
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItem.map((item, i) => (
          <MenuItem onClick={handleClose} key={i}>
            <Link href={item.path} key={i}>
              <a>{item.name}</a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});
