import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

let lengthOptions = ['All', '< 1 year', '1 year', '2 years', '3 years', '4 years', 
					'5 years', '6 years', '7 years', '8 years', '9 years', '10+ years',
					'n/a'];

/**
 * EmploymentLength is a react component that renders the Employee Length buttons as an 
 * alternative to checkboxes used by the EmpLengthChecks component.
 */
export default class EmploymentLength extends Component {

	render() {
		var currentStatus;
		// identifies if there is a selected item
		if (!this.props.filters.trendEmpLength) {
			currentStatus = 'All';
		} else {
			currentStatus = this.props.filters.trendEmpLength;
		}

		var listItems = lengthOptions.map(function(item, index) {
			var active = (item === currentStatus) ? true : false;
			return (
					<Button bsSize='xsmall'
							bsStyle={active ? 'primary' : 'default'}
							key={index} id={item} 
							active={active}
							onClick={ this.props.onEmpLengthSelected  } block
					>
						{item}
					</Button>
				)
	    }.bind(this));

		const wellStyles = {maxWidth: 200};
	  	return (
  			<div>
  				<label>Employment Length</label>
				<div className='well' style={wellStyles}>
					{listItems}
				</div>
  			</div>
    	)
	}

}