import React from 'react';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';
import { FaTimes } from 'react-icons/fa';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Widget = ({ widget, categoryIndex, widgetIndex, removeWidget }) => {
  const renderChart = () => {
    const { chart_type, data } = widget;
    switch (chart_type) {
      case 'donut':
        return <Doughnut data={generateChartData(data)} />;
      case 'pie':
        return <Pie data={generateChartData(data)} />;
      case 'bar':
        return <Bar data={generateChartData(data)} />;
      default:
        return <div>No chart available</div>;
    }
  };

  const generateChartData = (data) => {
    const labels = Object.keys(data || { Label1: 10, Label2: 20 });
    const values = Object.values(data || { Label1: 10, Label2: 20 });

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ff9f40',
          ],
        },
      ],
    };
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.type}</h3>
        <FaTimes
          className="widget-close"
          onClick={() => removeWidget(categoryIndex, widgetIndex)}
        />
      </div>
      <div className="chart-container">
        {renderChart()}
        <p>{widget.text}</p>
      </div>
    </div>
  );
};

export default Widget;
