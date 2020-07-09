import React, {useState} from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ChartToggle(props) {
  const [period, setPeriod] = useState('all');

  const handlePeriodChange = (event, newPeriod) => {
	if(newPeriod !== null) {
		setPeriod(newPeriod);
		if(props.callBackFromParent) {
			props.callBackFromParent(newPeriod); 
		}
	}
  };

  return (
    <ToggleButtonGroup
      value={period}
      exclusive
	  size="medium"
	  style ={{position:"relative", display: 'flex', justifyContent: 'center', paddingTop: 30, paddingBottom: 15}}
	//   orientation = "vertical"
      onChange={handlePeriodChange}
      aria-label="period options"
    >
      <ToggleButton value="week" aria-label="week period">
        Week
      </ToggleButton>
      <ToggleButton value="month" aria-label="month period">
        Month
      </ToggleButton>
      <ToggleButton value="all" aria-label="all period">
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}