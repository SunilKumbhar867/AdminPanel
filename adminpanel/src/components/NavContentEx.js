import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Home"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/title" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Title Banner"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/sliding" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Sliding Banner"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/adminuser" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Admin User"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>

      <Link to="/home/smalllayout" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Small Layout"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>


      <Link to="/home/bridemaidgift" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Bridemaid Gift"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>

      <Link to="/home/fireworks" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Fireworks"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>


      <Link to="/home/quiz" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Quiz"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>


      <Link to="/home/blogs" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Blogs"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>


      {/* <Link to="/home/contactus" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText 
            style={{ color: "#fff" }}
            primary={"Contact Us"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link> */}

    </List>
  );
}
