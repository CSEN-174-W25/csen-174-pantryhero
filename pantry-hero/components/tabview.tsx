import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Gallery from '@/components/galleryview';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({food}:any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  const shelves = ["Produce","Grains" ,"Protein" ,"Vegetables","Fruit" ,"Condiments"];
  const foodArr = {}
  let count = 0;
  shelves.forEach((cat:string)=>{
    let category = cat.toLowerCase();
    
    foodArr[count] = food.filter((item)=>item.category == category);

    count += 1;
  })
  

  return (
    <Box
      sx={{ flexGrow: 3, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Produce" {...a11yProps(0)} />
        <Tab label="Grains" {...a11yProps(1)} />
        <Tab label="Protein" {...a11yProps(2)} />
        <Tab label="Vegetables" {...a11yProps(3)} />
        <Tab label="Fruit" {...a11yProps(4)} />
        <Tab label="Condiments" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      <Gallery food={foodArr[0]}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Gallery food={foodArr[1]}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Gallery food={foodArr[2]}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Gallery food={foodArr[3]}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Gallery food={foodArr[4]}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Gallery food={foodArr[5]}/>
      </TabPanel>

    </Box>
  );
}
