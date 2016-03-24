import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var echarts = require('echarts');

export default class Donut extends Component {

	createChart() {
	    // Initialize after dom ready
	    var domElement = ReactDOM.findDOMNode(this);
	    this.chart = echarts.init(domElement);
	    this.updateChart(this.props);
  	}

  	updateChart(props) {
		// give up quickly if props are empty.
		if (!props) {
			return null;
		}
		var newChartOptions = this.makeChartOptions(props);
		this.chart.setOption(newChartOptions);

		this.chart.on('CLICK', props.onClick);
	}


	makeChartOptions(props) {

		var items;
		if (!props.items) {
			items = [];
		} else {
			items = props.items;
		}
		var data = items.map(function(item) {
			var elem = {
				name: item.group,
				value: item.current.count
			}
			return elem;
		});
		var labels = items.map(function(item) {
			return item.group;
		});

		var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	show: false,
		        orient : 'vertical',
		        x : 'left',
		        y : 'top',
		        data: labels
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:'Loan Grade',
		            type:'pie',
		            radius : ['50%', '80%'],
		            itemStyle : {
		                normal : {
		                    label : {
		                        show : true
		                    },
		                    labelLine : {
		                        show : true
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : true,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : '30',
		                            fontWeight : 'bold'
		                        }
		                    }
		                }
		            },
	                data: data
	            }

			]
		};
		
		return option;
	}

	componentDidMount() {
    	this.createChart();
  	}

	componentWillUnmount() {
		this.chart.dispose();
	}

	componentDidUpdate() {
		this.updateChart(this.props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		this.updateChart(nextProps);
	}

	render(){
	  	return (
			<div style={{height: this.props.height, width: this.props.width}} />
    	)
	}

}



