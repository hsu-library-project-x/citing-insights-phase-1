import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props)   {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  console.log('printing props from tabs');
  console.log(props.citations[0]);

  var citations = props.citations;



  if (citations != []) {
    var citationDropdownItems = citations.map(function (citation, index) {

      if (citation.author[0] != undefined) {

        return(<Tab label={citation.author[0].family} {...a11yProps(index)} />);
      }

    });
  } else {
    var citationItems = <p> nothing found yet </p>;
  }



  if (citations != []) {
    var menuText = citations.map(function (citation, index) {

      if (citation.author[0] != undefined) {

        return(<TabPanel value={value} index={index}> {citation.author[0].family + ', ' +  citation.title} </TabPanel>);
      }

    });
  } else {
    var citationItems = <p> nothing found yet </p>;
  }

  return (

    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {citationDropdownItems}
        </Tabs>
      </AppBar>

      {menuText}


    </div>
  );
}
