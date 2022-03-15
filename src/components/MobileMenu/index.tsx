import {
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import NextLink from "next/link";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import type { SwipeableDrawerProps } from "@mui/material";

import { iOS } from "@/lib/browser";

import { selectCategories } from "../../store/slices/product";

import type Category from "../../types/category";

interface MobileMenuProps extends SwipeableDrawerProps {
  links?: {
    url: string;
    title: string;
  }[];
}

function MobileMenu({
  open,
  onOpen,
  onClose,
  links,
}: MobileMenuProps): JSX.Element {
  const categories: Category[] = useSelector(selectCategories);

  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
    >
      <Box
        sx={{
          width: 250,
          overflowX: "hidden",
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        {links && links.length > 0 ? (
          <List>
            {links.map((link, index) => {
              return (
                <NextLink href={link.url} key={index} prefetch={false} passHref>
                  <ListItem component="a" button>
                    <ListItemText primary={link.title} />
                  </ListItem>
                </NextLink>
              );
            })}
            <Divider />
            {categories.map((category) => {
              return (
                <ListItem key={String(category._id)} button>
                  <ListItemText primary={category.name} />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <div>No links found.</div>
        )}
      </Box>
    </SwipeableDrawer>
  );
}

MobileMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
};

export default MobileMenu;
