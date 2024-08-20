import React, { useState, useEffect } from 'react';
import Category from './Category';
import data from './data.json';
import AddCategory from './AddCategory';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    // Initialize dashboard data with proper structure
    const initializedData = {
      ...data.dashboard,
      categories: data.dashboard.categories.map(category => ({
        ...category,
        widgets: category.widgets || [] // Ensure widgets is always an array
      }))
    };
    setDashboardData(initializedData);
  }, []);

  const addWidget = (categoryIndex, newWidget) => {
    const updatedCategories = [...dashboardData.categories];

    // Ensure the widgets array exists
    if (!updatedCategories[categoryIndex].widgets) {
      updatedCategories[categoryIndex].widgets = [];
    }

    updatedCategories[categoryIndex].widgets.push(newWidget);

    setDashboardData({
      ...dashboardData,
      categories: updatedCategories
    });
  };

  const removeWidget = (categoryIndex, widgetIndex) => {
    const updatedCategories = [...dashboardData.categories];

    if (updatedCategories[categoryIndex]?.widgets) {
      updatedCategories[categoryIndex].widgets.splice(widgetIndex, 1);

      setDashboardData({
        ...dashboardData,
        categories: updatedCategories
      });
    }
  };

  return (
    <div className="dashboard">
      <AddCategory
        categories={dashboardData.categories || []}
        setCategories={(updatedCategories) =>
          setDashboardData({ ...dashboardData, categories: updatedCategories })
        }
      />
      {dashboardData.categories &&
        dashboardData.categories.map((category, index) => (
          <Category
            key={index}
            category={category}
            categoryIndex={index}
            addWidget={addWidget}
            removeWidget={removeWidget}
          />
        ))}
    </div>
  );
};

export default Dashboard;
